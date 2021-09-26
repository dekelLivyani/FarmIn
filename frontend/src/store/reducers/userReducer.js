import { userService } from "../../services/user.service";
const INITIAL_STATE = {
   users: [],
   loggedInUser: userService.getLoggedinUser(),
   userMsg: { txt: '', type: '' }
}
export function userReducer(state = INITIAL_STATE, action) {
   switch (action.type) {
      case 'SIGNUP':
         return {
            ...state,
            users: [...state.users, action.user]
         }
      case 'LOGIN':
         return {
            ...state,
            loggedInUser: action.loggedInUser
         }
      case 'LOGOUT':
         return {
            ...state,
            loggedInUser: null
         }
      case 'UPDATE_USER':
         return {
            ...state,
            users: state.users.map(user => user._id === action.user._id ? action.user : user),
            loggedInUser: action.user
         }
      case 'SET_USERMSG':
         return {
            ...state,
            userMsg: action.userMsg
         }
      default:
         return state
   }
}