import React, { useState } from 'react'
import AddNewCook from './addnewcook'
import Card from './card'

function Cook() {
const [myfood, setmyfood] = useState([])
  let user= JSON.parse( localStorage.getItem('user'))
  let allfoodFromLocal= JSON.parse( localStorage.getItem('foods'))
  let x=allfoodFromLocal.filter(ele=>user.uid==ele.userid)
  console.log(x);
  // setmyfood(x)
let remove=true

  return (
    <div style={{

        background:'white',
        textAlign:'center',
        marginTop:'20px'
    }}>
      <nav>

        
        <div className="img" >
          <img width={50}  src={user?user.photoURL:"nothing"} alt="" />
          <h2>
            {user?user.displayName:"nothing"}
          </h2>
        
        </div>
      </nav>
      {/* <AddNewCook/> */}



      <div className="container user" style={{ background: "tomato" }}>
        <div className="row mt-4">
          {/* {console.log(myfood)} */}
        {x?.map(ele=><Card key={Math.random()} data={ele}  remove={remove} />)}
        </div>
      </div>
      </div>
  )
}
export default Cook