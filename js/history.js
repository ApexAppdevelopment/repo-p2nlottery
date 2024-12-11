// Betting History Page Functions
function loadBettingHistory() {
    const historyContainer = document.getElementById('historyContainer');
    const savedBets = localStorage.getItem('bettingHistory');
    
    if (!savedBets) {
        historyContainer.innerHTML = `
            <div class="no-bets">
                <p>No betting history available</p>
            </div>
        `;
        return;
    }
    
    const bets = JSON.parse(savedBets);
    if (!bets.length) {
        historyContainer.innerHTML = `
            <div class="no-bets">
                <p>No betting history available</p>
            </div>
        `;
        return;
    }
    
    historyContainer.innerHTML = bets.reverse().map(bet => `
        <div class="bet-card">
            <p><strong>Ticket ID:</strong> ${bet.ticketID}</p>
            <p><strong>Bettor:</strong> ${bet.bettorName}</p>
            <p><strong>Numbers:</strong> ${bet.numbers}</p>
            <p><strong>Amount:</strong> ₱${bet.betAmount.toLocaleString()}</p>
            <p><strong>Draw Type:</strong> ${getDrawTypeLabel(bet.drawType)}</p>
            <p><strong>Expected Win:</strong> ₱${bet.expectedWin.toLocaleString()}</p>
            <p><strong>Draw Time:</strong> ${bet.drawTime}</p>
        </div>
    `).join('');
}

function getDrawTypeLabel(drawType) {
    const labels = {
        "6/58": "Ultra Lotto 6/58",
        "6/55": "Grand Lotto 6/55",
        "6/49": "Super Lotto 6/49",
        "6/45": "Mega Lotto 6/45",
        "6/42": "Lotto 6/42",
        "6/59": "Hyper Lotto 6/59"
    };
    return labels[drawType] || drawType;
}

// Initialize history page
window.onload = loadBettingHistory;