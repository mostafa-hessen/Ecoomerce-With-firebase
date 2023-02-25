import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "./popup";

import Login from './Login'
function Card(ele, remove) {
  console.log(ele);
  const sendYolocal = (ele) => {
    localStorage.setItem("mydetailes", JSON.stringify(ele.data));
  };

  const removeDoc = (foodId) => {
    console.log(foodId);
    const docRef = doc(db, "foods", `${foodId}`);

    deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const [popup, setpopup] = useState(false)
  const displaypopUp=()=>{
    setpopup(true)
  }
  return (
    <div className="col-12 col-md-6 mt-2">
      <div className="card">
        <img src={ele.data.foodImg} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{ele.data.foodCateogry}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          {remove ? (
            <button
              className="btn btn-danger"
              onClick={() => removeDoc(ele.data.id)}
            >
              remove
            </button>
          ) : (
            <Link
              to="/detailes"
              onClick={() => sendYolocal(ele)}
              className="btn btn-primary"
            >
              Go to Detailes
            </Link>
          )}
        </div>
        {/* <Popup/> */}
        {popup?<Popup ele={ele}/>:console.log('popup=> none')}
{/* (<Popup/>) */}
        <button onClick={()=>displaypopUp()} className="btn btn-primary">Edite</button>
      </div>
    </div>
  );
}

export default Card;
