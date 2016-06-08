'use strict';

var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    mountNode = document.getElementById("app"),
    winningCombos = ['001010100', '100010001', '010010010', '111000000', '000111000', '000000111', '001001001', '100100100']; // Binary string representations of the possible winning combinations

// Tile
var Tile = React.createClass({
    render: function () {
        return (
            <div className="square" onClick={this.clickHandler}>{this.props.status}</div>
        );
    },
    clickHandler: function () {
        this.props.tileClick(this.props.position, this.props.turn);
    }
});

// Status bar
var StatusBar = React.createClass({
    render: function () {
        return (
            <div className="status-bar">
                <div className="status-text">{
                    this.props.statusText}
                </div>
                <button className={this.props.moveNum > 0 ? "status-btn" : "hidden"} onClick={this.props.startOver}>
                    Start Over
                </button>
            </div>
        );
    }
});

// The game
var TicTacToe = React.createClass({

    getInitialState: function () {
        return {
            players: [
                {
                    name: 'X',
                    moves: [0, 0, 0, 0, 0, 0, 0, 0, 0]      // Each player starts with all tiles filled with 0s
                }, {
                    name: 'O',
                    moves: [0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ],
            tiles: ['', '', '', '', '', '', '', '', ''],
            turn: 0,
            moveNum: 0,
            winnerFound: false,
            statusText: ''
        };
    },

    render: function () {
        return (
            <div className="container">
                <h2>Tic Tac Toe with React</h2>
                <div className="ticTacToe">
                    {/* "loop" around available tiles to draw them (9 in total) */}
                    { this.state.tiles.map(function (tile, position) {
                        return (
                            <Tile status={tile} key={position} position={position} turn={this.state.turn}
                                  tileClick={this.tileClick}/>
                        );
                    }, this) }
                </div>
                {/*
                    Add status bar that will hold game state information:
                    * "Status text" let us know who's playing and who's won, if any
                    * Button "Start over" will let the user reset the game
                    * "moveNum" holds the number of current move, maybe used to show how many moves needed for a user to win (not currently used)
                 */}
                <StatusBar
                    statusText={ !this.state.statusText ? 'Player ' + (this.state.turn === 0 ? 'X' : 'O') + ' playing' : this.state.statusText}
                    startOver={this.startOver}
                    moveNum={this.state.moveNum}
                />
            </div>
        );
    },

    // Will bitwise compare each user move against winning combinations to find a winner
    checkWin: function (player) {
        // Caution: we need to join this array TWICE to not mutate the original array (which here is our state)
        // we also need it reversed to perform our bitwise comparison
        var nMove = parseInt(this.state.players[player].moves.join('').split('').reverse().join(''), 2);
        winningCombos.map(function (combo) {
            var nCombo = parseInt(combo, 2);
            if ((nMove & nCombo) === nCombo) {
                // winner found!
                this.setState({
                    winnerFound: player === 0 ? 'X' : 'O',
                    statusText: "Player " + (player === 0 ? 'X' : 'O') + " wins!"
                });
            }
            if (this.state.moveNum === 8 && !this.state.winnerFound) {
                // last move but no winner, tough game...
                this.setState({
                    statusText: "Nobody wins"
                });
            }
        }, this);
    },

    // Click on tile handler
    tileClick: function (position, player) {
        var tiles = this.state.tiles;
        var players = this.state.players;
        var moveNum = this.state.moveNum;
        // Only perform an action if tile has not previously clicked or game is still on
        if (!tiles[position] && !this.state.winnerFound) {
            tiles[position] = player === 0 ? 'X' : 'O';
            players[player].moves[position] = 1;
            this.setState({
                players: players,
                tiles: tiles,
                turn: player === 0 ? 1 : 0,
                checkWin: this.checkWin(player),
                moveNum: moveNum + 1
            });
        }
    },

    // reset state
    startOver: function () {
        this.setState(this.getInitialState());
    }

});

ReactDOM.render(<TicTacToe />, mountNode);
