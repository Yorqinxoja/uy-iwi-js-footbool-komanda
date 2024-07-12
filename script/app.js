function getPlayers() {
    return JSON.parse(localStorage.getItem('players')) || [];
}
function savePlayers(players) {
    localStorage.setItem('players', JSON.stringify(players));
}

function displayPlayers(players) {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    players.forEach(player => {
        playerList.innerHTML += `<p>${player.name} (Age: ${player.age}) - Club: ${player.club}</p>`;
    });
}

document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const club = document.getElementById('club').value;
    
    const player = { name, age, club };
    
    let players = getPlayers();
    players.push(player);
    savePlayers(players);
    displayPlayers(players);
    
    this.reset();
});

document.addEventListener('DOMContentLoaded', function() {
    displayPlayers(getPlayers());
});

function filterByClub() {
    const filterClub = document.getElementById('filterClub').value;
    const players = getPlayers();
    const filteredPlayers = players.filter(player => player.club.toLowerCase() === filterClub.toLowerCase());
    displayPlayers(filteredPlayers);
}

function transferPlayer() {
    const transferName = document.getElementById('transferName').value;
    const newClub = document.getElementById('newClub').value;
    
    let players = getPlayers();
    players = players.map(player => {
        if (player.name.toLowerCase() === transferName.toLowerCase()) {
            player.club = newClub;
        }
        return player;
    });
    
    savePlayers(players);
    displayPlayers(players);
}
