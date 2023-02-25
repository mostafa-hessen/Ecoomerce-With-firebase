// import { collection,getDocs } from "firebase/firestore";
import React ,{useEffect, useState}from "react";
import { db } from "../firebase";
import Nav from "./nav";
import Card from './card'
// import { collection } from "firebase/firestore";
// import { useCollection } from '/firestore';
// import { collection, getDocs, query } from "firebase/firestore";
import { collection, doc, getDoc, getDocs ,query, updateDoc} from "firebase/firestore";
import Carduser from "./cardUser";
// import {useCollectionData} from 'react-firebase-hooks/firestore'
function User() {
  let remove=false
  const [food, setFood] =  useState(['def'])
  const [DataAfter, setDataAfter] =  useState([])

const [workData, setWorkData] = useState([])
let forCateogry=food?.filter(ele=>ele.foodCateogry=='meet')
useEffect(() => {
   const getData = async () => {
      const q = query(collection(db, 'foods'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc)=>({
          ...doc.data(), id:doc.id
      }))
        setFood(data);
    }
    getData()

},[])


//  1-show detailes
// 2-remove 
// 3- update
//  
localStorage.setItem('foods',JSON.stringify(food))

const user = JSON.parse(localStorage.getItem("user"));

let currentArray=JSON.parse(localStorage.getItem('Cart'))?JSON.parse(localStorage.getItem('Cart')):[]

const [cart, setCart] = useState(currentArray);
let setToLocalStorage = (ele) => {
  localStorage.setItem("Cart", JSON.stringify(ele));
};
const addTocartBtn = (elefrombtn) => {

 
    let arr = [...cart];
    arr.push(elefrombtn);
    setCart(arr);
    setToLocalStorage(arr)
    let currentArray=localStorage.getItem('Cart')

    console.log(currentArray);

  const docRef = doc(db, "users", 'MzKEfKUtA2bNJAiVqDnR19MjfR83');

  updateDoc(docRef, {
    cart:`${currentArray}`,
  })
    .then((docRef) => {
      console.log(
        "A New Document Field has been added to an existing document"
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

  return (
    <>
      <div className="container user" style={{ background: "tomato" }}>
        <Nav />
        <div className="row mt-4">
        {food?.map(ele=><Carduser key={ele.uid} data={ele} func={addTocartBtn} />)}

        {/* {forCateogry?.map(ele=><Card data={ele}/>)} */}
        </div>
      </div>
    </>
  );
}

export default User;
