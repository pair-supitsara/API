
const authendatabase = require('./authendatabase.js')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const business = {
  fnLogin: async function (req, res) {
    try {
      const { email, password } = req.body
      // check is not null
      if ( !email || !password ) {
        return 'email password cannot be null '
      }
      
      // find salt if salt is undefined becase of wrong email or you have to register before logging in
      const user = await authendatabase.fnFindUserByEmail(email)
      let salt
      if (user.length > 0) {
        salt = user[0].salt
      } else {
        return 'please, wrong email or signup before logging in'
      }
      // check email and password are correct
      const resultUser = await authendatabase.fnCheckEmailAndHashPassword(email, password, salt)
      let username
      if (resultUser.length > 0) {
        username = resultUser[0].username
      } else {
        return 'wrong password'
      }

      // create token
      const payload = { username }
      const option = { expiresIn: '600s' }
      var token = jwt.sign(payload, process.env.PRIVATE_KEY, option);
      if (!token) {
        return 'fail while creating json web token'
      }

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
  },
  fnRegister: async function (req, res) {
    try {
      const { email, password } = req.body
      const result = { message: "", data: [] }

      const isExistUser = await authendatabase.fnFindUserByEmail(email)
      if (isExistUser.length > 0) {
        result.message = `You already have registered with this email: ${email}`
        return result
      }

      const resultInsertUsers = await authendatabase.fnAddUserAccount(email, password)
      result.message = resultInsertUsers.message
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

module.exports = business