import { useEffect, useState } from 'react'

export const useForm = (initialState, cb = () => { }) => {
   const [fields, setFields] = useState(initialState)
   useEffect(() => {
      cb(fields)
      // eslint-disable-next-line
   }, [fields])

   const handleChange = ({ target }) => {
      var name = target.name
      var value = target.type === 'number' ? +target.value : target.value
      if (target.name === 'city' || target.name === 'street' || target.name === 'number') {
         const addresses = JSON.parse(JSON.stringify(fields.addresses));
         addresses[name] = value;
         setFields(prevFields => ({ ...prevFields, addresses }))
      } else if (target.name === 'onSale' || target.name === 'salePercent') {
         const sale = JSON.parse(JSON.stringify(fields.sale));
         sale[name] = (target.name === 'onSale')? !sale[name] : JSON.parse(value)

         setFields(prevFields => ({ ...prevFields, sale }))
      } else setFields(prevFields => ({ ...prevFields, [name]: value }))

   }

   return [
      fields,
      handleChange,
      setFields
   ]
}