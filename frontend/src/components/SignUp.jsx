import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import '../componentsStyle/SignUp.css'
import services from '../services'


function SignUp() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [user, setUser] = useState()
    const [taken, setTaken] = useState("notTaken")
    const [showPass, setShowPass] = useState(false)

    const navigate = useNavigate()

    //process signup form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        //send credentials to backend, then navigate to login page
        services.signup(email, password, user)
        .then(result => {console.log(result)
        navigate('/login')
        })
        .catch(err => {
            
                console.log("error oh ono")
            if (err.response.data == "Duplicate Username")
            {
                setTaken("taken")
                console.log(err.response)
            }
            
        
        })
    }

    return (
        <div className="loginBody">
            <Link to="/"><button className="topLeft">Back</button></Link>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit} class="loginForm">
            <label htmlFor="email">
                <strong>Email</strong>
            </label>
            <input required id="email" name="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="password">
                <strong>Password</strong>
            </label>
            <input required type={showPass ? "text" : "password"} id="password" name="password" placeholder="Create New Password" onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor="user">
                <strong>Username</strong>
            </label>
            <input required id="user" name="user" placeholder="Create Username" onChange={(e) => {setUser(e.target.value); setTaken("notTaken")}}/>
            <p id={taken} >Username taken</p>
            <br/>
            <button type="submit" className="submitButton">Sign up</button>
            </form>

            <div className="checkOther">
            <label>Have an account?</label>
            <Link to="/login"><button>Login</button></Link>
            </div>
        </div>
    )
}

export default SignUp