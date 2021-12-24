const Comment = require('../models/Comment');
const mongoose = require('mongoose');

class CommentController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = []
            const deFault = [
                {
                    $match: {
                        parentComment: { $exists: false }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        let : { userId : '$user'},
                        pipeline: [
                            {
                                $match: {
                                    $expr: {$eq: ['$_id', '$$userId']}
                                    // _id: mongoose.Types.ObjectId('6161c1211caa46ab116f262b')
                                }
                            },
                            { $project: { _id: 1, firstname: 1, lastname: 1}}
                        ],
                        as: "user"
                    }
                },
                { $unwind: '$user' },
                // { $set: { user: '$user.firstname'}},
                {
                    $lookup: {
                        from: "comments",
                        as: 'childComment',
                        let : { parentId : '$_id'},
                        pipeline: [
                            {
                                $match: {
                                    $expr: {$eq: ['$parentComment', '$$parentId']}
                                }
                            },
                            {
                                $lookup: {
                                    from: "users",
                                    let : { userId : '$user'},
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {$eq: ['$_id', '$$userId']}
                                            }
                                        },
                                        { $project: { _id: 1, firstname: 1, lastname: 1}}
                                    ],
                                    as: "user"
                                }
                            },
                            { $unwind: '$user' }
                        ],
                        as: "childComment"
                    }
                }
            ]
            if (filter) {
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
            }
            aggregate = aggregate.concat(deFault)
            const comments = await Comment.aggregate(aggregate)
            res.json({ success: true, comments })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const comment = await Comment.findById(id)
            if (!comment) return res.json({ success: false, messages: 'Invalid comment' })
            res.json({ success: true, Comment })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async store(req, res) {
        try {
            const comment = new Comment(req.body)
            await comment.save()
            res.json({ success: true, messages: 'Comment successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const comment = await Comment.updateOne({ _id: id }, req.body, { new: true })
            if (!comment) return res.json({ success: false, messages: 'Cant update comment' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const comment = await Comment.deleteOne({ _id: id })
            if (!comment) return res.status(401).json({ success: false, messages: 'Cant delete comment' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new CommentController()