import jwt from 'jsonwebtoken'

const fnVerifyJsonWebToken = (req, res, next) => {
    try {
        const { authorization } = req.headers
        const token = authorization.split(' ')[1]
        jwt.verify(token, process.env.PRIVATE_KEY, function(error, response) {
            if(error){ 
                throw error 
            } else {
                req.body.username = response.username
                next()
            }
        })
    } catch (error) {
        throw error
    }
}

export default fnVerifyJsonWebToken