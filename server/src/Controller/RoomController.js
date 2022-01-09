const Room = require('../models/Room');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');
const roomValidator = require('../Validator/Room')

class RoomController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = []
            let quantity = 0
            const deFault = [
                {
                    $match: {
                        deleted: { $ne: true }
                    }
                },
                {
                    $lookup: {
                        from: 'typerooms',
                        localField: 'typeRoom',
                        foreignField: '_id',
                        as: 'typeRoom'
                    }
                },
                { $unwind: '$typeRoom' },
                {
                    $lookup: {
                        from: "services",
                        localField: "services",
                        foreignField: "_id",
                        as: "services"
                    }
                },
                // {
                //     $group: {
                //         _id: '$_id',
                //         doc: { $first:"$$ROOT"},
                //         abc: { $push: '$services' },
                //     }
                // },
                // { $replaceRoot: { 
                //     newRoot :{ $mergeObjects: ['$doc', { services: '$abc' }] }
                // }}
            ]
            if (filter) {
                if (filter.onlyDelete) {
                    deFault[0] = {
                        $match: {
                            deleted: true
                        }
                    }
                }
                if(filter.arrive && filter.depart){
                    const bookings = await Booking.aggregate([
                        { 
                            $match: {
                                $or: [
                                    {
                                        $and: [
                                            { arrive: {$gte: new Date(filter.arrive)}},
                                            { depart: {$lte: new Date(filter.depart)}}
                                        ]
                                    },
                                    {
                                        $and: [
                                            { arrive: {$lte: new Date(filter.arrive)}},
                                            { depart: {$gte: new Date(filter.depart)}}
                                        ]
                                    },
                                    {
                                        $and: [
                                            { arrive: {$gte: new Date(filter.arrive)}},
                                            { arrive: {$lte: new Date(filter.depart)}},
                                            { depart: {$gte: new Date(filter.depart)}}
                                        ]
                                    },
                                    {
                                        $and: [
                                            { arrive: {$lte: new Date(filter.arrive)}},
                                            { depart: {$gte: new Date(filter.arrive)}},
                                            { depart: {$lte: new Date(filter.depart)}}
                                        ]
                                    },
                                ]
                            }
                        },
                        { 
                            $group: {
                                _id: '$room'
                            }
                        }
                    ])
                    aggregate.push(
                        {
                            $match: {
                                _id: {$nin: bookings.map(booking => booking._id)}
                            }
                        }
                    )
                }
                if (filter.price) {
                    aggregate.push(
                        {
                            $match: {
                                price: { $lt: parseInt(filter.price) }
                            }
                        }
                    )
                }
                if (filter.services && filter.services.length > 0) {
                    aggregate.push(
                        {
                            $match: {
                                services: { $all: filter.services.map(index => mongoose.Types.ObjectId(index)) }
                            }
                        }
                    )
                }
                if (filter.typeRoom && filter.typeRoom.length > 0) {
                    aggregate.push(
                        {
                            $match: {
                                typeRoom: { $in: filter.typeRoom.map(index => mongoose.Types.ObjectId(index)) }
                            }
                        }
                    )
                }
                aggregate = aggregate.concat(deFault)
                if (filter.search) {
                    aggregate.push(
                        {
                            $match: {
                                $or: [
                                    { name: { $regex: filter.search || '', $options: "$i" } },
                                    { description: { $regex: filter.search || '', $options: "$i" } },
                                    { "typeRoom.name": { $regex: filter.search || '', $options: "$i" } },
                                    { size: { $regex: filter.search || '', $options: "$i" } },
                                    { bed: { $regex: filter.search || '', $options: "$i" } },
                                    { price: { $regex: filter.search || '', $options: "$i" } }
                                ]
                            }
                        }
                    )
                }
                if (filter.sort) {
                    aggregate.push(
                        {
                            $sort: JSON.parse(filter.sort)
                        }
                    )
                }
                quantity = (await Room.aggregate(aggregate)).length
                if (filter.skip) {
                    aggregate.push(
                        {
                            $skip: (filter.skip - 1) * 4
                        }
                    )
                }
                if (filter.limit) {
                    aggregate.push(
                        {
                            $limit: parseInt(filter.limit)
                        }
                    )
                }
            }else{
                aggregate = aggregate.concat(deFault)
                quantity = (await Room.aggregate(aggregate)).length
            }
            const rooms = await Room.aggregate(aggregate)
            res.json({ success: true, rooms, quantity })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const room = await Room.findbyid(id)
            if (!room) return res.json({ success: false, messages: 'Invalid room' })
            res.json({ success: true, room })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async store(req, res) {
        const { error } = roomValidator(req.body)
        if( error ) return res.status(400).json({success: false, messages: error.details[0].message })
        try {
            const room = await Room.findOne({ name: req.body.name })
            if (room) {
                return res.status(400).json({ success: false, messages: 'Room already exsist' });
            }
            const newRoom = new Room({...req.body, images: req.files ? req.files.map(file => "/images/"+file.filename) : 'default'})
            await newRoom.save()
            res.json({ success: true, messages: 'Add successfully', room: newRoom })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        const { error } = roomValidator(req.body)
        if( error ) return res.status(400).json({success: false, messages: error.details[0].message })
        let body = req.body
        if(req.files){
            body = {...req.body, images: req.files.map(file => "/images/"+file.filename)}
        }
        try {
            const room = await Room.updateOne({ _id: id }, body, { new: true })
            if (!room) return res.json({ success: false, messages: 'Cant update room' })
            res.json({ success: true, messages: 'Update successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const room = await Room.delete({ _id: id })
            if (!room) return res.status(401).json({ success: false, messages: "Can't delete room" })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async deleteMulti(req, res) {
        const {ids} = req.query
        if (!ids) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const room = await Room.delete({_id: {$in: ids.map( id => mongoose.Types.ObjectId(id))}})
            if (!room) return res.status(401).json({ success: false, messages: "Can't delete room" })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async restore(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const room = await Room.restore({ _id: id })
            if (!room) return res.status(401).json({ success: false, messages: 'Cant restore room' })
            res.json({ success: true, messages: 'Restore successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async restoreMulti(req, res) {
        const { ids } = req.query
        if (!ids) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const room = await Room.restore({_id: {$in: ids.map( id => mongoose.Types.ObjectId(id))}})
            if (!room) return res.status(401).json({ success: false, messages: 'Cant restore room' })
            res.json({ success: true, messages: 'Restore successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async statistics(req, res) {
        const { year } = req.query
        try {
            const statistics = await Booking.aggregate([
                {
                    $match: {
                        deleted: { $ne: true },

                    }
                },
                { $set: { year: {$year: "$depart"}}},
                {
                    $match: {
                        year: parseInt(year) || (new Date()).getFullYear()
                    }
                },
                {
                    $lookup: {
                        from: "rooms",
                        localField: "room",
                        foreignField: "_id",
                        as: "room"
                    }
                },
                { $unwind: '$room' },
                {
                    $group: {
                        _id: "$room",
                        count: {$sum: {$subtract: [{ $dayOfYear: "$depart"},{ $dayOfYear: "$arrive"}]}},
                        // totalPrice: { $sum: {$multiply: ["$room.price", "$count"]}}
                    }
                }
            ])
            res.json({ success: true, statistics})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }
}

module.exports = new RoomController()
