import React, { useEffect,useState } from "react";

function Detailes(ele) {
    
    useEffect(() => {
     let myElement=JSON.parse( localStorage.getItem('mydetailes'))
    setfirst(myElement)
    }, [ ])
    
    const [first, setfirst] = useState('second')
  return (
    <div className="container">
      <div class="card" style={{width: "18rem"}}>
        <img class="card-img-top" src={first.foodImg} alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{first.foodName}</h5>
          <p class="card-text">
            {
                first.foodCateogry
            }
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
}

export default Detailes;
