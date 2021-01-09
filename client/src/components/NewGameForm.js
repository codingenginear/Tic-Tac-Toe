import React, { Component } from 'react';
import axios from 'axios';
import './NewGameForm.scss'

class NewGameForm extends Component {
  state = {
    playerX: "",
    playerO: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })

  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newGame = {
      playerX: this.state.playerX,
      playerO: this.state.playerO
    }
    const { fetchGameData, setCurrentGameId } = this.props;
    axios
      .post(process.env.REACT_APP_API_URL + "/games", newGame)
      .then((response) => {
        fetchGameData(response.data.id);
      })
      .catch((error) => console.log(error))
    const { toggleGameForm } = this.props;
    toggleGameForm();
    this.handleReset();
  }

  handleReset = () => {
    this.setState({
      playerX: "", 
      playerO: ""
    });
  }


  render() {
    return (
      <form className="new-game-form" onSubmit={this.handleSubmit} >
        <label className="new-game-form__label" htmlFor="playerX">Player X</label>
        <input 
          required
          onChange={this.handleChange} 
          className="new-game-form__input" 
          id="playerX" 
          name="playerX"
          value={this.state.playerX} 
          type="text"/>
        <label className="new-game-form__label" htmlFor="playerO">Player O</label>
        <input 
         required
          onChange={this.handleChange} 
          className="new-game-form__input" 
          id="playerO" 
          name="playerO"
          value={this.state.playerO} 
          type="text"/>
          <button className="new-game-form__button" type="submit">Start</button>
      </form>
    );
  }
}

export default NewGameForm;