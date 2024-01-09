import { useState } from 'react'
import Cookies from 'universal-cookie'

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
    });
  }

  handlePasswordChange = (event) => {
    this.setState({password:event.target.value});
  }

  handleUserNameChange = (event) => {
    this.setState({username:event.target.value});
  }

  ifResponseOk(response){
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    }else{
      throw Error(response.statusText);
    }
  }

  login = (event) => {
    event.preventDefault();
    //make a post request to api/login
    fetch("/api/login/",{
      method: "POST",
      headers: {
        "content-Type":"application/json",
        "X-CSRFToken": cookies.get("csrftoken"), //includes csrf token
      },
      credentials: "same-origin",
      body: JSON.stringify(
        {username: this.state.username,
        password: this.state.password})
        .then(this.ifResponseOk)
        .then((data)=>{
          console.log(data);
          this.setState({isauthenticated:true, username:"",
        password:"", error:""});
        })
        .catch((err)=>{
          console.log(err);
          this.setState({error: "Wrong username or password"})
        })
    })
  }
}

