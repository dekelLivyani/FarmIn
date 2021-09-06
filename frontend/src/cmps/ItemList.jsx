import { ItemPreview } from "./ItemPreview"

export const ItemList = ({ items }) => {
   return (
      <section className="item-list simple-cards-grid">
         {items.map(item => (
            <ItemPreview item={item} key={item._id}/>
         ))}
      </section>
   )
}