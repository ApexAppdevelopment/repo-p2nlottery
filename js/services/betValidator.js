// Bet Validation Service
import { CONSTANTS } from '../config/constants.js';
import { fundManager } from './fundManager.js';

export class BetValidator {
    static validateBet(betAmount, selectedNumbers, expectedPayout) {
        const errors = [];
        
        // Validate bet amount
        if (!this._isValidBetAmount(betAmount)) {
            errors.push(`Minimum bet amount is ${CONSTANTS.CURRENCY_SYMBOL}${CONSTANTS.MIN_BET_AMOUNT}`);
        }

        // Validate number selection
        if (!this._isValidNumberSelection(selectedNumbers)) {
            errors.push(`Please select exactly ${CONSTANTS.MAX_NUMBERS_SELECTION} numbers`);
        }

        // Validate against fund capacity
        const fundCheck = fundManager.canPlaceBet(expectedPayout);
        if (!fundCheck.allowed) {
            errors.push(fundCheck.reason);
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings: fundCheck.warningThresholdReached ? 
                ['Fund balance is reaching safety threshold'] : []
        };
    }

    static _isValidBetAmount(amount) {
        return !isNaN(amount) && amount >= CONSTANTS.MIN_BET_AMOUNT;
    }

    static _isValidNumberSelection(numbers) {
        return Array.isArray(numbers) && 
               numbers.length === CONSTANTS.MAX_NUMBERS_SELECTION;
    }
}