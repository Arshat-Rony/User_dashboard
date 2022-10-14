module.exports = {

    serverError(res, err) {
        return res.status(501).send(`${err}`)
    },

    resourceError(res, message) {
        return res.status(400).send(`${message}`)

    }

} 