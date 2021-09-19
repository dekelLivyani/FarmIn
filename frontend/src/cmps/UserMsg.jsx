import { useSelector } from "react-redux"

export const UserMsg = () => {
   const { userMsg } = useSelector(state => state.userModule)
   return (
      <>
         {userMsg?.txt && <div className={'user-msg ' + userMsg.type}>
            <p>{userMsg.txt}</p>
            {userMsg.type === 'success' && <span className="material-icons-outlined">check</span>}
            {userMsg.type === 'error' && <span className="material-icons-outlined">close</span>}
         </div>}
      </>
   )
}