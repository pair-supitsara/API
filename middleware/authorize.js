const authorize = (req, res, next) => {
    try {
        const { permission } = req.body
        
        if (permission == 'admin') {
            next()
        } else {
            throw new Error('You dont have ADMIN permission!')
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default authorize