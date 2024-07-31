
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
  },
  fnGetProductById: async function (req, res) {
    try {
      const { product_id } = req.body
      const product = await database.fnSelectProductById(product_id)
      
      const result = { data: product }
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  fnAddtoCart: async function (req, res) {
    try {
      const result = {}
      const { user_id, product_id } = req.body

      if (user_id && product_id) {
        const response = await database.fnGetMyCart(user_id, product_id)
        if (response && response.length > 0) { /* row exists then update */
          const { id: cart_id, quantity } = response[0]
          await database.fnUpdateMyCard(cart_id, user_id, product_id, quantity)
        } else { /* row not exist then insert */
          await database.fnInsertMyCard(user_id, product_id)
        }
        result.message = 'add to cart already!'
      } else {
        result.message = 'user_id, product_id, quantity can not be empty!'
      }
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  fnGetCartByUserId: async function (req, res) {
    try {
      const result = {}
      const { user_id } = req.body

      if (user_id) {
        result.data = await database.fnGetCartByUserId(user_id)
      } else {
        result.message = 'user_id can not be empty!'
      }
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export default business