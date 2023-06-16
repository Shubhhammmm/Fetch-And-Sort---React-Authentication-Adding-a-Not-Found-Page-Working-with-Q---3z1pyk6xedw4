import React, { useState } from 'react'
import '../styles/App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true); 
  const fetchData = async()=>{
    setIsLoading(true)
    try{
      const res = await fetch('https://content.newtonschool.co/v1/pr/main/users');
      const data = await res.json()
      setUsers(data);
      setIsLoading(false);
    }
    catch(e){
      setIsLoading(false);
    }
      
  }
  const handleSort = async ()=>{
    const s_arr = [...users].sort((a,b)=>{
      const nameA = a.name.length;
      const nameB = b.name.length;
      return (sortAscending? nameA-nameB :nameB-nameA)
    })
    setUsers(s_arr);
    setSortAscending(!sortAscending);
  }

  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={fetchData}>Fetch User Data</button>
      <button className="sort-btn" onClick={handleSort}>
       {sortAscending ? "Sort by name length (ascending)" :"Sort by name length (descending)" }
      </button>
  {isLoading?  <p>Loading...</p>:(<div className='users-section'>
    {users.map(e=>(
      <li key = {e.id}>
            <section className='id-section'>{e.id}</section>
            <section className='name-email-section'>
              <p className='name'>Name:{e.name} </p>
              <p className='email'>Email:{e.email} </p>
            </section>
          </li>
         ))}
         
      </div>)}

     
      
    </div>
  )
    }


export default App;
