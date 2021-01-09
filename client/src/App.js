import React, { Component } from 'react';
import axios from 'axios';
import ScoreBoard from './components/ScoreBoard';
import Board from './components/Board';
import NewGameForm from './components/NewGameForm'

import './App.scss';




class App extends Component {
  state = {
    showForm: true,
    scores: [],
    currentGameId: ""
  }
  
  fetchGameData = (gameId) => {
    const id = gameId || "";
    axios
      .get(process.env.REACT_APP_API_URL + '/games')
      .then(response => {
        console.log(response.data);
        this.setState({
          scores: response.data, 
          currentGameId: id
        });
      });
  }

  componentDidMount() {
    this.fetchGameData()
  }

  toggleGameForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    if(this.state.scores.length === 0) {
      return "";
    }
    return (
    <div className="App">
      <h1 className="App__header">TIC TAC TOE</h1>
      <ScoreBoard scores={this.state.scores} />
      {this.state.showForm ? 
        <NewGameForm 
          toggleGameForm={this.toggleGameForm} 
          fetchGameData={this.fetchGameData}
          setCurrentGameId={this.setCurrentGameId} /> : 
        <Board 
          currentGameId={this.state.currentGameId}
          fetchGameData={this.fetchGameData} />}
    </div>
    );
  }
  
}

export default App;
