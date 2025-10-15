import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2.jsx';
import SearchItem from './components/SearchItem';
import RegisterForm from './components/RegisterForm';
import SearchAccount from './components/SearchAccount';
import FormComponent from './components/FormComponent';


function App() {
  return (
    <div style={{ padding: 20 }}>
      <CounterComponent />
      <hr />
      <LightSwitch />
      <hr />
      <LoginForm />
      <hr />
      <LoginForm2 />
      <hr />
      <SearchItem />
      <hr />
      <SearchAccount />
      <hr />
      <RegisterForm />
      <hr />
      <FormComponent />
    </div>
  );
}

export default App;
