import React, { useState } from "react";
import Add from "../img/addAvatar.png";

// import { query, orderBy, limit } from "firebase/firestore";

// const q = query(citiesRef, orderBy("name"), limit(3));
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, myserverTimestamp, storage } from "../firebase";

// import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
// import { Link } from "react-router-dom";
// import { useNavigate, Link } from "react-router-dom";
// import firebase from 'firebase'
const AddNewCook = () => {
  const [err, seterr] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const handelSubmit = async (e) => {
    e.preventDefault();
    const foodName = e.target[0].value;
    const foodCateogry = e.target[1].value;
    const foodPrice = e.target[2].value;
    const foodImg = e.target[3].files[0];

    // ===== fire base ====
    console.log(user.uid);
    const date = Date.now();//71y271y371y3781y1w3
    console.log(date);
    // code storage to store image
    const storageRef = ref(storage, `${foodName}${date}`);

    const uploadTask = uploadBytesResumable(storageRef, foodImg);

    uploadTask.on(
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);

          await setDoc(doc(db, "foods",`${foodName}${date}`), {

            foodName,
            foodCateogry,
            foodPrice,
            foodImg: downloadURL,
            timestamP: myserverTimestamp,
            userName: user.displayName,
            userid:user.uid

          });
        });
      }
    );
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">food form</span>
        <span className="title">add</span>
        {/* <img src=""/> */}

        <form onSubmit={handelSubmit}>
          <input required type="text" placeholder="food name" />

          <label htmlFor="Cateogry">Choose a your food cateogry:</label>
          <select name="kindUser" id="Cateogry">
            <option value="pizza">pizza</option>
            <option value="chicken">chicken</option>
            <option value="meet">meet</option>
            <option value="chees">chees</option>
          </select>

          {/* <input required type="" placeholder="password" /> */}
          <input type="number" placeholder="you'r price" />

          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>

          <button>add new food</button>
          {/* {loading && "Uploading and compressing the image please wait..."} */}
          {/* {err && <span>Something went wrong</span>} */}
        </form>

        {/* {!err ? console.log("done") : console.log("you have errore")} */}
      </div>
    </div>
  );
};

export default AddNewCook;


// mostafa => l8lG4fZsQFNJDJ4wwJkVjxnxWAA2
//sohaila => 76K0gKYP8GQNGETHVZEmf8VX9cs2
// alaa => oKdVrpDWZXQu9J7Jh90pJftCed13