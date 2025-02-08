// import React, { useState } from "react";
// import axios from "axios";
// import Image from "../assets/Singup.jpg";  // Add your image path
// import Logo from "../assets/logo.png";    // Add your logo path
// import "../index.css";  // Add your CSS file

// const SignUp = () => {
//   const [name, setName] = useState("");  // Added state for 'name'
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8000/signup", { name, email, password });
//       if (response.data === "success") {
//         alert("Sign up successful! Please log in.");
//         // Redirect to login page
//         window.location.href = "/login";
//       } else {
//         alert("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error occurred while signing up. Please try again.");
//     }
//   };

//   return (
//     <div className="signup-main">
//       <div className="signup-left">
//         <img src={Image} alt="Sign Up" />
//       </div>
//       <div className="signup-right">
//         <div className="signup-right-container">
//           <div className="signup-logo">
//             <img src={Logo} alt="Logo" />
//           </div>
//           <div className="signup-center">
//             <h2>Create a New Account</h2>
//             <p>Please enter your details to sign up</p>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//               {error && <p className="error-message">{error}</p>}

//               <div className="signup-center-buttons">
//                 <button type="submit">Sign Up</button>
//               </div>
//             </form>
//           </div>

//           <p className="signup-bottom-p">
//             Already have an account? <a href="/login">Login</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from "react"; 
import axios from "axios";
import Image from "../assets/logo2.jpg";  // Add your image path
import Logo from "../assets/logo.png";    // Add your logo path
import "../index.css";  // Add your CSS file

const SignUp = () => {
  const [name, setName] = useState("");  // Added state for 'name'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/signup", { name, email, password });
      if (response.data.status === "success") {
        alert("Sign up successful! Please log in.");
        // Redirect to login page
        window.location.href = "/login";
      } else if (response.data.status === "error") {
        setError(response.data.message); // Show the error message from backend
      }
    } catch (error) {
      console.error(error);
      setError("Error occurred while signing up. Please try again.");
    }
  };

  return (
    <div className="signup-main">
      <div className="signup-left">
        <img src={Image} alt="Sign Up" />
      </div>
      <div className="signup-right">
        <div className="signup-right-container">
          <div className="signup-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="signup-center">
            <h2>Create a New Account</h2>
            <p>Please enter your details to sign up</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {error && <p className="error-message">{error}</p>}

              <div className="signup-center-buttons">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>

          <p className="signup-bottom-p">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
