import { httpService } from './http.service';

const API = 'http://localhost:3030/api/item'

export const itemService = {
   query,
   save,
   getById,
   remove,
   getEmptyItem
}


function query(filterBy) {
   return httpService.get('item', filterBy)
}

function getById(id) {
   return httpService.get(`item/${id}`)
}

function remove(id) {
   return httpService.delete(`item/${id}`)
}

function save(item) {
   if (item._id) return httpService.put('item', item)
   else return httpService.post('item', item)
}



function getEmptyItem() {
   return {
      name: '',
      price: 0,
      priceBy: 'ליחידה',
      weight:'',
      type: 'fruits',
      info: '',
      sale: {
         onSale: false,
         salePercent: 0
      },
      img: '',

   }
}

const item1 = {
   name: 'אבטיח',
   price: 20,
   priceBy: 'ליח\'',
   weight:'כ-15 ק"ג ממוצע',
   type: 'fruits',
   info: '',
   sale: {
      onSale: false,
      salePercent: 10
   }

}