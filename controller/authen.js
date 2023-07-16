const connectmysql = require('../connectmysql.js')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const business = {
  fnGenerateJWT: async function (req, res) {
    try {
      const { username } = req.body
      const payload = {
        username: username
      }
      const option = { expiresIn: '60s' }
    
      var token = jwt.sign(payload, process.env.PRIVATE_KEY, option);
      return {
        token
      }
    } catch (err) {
      throw err
    }
  },
  fnVerifyJWT: async function (req, res) {
    try {
      const { authorization } = req.headers
      const token = authorization.split(' ')[1]
      const response = jwt.verify(token, process.env.PRIVATE_KEY, function(error, response) {
        if(error){
          throw error
        } else {
          return response
        }
      })
      return response
    } catch (err) {
      throw err
    }
  }
}

module.exports = business