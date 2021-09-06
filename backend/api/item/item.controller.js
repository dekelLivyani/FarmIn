const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const itemService = require('./item.service')

async function getItems(req, res) {
   try {
      const items = await itemService.query(req.query)
      //  const items = await itemService.query()
      //  console.log('items', items)
      res.send(items)
   } catch (err) {
      logger.error('Cannot get items', err)
      res.status(500).send({ err: 'Failed to get items' })
   }
}
async function getItem(req, res) {
   try {
      const item = await itemService.getById(req.params.id)
      res.send(item)
   } catch (err) {
      logger.error('Cannot get item', err)
      res.status(500).send({ err: 'Failed to get item' })
   }
}

async function deleteItem(req, res) {
   try {
      await itemService.remove(req.params.id)
      res.send({ msg: 'Deleted successfully' })
   } catch (err) {
      logger.error('Failed to delete item', err)
      res.status(500).send({ err: 'Failed to delete item' })
   }
}

async function updateItem(req, res) {
   try {
      const item = req.body;
      const savedItem = await itemService.update(item)
      res.send(savedItem)
   } catch (err) {
      logger.error('Failed to update item', err)
      res.status(500).send({ err: 'Failed to update item' })
   }
}


async function addItem(req, res) {
   try {
      var item = req.body
      //   item.byUserId = req.session.user._id
      item = await itemService.add(item)

      // prepare the updated item for sending out
      //   var user = await userService.getById(item.byUserId)
      //   item.aboutUser = await userService.getById(item.aboutUserId)

      // Give the user credit for adding a item
      //   const fullUser = await userService.getById(user._id)

      //   console.log('CTRL SessionId:', req.sessionID);
      //   socketService.broadcast({type: 'item-added', data: item, userId: item.byUserId})
      //   socketService.emitToUser({type: 'item-about-you', data: item, userId: item.aboutUserId})
      //   socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

      res.send(item)

   } catch (err) {
      console.log(err)
      logger.error('Failed to add item', err)
      res.status(500).send({ err: 'Failed to add item' })
   }
}

module.exports = {
   getItems,
   getItem,
   deleteItem,
   updateItem,
   addItem
}