import { useState } from 'react'
import cookies from 'universal-cookie'

const cookies = new Cookies();

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:"",
      error:"",
      isauthenticated: false,
    };
  }

  componentDidMount = () => {
    this.getSession();
  }

  getSession = () => {
    fetch("/api/session",{
      credentials: "seme-rigin",
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      if(data.isauthenticated) {
        this.setState({isauthenticated: true});
      }else{
        this.setState({isauthenticated: false});
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  whoami = () => {
    fetch("/api/whoami", {
      headers:{"content-Type":"application/json"},
      credentials:"same-origin",
    })
    .then((res)=>res.json())
    .then((data)=> {
      console.log("You're logged in as:" + data.username);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

}

