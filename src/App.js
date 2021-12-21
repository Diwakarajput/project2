import "./App.css";
import React from "react";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Homes } from "./components/Homes";
import { About } from "./components/About";
import NoteState from "./context/notes/NoteState";
import { Alert } from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
     
      
      {/* <Navbar/>
      <About/>
      <Homes/> */}
      <NoteState>
      <Navbar/>
      <Alert/>
      <div className="container">
      <Switch>
        <Route exact path="/" component={Homes}/>
        <Route  path="/about" component={About}/>
        <Route  path="/login" component={Login}/>
        <Route  path="/signup" component={Signup}/>
      </Switch>
      </div>
      </NoteState>






    </>
  );
}

export default App;
