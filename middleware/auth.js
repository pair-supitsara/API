import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const { authorization } = req.headers
        const token = authorization

        jwt.verify(token, process.env.PRIVATE_KEY, function(error, response) {
            if (error) { throw new Error(error) }
            next()
        })
    } catch (error) {
        throw new Error(error)
    }
}

export default auth