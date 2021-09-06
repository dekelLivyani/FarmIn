import { Link } from "react-router-dom"

export const Home = () => {
   return (
      <section className="home-page">
         <Link to="/items/edit">Add Item</Link>
      </section>
   )
}