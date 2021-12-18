const userRouter = require('./User')
const roomRouter = require('./Room')
const serviceRouter = require('./Service')
const staffRouter = require('./Staff')
const bookingRouter = require('./Booking')
const typeRoomRouter = require('./TypeRoom')

const Route = (app) => {
    app.use('/user',userRouter),
    app.use('/room',roomRouter),
    app.use('/service',serviceRouter),
    app.use('/staff',staffRouter),
    app.use('/booking',bookingRouter),
    app.use('/typeRoom',typeRoomRouter)
}

module.exports = Route;