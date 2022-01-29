import React, { useState,useEffect } from 'react';
import { Form,InputGroup,ButtonGroup,Button, Alert} from 'react-bootstrap';
import contactService from '../services/contact.service';

const AddContactForm = ({id,setId}) => {
    const [data,setData]=useState({firstName:"",num:""});
    const [status,setStatus]=useState("available")
    const [message,setMessage]=useState({error:false,msg:""})
    const [flag,setFlag]=useState(true)
    const {firstName,num,}=data;

    const onChange=e=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const onSubmit=async e=>{
        e.preventDefault();
        if(firstName==="" || num===""){
            setMessage({error:true,msg:"Please fill the  all fields.."});
            return;
        }
        const newContact={
            firstName,num,status
        }
        console.log(newContact);
        try{
            if(id!==undefined && id!==""){
                await contactService.updateContact(id,newContact)
                setMessage({error:false,msg:"contact updated successfully"})
            }
            else{
                await contactService.addContacts(newContact);
                setMessage({error:false,msg:"successfully added contact"})
            }

        }catch(err){
            setMessage({error:true,msg:err.message})
        }
        setData({firstName:"",num:""});
    }
    const updateContact=async ()=>{
        try{
            const contactDoc=await contactService.getContact(id);
            console.log(contactDoc.data())
            const updateContact=contactDoc.data();
            const {firstName,num,status}=updateContact;
            setData({firstName:firstName,num:num,status:status});
            // setMessage({error:false,msg:"contact update successfully"})
        }catch(err){
            setMessage({error:true,msg:err.message})
        }

    }
    useEffect(()=>{
        console.log("contact id is here",id);
        if(id!==undefined && id!==""){
            updateContact();
        }
    },[id])
  return (
    <div className='p-4 box'>
        {message?.msg && 
        <Alert variant={message?.error ?"danger":"success"} dismissible onClose={()=>setMessage("")} >{message?.msg}</Alert>

        }
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formTextName">
                <InputGroup>
                    <InputGroup.Text id="formTextName" style={{backgroundColor:"#0B5ED7", color:"#fff"}}>N</InputGroup.Text>
                    <Form.Control type="text" placeholder="Enter name" name="firstName" value={firstName} onChange={onChange}/>
                </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNumber">
                <InputGroup>
                    <InputGroup.Text id="formNumber" style={{backgroundColor:"#0B5ED7", color:"#fff"}}>No</InputGroup.Text>
                    <Form.Control type="number" placeholder="Enter no" name="num" value={num} onChange={onChange}/>
                </InputGroup>
            </Form.Group>
            <ButtonGroup className="mb-3" aria-label="Basic example">
                <Button disabled={flag} variant="success" onClick={e=>{
                    setStatus("available")
                    setFlag(true)
                    }}>
                    Available
                </Button>
                <Button disabled={!flag} variant="danger" onClick={e=>{
                    setStatus("not Available");
                    setFlag(false);
                    }}>
                    NotAvailable
                </Button>
            </ButtonGroup>
            <div className='d-grid gap-2'>
            <Button variant="primary" type="submit">Add/Update</Button>

            </div>
        </Form>
  </div>
  );
};

export default AddContactForm;
