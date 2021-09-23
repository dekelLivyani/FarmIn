import { useEffect, useState } from 'react'

export const useForm = (initialState, cb = () => { }) => {
   const [fields, setFields] = useState(initialState)
   useEffect(() => {
      cb(fields)
      // eslint-disable-next-line
   }, [fields])

   const handleChange = (ev) => {
      let el;
      el = (ev.target) ? ev.target : ev.current.refs.input;
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
      } else setFields(prevFields => ({ ...prevFields, [name]: value }))
   }

   return [
      fields,
      handleChange,
      setFields
   ]
}