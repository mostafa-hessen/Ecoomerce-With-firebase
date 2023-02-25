import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { db, myserverTimestamp, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";

function EditeForm(props) {
    console.log("props", props.elementfrompopup);
    const [err, seterr] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    //       const handelSubmit = async (e) => {
    //       e.preventDefault();
    //       const foodName = e.target[0].value;
    //       const foodCateogry = e.target[1].value;
    //       const foodPrice = e.target[2].value;
    //       const foodImg = e.target[3].files[0];

    //       // ===== fire base ====
    //       console.log(user.uid);
    //       const date = Date.now();//71y271y371y3781y1w3
    //       console.log(date);
    //       // code storage to store image
    //       const storageRef = ref(storage, `${foodName}${date}`);

    //       const uploadTask = uploadBytesResumable(storageRef, foodImg);

    //       uploadTask.on(
    //         (error) => {
    //           console.log(error);
    //         },
    //         () => {
    //           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //               console.log(downloadURL);

    //             await setDoc(doc(db, "foods",`${foodName}${date}`), {

    //               foodName,
    //               foodCateogry,
    //               foodPrice,
    //               foodImg: downloadURL,
    //               timestamP: myserverTimestamp,
    //               userName: user.displayName,
    //               userid:user.uid

    //             });
    //           });
    //         }
    //       );
    //     };
    //   return (

    // Your Firebase SDK Initialization code here

    const [ImgFromUrl, setImgFromUrl] = useState(
        props.elementfrompopup.data.foodImg
    );

    //   useEffect(() => {
    //     // ====== upload img to storage firebase ======
    //     let date = Date.now();

    //     const storageRef = ref(storage, `${foodName}${date}`);

    //     const uploadTask = uploadBytesResumable(storageRef, foodImg);

    //     uploadTask.on(
    //       (error) => {
    //         console.log(error);
    //       },
    //       () => {
    //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //         //   // ==== update doc ======
    //         //   const docRef = doc(db, "foods", `${props.elementfrompopup.data.id}`);

    //         //   await updateDoc(docRef, {
    //         //     foodName: foodName,
    //         //     foodCateogry: foodCateogry,
    //         //     foodPrice: foodPrice,

    //         //     foodImg: downloadURL,
    //         //   })
    //         //     .then((docRef) => {
    //         //       console.log(
    //         //         "A New Document Field has been added to an existing document"
    //         //       );
    //         //     })
    //         //     .catch((error) => {
    //         //       console.log(error);
    //         //     });
    //         });
    //       }
    //     );
    //   }, [foodImg]);

    const handelSubmit = (e) => {
        e.preventDefault();
        // ==== set inputes Data =====
        const foodName = e.target[0].value;
        const foodCateogry = e.target[1].value
            ? e.target[1].value
            : props.elementfrompopup.data.cateogry;
        const foodPrice = e.target[2].value;
        const foodImg = e.target[3].files[0];
 

        console.log("foodImg",foodImg);

        if (foodImg) {
            let date = Date.now();
            const storageRef = ref(storage, `${foodName}${date}`);

            const uploadTask = uploadBytesResumable(storageRef, foodImg);

            uploadTask.on(
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                        const docRef = doc(db, "foods", `${props.elementfrompopup.data.id}`);

                     await updateDoc(docRef, {
                            foodName: foodName,
                            foodCateogry: foodCateogry,
                            foodPrice: foodPrice,

                            foodImg: downloadURL,
                        })
                            .then((docRef) => {
                                console.log(
                                    "A New Document Field has been added to an existing document"
                                );
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                    })

                });


        }
        else {


            const docRef = doc(db, "foods", `${props.elementfrompopup.data.id}`);

            updateDoc(docRef, {
                foodName: foodName,
                foodCateogry: foodCateogry,
                foodPrice: foodPrice,

            })
                .then((docRef) => {
                    console.log(
                        "A New Document Field has been added to an existing document"
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }




        let func = (img) => {
            // ==== update doc ======

        }

    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">food form</span>
                <span className="title">add</span>
                {/* <img src=""/> */}

                <form onSubmit={handelSubmit}>
                    <input
                        required
                        type="text"
                        defaultValue={`${props.elementfrompopup.data &&
                            props.elementfrompopup.data.foodName
                            }`}
                    />

                    <label htmlFor="Cateogry">Choose a your food cateogry:</label>
                    <select name="kindUser" id="Cateogry">
                        <option
                            selected={true}
                            value={`${props.elementfrompopup.data &&
                                props.elementfrompopup.data.cateogry
                                }`}
                        >
                            pizza
                        </option>
                        <option value="pizza">pizza</option>
                        <option value="chicken">chicken</option>
                        <option value="meet">meet</option>
                        <option value="chees">chees</option>
                    </select>

                    {/* <input required type="" placeholder="password" /> */}
                    <input
                        type="number"
                        placeholder="you'r price"
                        defaultValue={`${props.elementfrompopup.data &&
                            props.elementfrompopup.data.foodPrice
                            }`}
                    />

                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an avatar</span>
                    </label>

                    <button>update food</button>
                    {/* {loading && "Uploading and compressing the image please wait..."} */}
                    {/* {err && <span>Something went wrong</span>} */}
                </form>

                {/* {!err ? console.log("done") : console.log("you have errore")} */}
            </div>
        </div>
    );
}

export default EditeForm;
