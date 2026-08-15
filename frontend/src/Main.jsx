import './App.css'
import { Link } from "react-router-dom";

function Main() {
  


  return (
    <>
      <div id="titleScreenText">
      <h1>Quizmo</h1>
      
        <p>Learn your flashcards for <strong>FREE</strong></p>
        
      
      <Link to="/signup"><button >Get Started</button></Link>
      </div>
      
      
    </>
  )
}

export default Main
