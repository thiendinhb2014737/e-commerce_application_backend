const Event = require("../models/EventModel")

const getEvent = (req, res) => {
    const { sort, limit } = req.query
    return new Promise(async (resolve, reject) => {
        try {
            if (sort && limit) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const eventSort = await Event.find().limit(limit).sort(objectSort).sort({ createdAt: -1, updatedAt: -1 })
                res.status(200).json({
                    status: 'OK',
                    message: 'Success',
                    data: eventSort,
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getEvent,
}