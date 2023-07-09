const controller = {
    fnTest: async function (req, res) {
        res.status(200).json({
            'result': req.body.username
        })
    }
}

module.exports = controller