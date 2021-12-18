const Service = require('../models/Service');
const mongoose = require('mongoose');
const serviceValidator = require('../Validator/Service')

class ServiceController {
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
            const services = await Service.aggregate(aggregate)
            res.json({ success: true, services })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const service = await Service.findById(id)
            if (!service) return res.json({ success: false, messages: 'Invalid service' })
            res.json({ success: true, service })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async store(req, res) {
        const { error } = serviceValidator(req.body)
        if( error ) return res.status(400).json({success: false, messages: error.details[0].message })
        try {
            const service = await Service.findOne({ name: req.body.name })
            if (service) {
                console.log(service.name)
                return res.status(400).json({ success: false, messages: 'Service already exsist' })
            }
            const newService = new Service(req.body)
            await newService.save()
            res.json({ success: true, messages: 'Add successfully', service: newService })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        const { error } = serviceValidator(req.body)
        if( error ) return res.status(400).json({success: false, messages: error.details[0].message })
        try {
            const service = await Service.updateOne({ _id: id }, req.body, { new: true })
            if (!service) return res.json({ success: false, messages: 'Cant update service' })
            res.json({ success: true, messages: 'Update successfully', service: service })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const service = await Service.delete({ _id: id })
            if (!service) return res.status(401).json({ success: false, messages: 'Cant delete service' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async deleteMulti(req, res) {
        const {ids} = req.query
        if (!ids) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const service = await Service.delete({_id: {$in: ids.map( id => mongoose.Types.ObjectId(id))}})
            if (!service) return res.status(401).json({ success: false, messages: 'Cant delete service' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async restore(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const service = await Service.restore({ _id: id })
            if (!service) return res.status(401).json({ success: false, messages: 'Cant restore service' })
            res.json({ success: true, messages: 'Restore successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error a' })
        }
    }

    async restoreMulti(req, res) {
        const { ids } = req.query
        if (!ids) return res.status(401).json({ success: false, messages: 'Missing id' , data: req.params })
        try {
            const service = await Service.restore({_id: {$in: ids.map( id => mongoose.Types.ObjectId(id))}})
            if (!service) return res.status(401).json({ success: false, messages: 'Cant restore service' })
            res.json({ success: true, messages: 'Restore successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new ServiceController()
