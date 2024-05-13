// import React, { useState, useEffect } from 'react';
// import './BlinkingOdds.css'; // Import your CSS file for styling

// const BlinkingOdds = () => {
//   const [odds, setOdds] = useState(2.5);
//   const [isBlinking, setIsBlinking] = useState(false);

//   useEffect(() => {
//     // Function to trigger blinking effect
//     const blink = () => {
//       setIsBlinking(true);
//       setTimeout(() => {
//         setIsBlinking(false);
//       }, 1000); // Adjust the duration of the blink as needed
//     };


// export default BlinkingOdds;

// /////////////////////////////////////////////////////////////////////////////////


// import React, { useState } from 'react';

// const MyForm = () => {
//   // State to hold the input value and validation message
//   const [inputValue, setInputValue] = useState('');
//   const [validationMessage, setValidationMessage] = useState('');

//   // Event handler for input change
//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     setInputValue(value);

//     // Validate the input (check if it's empty)
//     if (value.trim() === '') {
//       setValidationMessage('Input cannot be blank');
//     } else {
//       setValidationMessage('');
//     }
//   };

//   // Event handler for form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Perform additional actions if needed upon form submission
//     console.log('Form submitted with value:', inputValue);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Input:
//         <input type="text" value={inputValue} onChange={handleInputChange} />
//       </label>
//       {validationMessage && <p style={{ color: 'red' }}>{validationMessage}</p>}
//       <button type="submit" disabled={validationMessage !== ''}>
//         Submit
//       </button>
//     </form>
//   );
// };

// export default MyForm;


/////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';

// const MyForm = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {};

//     // Validate username
//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//       valid = false;
//     }

//     // Validate email
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//       valid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//       valid = false;
//     }

//     // Validate password
//     if (!formData.password.trim()) {
//       newErrors.password = 'Password is required';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Process the form data
//       console.log('Form data submitted:', formData);
//     } else {
//       console.log('Form validation failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//         />
//         {/* {errors.username && <p className="error">{errors.username}</p>} */}
//       </div>

//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="text"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         {errors.email && <p className="error">{errors.email}</p>}
//       </div>

//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         {errors.password && <p className="error">{errors.password}</p>}
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default MyForm;


import React from 'react';

const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000) + 'k';
  }
  return num.toString();
};

const Temp = () => {
  const numbers = [500, 1000, 1710, 2000];

  return (
    <div>
      <h1>Numbers in "k" Format</h1>
      <ul>
        {numbers.map((num, index) => (
          <li key={index}>{formatNumber(num)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Temp;
