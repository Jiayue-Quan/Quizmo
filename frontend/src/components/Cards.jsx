import '../componentsStyle/Cards.css'
import { Link } from "react-router-dom"

const Cards = ({name, setId}) => {
    const link = `/cardset/${setId}`
    return (
        
        <Link to={link}><div className="stackOuter">
            <h2>{name}</h2>
            
        </div></Link>
    )
}
export default Cards