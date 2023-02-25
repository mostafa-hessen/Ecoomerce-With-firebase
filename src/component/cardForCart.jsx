import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useState} from "react"
function CardForCart(props) {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [arrFood, setarrFood] = useState([])
//   let arr = [];

//   const addTocartBt = (elefrombtn) => {
//     //  arr.push(elefrombtn)
//     setarrFood([...arrFood,elefrombtn])

//     const mycart = localStorage.setItem("cart",JSON.stringify(arrFood));

//     // const docRef = doc(db, "users", `${user.id}`);

//     // updateDoc(docRef, {
//     //   cart: [],
//     // })
//     //   .then((docRef) => {
//     //     console.log(
//     //       "A New Document Field has been added to an existing document"
//     //     );
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //   });
//   };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.data.foodImg} />
      <Card.Body>
        <Card.Title>{props.data.foodName}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary" >
          Add to favourite
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardForCart;
