// import React, { useEffect, useState } from "react";
// import Image from "../assets/login.jpg";
// import Logo from "../assets/logo.png";
// // import GoogleSvg from "../assets/icons8-google.svg";
// import { FaEye } from "react-icons/fa6";
// import { FaEyeSlash } from "react-icons/fa6";
// import'../index.css'



// const Login = () => {
//   const [ showPassword, setShowPassword ] = useState(false);


//   return (
//     <div className="login-main">
//       <div className="login-left">
//         <img src={Image} alt="" />
//       </div>
//       <div className="login-right">
//         <div className="login-right-container">
//           <div className="login-logo">
//             <img src={Logo} alt="" />
//           </div>
//           <div className="login-center">
//             <h2>Welcome back!</h2>
//             <p>Please enter your details</p>
//             <form>
//               <input type="email" placeholder="Email" />
//               <div className="pass-input-div">
//                 <input type={showPassword ? "text" : "password"} placeholder="Password" />
//                 {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
//               </div>

//               <div className="login-center-options">
//                 <div className="remember-div">
//                   <input type="checkbox" id="remember-checkbox" />
//                   <label htmlFor="remember-checkbox">
//                     Remember for 30 days
//                   </label>
//                 </div>
//                 <a href="#" className="forgot-pass-link">
//                   Forgot password?
//                 </a>
//               </div>
//               <div className="login-center-buttons">
//                 <button type="button">Log In</button>
//                 <button type="button">
//                   {/* <img src={GoogleSvg} alt="" /> */}
//                   Log In with Google
//                 </button>
//               </div>
//             </form>
//           </div>

//           <p className="login-bottom-p">
//             Don't have an account? <a href="#">Sign Up</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// import React, { useState } from "react";
// import { useHistory } from "react-router-dom"; // For navigation
// import axios from "axios";
// import Image from "../assets/loginedu.jpg"; // Your login image
// import Logo from "../assets/logo.png"; // Your logo
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "../index.css";

// const Login = () => {
//   const history = useHistory();  // For navigation
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const submit = async (e) => {
//     e.preventDefault();
    
//     try {
//       // Send the email and password to the backend
//       const response = await axios.post("http://localhost:8000/login", { email, password });
      
//       // Handle the response from backend
//       if (response.data.status === "exist") {
//         history.push("/predictionForm", { state: { id: email } });
//       } else if (response.data.status === "notexist") {
//         alert("User does not exist");
//       } else if (response.data.status === "wrong") {
//         alert("Incorrect password");
//       }
//     } catch (error) {
//       console.error("Error occurred during login:", error);
//       alert("An error occurred during login");
//     }
//   };

//   return (
//     <div className="login-main">
//       <div className="login-left">
//         <img src={Image} alt="Login" />
//       </div>
//       <div className="login-right">
//         <div className="login-right-container">
//           <div className="login-logo">
//             <img src={Logo} alt="Logo" />
//           </div>
//           <div className="login-center">
//             <h2>Welcome back!</h2>
//             <p>Please enter your details</p>
//             <form onSubmit={submit}>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <div className="pass-input-div">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 {showPassword ? (
//                   <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
//                 ) : (
//                   <FaEye onClick={() => setShowPassword(!showPassword)} />
//                 )}
//               </div>

//               <div className="login-center-buttons">
//                 <button type="submit">Log In</button>
//                 <button type="button">
//                   {/* Log In with Google */}
//                   Log In with Google
//                 </button>
//               </div>
//             </form>
//           </div>

//           <p className="login-bottom-p">
//             Don't have an account? <a href="/signup">Sign Up</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import Image from "../assets/loginedu.jpg"; // Your login image
import Logo from "../assets/logo.png"; // Your logo
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../index.css";

const Login = () => {
  const navigate = useNavigate();  // For navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    
    try {
      // Send the email and password to the backend
      const response = await axios.post("http://localhost:8000/login", { email, password });
      
      // Handle the response from backend
      if (response.data.status === "exist") {
        navigate("/predictionForm", { state: { id: email } });
      } else if (response.data.status === "notexist") {
        alert("User does not exist");
      } else if (response.data.status === "wrong") {
        alert("Incorrect password");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Login" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form onSubmit={submit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="login-center-buttons">
                <button type="submit">Log In</button>
                <button type="button">
                  {/* Log In with Google */}
                  Log In with Google
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
