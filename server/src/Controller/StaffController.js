const Staff = require('../models/Staff');
const User = require('../models/User');
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const staffValidator = require('../Validator/Staff')

class StaffController {
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
                        from: 'users',
                        localField: 'idUser',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                { $unwind: '$user' }
            ]
            if (filter) {
                if (filter.onlyDelete) {
                    deFault[0] = {
                        $match: {
                            deleted: true
                        }
                    }
                }
                aggregate = aggregate.concat(deFault)
                if (filter.search) {
                    aggregate.push(
                        {
                            $match: {
                                $or: [
                                    { "user.name": { $regex: filter.search || '', $options: "$i" } },
                                    { "user.gender": { $regex: filter.search || '', $options: "$i" } },
                                    { "user.phone": { $regex: filter.search || '', $options: "$i" } },
                                    { "user.email": { $regex: filter.search || '', $options: "$i" } },
                                    { "user.address": { $regex: filter.search || '', $options: "$i" } },
                                    { "position": { $regex: filter.search || '', $options: "$i" } }
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
                            $limit: filter.limit
                        }
                    )
                }
            } else {
                aggregate = aggregate.concat(deFault)
            }
            const staffs = await Staff.aggregate(aggregate)
            res.json({ success: true, staffs })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ success: false, messages: 'Missing username or password' });
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ success: false, messages: 'Incorrect username or password' })
            }
            const staff = await Staff.aggregate([
                {
                    $match: { idUser: user._id }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'idUser',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                { $unwind: '$user' }
            ])
            if (!staff[0]) {
                return res.status(400).json({ success: false, messages: 'Incorrect username or password' })
            }
            const passowrdvalid = await argon2.verify(user.password, password)
            if (!passowrdvalid) {
                return res.status(500).json({ success: false, messages: 'Invalid password' })
            }

            const accessToken = jwt.sign(
                { Id: staff[0]._id },
                process.env.ACCESS_TOKEN_SECRET
            )

            res.json({ success: true, messages: 'Login successfully', accessToken })
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
    async load(req, res) {
        try {
            const staff = await Staff.aggregate([
                {
                    $match: { _id: mongoose.Types.ObjectId(req.Id) }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'idUser',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                { $unwind: '$user' }
            ])
            if (!staff[0])
                return res.status(400).json({ success: false, message: 'Staff not found' })
            res.json({ success: true, staff:staff[0] })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const staff = await Staff.findById(id)
            if (!staff) return res.json({ success: false, messages: 'Invalid staff' })
            res.json({ success: true, staff })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async store(req, res) {
        const { error } = staffValidator({position: req.body.position, salary: req.body.salary})
        if( error ) return res.status(400).json({success: false, messages: error.details[0].message })
        try {
            const staff = await User.findOne({ username: req.body.username })
            if (staff) {
                return res.status(400).json({ success: false, messages: 'Username already exsist' });
            }
            const hashpassword = await argon2.hash(req.body.password);
            const newUser = new User({ ...req.body, password: hashpassword });
            await newUser.save()
            const newStaff = new Staff({ position: req.body.position, salary: req.body.salary, idUser: newUser._id })
            await newStaff.save()
            res.json({ success: true, messages: 'Add successfully', staff: { ...newStaff, ...newUser } })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        const { error } = staffValidator({position: req.body.position, salary: req.body.salary})
        if( error ) return res.status(400).json({success: false, messages: error.details[0].message })
        try {
            const staff = await Staff.updateOne({ _id: id }, { position: req.body.position, salary: req.body.salary }, { new: true })
            if (!staff) return res.json({ success: false, messages: "Can't update staff" })
            const user = await User.updateOne({ _id: req.body.idUser }, req.body, { new: true })
            res.json({ success: true, messages: 'Update successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const staff = await Staff.delete({ _id: id })
            if (!staff) return res.status(401).json({ success: false, messages: 'Cant delete staff' })
            res.json({ success: true, messages: 'Delete successfully'})
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async deleteMulti(req, res) {
        const {ids} = req.query
        if (!ids) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const staff = await Staff.delete({_id: {$in: ids.map( id => mongoose.Types.ObjectId(id))}})
            if (!staff) return res.status(401).json({ success: false, messages: 'Cant delete staff' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async restore(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const staff = await Staff.restore({ _id: id })
            if (!staff) return res.status(401).json({ success: false, messages: 'Cant restore staff' })
            res.json({ success: true, messages: 'Restore successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async restoreMulti(req, res) {
        const { ids } = req.query
        if (!ids) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const staff = await Staff.restore({_id: {$in: ids.map( id => mongoose.Types.ObjectId(id))}})
            if (!staff) return res.status(401).json({ success: false, messages: 'Cant restore staff' })
            res.json({ success: true, messages: 'Restore successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new StaffController()
