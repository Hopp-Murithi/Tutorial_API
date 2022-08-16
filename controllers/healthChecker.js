//controller logic for server health check

exports.health = async(req, res, _next) => {
    try {
        res.status(200).json({ message: "Server is running" })
    } catch (err) {
        res.sendStatus(503).json({ message: err.message })
    }
};