// Bet Processing Service
import { fundManager } from './fundManager.js';
import { BetValidator } from './betValidator.js';

export class BetProcessor {
    static async processBet(betData) {
        const expectedPayout = this._calculateExpectedPayout(betData);
        
        // Validate bet
        const validation = BetValidator.validateBet(
            betData.amount,
            betData.selectedNumbers,
            expectedPayout
        );

        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }

        // Process the bet with fund manager
        const fundStatus = fundManager.processBet(betData.amount, expectedPayout);

        // Create bet record
        const betRecord = {
            ...betData,
            expectedPayout,
            timestamp: new Date().toISOString(),
            ticketId: this._generateTicketId(),
            fundStatus: {
                availableBudget: fundStatus.availableBudget,
                totalCollected: fundStatus.totalCollected
            }
        };

        // Save bet to history
        this._saveBetToHistory(betRecord);

        return betRecord;
    }

    static _calculateExpectedPayout(betData) {
        return betData.amount * betData.payoutRatio;
    }

    static _generateTicketId() {
        return `F2N-${Math.floor(Math.random() * 9000) + 1000}-${
            new Date().getTime().toString().slice(-4)}`;
    }

    static _saveBetToHistory(betRecord) {
        const history = JSON.parse(localStorage.getItem('bettingHistory') || '[]');
        history.unshift(betRecord);
        localStorage.setItem('bettingHistory', JSON.stringify(history));
    }
}