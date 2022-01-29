import {db}from '../firebase-config';
import {
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    collection,
    doc
}from 'firebase/firestore';

const contactCollectionRef=collection(db,"contacts");
class ContactDataService{
    getContacts=()=>{
        return getDocs(contactCollectionRef)
    }
    getContact=(id)=>{
        const contactDoc=doc(db,"contacts",id);
        return getDoc(contactDoc);
    }
    addContacts=(contact)=>{
        // const contactDoc=doc(db,"contacts",id);
        return addDoc(contactCollectionRef,contact);
    }
    updateContact=(id,contact)=>{
        const contactDoc=doc(db,"contacts",id);
        return updateDoc(contactDoc,contact)
    }
    deleteContact=(id)=>{
        const contactDoc=doc(db,"contacts",id);

        return deleteDoc(contactDoc);
    }


}
export default new ContactDataService();