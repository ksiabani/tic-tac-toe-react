'use strict';

var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    mountNode = document.getElementById("app"),
    winningCombos = ['001010100', '100010001', '010010010', '111000000', '000111000', '000000111', '001001001', '100100100'];


var TicTacToe = React.createClass({

    getInitialState: function () {
        return {
            players: [
                {
                    name: 'X',
                    moves: [0, 0, 0, 0, 0, 0, 0, 0, 0]
                }, {
                    name: 'O',
                    moves: [0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ],
            tiles: ['', '', '', '', '', '', '', '', ''],
            turn: 0,
            moveNum: 0,
            winnerFound: false
        };
    },

    render: function () {
        return (
            <div className="ticTacToe">
                { this.state.tiles.map(function (tile, position) {
                    return (
                        <Tile status={tile} key={position} position={position} turn={this.state.turn}
                              tileClick={this.tileClick}/>
                    );
                }, this) }
            </div>
        );
    },

    checkWin: function (player) {
        var nMove = parseInt(this.state.players[player].moves.join('').split('').reverse().join(''), 2);
        winningCombos.map(function(combo){
            var nCombo = parseInt(combo, 2);
            if ((nMove & nCombo) === nCombo) {
                this.setState({winnerFound: player === 0 ? 'X' : 'O'});
                console.log("Player " + (player === 0 ? 'X' : 'O') + ' wins!');
            }
        }, this);
    },

    tileClick: function (position, player) {
        var tiles = this.state.tiles;
        var players = this.state.players;
        if (!tiles[position] && !this.state.winnerFound) {
            tiles[position] = player === 0 ? 'X' : 'O';
            players[player].moves[position] = 1;
            this.setState({
                players: players,
                tiles: tiles,
                turn: player === 0 ? 1 : 0,
                checkWin: this.checkWin(player)
            });
        }
    },

    startOver: function() {
        this.setState(this.getInitialState());
    }

});

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

ReactDOM.render(<TicTacToe />, mountNode);
