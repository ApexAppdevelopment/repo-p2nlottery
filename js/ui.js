// UI Related Functions
function updateDrawDetails() {
    const drawType = document.getElementById("drawType").value;
    const details = drawData[drawType];
    
    document.getElementById("prizePool").innerText = details.prizePool;
    document.getElementById("nextJackpot").innerText = details.nextJackpot;
    document.getElementById("payoutRatio").value = details.payoutRatio;
    
    updateLatestResults(details);
    generateNumberGrid(details.maxNumber);
    calculateExpectedWin();
}

function updateLatestResults(details) {
    document.getElementById("latestNumbers").innerText = details.latestResults.numbers;
    document.getElementById("latestPrizePool").innerText = details.latestResults.prizePool;
    document.getElementById("latestWinners").innerText = details.latestResults.winners;
}

function generateNumberGrid(maxNumber) {
    const numberContainer = document.querySelector(".number-selection");
    numberContainer.innerHTML = '';
    
    for(let i = 1; i <= maxNumber; i++) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.innerText = i.toString().padStart(2, '0');
        numberDiv.onclick = () => toggleNumberSelection(i);
        numberContainer.appendChild(numberDiv);
    }
    
    selectedNumbers = [];
    validateNumberSelection();
    updateSelectedNumbersUI();
}

function toggleNumberSelection(num) {
    if (selectedNumbers.includes(num)) {
        selectedNumbers = selectedNumbers.filter(n => n !== num);
    } else if (selectedNumbers.length < CONFIG.MAX_NUMBERS_SELECTION) {
        selectedNumbers.push(num);
    } else {
        alert(`You can only select ${CONFIG.MAX_NUMBERS_SELECTION} numbers.`);
    }
    
    updateSelectedNumbersUI();
    validateNumberSelection();
    validateAgentBalance();
}

function updateSelectedNumbersUI() {
    document.querySelectorAll('.number').forEach(elem => {
        const num = parseInt(elem.innerText);
        elem.classList.toggle('selected', selectedNumbers.includes(num));
    });
}

function calculateExpectedWin() {
    const betAmount = parseFloat(document.getElementById("betAmount").value);
    const payoutRatio = parseFloat(document.getElementById("payoutRatio").value);
    
    const expectedWin = !isNaN(betAmount) && !isNaN(payoutRatio) 
        ? betAmount * payoutRatio 
        : 0;
        
    document.getElementById("expectedWin").innerText = `₱${expectedWin.toLocaleString()}`;
}

function updateBalanceDisplay() {
    document.getElementById("agentBalance").innerText = `₱${agentBalance.toLocaleString()}`;
}

function resetForm() {
    document.getElementById("bettorName").value = "";
    document.getElementById("betAmount").value = "";
    selectedNumbers = [];
    updateSelectedNumbersUI();
    calculateExpectedWin();
    validateAgentBalance();
}

// Initialize UI
window.onload = function() {
    updateDrawDetails();
    validateAgentBalance();
    validateNumberSelection();
    
    // Load betting history from localStorage
    const savedBets = localStorage.getItem('bettingHistory');
    if (savedBets) {
        bets = JSON.parse(savedBets);
    }
};