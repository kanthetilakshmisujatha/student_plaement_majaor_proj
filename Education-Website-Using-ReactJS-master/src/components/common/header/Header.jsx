// import React, { useState } from "react"
// import { Link } from "react-router-dom"
// import Head from "./Head"
// import "./header.css"


// const Header = () => {
//   const [click, setClick] = useState(false)

//   return (
//     <>
//       <Head />
//       <header>
//         <nav className='flexSB'>
//           <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
//             <li>
//               <Link to='/'>Home</Link>
//             </li>
//             <li>
//               <Link to='/courses'>All Courses</Link>
//             </li>
//             <li>
//               <Link to='/about'>About</Link>
//             </li>
//             <li>
//               <Link to='/team'>Team</Link>
//             </li>
//             <li>
//               <Link to='/contact'>Contact</Link>
//             </li>
            
//             <li>
//               <Link to='/login'>Login</Link>
//             </li>
//             <li>
//               <Link to='/signup'>SignUp</Link>
//             </li>
           
//           </ul>
//           <div className='start'>
//             <div className='button'><h3>UPCOMING DRIVE : DEC 16&17 2024</h3></div>
//           </div>
//           <button className='toggle' onClick={() => setClick(!click)}>
//             {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
//           </button>
//         </nav>
//       </header>
//     </>
//   )
// }

// export default Header
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/courses'>All Courses</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/team'>Team</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>SignUp</Link>
            </li>
          </ul>
          <div className='start'>
            <div className='button blinking-text'>
              <h3>UPCOMING DRIVE : DEC 16&17 2024</h3>
            </div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
