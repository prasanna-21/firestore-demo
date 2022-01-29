import { doc } from 'firebase/firestore';
import React,{useState,useEffect} from 'react';
import { Table,Button } from 'react-bootstrap';
import contactService from '../services/contact.service';

const ContactList = ({getContactById}) => {
    const [contacts,setContacts]=useState([])
    const getAllContacts=async()=>{
        const data=await contactService.getContacts();
        console.log(data.docs);
        setContacts(data.docs.map(doc=>({...doc.data(),id:doc.id})))
        
    }
    console.log(contacts)
    useEffect(()=>{
        getAllContacts();
        
    },[])

    const handleEdit=async (id,contact)=>{
        await contactService.updateContact(id,contact)

    }
    const handleDelete=async(id)=>{
        await contactService.deleteContact(id)

    }
  return(
   <>
      <div className='mb-3'>
          <Button variant="dark" onClick={getAllContacts}>Refresh</Button>
      </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Phone No</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((doc,index)=>(
                    <tr key={doc.id}>
                        <td>{index+1}</td>
                        <td>{doc.firstName}</td>
                        <td>{doc.num}</td>
                        <td>{doc.status}</td>
                        <td>
                            <Button variant="primary" 
                            onClick={()=>getContactById(doc.id,doc)}
                            >Edit</Button>
                            <Button variant="danger" onClick={()=>handleDelete(doc.id)}>Delete</Button>
                        </td>
                    </tr>

                ))}
                
            </tbody>
        </Table>
 </>
);
};

export default ContactList;
