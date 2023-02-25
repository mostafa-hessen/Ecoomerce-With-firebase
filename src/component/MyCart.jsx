import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import CardForCart from './cardForCart';

function MyCart() {
const user = JSON.parse(localStorage.getItem("user"));
 const [Cart, setCart] = useState([])

    useEffect(() => {
        // const getData = async () => {
        //    const q = query(collection(db, 'users',`MzKEfKUtA2bNJAiVqDnR19MjfR83`))
        //    const snapshot = await getDoc(q)
        //    const data = snapshot.docs.map((doc)=>({
        //        ...doc.data()
        //    }))
        //      setCart(data);
        //  }
        //  getData()

         const docRef = doc(db, "users", 'MzKEfKUtA2bNJAiVqDnR19MjfR83');
         getDoc(docRef)
            .then((docRef) => {
            
               setCart(JSON.parse( docRef.data().cart) )
             
            })
            .catch((error) => {
              console.log(error);
            });

     
     },[])
  return (
    <div>

{Cart?.map(ele=><CardForCart key={ele.uid} data={ele}  />)}

    </div>
  )
}

export default MyCart