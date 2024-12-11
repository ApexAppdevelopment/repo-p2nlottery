// Validation Functions
function validateAgentBalance() {
    const betAmount = parseFloat(document.getElementById("betAmount").value);
    const placeBetButton = document.getElementById("placeBetButton");
    const balanceError = document.getElementById("balanceError");

    if (isNaN(betAmount) || betAmount < CONFIG.MIN_BET_AMOUNT) {
        placeBetButton.disabled = true;
        balanceError.innerText = "";
        return false;
    }

    const payoutRatio = parseFloat(document.getElementById("payoutRatio").value);
    const expectedWin = betAmount * payoutRatio;
    const newTotalPayouts = totalPayouts + expectedWin;
    const newTotalCollected = totalCollected + betAmount;

    if (newTotalPayouts > CONFIG.MAX_PAYOUT_RATIO * newTotalCollected) {
        balanceError.innerText = "Cannot place bet. Payouts exceed safety limit.";
        placeBetButton.disabled = true;
        return false;
    }

    if (betAmount > agentBalance) {
        balanceError.innerText = "Insufficient Balance. No Money, No Bet.";
        placeBetButton.disabled = true;
        return false;
    }

    balanceError.innerText = "";
    placeBetButton.disabled = !validateNumberSelection();
    return true;
}

function validateNumberSelection() {
    const numberSelectionError = document.getElementById("numberSelectionError");
    if (selectedNumbers.length !== CONFIG.MAX_NUMBERS_SELECTION) {
        numberSelectionError.innerText = "Please select exactly two numbers.";
        return false;
    }
    numberSelectionError.innerText = "";
    return true;
}