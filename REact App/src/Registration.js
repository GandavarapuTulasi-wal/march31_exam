import axios from 'axios';
import { useState } from 'react';

function Registration() {
  const [status, setStatus] = useState(0);
  const addUser = (event) => {
    event.preventDefault();
    let userObject = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    axios
      .post('/users', userObject)
      .then((res) => {
        console.log(res.data);
        setStatus(res.data.status);
      })
      .catch((error) => {
        console.log(error);
        setStatus(error.status);
      });
  };
  console.log(status);
  return (
    <div className="card-container">
      <h1>Registartion Form</h1>
      <form onSubmit={addUser} className="box">
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          className="todo-user-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="todo-user-input"
        />

        <button>Register</button>
      </form>
      {status ? (
        <p>User Registered Succesfull</p>
      ) : (
        <p>Username already exists</p>
      )}
    </div>
  );
}
export default Registration;
