
import database from './database.js'
import valid from '../../helper/validator.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const business = {
  fnLogin: async function (req, res) {
    try {
      const { email, password } = req.body
      const result = { status: "", message: "", data: [] }
      
      // check if data is null or undefined or empty-string, throw error
      valid.mustNotEmpty(email)
      valid.mustNotEmpty(password)
      
      // find salt if salt is undefined becase of wrong email or you have to register before logging in
      const rsuser = await database.fnFindUserByEmail(email)
      let salt
      if (rsuser.length > 0 ) {
        salt = rsuser[0].salt
      } else {
        result.status = 'fail'
        result.message = 'enter correct email or register before logging in'
        return result
      }

      // check email and password are correct
      const resultUser = await database.fnCheckEmailAndHashPassword(email, password, salt)
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
        result.message = 'Login successfully'
        result.data = token
      }

      return result
    } catch (err) {
      console.log(err)
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

      const isExistUser = await database.fnFindUserByEmail(email)
      if (isExistUser.length > 0) {
        result.status = 'fail'
        result.message = `You already have registered with this email: ${email}`
        return result
      }

      const resultInsertUsers = await database.fnAddUserAccount(email, password)
      result.status = resultInsertUsers.status
      result.message = resultInsertUsers.message
      return result
    } catch (err) {
      throw err
    }
  }
}

export default business