const controller = {
    fnDemo: async function (req, res) {
        
        res.status(200).json({
            username: req.body.username
        })
    }
}

export default controller