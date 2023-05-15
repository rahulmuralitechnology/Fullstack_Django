import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Update({ match }) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/${match.params.id}/`)
      .then((res) => {
        setName(res.data.name);
        setPassword(res.data.password);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setAddress(res.data.address);
      })
      .catch((err) => console.log(err));
  }, [match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Update = { username, password, email, phone, address };
    axios
      .post(`http://127.0.0.1:8000/api/${match.params.id}/`, Update)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Phone</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <label>Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
}
