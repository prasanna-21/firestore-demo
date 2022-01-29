import './App.css';
import React,{useState} from 'react';
import AddContactForm from './components/AddContactForm';
import ContactList from './components/ContactList';

function App() {
  const [id,setId]=useState("");
  const handleContactById=id=>{
    console.log("contact id to be edited",id);
    setId(id);
  }

  return (
    <>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid d-flex justify-content-center">
          <a class="navbar-brand" href="#">Contact</a>
        </div>
      </nav>
      <div className="container" style={{width:"400px"}}>
        <div className="row">
          <div className="col">
            <AddContactForm id={id} setId={setId}/>
          </div>
        </div>
      </div>
      <div className="container">
        <ContactList getContactById={handleContactById} />
      </div>
    </>
  );
}

export default App;
