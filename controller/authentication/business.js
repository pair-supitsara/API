
import database from './database.js'
import valid from '../../helper/validator.js'
import jwt from 'jsonwebtoken'

const business = {
  fnLogin: async function (req, res) {
    try {
      const { email, password } = req.body
      const result = { message: "", data: [] }
      
      // check if data is null or undefined or empty-string, throw error
      valid.mustNotEmpty(email)
      valid.mustNotEmpty(password)
      
      // find salt if salt is undefined becase of wrong email or you have to register before logging in
      const rsuser = await database.fnFindUserByEmail(email)
      let salt
      if (rsuser.length > 0 ) {
        salt = rsuser[0].salt
      } else {
        result.message = 'enter correct email or register before logging in'
        return result
      }

      // check email and password are correct
      const resultUser = await database.fnCheckEmailAndHashPassword(email, password, salt)
      let userid
      if (resultUser.length > 0) {
        userid = resultUser[0].user_id
      } else {
        result.message = 'wrong password'
        return result
      }

      // create token
      const payload = { userid }
      const option = { expiresIn: '600s' }
      var token = jwt.sign(payload, process.env.PRIVATE_KEY, option);
      if (!token) {
        result.message = 'fail while creating json web token'
        return result
      } else {
        result.message = 'Login successfully'
        result.token = token
      }

      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  fnRegister: async function (req, res) {
    try {
      const { email, password } = req.body
      const result = { message: "", data: [] }

      const isExistUser = await database.fnFindUserByEmail(email)
      if (isExistUser.length > 0) {
        result.message = `You already have registered with this email: ${email}`
        return result
      }

      const resultInsertUsers = await database.fnAddUserAccount(email, password)
      result.message = resultInsertUsers

      return result
    } catch (err) {
      throw err
    }
  }
}

export default business