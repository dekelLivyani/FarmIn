import { itemService } from "../../services/item.service";

export function loadItems() {
   return async (dispatch, getState) => {
      const { filterBy } = getState().itemModule;
      try {
         const items = await itemService.query(filterBy)
         dispatch({ type: 'SET_ITEMS', items })
      } catch (err) {
         console.log('err', err)
      }
   }
}

export function setFilterBy(filterBy) {
   return (dispatch) => {
      dispatch({ type: 'SET_FILTER_BY', filterBy })
   }
}

export function getItemById(itemId) {
   return async (dispatch) => {
      try {
         const item = await itemService.getById(itemId)
         console.log('item', item)
         dispatch({ type: 'SET_ITEM', item })
      } catch (err) {
         console.log('err', err)
      }
   }
}

export function currItemToNull() {
   return async (dispatch) => {
      dispatch({ type: 'SET_ITEM', item: null })
   }
}
export function removeItem(itemId) {
   return async (dispatch) => {
      try {
         const item = await itemService.remove(itemId)
         console.log('item', item)
         dispatch({ type: 'REMOVE_ITEM', item })
      } catch (err) {
         console.log('err', err)
      }
   }
}
export function saveItem(item) {
   return (item._id) ? _updateItem(item) : _addItem(item);
}

function _addItem(item) {
   return async (dispatch) => {
      try {
         const newItem = await itemService.save(item)
         dispatch({ type: 'ADD_ITEM', item: newItem })
      } catch (err) {
         console.log('err', err)
      }
   }
}
function _updateItem(item) {
   return async (dispatch) => {
      try {
         const newItem = await itemService.save(item)
         dispatch({ type: 'UPDATE_ITEM', item: newItem })
      } catch (err) {
         console.log('err', err)
      }
   }
}