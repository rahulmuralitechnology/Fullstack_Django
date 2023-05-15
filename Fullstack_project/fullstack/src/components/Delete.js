import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Delete( { match, history } ) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/${match.params.id}/`)
      .then((res) => {
        setName(res.data.name);
        setPassword(res.data.password);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setAddress(res.data.address);
      })
      .catch((err) => console.error(err));
  }, [match.params.id]);

  const handleDelete = () => { 
    email.preventDefault();
    axios.delete(`http://127.0.0.1:8000/api/${match.params.id}/`)
    .then((res) =>  history.push("/"))
    .catch((err) => console.error(err));
    } 


  return (
    <div>
      <h2>Delete</h2>
      <p>Are you sure you want to delete "{username}"?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => history.push('/')}>Cancel</button>
    </div>
  )
}
