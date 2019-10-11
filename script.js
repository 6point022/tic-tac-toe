const game = (() => { 
	let gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	let totalMoves = 0;

	const switchTurn = () => {
		let temp = player1.turn;
		player1.turn = player2.turn;
		player2.turn = temp;
	};

	const checkWinner = () => {
		let gameWon = false;
		
		for (let i = 0; i < 9; i += 3) {
			if (gameboard[i] == gameboard[i + 1] && gameboard[i + 1] == gameboard[i + 2])
				gameWon = true;
		}

		for (let i = 0; i < 3; i++) {
			if (gameboard[i] == gameboard[i + 3] && gameboard[i + 3] == gameboard[i + 6])
				gameWon = true;
		}

		if (gameboard[0] == gameboard[4] && gameboard[4] == gameboard[8])
			gameWon = true;

		if (gameboard[2] == gameboard[4] && gameboard[4] == gameboard[6])
			gameWon = true;

		return gameWon;
	}

	return {gameboard, totalMoves, switchTurn, checkWinner}
})();

const Player = (name, id, move) => {
	this.name = name;
	this.id = id;
	this.move = move;
	this.turn = false;

	return {name, id, move, turn};
};

const player1 = Player('Player 1', 1, 'X');
const player2 = Player('Player 2', 2, 'O');


for (let i = 0; i < 9; i++) {
	game.gameboard[i] = i + 1;
}

let boxes = document.querySelectorAll('td');
let newGame = document.querySelector('button');


for (let i = 0; i < boxes.length; i++) {
	const element = boxes[i];
	element.setAttribute('id', 'box' + (i + 1).toString(10));
}

player1.turn = true;
document.getElementById('player1').setAttribute('class', 'player-move');

boxes.forEach(box => {
	box.addEventListener('click', () => {
		
		if(box.innerText == 'X' || box.innerText == 'O')
			return;
		
		if (player1.turn) {
			box.innerText = player1.move;

			document.getElementById('player1').removeAttribute('class');
			document.getElementById('player2').setAttribute('class', 'player-move');
		
		}

		else {
			box.innerText = player2.move;

			document.getElementById('player2').removeAttribute('class');
			document.getElementById('player1').setAttribute('class', 'player-move');
		}

		let boxId = box.getAttribute('id')
		let index = boxId.charAt(boxId.length - 1) - 1;

		game.gameboard[index] = box.innerText;
		console.log(game.gameboard);

		if (game.checkWinner()) {
			let winnerName;

			if (player1.turn)
				winnerName = player1.name;
			else
				winnerName = player2.name;

			document.querySelector('body').innerHTML += `<h2>${winnerName} wins!</h2>`;

			newGame = document.querySelector('button');

			newGame.addEventListener('click', () => {
				window.location.reload();
			})
		}

		else {
			
			if(++game.totalMoves == 9) {
				document.querySelector('body').innerHTML += `<h2>It's a tie!</h2>`;
			}

			newGame = document.querySelector('button');

			newGame.addEventListener('click', () => {
				window.location.reload();
			})
		}

		game.switchTurn();
	});
});

newGame.addEventListener('click', () => {
	window.location.reload();
})




