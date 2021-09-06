const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
   query,
   getById,
   remove,
   update,
   add,
}

async function query(filterBy) {
   const criteria = _buildCriteria(filterBy);
   try {
      const collection = await dbService.getCollection('item')
      const items = await collection.find(criteria).toArray()
      return items;
   } catch (err) {
      console.log('ERROR: cannot find items')
      throw err
   }
}

async function getById(itemId) {
   try {
      itemId = ObjectId(itemId)
      const collection = await dbService.getCollection('item')
      const item = await collection.findOne({ _id: itemId })
      return item
   } catch (err) {
      console.log(`ERROR: cannot find item ${itemId}`)
      throw err
   }
}

async function remove(itemId) {
   try {
      const collection = await dbService.getCollection('item')
      return await collection.deleteOne({ _id: ObjectId(itemId) })
   } catch (err) {
      console.log(`ERROR: cannot remove item ${itemId}`)
      throw err
   }
}

async function update(item) {
   try {
      item._id = ObjectId(item._id)
      const collection = await dbService.getCollection('item')
      await collection.updateOne({ _id: item._id }, { $set: { ...item } })
      return item
   } catch (err) {
      console.log(`ERROR: cannot update item ${item._id}`)
      throw err
   }
}

async function add(item) {
   try {
      const collection = await dbService.getCollection('item')
      item.price = +item.price;
      await collection.insertOne(item)
      return item
   } catch (err) {
      console.log(`ERROR: cannot insert item`)
      throw err
   }
}

function _buildCriteria(filterBy) {
   const criteria = {}
   if (filterBy.name) {
      const txtCriteria = { $regex: filterBy.name, $options: 'i' }
      criteria.name = txtCriteria
   }
   if (filterBy.type) {
      criteria.type = filterBy.type
   }
   // if (filterBy.price) {
   //    criteria.price = { $gte: +filterBy.price }
   // }
   return criteria
}


