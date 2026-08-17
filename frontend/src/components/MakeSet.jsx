/* eslint-disable react/prop-types */
import '../componentsStyle/MakeSet.css'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import services from '../services'
import renderApp from '../index'



const MakeSet = () => {
    //set's title/description
    const [title , setTitle] = useState("")
    const [description, setDescription]= useState("")

    //states for handling list of cards
    const [divCount, setDivCount] = useState(0)
    const [terms, setTerms] = useState([])
    const [defs, setDefs] = useState([])
    //visible cards
    const [cardList, setCardList] = useState([])
    const username = JSON.parse(window.localStorage.getItem('loggedUser')).data.username
    const token = JSON.parse(window.localStorage.getItem('loggedUser')).data.token

    const navigate = useNavigate()

    const logout = () => {
        window.localStorage.removeItem('loggedUser')
        renderApp(false)
        navigate('/login')

    }

    //used to enter data for adding a new card
    const NewCard = ({handleAdd, divCount, setDivCount}) => {
        const [term, setTerm] = useState("")
        const [def, setDef] = useState("")
        
        
        return (
            <>
            <div className='addNewCard'>
                <form onSubmit={(event) => {event.preventDefault(); handleAdd(term, def, divCount, setDivCount)}}>
                <h2>Add new term</h2>
                
                <input required name="term" placeholder="Term" onChange={(e) => setTerm(e.target.value)} />
                <input required name="definition" placeholder="Definition" onChange={(e) => setDef(e.target.value)}></input>
                <button>Add</button>
                </form>
            </div>
            <button className="bottomLeft" onClick={logout}>Logout</button>
            </>
        )
    }

    //used to change states upon adding a new card
    const handleAdd = (term, def, divCount, setDivCount) => {
        
        setTerms(pastTerms => [...pastTerms, {index: divCount, term: term}])
        setDefs(pastDefs => [...pastDefs, {index: divCount, def: def}])
        setCardList(pastCards => [...pastCards, {term: term, def: def, index: divCount}])
        setDivCount(divCount+1)
        

    }
    //process title, description, and all cards upon submission
    const handleSubmit = () => {
        const cards = cardList.map((card) => {return {front: card.term, back: card.def}})
        

        services.createSet(token, title, description, cards, username)
        .then(res => {console.log(res)})
        .catch(err => {console.log(err)})
        console.log("submit")
        setTitle("")
        setDescription("")
        setCardList([])
        
    }
    //remove card/card info from states
    const removeCard = (ind, cardList) => {
        console.log(cardList)
        const newCardList = cardList.filter((card) => 
            card.index != ind
        )
        const newDefs = defs.filter((def) => def.index != ind)
        const newTerms = terms.filter((term) => term.index != ind)
        setDefs(newDefs)
        setTerms(newTerms)
        setCardList(newCardList)

    }

    return <>
    <div>
        <Link to="/home"><button className="topLeft">Home</button></Link>
        <h2 id="currentUser">{username}</h2>
        <h1 className="title">Create new set</h1>
        <form className="createSet" onSubmit={(event) =>{event.preventDefault(); handleSubmit()}}>
        
            <div>
            <label htmlFor="setTitle">Set title:</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} id="setTitle" name="setTitle" placeholder="Enter Title" required/>
            </div>
            <div>
                <label htmlFor="desc">Description:</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} id="desc" name="desc" placeholder="Enter Description" required/>
            </div>

            <button id="createNew">Create set</button>
                     
        </form>
        <NewCard handleAdd={handleAdd} divCount={divCount} setDivCount={setDivCount}/>
        {
            cardList.map((elem) => {return (<div className="addedCard" key={elem.index}>
                <h3>{elem.term}</h3>
                
                <p>{elem.def}</p>
                
                <button onClick={(event) => {event.preventDefault(); removeCard(elem.index, cardList)}}>Remove</button>
                </div>)})
        }
        
        
    </div>
    </>
}
export default MakeSet