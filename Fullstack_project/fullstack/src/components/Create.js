import React, { useState } from "react";
import axios from "axios";

export default function Create() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const create = { username, password, email, phone, address };
    axios
      .post("http://127.0.0.1:8000/api/", create)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <form>
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
      <button onClick={handleSubmit}>Create</button>
    </form>
  );
}
