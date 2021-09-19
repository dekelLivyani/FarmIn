import { httpService } from './http.service'
import { utilService } from './util.service';

export const userService = {
   login,
   logout,
   signup,
   getUsers,
   getById,
   update,
   getLoggedinUser,
   getEmptyUser,
   updateCart,
   orderCart
}

// window.userService = userService
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})
// userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 100})

async function getUsers() {
   try {
      return await httpService.get(`user`)
   } catch (err) {
      console.log('err: cannot get users', err);
   }
}

async function getById(userId) {
   try {
      return await httpService.get(`user/${userId}`)
   } catch (err) {
      console.log('err: cannot get user', userId, err);
   }
}

async function update(user) {
   try {
      user = await httpService.put(`user/${user._id}`, user)
      //  Handle case in which admin updates other user's details
      if (getLoggedinUser()._id === user._id) return _saveLocalUser(user)
   } catch (err) {
      console.log('err: cannot update user', user, err);
   }
}

async function login(userCred) {
   try {
      const user = await httpService.post('auth/login', userCred)
      if (user) return _saveLocalUser(user)
   } catch (err) {
      console.log('err: cannot login', err);
   }
}
async function signup(userCred) {
   try {
      const user = await httpService.post('auth/signup', userCred)
      return _saveLocalUser(user)
   } catch (err) {
      console.log('err: cannot signup', err);
   }
}
async function logout() {
   try {
      sessionStorage.clear()
      return await httpService.post('auth/logout')
   } catch (err) {
      console.log('err: cannot logout', err);
   }
}
function _saveLocalUser(user) {
   sessionStorage.setItem('loggedinUser', JSON.stringify(user))
   return user
}

function getLoggedinUser() {
   return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}

async function updateCart(cart, item, deff = 1) {
   try {
      const user = getLoggedinUser();
      if (item) {
         let totalPrice = (item.weight > 0) ? item.price * item.weight * deff : item.price * deff
         if (item.sale.onSale) {
            if (totalPrice < 0) totalPrice = totalPrice * -1;
            totalPrice = (totalPrice - (item.sale.salePercent / 100 * totalPrice)) * deff;
         }
         user.total = (user.total + totalPrice < 0) ? 0 : +(user.total + totalPrice);
      }
      if (!cart.length) user.total = 0;
      user.cart = cart;
      return await update(user)
   } catch (err) {
      console.log('err: cannot update cart', err);
   }
}

async function orderCart(cart) {
   try {
      const user = getLoggedinUser();
      const CartToHistory = {
         id: utilService.makeId(),
         totalPrice: user.total,
         date: Date.now(),
         cart
      }
      user.historyCart.unshift(CartToHistory);
      user.total = 0;
      user.cart = [];
      return await update(user)
   } catch (err) {
      console.log('err: cannot order cart', err);
   }
}

function getEmptyUser() {
   return {
      fname: "",
      lname: "",
      username: '',
      password: '',
      email: '',
      phone: '',
      addresses: {
         city: '',
         street: '',
         number: '',
      },
      historyCart: [],
      cart: [],
      total: 0
   }
}

