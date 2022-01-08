const Job = require('../models/Job');
const mongoose = require('mongoose');

class JobController {
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
                                    { description: { $regex: filter.search || '', $options: "$i" } }
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
            const jobs = await Job.aggregate(aggregate)
            res.json({ success: true, jobs })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const job = await Job.findById(id)
            if (!job) return res.json({ success: false, messages: 'Invalid job' })
            res.json({ success: true, job })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async store(req, res) {
        try {
            const job = await Job.findOne({ name: req.body.name })
            if (job) {
                console.log(job.name)
                return res.status(400).json({ success: false, messages: 'Job already exsist' })
            }
            const newjob = new Job(req.body)
            await newjob.save()
            res.json({ success: true, messages: 'Add successfully', job: newjob })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const job = await Job.updateOne({ _id: id }, req.body, { new: true })
            if (!job) return res.json({ success: false, messages: 'Cant update job' })
            res.json({ success: true, messages: 'Update successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const job = await Job.delete({ _id: id })
            if (!job) return res.status(401).json({ success: false, messages: 'Cant delete job' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async deleteMulti(req, res) {
        const {ids} = req.query
        if (!ids) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const job = await Job.delete({_id: {$in: ids.map( id => mongoose.Types.ObjectId(id))}})
            if (!job) return res.status(401).json({ success: false, messages: 'Cant delete job' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async restore(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const job = await Job.restore({ _id: id })
            if (!job) return res.status(401).json({ success: false, messages: 'Cant restore job' })
            res.json({ success: true, messages: 'Restore successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error a' })
        }
    }

    async restoreMulti(req, res) {
        const { ids } = req.query
        if (!ids) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const job = await Job.restore({_id: {$in: ids.map( id => mongoose.Types.ObjectId(id))}})
            if (!job) return res.status(401).json({ success: false, messages: 'Cant restore job' })
            res.json({ success: true, messages: 'Restore successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new JobController()
