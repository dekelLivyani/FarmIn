import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

export const useForm = (initialState, cb = () => { }) => {
   const { loggedInUser } = useSelector(state => state.userModule)
   const history = useHistory()

   const [fields, setFields] = useState(initialState)
   useEffect(() => {
      cb(fields)
      // eslint-disable-next-line
   }, [fields])

   const handleChange = (ev) => {
      let el;
      el = (ev.target) ? ev.target : (ev.current.refs) ? ev.current.refs.input : ev.current;
      var { name } = el;
      var value = el.type === 'number' ? +el.value : el.value
      if (name === 'city' || name === 'street' || name === 'number') {
         const addresses = JSON.parse(JSON.stringify(fields.addresses));
         addresses[name] = value;
         setFields(prevFields => ({ ...prevFields, addresses }))
      } else if (name === 'onSale' || name === 'salePercent') {
         const sale = JSON.parse(JSON.stringify(fields.sale));
         sale[name] = (name === 'onSale') ? !sale[name] : JSON.parse(value)
         setFields(prevFields => ({ ...prevFields, sale }))
      } else {
         setFields(prevFields => ({ ...prevFields, [name]: value }))
      }
   }

   const handleValidation = () => {
      let errors = {};
      let formIsValid = true;

      //signup
      if (history.location.pathname === '/user/profile/details' ||
         history.location.pathname === '/signup') {
         //fName
         if (typeof fields["fname"] !== "undefined") {
            if (!fields["fname"].match(/^[a-zA-Zא-ת]+$/)) {
               formIsValid = false;
               errors["fname"] = "רק אותיות";
            }
         }
         if (!fields["fname"]) {
            formIsValid = false;
            errors["fname"] = "שדה חובה";
         }

         //lName
         if (typeof fields["lname"] !== "undefined") {
            if (!fields["lname"].match(/^[a-zA-Zא-ת]+$/)) {
               formIsValid = false;
               errors["lname"] = "רק אותיות";
            }
         }
         if (!fields["lname"]) {
            formIsValid = false;
            errors["lname"] = "שדה חובה";
         }

         //username
         if (fields["username"]?.length < 4) {
            formIsValid = false;
            errors["username"] = "מינימום 4 תווים";
         }
         if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "שדה חובה";
         }

         //password
         if (!loggedInUser) {
            if (fields["password"]?.length < 4) {
               formIsValid = false;
               errors["password"] = "מינימום 4 תווים";
            }
            if (!fields["password"]) {
               formIsValid = false;
               errors["password"] = "שדה חובה";
            }
         }
         //checkPassword
         if (fields["password"] && fields["checkPassword"]) {
            if (fields["password"] !== fields["checkPassword"]) {
               formIsValid = false;
               errors["checkPassword"] = "סיסמאות לא זהות";
            }
         }
         if (!loggedInUser) {
            if (!fields["checkPassword"]) {
               formIsValid = false;
               errors["checkPassword"] = "שדה חובה";
            }
         }

         //Email
         if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf("@");
            let lastDotPos = fields["email"].lastIndexOf(".");
            if (
               !(
                  lastAtPos < lastDotPos &&
                  lastAtPos > 0 &&
                  fields["email"].indexOf("@@") == -1 &&
                  lastDotPos > 2 &&
                  fields["email"].length - lastDotPos > 2
               )
            ) {
               formIsValid = false;
               errors["email"] = "אימייל לא תקין";
            }
         }
         if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "שדה חובה";
         }

         //phone
         if (typeof fields["phone"] !== "undefined") {
            if (!fields["phone"].match(/^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$/)) {
               formIsValid = false;
               errors["phone"] = "טלפון לא תקין";
            }
         }
         if (!fields["phone"]) {
            formIsValid = false;
            errors["phone"] = "שדה חובה";
         }

         //addresses
         if (fields["addresses"]) {
            //city
            if (!fields["addresses"]["city"]) {
               formIsValid = false;
               errors["city"] = "שדה חובה";
            }

            //street
            if (!fields["addresses"]["street"]) {
               formIsValid = false;
               errors["street"] = "שדה חובה";
            }

            //number
            if (!fields["addresses"]["number"]) {
               formIsValid = false;
               errors["number"] = "שדה חובה";
            }
         }
         console.log('user');
      }
      //item-edit
      else if (history.location.pathname.includes('/items/edit')) {
         //name
         if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "שדה חובה";
         }

         //price
         if (!fields["price"]) {
            formIsValid = false;
            errors["price"] = "שדה חובה";
         }

         //priceBy
         if (!fields["priceBy"]) {
            formIsValid = false;
            errors["priceBy"] = "שדה חובה";
         }

         //type
         if (!fields["type"]) {
            formIsValid = false;
            errors["type"] = "שדה חובה";
         }

         //info
         if (fields["info"]?.length < 10) {
            formIsValid = false;
            errors["info"] = "מינימום 10 אותיות";
         }
         if (!fields["info"]) {
            formIsValid = false;
            errors["info"] = "שדה חובה";
         }

         //img
         if (!fields["img"]) {
            formIsValid = false;
            errors["img"] = "שדה חובה";
         }
      }
      return { formIsValid, errors };
   }


   return [
      fields,
      handleChange,
      setFields,
      handleValidation
   ]
}