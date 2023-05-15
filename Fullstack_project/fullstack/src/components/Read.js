import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Read() {
  const [user, setuser] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/")
      .then((res) => setuser(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul>
      {user.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
}
