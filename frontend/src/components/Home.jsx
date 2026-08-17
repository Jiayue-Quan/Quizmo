import '../App.css'
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import renderApp from '../index'
import Cards from './Cards.jsx'
import services from '../services.js'

//user home page
function Home() {
    const navigate = useNavigate()
    const username = JSON.parse(window.localStorage.getItem('loggedUser')).data.username
    const token = JSON.parse(window.localStorage.getItem('loggedUser')).data.token

    //sets shown on-screen
    const [shown, setShown] = useState(null)
    const [filtered, setFiltered] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        navigate('/home')
        
        services.getSets(token).then(res => setShown(res.data))
        .catch(err => console.log(err))
        
    }, [])
    
    //logout, go to login page
    const logout = () => {
        window.localStorage.removeItem('loggedUser')
        renderApp(false)
        navigate('/login')

    }
    const search = (text) => {
        services.searchSet(text).then(res => setFiltered(res.data))
        .catch(err => console.log(err))
    }
    if (shown == null)
    {
        return null;
    }
    return (
        <>
        
        <button className="bottomLeft" onClick={logout}>Logout</button>
        
        <div className="top">
            
            <h1 className="title">Home</h1>
        </div>
        
        <h2 id="currentUser">{username}</h2>
        
        <Link to="/makeset"><button>New Set</button></Link>
        
        <h2>Your sets:</h2>
        <div className="stacks">
        {
            shown.map(set => {
                return <Cards key={set.id} name={set.title} setId={set.id} isSearch={false}/>
            })
        }
        
        </div>
        
        <h2>Search sets:</h2>
        <form id="search" onSubmit={(event) => {event.preventDefault(); search(searchText)}}
        >
        <input placeholder="Enter Set Title" onChange={(e) => setSearchText(e.target.value)}/>
        <button>Search</button>
        </form>
        <div className="stacks">
        {
            filtered.map(set => {
                return <Cards key={set.id} name={set.title} setId={set.id} isSearch={true}/>
            })
        }
        </div>
        </>
    )

}

export default Home