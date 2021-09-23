import { userService } from "../../services/user.service";

export function getUserById(userId) {
   return async (dispatch) => {
      try {
         const user = await userService.getUserById(userId)
         return user;
      } catch (err) {
         console.log('err', err)
      }
   }
}
export function login(user) {
   return async (dispatch) => {
      try {
         const loggedInUser = await userService.login(user)
         dispatch({ type: 'LOGIN', loggedInUser })
      } catch (err) {
         console.log('err', err)
      }
   }
}
export function logout() {
   return async (dispatch) => {
      try {
         await userService.logout()
         dispatch({ type: 'LOGOUT' })
      } catch (err) {
         console.log('err', err)
      }
   }
}

export function signup(user) {
   return async (dispatch) => {
      try {
         const newUser = await userService.signup(user)
         dispatch({ type: 'SIGNUP', user: newUser })
         dispatch({ type: 'LOGIN', loggedInUser: newUser })
      } catch (err) {
         console.log('err', err)
      }
   }
}
export function updateCart(cart, item, deff) {
   return async (dispatch) => {
      try {
         const newUser = await userService.updateCart(cart, item, deff)
         dispatch({ type: 'UPDATE_USER', user: newUser })
      } catch (err) {
         console.log('err', err)
      }
   }
}

export function orderCart(cart) {
   return async (dispatch) => {
      try {
         const newUser = await userService.orderCart(cart)
         dispatch({ type: 'UPDATE_USER', user: newUser })
      } catch (err) {
         console.log('err', err)
      }
   }
}

export function update(user) {
   return async (dispatch) => {
      try {
         const newUser = await userService.update(user)
         dispatch({ type: 'UPDATE_USER', user: newUser })
      } catch (err) {
         console.log('err', err)
      }
   }
}

export function signupAsGuest() {
   return async (dispatch) => {
      try {
         const guestName = "guest" + Date.now() % 1000;
         const user = {
            fname: guestName,
            lname: guestName,
            username: guestName,
            password: 123123,
            email: `${guestName}@gmail.com`,
            phone: 0,
            addresses: {
               city: '',
               street: '',
               number: 0,
            },
            historyCart: [],
            cart: [],
            total: 0
         }
         const newUser = await userService.signup(user)
         dispatch({ type: 'SIGNUP', user: newUser })
         dispatch({ type: 'LOGIN', loggedInUser: newUser })
      } catch (err) {
         console.log('err', err)
      }
   }
}

var setTimeId;
export function setUserMsg(userMsg) {
   return async (dispatch) => {
      try {
         if (setTimeId) clearTimeout(setTimeId);
         dispatch({ type: 'SET_USERMSG', userMsg })
         const msg = {
            txt: '',
            type: ''
         }
         setTimeId = setTimeout(() => {
            dispatch({ type: 'SET_USERMSG', userMsg: msg })
            clearTimeout(setTimeId)
         }, 2500)
      } catch (err) {
         console.log('err', err)
      }
   }
}