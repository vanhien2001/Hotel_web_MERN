const jwt = require('jsonwebtoken')
const Staff = require('../models/Staff')
const mongoose = require('mongoose');

const verifyRole = async (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'Access token not found' })

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const staff = await Staff.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(decoded.Id) }
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'position',
                    foreignField: '_id',
                    as: 'position'
                }
            },
            { $unwind: '$position'}
        ])

		if(staff[0].position.name === "Quản lý"){
            next()
        }else{
            return res.status(403).json({ success: false, messages: 'Bạn không có quyền thực hiện hành động này' })
        }
	} catch (error) {
		console.log(error)
		return res.status(403).json({ success: false, messages: 'Invalid token' })
	}
}

module.exports = verifyRole
