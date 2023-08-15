import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function LogInForm(props) {
  const navigate = useNavigate();
  const [userData,setuserData] = useState({
    name:"",
    position:"",
    email: "",
    password: ""
  });

  const update=(event)=>{
    const {name,value} = event.target;

    setuserData((prevalue)=>{
      return{
        ...prevalue,
        [name]: value
      };
    });
  }

  const onSubmit = async(e) =>{
    e.preventDefault();
    axios.post("http://localhost:8080/user",userData)
    .then((res)=> res.data)
    .then((data)=> {
      localStorage.setItem('token',data.token);  
      localStorage.setItem("userid",data._id);     
      console.log(data.email,data.token);
      navigate("/");
    })
    .catch((err)=> console.log("this is the error ",err));
    
  }


  return (
    <form className="form">
      <input type="text" name="name" onChange={update} placeholder="Username" />
      <input type="text" name="position" onChange={update} placeholder="Mentor/mentee" />
      <input type="text" name="email" onChange={update} placeholder="email" />
      <input type="password" name="password" onChange={update} placeholder="Password" />
      <button onClick={onSubmit} type="submit">{props.page}</button>
    </form>
  );
}

export default LogInForm;
