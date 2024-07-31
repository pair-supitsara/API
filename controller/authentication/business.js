
import database from './database.js'
import valid from '../../helper/validator.js'
import jwt from 'jsonwebtoken'

const business = {
  fnLogin: async function (req, res) {
    try {
      const { email, password } = req.body
      const result = {}
      
      // check if data is null or undefined or empty-string, throw error
      if (!email || !password) {
        result.message = `Please fill out the form`
        return result
      }
      
      // find salt if salt is undefined becase of wrong email or you have to register before logging in
      const rsuser = await database.fnFindUserByEmail(email)
      console.log(rsuser)
      let salt, permission
      if (rsuser.length > 0 ) {
        salt = rsuser[0].salt
        permission =  rsuser[0].permission
        
        // check email and password are correct
        const resultUser = await database.fnCheckEmailAndHashPassword(email, password, salt)
        let userid
        if (resultUser.length > 0) {
          userid = resultUser[0].user_id
          // create token
          const payload = { userid, permission }
          const option = { expiresIn: '60000ms' }
          var token = jwt.sign(payload, process.env.PRIVATE_KEY, option);
          if (!token) {
            result.message = 'fail while creating json web token'
          } else {
            result.message = 'Login successfully'
            result.token = token
            result.permission = permission
            result.user_id = userid
          }
        } else {
          result.message = 'wrong password'
        }
      } else {
        result.message = 'enter correct email!'
      }
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  fnRegister: async function (req, res) {
    try {
      const result = {}
      const { email, password } = req.body

      if (!email || !password) {
        result.message = `Please fill out the form`
        return result
      }

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