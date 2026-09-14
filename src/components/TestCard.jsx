import '../componentsStyle/Card.css'
import { useState } from 'react'
import { Link } from "react-router-dom"

const temp = [
    {
        "front": "1",
        "back": "2"
    },
    {
        "front": "3",
        "back": "4"
    },
    {
        "front": "5",
        "back": "6"
    },
    {
        "front": "7",
        "back": "8"
    },
    {
        "front": "9",
        "back": "0"
    },
]
let index = 0;
function TestCard() {
    
    
    
    
    const [activeness, setActiveness] = useState('not')
    const [front, setFront] = useState(temp[index].front)
    const [back, setBack] = useState(temp[index].back)
    
    return (
        <>
        
        <Link to="/home"><button className="topLeft">Home</button></Link>
        
        
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
                    
                    setFront(temp[index].front)
                    setBack(temp[index].back)
                }
                else {
                    index = temp.length-1   ;
                    setFront(temp[index].front)
                    setBack(temp[index].back)
                }
                
                
            }}>Back</button>
            <button onClick={() => {
                index++;
                if (index < temp.length)
                {
                    
                    setFront(temp[index].front)
                    setBack(temp[index].back)
                }
                else {
                    index = 0;
                    setFront(temp[index].front)
                    setBack(temp[index].back)
                }
                
                
            }}>Next</button>
        </div>
        </>

    )
}
export default TestCard