import { SearchItemPreview } from "./SearchItemPreview"

export const SearchItemList = ({ styles, items }) => {
   return (
      <section style={{ 'left': styles?.left }}
         className="search-item-list" >
         {items.map(item => (
            <SearchItemPreview item={item} key={item._id} />
         ))}
      </section >
   )
}