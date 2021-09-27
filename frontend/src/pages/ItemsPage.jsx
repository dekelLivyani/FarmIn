import { useDispatch, useSelector } from 'react-redux';
import { loadItems } from '../store/actions/itemActions'
import { useEffect, useState } from 'react';
import { ItemList } from '../cmps/ItemList';
import { useHistory } from 'react-router-dom';
import { SearchItemPreview } from '../cmps/SearchItemPreview';

export const ItemsPage = () => {
   const { items } = useSelector(state => state.itemModule)
   const [itemsToShow, setItemsToShow] = useState(items)
   const history = useHistory()
   const dispatch = useDispatch()

   useEffect(() => {
      let locName = history.location.pathname.split('/')
      locName = locName[locName.length - 1]
      let itemsToDisplay;
      if (locName === 'items') {
         itemsToDisplay = items;
      } else itemsToDisplay = items.filter(item => item.type === locName)
      setItemsToShow(itemsToDisplay)
      dispatch(loadItems());
   }, [history.location.pathname, items.length])

   return (
      <>
         <section className="regular-list">
            <ItemList items={itemsToShow} />
         </section>
         <section className="mobile-list">
            {itemsToShow.map(item => (
               <SearchItemPreview item={item} key={item._id} />
            ))}
         </section>
      </>
   )
}