
import database from './database.js'
import valid from '../../helper/validator.js'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const business = {
  fnGetProducts: async function (req, res) {
    try {
      const products = await database.fnSelectProducts()
      
      const result = { data: products }
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export default business