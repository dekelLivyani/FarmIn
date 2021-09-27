import { useEffect, useRef, useState } from "react"
import { useForm } from "../hooks/useForm"
import { itemService } from "../services/item.service"
import { uploadImg } from "../services/img-upload.service"
import imgUpload from '../assets/imgs/upload.png'
import loading from '../assets/imgs/loading1.gif'
import { useDispatch, useSelector } from "react-redux"
import { saveItem } from "../store/actions/itemActions"
import { useHistory, useParams } from "react-router-dom"
import { setUserMsg } from "../store/actions/userActions"
import { Input, Switch } from 'element-react';

export const EditItem = () => {
   const history = useHistory();
   const params = useParams();
   const initialState = itemService.getEmptyItem();
   const [item, handleChange, setItem, handleValidation] = useForm(initialState)
   const { loggedInUser } = useSelector(state => state.userModule)
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false)
   const [errors, setErrors] = useState({})

   const name = useRef()
   const price = useRef()
   const weight = useRef()
   const weightInfo = useRef()
   const info = useRef()
   const onSale = useRef()
   const salePercent = useRef()
   const imgUrl = useRef(null)

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
      const { formIsValid, errors: errorsMap } = handleValidation()
      setErrors(errorsMap);
      console.log('formIsValid', formIsValid)
      console.log('errors', errors)
      ev.preventDefault()
      let msg = {};
      try {
         if (formIsValid) {
            await dispatch(saveItem(item))
            msg = {
               txt: "item was successfully saved",
               type: "success",
            };
            history.goBack()
         }
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
         res = imgUrl.current.refs.input.value
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
      <form className="form-edit simple-form" onSubmit={onSaveItem}>
         <section className="actions">
            <span onClick={history.goBack} className="simple-button back">
               <span className="material-icons-outlined">arrow_back</span>
            </span>
         </section>
         <section className="part1">
            <label>
               <section>
                  <span><span className="valid">* </span> שם:</span>
                  <span className="valid"> {errors["name"]}</span>
               </section>
               <Input type="text" value={item.name} ref={name}
                  onChange={() => { handleChange(name) }} name="name" />
            </label>
            <label>
               <section>
                  <span><span className="valid">* </span> מחיר:</span>
                  <span className="valid"> {errors["price"]}</span>
               </section>
               <Input type="number" value={item.price} ref={price}
                  onChange={() => { handleChange(price) }} name="price" />
            </label>

            <section className="priceBy-container double-in-line">
               <label>
                  <section>
                     <span><span className="valid">* </span> מחיר לפי:</span>
                     <span className="valid"> {errors["priceBy"]}</span>
                  </section>
                  <select name="priceBy" onChange={handleChange} value={item.priceBy}>
                     <option value="לקילו">לקילו</option>
                     <option value="ליחידה">ליחידה</option>
                     <option value="למארז">למארז</option>
                  </select>
               </label>
               {item.priceBy === 'לקילו' && <section>
                  <label>
                     <span> משקל לחישוב:</span>
                     <section className="flex a-center gap5">
                        <Input type="number" value={item.weight} ref={weight}
                           onChange={() => { handleChange(weight) }} name="weight" />
                        <span>ק"ג</span>
                     </section>
                  </label>
               </section>}
            </section>

            <label>
               <section>
                  <span>הערה למשקל</span>
               </section>
               <Input type="text" value={item.weightInfo} ref={weightInfo}
                  placeholder={`לדוגמה: כ - 5 ק"ג בממוצע`}
                  onChange={() => { handleChange(weightInfo) }} name="weightInfo" />
            </label>

            <div className="sale">
               <label htmlFor="sale">הנחה:</label>
               <Switch onText="" offText="" name="onSale" ref={onSale}
                  value={item.sale.onSale} onChange={() => { handleChange(onSale) }}>
               </Switch>
               {item.sale.onSale &&
                  <label className="sale-container" >
                     <span className="percent"> אחוז: &nbsp;&nbsp; </span>
                     <Input type="number" value={item.sale.salePercent} ref={salePercent}
                        onChange={() => { handleChange(salePercent) }} name="salePercent" />
                  </label>
               }
            </div>

            <label>
               <section>
                  <span><span className="valid">* </span> סוג:</span>
                  <span className="valid"> {errors["type"]}</span>
               </section>
               <select name="type" onChange={handleChange} value={item.type}>
                  <option value="delis">מעדניה</option>
                  <option value="fruits">פירות</option>
                  <option value="vegetables">ירקות</option>
               </select>
            </label>
         </section>

         <section className="part2">
            <label className="flex column">
               <section>
                  <span><span className="valid">* </span> תוכן:</span>
                  <span className="valid"> {errors["info"]}</span>
               </section>
               <textarea name="info" className="info" cols="30" rows="10" ref={info}
                  value={item.info} onChange={() => { handleChange(info) }}>
               </textarea>
            </label>

            <div className="flex column gap10">
               <label htmlFor="img-url">
                  <section>
                     <span><span className="valid">* </span> תמונה: </span>
                     <span className="valid"> {errors["img"]}</span>
                  </section>
               </label>
               {!isLoading && !item.img &&
                  <section className="img-container">
                     <label htmlFor="img-upload">
                        <img className="img-upload" src={imgUpload} alt="" name="img-upload" />
                        <input className="Input-file" type="file" name="img-upload" id="img-upload" onChange={onUploadImg}
                           accept="image/png, image/gif, image/jpeg" hidden />
                     </label>
                     <Input type="text" placeholder="URL" id="img-url" ref={imgUrl} />
                     <button className="add-by-url" onClick={onUploadImg}>הוסף</button>
                  </section>
               }
               {isLoading && <img className="img-loading" src={loading} alt="" />}

               {item.img &&
                  <div className="res-img-container">
                     <img className="res-img" src={item.img} alt="" name="img" />
                     <span className="material-icons-outlined remove-img"
                        onClick={removeImg}>close</span>
                  </div>
               }
            </div>
            <button className="save-item-btn">שמור</button>
         </section>
      </form>
   )
}