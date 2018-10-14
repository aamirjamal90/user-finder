import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      username: '',
      id: '',
      url: '',
      avatar_url: '',
      loading: true,
      hasError: true
    }
  }

  getUser(username){
    return fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(response => {
      return response;
    })
  }

  async handleSubmit(e){
    e.preventDefault();
    let user = await this.getUser(this.refs.username.value);
    this.setState({
      username: user.login,
      id: user.id,
      url: user.url,
      avatar_url: user.avatar_url,
      loading: false,
      hasError: false
    });
  }


  render() {
    let user;
    if(this.state.username){
      user =
      <div>
        <img alt="user-dp" src={this.state.avatar_url} width={"220px"} />
        <p><strong>Username: </strong>{this.state.username}</p>
        <p><strong>User id: </strong>{this.state.id}</p>
        <p><strong>Profile URL: </strong>
          <a href={"https://github.com/" + this.state.username}>{"https://github.com/" + this.state.username}</a>
        </p>
      </div>
    }
    return (
      <div className="app">
        <header className={"app-header"}>
          <h1>Github Finder</h1>
        </header>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label className={"label-finder"}>Search github user: </label>
          <input className={"input-finder"} ref='username' type="text" placeholder='Enter Username' />
        </form>
        <div className={"user-data"}>
          {user}
        </div>
      </div>
    );
  }
}

export default App;
