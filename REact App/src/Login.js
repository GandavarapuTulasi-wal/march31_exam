import axios from 'axios';
import { useState } from 'react';
import useLocalStorage from 'use-local-storage';

function Login() {
  const [status, setStatus] = useState(0);
  const [token, setToken] = useLocalStorage('token', '');
  const [userDetails, setUserDetails] = useState([]);
  const login = (event) => {
    event.preventDefault();
    let userObject = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    axios
      .post('/users/login', userObject)
      .then((res) => {
        console.log(res.data);
        setStatus(res.data.status);
        setToken(res.data.token);
      })
      .catch((error) => {
        console.log(error);
        setStatus(error.status);
      });
  };
  return (
    <div className="card-container">
      <h1>Login Form</h1>
      <form onSubmit={login} className="box">
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

        <button>Login</button>
        {status ? (
          <p>User Registered Succesfull</p>
        ) : (
          <p>Username already exists</p>
        )}
      </form>
    </div>
  );
}
export default Login;
