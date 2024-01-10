import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:"",
      error:"",
      isAuthenticated: false,
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
      if(data.isAuthenticated) {
        this.setState({isAuthenticated: true});
      }else{
        this.setState({isAuthenticated: false});
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

  isResponseOk(response){
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
        .then(this.isResponseOk)
        .then((data)=>{
          console.log(data);
          this.setState({isAuthenticated:true, username:"",
        password:"", error:""});
        })
        .catch((err)=>{
          console.log(err);
          this.setState({error: "Wrong username or password"})
        })
    })
  }

  // logout

  logout = () => {
    fetch("/api/logout",{
      credentials: "same-origin",
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({isAuthenticated:false});
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  render(){

    if (!this.state.isAuthenticated) {
      return(
        <div className="container mt-3">
          <h1>React Cookie Auth</h1>
        </div>
      )
    }

  }

}

export default App;
