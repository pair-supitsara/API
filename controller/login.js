const connectmysql = require('../connectmysql.js')

const business = {
  fnTest: async function (req, res) {
    try {
      
      const result = await connectmysql.fnExecuteQuery('query')

      res.status(200).json({
        result: result
      })
    } catch(err) {
        res.send(err)
    }
  }
}

module.exports = business