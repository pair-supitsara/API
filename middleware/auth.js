import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const { token } = req.body

        if (!token) { throw new Error('this endpoint need a token!') }
        
        jwt.verify(token, process.env.PRIVATE_KEY, function(error, decoded) {
            if (error) { throw new Error(error) }
            req.body.permission = decoded.permission
            next()
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default auth