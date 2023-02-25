import React from 'react'

function Nav() {
  const user=JSON.parse(localStorage.getItem('user'))
  return (
    <div>
        <div
          style={{
            background: "",
            textAlign: "center",
            margin: "20px",
          }}
        >
          <nav>
            <div className="img">
              <img width={50} src={user ? user.photoURL : "nothing"} alt="" />
              <h2>{user ? user.displayName : "nothing"}</h2>
            </div>
          </nav>
        </div>

    </div>
  )
}

export default Nav