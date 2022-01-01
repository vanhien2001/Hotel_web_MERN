const userRouter = require('./User')
const roomRouter = require('./Room')
const serviceRouter = require('./Service')
const staffRouter = require('./Staff')
const bookingRouter = require('./Booking')
const typeRoomRouter = require('./TypeRoom')
const CommentRouter = require('./Comment')
const ConversationRouter = require('./Conversation')
const MessageRouter = require('./Message')

const Route = (app) => {
    app.use('/user', userRouter),
    app.use('/room', roomRouter),
    app.use('/service', serviceRouter),
    app.use('/staff', staffRouter),
    app.use('/booking', bookingRouter),
    app.use('/typeRoom', typeRoomRouter),
    app.use('/comment', CommentRouter),
    app.use('/conversation', ConversationRouter),
    app.use('/message', MessageRouter)
}

module.exports = Route;