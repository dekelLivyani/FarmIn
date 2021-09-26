import facebook from '../assets/imgs/icon-facebook.svg'
import linkedin from '../assets/imgs/icon-linkedin.svg'
import orange from '../assets/imgs/orange.gif'
export const Footer = () => {

   const openMedia = (url) => {
      window.open(url, '_blank');
   }

   return (
      <footer className="full">
         <div className="content">
            <div className="left-side">
               <span className="copy-right">Copyright by Dekel Livyani Ⓒ</span>
               <div className="social-media">
                  <img className="icon-media" src={facebook}
                     onClick={() => openMedia('https://www.facebook.com/dekel.livyani/')} alt="" />
                  <img className="icon-media" src={linkedin}
                     onClick={() => openMedia('https://www.linkedin.com/in/dekel-livyani-3609b4219/')} alt="" />
               </div>
            </div>
            <div className="middle-side">
               <span> Want to get in touch? </span>
               <span> Drop me a line! </span>
               <span className="email">Dekelliv0@gmail.com</span>
            </div>
         </div>
         <div className="right-side">
            <img className="orange-gif" src={orange} alt="" />
         </div>
      </footer>
   )
}
