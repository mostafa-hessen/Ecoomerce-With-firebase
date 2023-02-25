import React, { useState } from "react";
import Add from "../img/addAvatar.png";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../firebase";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
// import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, seterr] = useState(false);
  const handelSubmit = async (e) => {
    e.preventDefault();

    console.log(e.target[0].value);

    const displayName = e.target[0].value;
    const displayEmail = e.target[1].value;
    const displayPassword = e.target[2].value;
    const displayhindofUser = e.target[3].value;
    const displayFile = e.target[4].files[0];

    // ===== fire base ====

    try {
      // code for auth email and password
      const res = await createUserWithEmailAndPassword(
        auth,
        displayEmail,
        displayPassword
      );

      let date = Date.now();
      // code storage to store image
      const storageRef = ref(storage, `${displayName}${date}`);

      const uploadTask = uploadBytesResumable(storageRef, displayFile);

      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await console.log("File available at", downloadURL);

            await updateProfile(res.user, {
              displayName: `${displayName}@${displayhindofUser}`,
              photoURL: downloadURL,
            });

            console.log(res.user);

            if (displayhindofUser == "cook") {
              await setDoc(doc(db, "cookers", res.user.uid), {
                uid: res.user.uid,
                displayName: displayName,
                email: displayEmail,
                photoURL: downloadURL,
                
              });
            } else {
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: displayName,
                email: displayEmail,
                photoURL: downloadURL,
                cart: [],
                favourite: [],
              });
            }
          });
        }
      );
    } catch {
      seterr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>

        <form onSubmit={handelSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />

          <label for="kindUser">Choose a your approch:</label>
          <select name="kindUser" id="kindUser">
            <option value="cook">cook</option>
            <option value="user">user</option>
          </select>

          {/* <input required type="" placeholder="password" /> */}
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {/* {loading && "Uploading and compressing the image please wait..."} */}
          {/* {err && <span>Something went wrong</span>} */}
        </form>

        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>

        {!err ? console.log("done") : console.log("you have errore")}
      </div>
    </div>
  );
};

export default Register;
