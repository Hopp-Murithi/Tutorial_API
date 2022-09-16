//controller logic for server health check
module.exports.health = async function(req, res, _next) {
    try {
        res.status(200).json({ message: "Server is running" })
    } catch (err) {
        res.status(503).json({ devError: err.message, message: "Failed" })
    }
};