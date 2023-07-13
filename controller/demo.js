const controller = {
    fnDemo: async function (req, res) {
        console.log(req.body.username)
        res.status(200).json({
            username: req.body.username
        })
    }
}

module.exports = controller