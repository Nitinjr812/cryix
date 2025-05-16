import axios from 'axios'
import React, { useState } from 'react'

const Rest = () => {
    const [data, setdata] = useState([])
    const handleinputs = (e) => {
        setdata({
            ...data, [e.target.name]: e.target.value
        })
        console.log(data)
    }
    const handlesubmit = () => {
        axios.post("http://localhost:8080/rest",data).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <>
            <input type="text" name='name' onChange={handleinputs} />
            <button  onClick={handlesubmit}> Submit </button>
        </>
    )
}

export default Rest
