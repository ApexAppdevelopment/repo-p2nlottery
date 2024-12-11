// Fund Management Service
import { FUND_CONFIG } from '../config/fundConfig.js';

class FundManager {
    constructor() {
        this.f2nBudget = this._getStoredBudget() || FUND_CONFIG.INITIAL_F2N_BUDGET;
        this.totalCollected = this._getStoredCollected() || 0;
        this.totalPayouts = this._getStoredPayouts() || 0;
    }

    // Get current available budget
    getAvailableBudget() {
        return this.f2nBudget + this.totalCollected - this.totalPayouts;
    }

    // Check if a bet can be placed based on expected payout
    canPlaceBet(expectedPayout) {
        const availableBudget = this.getAvailableBudget();
        const afterBetBudget = availableBudget - expectedPayout;

        return {
            allowed: afterBetBudget >= FUND_CONFIG.MIN_REQUIRED_BALANCE,
            reason: afterBetBudget < FUND_CONFIG.MIN_REQUIRED_BALANCE ? 
                    'Insufficient F2N budget for potential payout' : '',
            warningThresholdReached: afterBetBudget < (this.f2nBudget * FUND_CONFIG.SAFETY_THRESHOLD)
        };
    }

    // Process a new bet
    processBet(betAmount, expectedPayout) {
        this.totalCollected += betAmount;
        this.totalPayouts += expectedPayout;
        this._storeFundState();
        
        // Return updated fund status
        return {
            availableBudget: this.getAvailableBudget(),
            totalCollected: this.totalCollected,
            totalPayouts: this.totalPayouts
        };
    }

    // Get fund status report
    getFundStatus() {
        const availableBudget = this.getAvailableBudget();
        return {
            initialBudget: FUND_CONFIG.INITIAL_F2N_BUDGET,
            currentBudget: availableBudget,
            totalCollected: this.totalCollected,
            totalPayouts: this.totalPayouts,
            healthStatus: this._calculateHealthStatus(availableBudget)
        };
    }

    // Private methods
    _calculateHealthStatus(availableBudget) {
        const ratio = availableBudget / FUND_CONFIG.INITIAL_F2N_BUDGET;
        if (ratio >= 0.8) return 'Excellent';
        if (ratio >= 0.6) return 'Good';
        if (ratio >= 0.4) return 'Moderate';
        if (ratio >= 0.2) return 'Caution';
        return 'Critical';
    }

    _storeFundState() {
        localStorage.setItem('f2nBudget', this.f2nBudget);
        localStorage.setItem('totalCollected', this.totalCollected);
        localStorage.setItem('totalPayouts', this.totalPayouts);
    }

    _getStoredBudget() {
        return parseFloat(localStorage.getItem('f2nBudget'));
    }

    _getStoredCollected() {
        return parseFloat(localStorage.getItem('totalCollected'));
    }

    _getStoredPayouts() {
        return parseFloat(localStorage.getItem('totalPayouts'));
    }
}

export const fundManager = new FundManager();