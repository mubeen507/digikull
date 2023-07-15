import React, { useState } from "react";
import axios from "axios";
import './ContactUs.scss';
import { useNavigate} from "react-router-dom";

const ContactUs = () => {
  const [firstname,setfirstName]=useState();
  const [lastname,setlastName]=useState();
  const[email,setEmail]=useState();
  const[message,setMessage]=useState();
  const navigate=useNavigate();
  const sendmessage=async()=>{
    const response=await axios.post("http://localhost:5000/customer/contactus",
    {
      name:firstname+" "+lastname,
      email:email,
      message:message,
    })
 navigate('/');
    
  }

  return (
    <>
      <div className="contacts">
        <div className="contactsection">
          <h1 className="head">For Any Assistance Please reach out to us...</h1>
          <div className="name">
            <div className="input">
              <label htmlFor="firstname" className="title">First Name</label>
              <input type="text" placeholder="First Name" id="firstname" className="half" onChange={(e)=>setfirstName(e.target.value)}/>
            </div>
            <div className="input">
              <label htmlFor="lastname" className="title">Last Name</label>
              <input type="text" placeholder="Last Name" id="lastname" className="half" onChange={(e)=>setlastName(e.target.value)} />
            </div>
          </div>
          <label htmlFor="email" className="title">Email</label>
          <input type="email" placeholder="xyz@gmail.com" id="firstname" className="full" onChange={(e)=>setEmail(e.target.value)}/>
          <label htmlFor="query" className="title">Leave your Message</label>
          <textarea placeholder="Type Your Query here" id="query" className="textarea" onChange={(e)=>setMessage(e.target.value)}/>
        </div>
        <button type="submit" className="confirmbtn" onClick={sendmessage}>Send Message</button>
      </div>
    </>
  )
}

export default ContactUs;






























// import React from "react";

// function ContactUs() {
//   return (
//     <div className='static-container grid md:grid-cols-2 md:pt-30 py-20 bg-light' id="contact">
//       <div className='sm:text-5xl w-128 flex justify-center px-10 md:px-28 leading-relaxed'>
//         For Any Assistance Required Please Reach Out
//       </div>
//       <div className="text-green md:mx-0 sm:mx-24 mx-10 md:mt-0 mt-10">
//         <div className="grid sm:grid-cols-2">
//           <div >
//             <label htmlFor="first-name">First Name</label>
//             <div>
//               <input type="text" className="outline-none bg-light hover:border-slate-300 border-b-1 border-green my-5 pb-1 sm:w-7/12 w-4/5" id="first-name" />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="last-name">Last Name</label>
//             <div>
//               <input type="text" className="outline-none bg-light hover:border-slate-300 border-b-1 border-green my-5 pb-1 sm:w-7/12 w-4/5" id="last-name" />
//             </div>
//           </div>
//         </div>
//         <div className="pt-3 sm:pt-10">
//           <label htmlFor="email">Email</label>
//           <div>
//             <input type="email" className="outline-none bg-light hover:border-slate-300 border-b-1 border-green my-5 w-4/5 pb-1" id="email" />
//           </div>
//         </div>
//         <div className="pt-3 sm:pt-10">
//           <label htmlFor="message">Leave a Message</label>
//           <div>
//             <input type="textarea" className="outline-none bg-light hover:border-slate-300 border-b-1 border-green my-5 w-4/5 pb-16" id="message" />
//           </div>
//         </div>
//         <div>
//           <button className="py-2 px-12 hover:border-white hover:bg-white border-1 border-green rounded-lg">Submit</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ContactUs