import '../componentsStyle/Cards.css'
import { Link } from "react-router-dom"
import services from '../services'

const Cards = ({set, isSearch, handleDelete}) => {
    const link = `/cardset/${set.id}`
    console.log(set)

    return (
        
        <Link to={link}><div className="stackOuter">
            <h2>{set.title}</h2>
            <h3 class={isSearch ? '' : 'invisible'}>Created By: {set.user.username}</h3>
            <button class={isSearch ? 'invisible' : ''} onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleDelete(set.id)}}>Delete</button>
            
        </div></Link>
    )
}
export default Cards
