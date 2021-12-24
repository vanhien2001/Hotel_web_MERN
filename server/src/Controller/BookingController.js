const Booking = require('../models/Booking');
const User = require('../models/User');
const mongoose = require('mongoose');

class BookingController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = []
            const deFault = [
                {
                    $match: {
                        deleted: { $ne: true }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                { $unwind: '$user' },
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
                    $lookup: {
                        from: "services",
                        localField: "services",
                        foreignField: "_id",
                        as: "services"
                    }
                }
            ]
            if (filter) {
                if (filter.onlyDelete) {
                    deFault[0] = {
                        $match: {
                            deleted: true
                        }
                    }
                }
                if(filter.user){
                    aggregate.push(
                        {
                            $match: {
                                user: mongoose.Types.ObjectId(filter.user)
                            }
                        }
                    )
                }
                if(filter.room){
                    aggregate.push(
                        {
                            $match: {
                                room: mongoose.Types.ObjectId(filter.room)
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
                                    { "user.firstname": { $regex: filter.search || '', $options: "$i" } },
                                    { "user.gender": { $regex: filter.search || '', $options: "$i" } },
                                    { "user.phone": { $regex: filter.search || '', $options: "$i" } },
                                    { "user.email": { $regex: filter.search || '', $options: "$i" } },
                                    { "room.name": { $regex: filter.search || '', $options: "$i" } }
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
            } else {
                aggregate = aggregate.concat(deFault)
            }
            const bookings = await Booking.aggregate(aggregate)
            res.json({ success: true, bookings })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const booking = await Booking.findById(id)
            if (!booking) return res.json({ success: false, messages: 'Invalid booking' })
            res.json({ success: true, booking })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async store(req, res) {
        try {
            let user = await User.findOne({ cmnd: req.body.cmnd })
            if (!user) {
                user = new User({ ...req.body, username: req.body.phone, password: '123' })
                await user.save()
            }
            const booking = new Booking({ ...req.body, user: user._id })
            await booking.save()
            res.json({ success: true, messages: 'Booking successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const booking = await Booking.updateOne({ _id: id }, req.body, { new: true })
            if(req.body.user){
                User.updateOne({ _id: req.body.user }, req.body, { new: true })
            }
            if (!booking) return res.json({ success: false, messages: 'Cant update booking' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const booking = await Booking.delete({ _id: id })
            if (!booking) return res.status(401).json({ success: false, messages: 'Cant delete booking' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async deleteMulti(req, res) {
        const { ids } = req.query
        if (!ids) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const booking = await Booking.delete({_id: {$in: ids.map( id => mongoose.Types.ObjectId(id))}})
            if (!booking) return res.status(401).json({ success: false, messages: 'Cant delete booking' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async restore(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const booking = await Booking.restore({ _id: id })
            if (!booking) return res.status(401).json({ success: false, messages: 'Cant restore booking' })
            res.json({ success: true, messages: 'Restore successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async restoreMulti(req, res) {
        const { ids } = req.query
        if (!ids) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const booking = await Booking.restore({_id: {$in: ids.map( id => mongoose.Types.ObjectId(id))}})
            if (!booking) return res.status(401).json({ success: false, messages: 'Cant restore booking' })
            res.json({ success: true, messages: 'Restore successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error'})
        }
    }
}

module.exports = new BookingController()