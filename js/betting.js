// Betting Related Functions
let agentBalance = CONFIG.INITIAL_BALANCE;
let selectedNumbers = [];
let totalCollected = 0;
let totalPayouts = 0;
let bets = [];

function placeBet() {
    if (!validateAgentBalance() || !validateNumberSelection()) return;

    const bettorName = document.getElementById("bettorName").value.trim();
    const betAmount = parseFloat(document.getElementById("betAmount").value);
    const drawType = document.getElementById("drawType").value;

    if (!bettorName) {
        alert("Please enter the bettor's name.");
        return;
    }

    showConfirmationModal(bettorName, betAmount, drawType);
}

function confirmBet() {
    const bet = createBet();
    processBet(bet);
    saveBetToHistory(bet);
    generateReceipt(bet);
    resetForm();
    closeModal();
}

function createBet() {
    const bettorName = document.getElementById("bettorName").value.trim();
    const betAmount = parseFloat(document.getElementById("betAmount").value);
    const drawType = document.getElementById("drawType").value;
    const expectedWin = parseFloat(document.getElementById("expectedWin").innerText.replace(/[^0-9.-]+/g,""));
    
    return {
        ticketID: generateTicketID(),
        bettorName,
        numbers: selectedNumbers.map(n => n.toString().padStart(2, '0')).join(", "),
        betAmount,
        drawType,
        expectedWin,
        drawTime: drawData[drawType].nextDraw.time,
        timestamp: new Date().toISOString()
    };
}

function generateTicketID() {
    return `F2N-${Math.floor(Math.random() * 9000) + 1000}-01`;
}

function processBet(bet) {
    agentBalance -= bet.betAmount;
    totalCollected += bet.betAmount;
    totalPayouts += bet.expectedWin;
    updateBalanceDisplay();
}

function saveBetToHistory(bet) {
    bets.push(bet);
    localStorage.setItem('bettingHistory', JSON.stringify(bets));
}