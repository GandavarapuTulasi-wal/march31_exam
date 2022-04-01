import logo from './logo.svg';
import './App.css';
import { Routes, BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';

function App() {
  return (
    <div className="App">
      <Registration />
      <Login />
    </div>
  );
}

export default App;
