import { useEffect, useRef, useState } from "react"
import { useForm } from "../hooks/useForm"
import { itemService } from "../services/item.service"
import { uploadImg } from "../services/img-upload.service"
import imgUpload from '../assets/imgs/upload.png'
import loading from '../assets/imgs/loading.gif'
import { useDispatch, useSelector } from "react-redux"
import { saveItem } from "../store/actions/itemActions"
import { useHistory, useParams } from "react-router-dom"
import { setUserMsg } from "../store/actions/userActions"
import { Input, Switch } from 'element-react';

export const EditItem = () => {
   const history = useHistory();
   const params = useParams();
   const initialState = itemService.getEmptyItem();
   const [item, handleChange, setItem] = useForm(initialState)
   const { loggedInUser } = useSelector(state => state.userModule)
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false)
   const imgUrl = useRef(null)

   const name = useRef()
   const price = useRef()
   const weight = useRef()
   const info = useRef()
   const onSale = useRef()
   const salePercent = useRef()

   useEffect(() => {
      if (!loggedInUser.isAdmin) history.push('/');
      const loadItem = async () => {
         try {
            const { id } = params
            const itemToEdit = (id) ? await itemService.getById(id) : itemService.getEmptyItem();
            setItem(itemToEdit)
         } catch (err) {
            console.log('err cannot load item', err)
         }
      }
      loadItem()
   }, [])
   const onSaveItem = async (ev) => {
      ev.preventDefault()
      let msg = {};
      try {
         await dispatch(saveItem(item))
         msg = {
            txt: "item was successfully saved",
            type: "success",
         };
         history.goBack()
      } catch (err) {
         msg = {
            txt: "Fail save item, try again later",
            type: "error",
         };
      } finally {
         await dispatch(setUserMsg(msg))
      }
   }

   const removeImg = () => {
      const newItem = JSON.parse(JSON.stringify(item));
      console.log(newItem);
      newItem.img = '';
      setItem(newItem)
   }

   const onUploadImg = async (ev) => {
      ev.preventDefault()
      setIsLoading(true)
      let res;
      const newItem = JSON.parse(JSON.stringify(item));
      if (ev.target.name === 'img-upload') {
         res = await uploadImg(ev)
         newItem.img = res.url;
      } else {
         res = imgUrl.current.value
         newItem.img = res;
      }
      try {
         setItem(newItem)
      } catch (err) {
         console.log('err: cannot upload image', err)
      } finally {
         setIsLoading(false)
      }
   }

   if (!item) return <section>Loading...</section>
   return (
      <section className="edit-page">
         <section className="actions">
            <span onClick={history.goBack} className="simple-button back">
               <span className="material-icons-outlined">arrow_back</span>
            </span>
         </section>
         <form className="form-edit simple-form" onSubmit={onSaveItem}>
            <label>
               <span>שם:</span>
               <Input type="text" value={item.name} ref={name}
                  onChange={() => { handleChange(name) }} name="name" placeholder="Name..." />
            </label>
            <label>
               <span>מחיר:</span>
               <Input type="number" value={item.price} ref={price}
                  onChange={() => { handleChange(price) }} name="price" placeholder="Price..." />
            </label>
            <label>
               <span>מחיר לפי:</span>
               <select name="priceBy" onChange={handleChange} value={item.priceBy}>
                  <option value="ליחידה">ליחידה</option>
                  <option value="למארז">למארז</option>
                  <option value="לקילו">לקילו</option>
               </select>
            </label>
            <label>
               <span>משקל:</span>
               <Input type="number" value={item.weight} ref={weight}
                  onChange={() => { handleChange(weight) }} name="weight" placeholder="Weight..." />
            </label>
            <label>
               <span>סוג:</span>
               <select name="type" onChange={handleChange} value={item.type}>
                  <option value="fruits">פירות</option>
                  <option value="vegetables">ירקות</option>
               </select>
            </label>
            <label>
               <span>תוכן:</span>
               <Input type="text" value={item.info} ref={info}
                  onChange={() => { handleChange(info) }} name="info" placeholder="Info..." />
            </label>
            <div className="sale">
               <label htmlFor="sale">הנחה:</label>
               <Switch onText="" offText="" name="onSale" ref={onSale}
                  value={item.sale.onSale} onChange={() => { handleChange(onSale) }}>
               </Switch>
               {item.sale.onSale &&
                  <label>אחוז: &nbsp;&nbsp;
                     <Input type="number" value={item.sale.salePercent} ref={salePercent}
                        onChange={() => { handleChange(salePercent) }} name="salePercent" placeholder="Percent..." />
                  </label>
               }
            </div>
            <div className="img-container">

               <span>תמונה: </span>
               {!isLoading && !item.img &&
                  <> <label htmlFor="upload-img">
                     <img className="img-upload" src={imgUpload} alt="" name="img-upload" />
                     <input className="Input-file" type="file" id="upload-img" onChange={onUploadImg}
                        accept="image/png, image/gif, image/jpeg" hidden />
                  </label>
                     <Input type="text" placeholder="URL" ref={imgUrl} />
                     <button className="add-by-url" onClick={onUploadImg}>הוסף</button>
                  </>
               }
               {isLoading && <img className="img-loading" src={loading} alt="" />}

               {item.img &&
                  <div className="res-img-container">
                     <img className="res-img" src={item.img} alt="" />
                     <span className="material-icons-outlined remove-img"
                        onClick={removeImg}>close</span>
                  </div>
               }
            </div>
            <button>שמור</button>
         </form>
      </section>
   )
}