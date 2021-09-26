import { SearchItemPreview } from "./SearchItemPreview"

export const SearchItemList = ({ items }) => {
   return (
      <section className="search-item-list" >
         {items.map(item => (
            <SearchItemPreview item={item} key={item._id} />
         ))}
      </section >
   )
}