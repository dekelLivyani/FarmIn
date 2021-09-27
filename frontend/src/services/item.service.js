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
      price: '',
      priceBy: 'לקילו',
      weight:'',
      weightInfo:'',
      type: 'fruits',
      info: '',
      sale: {
         onSale: false,
         salePercent: ''
      },
      img: '',

   }
}