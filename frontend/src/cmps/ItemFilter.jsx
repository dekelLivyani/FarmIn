import { useForm } from "../hooks/useForm"

export const ItemFilter = ({ onChangeFilter }) => {
   const [filterBy, handleChange] = useForm({ term: '' }, onChangeFilter)

   return (
      <input className="filter" type="text" name="term" value={filterBy.term}
      placeholder="חיפוש" onChange={handleChange} />
   )
}