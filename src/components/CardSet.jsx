import '../componentsStyle/Card.css'
import services from '../services'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import renderApp from '../index'




let index = 0;
function CardSet() {

    const {setId} = useParams();
    const navigate = useNavigate()
    const [cards, setCards] = useState([])
    const token = JSON.parse(window.localStorage.getItem('loggedUser')).data.token
    const username = JSON.parse(window.localStorage.getItem('loggedUser')).data.username
    

    const [front, setFront] = useState('')
    const [back, setBack] = useState('')
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    useEffect(() => {
        
        services.getSet(token, setId).then(res => {
            const processedSet = res.data.cards
            console.log(processedSet)
            
            setCards(processedSet)
            setFront(processedSet[0].front)
            setBack(processedSet[0].back)
            setTitle(res.data.title)
            setDesc(res.data.description)
        })
        .catch(err => console.log(err))
        
        
    }, [])


    const [activeness, setActiveness] = useState('not')
    

    const logout = () => {
        window.localStorage.removeItem('loggedUser')
        renderApp(false)
        navigate('/login')

    }
    
if (title == null)
    {
        return null;
    }
    return (
        <>
        
        <Link to="/home"><button className="topLeft">Home</button></Link>
        <h1>{title}</h1>
        <h2 id="currentUser">{username}</h2>
        
        <div className="cardContainer">
            <div className="card" onClick={() => { //toggle activeness (css rotation)
                setActiveness(activeness == 'active' ? 'not' : 'active')
                }}  id={activeness}>
                <div  className="front">{front}</div>
                <div className="back">{back}</div>
            </div>
        </div>
        <div className="travelButtons">
            <br/>
            <button onClick={() => {
                index--;
                //travel through all cards, reset if reach ends
                if (index >= 0)
                {
                    
                    setFront(cards[index].front)
                    setBack(cards[index].back)
                }
                else {
                    index = cards.length-1   ;
                    setFront(cards[index].front)
                    setBack(cards[index].back)
                }
                
                
            }}>Back</button>
            <button onClick={() => {
                index++;
                if (index < cards.length)
                {
                    
                    setFront(cards[index].front)
                    setBack(cards[index].back)
                }
                else {
                    index = 0;
                    setFront(cards[index].front)
                    setBack(cards[index].back)
                }
                
                
            }}>Next</button>
        <h1>Description</h1>
        <h2>{desc}</h2>
        </div>
        <button className="bottomLeft" onClick={logout}>Logout</button>
        </>

    )
}
export default CardSet