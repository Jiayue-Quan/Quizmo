import '../componentsStyle/Cards.css'
import { Link } from "react-router-dom"
import services from '../services'

const Cards = ({name, setId, isSearch, handleDelete}) => {
    const link = `/cardset/${setId}`

    // const handleDelete = () => {
    //     services.deleteSet(token, setId).then(res => console.log(res)).catch(err => {console.log(err)})
    // }
    return (
        
        <Link to={link}><div className="stackOuter">
            <h2>{name}</h2>
            <h3>Created By:</h3>
            <button class={isSearch ? 'invisible' : ''} onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleDelete(setId)}}>Delete</button>
            
        </div></Link>
    )
}
export default Cards