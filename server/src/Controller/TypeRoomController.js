const TypeRoom = require('../models/TypeRoom');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');
const typeRoomValidator = require('../Validator/TypeRoom')

class TypeRoomController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = [
                {
                    $match: {
                        deleted: { $ne: true }
                    }
                }
            ]
            if (filter) {
                if (filter.onlyDelete) {
                    aggregate[0] = {
                        $match: {
                            deleted: true
                        }
                    }
                }
                if (filter.search) {
                    aggregate.push(
                        {
                            $match: {
                                $or: [
                                    { name: { $regex: filter.search || '', $options: "$i" } },
                                    // { description: { $regex: filter.search || '', $options: "$i" } }
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
            }
            const typeRooms = await TypeRoom.aggregate(aggregate)
            res.json({ success: true, typeRooms })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' + error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const typeRoom = await TypeRoom.findById(id)
            if (!typeRoom) return res.json({ success: false, messages: 'Invalid typeRoom' })
            res.json({ success: true, typeRoom })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async store(req, res) {
        const { error } = typeRoomValidator(req.body)
        if( error ) return res.status(400).json({success: false, messages: error.details[0].message })
        try {
            const typeRoom = await TypeRoom.findOne({ name: req.body.name })
            if (typeRoom) {
                return res.status(400).json({ success: false, messages: 'Type room has already exsisted' })
            }
            const newTypeRoom = new TypeRoom(req.body)
            await newTypeRoom.save()
            res.json({ success: true, messages: 'Add successfully', typeRoom: newTypeRoom })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        const { error } = typeRoomValidator(req.body)
        if( error ) return res.status(400).json({success: false, messages: error.details[0].message })
        try {
            const typeRoom = await TypeRoom.updateOne({ _id: id }, req.body, { new: true })
            if (!typeRoom) return res.json({ success: false, messages: 'Cant update typeRoom' })
            res.json({ success: true, messages: 'Update successfully', typeRoom })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const typeRoom = await TypeRoom.delete({ _id: id })
            if (!typeRoom) return res.status(401).json({ success: false, messages: 'Cant delete typeRoom' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async deleteMulti(req, res) {
        const { ids } = req.query
        if (!ids) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const typeRoom = await TypeRoom.delete({ _id: { $in: ids.map(id => mongoose.Types.ObjectId(id)) } })
            if (!typeRoom) return res.status(401).json({ success: false, messages: 'Cant delete typeRoom' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async restore(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const typeRoom = await TypeRoom.restore({ _id: id })
            if (!typeRoom) return res.status(401).json({ success: false, messages: 'Cant restore typeRoom' })
            res.json({ success: true, messages: 'Restore successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async restoreMulti(req, res) {
        const { ids } = req.query
        if (!ids) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const typeRoom = await TypeRoom.restore({_id: {$in: ids.map( id => mongoose.Types.ObjectId(id))}})
            if (!typeRoom) return res.status(401).json({ success: false, messages: 'Cant restore typeRoom' })
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
                        deleted: { $ne: true }
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
                        _id: "$room.typeRoom",
                        totalPrice: { $sum: "$room.price"}
                    }
                },
                {
                    $lookup: {
                        from: "typerooms",
                        localField: "_id",
                        foreignField: "_id",
                        as: "typeRoom"
                    }
                },
                { $unwind: '$typeRoom' },
            ])
            res.json({ success: true, statistics })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }
}

module.exports = new TypeRoomController()
