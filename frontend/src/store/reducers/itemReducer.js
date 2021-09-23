const INITIAL_STATE = {
   items: [],
   currItem: null,
   filterBy: {
      name:''
   }
}
export function itemReducer(state = INITIAL_STATE, action) {
   switch (action.type) {
      case 'SET_ITEMS':
         return {
            ...state,
            items: action.items
         }
      case 'SET_ITEM':
         return {
            ...state,
            currItem: action.item
         }
      case 'SET_FILTER_BY':
         return {
            ...state,
            filterBy: action.filterBy
         }
      case 'ADD_ITEM':
         return {
            ...state,
            items: [...state.items, action.item]
         }
      case 'REMOVE_ITEM':
         return {
            ...state,
            items: state.items.filter(item => item._id !== action.itemId)
         }
      case 'UPDATE_ITEM':
         return {
            ...state,
            items: state.items.map(item =>
               (item._id === action.item._id) ? action.item : item)
         }
      default:
         return state
   }
}