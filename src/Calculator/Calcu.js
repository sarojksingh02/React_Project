import '../App.css';
import { useState, useCallback,useEffect, useRef } from 'react';
function Calcu() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+\-=\[\]{};,.~`"
    for(let i = 1; i<=length; i++){
        let char = Math.floor(Math.random()*str.length + 1)  
        //console.log("saroj",char)
        pass += str.charAt(char)
    }
    setPassword(pass);
  },[length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,50)
    window.navigator.clipboard.writeText(password)
  },[password])

 useEffect(()=>{
 passwordGenerator()
 },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='inputbox'>
         <h1 className='header'>Password Generator</h1>
         <input 
         type = "text"
         value = {password}
         placeholder = "password"
         readOnly
         ref = {passwordRef}
         />
         <button className='button' onClick={copyPasswordToClipboard}>Copy</button>
    </div>
    <div className='range'>
       <input
       type = "range"
       min = {1}
       max = {50}
       value = {length} 
       onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>Length: {length}</label>
        <input
       type = "checkbox"
       defaultChecked = {numberAllowed} 
       onChange={()=>{setNumberAllowed((prev)=>!prev)}}
        />
        <label>Number</label>
        <input
       type = "checkbox"
       defaultChecked = {charAllowed} 
       onChange={()=>{setCharAllowed((prev)=>!prev)}}
        />
        <label>Characters</label>
    </div>
    </>
  );
}

export default Calcu;
