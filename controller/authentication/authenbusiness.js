
const authendatabase = require('./authendatabase.js')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const business = {
  fnLogin: async function (req, res) {
    try {
      const { email, password } = req.body
      const result = { status: "", message: "", data: [] }

      // check is not null
      if ( !email || !password ) {
        result.status = 'fail'
        result.message = 'email password cannot be null'
        return result
      }
      
      // find salt if salt is undefined becase of wrong email or you have to register before logging in
      const user = await authendatabase.fnFindUserByEmail(email)
      let salt
      if (user.length > 0) {
        salt = user[0].salt
      } else {
        result.status = 'fail'
        result.message = 'please, enter correct email or signup before logging in'
        return result
      }

      // check email and password are correct
      const resultUser = await authendatabase.fnCheckEmailAndHashPassword(email, password, salt)
      let username, userid
      if (resultUser.length > 0) {
        username = resultUser[0].username
        userid = resultUser[0].user_id
      } else {
        result.status = 'fail'
        result.message = 'wrong password'
        return result
      }

      // create token
      const payload = { username, userid }
      const option = { expiresIn: '600s' }
      var token = jwt.sign(payload, process.env.PRIVATE_KEY, option);
      if (!token) {
        result.status = 'fail'
        result.message = 'fail while creating json web token'
        return result
      } else {
        result.status = 'success'
        result.data = token
      }

      return result
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
  },
  fnRegister: async function (req, res) {
    try {
      const { email, password } = req.body
      const result = { status: "", message: "", data: [] }

      const isExistUser = await authendatabase.fnFindUserByEmail(email)
      if (isExistUser.length > 0) {
        result.status = 'fail'
        result.message = `You already have registered with this email: ${email}`
        return result
      }

      const resultInsertUsers = await authendatabase.fnAddUserAccount(email, password)
      result.status = resultInsertUsers.status
      result.message = resultInsertUsers.message
      return result
    } catch (err) {
      throw err
    }
  }
}

module.exports = business