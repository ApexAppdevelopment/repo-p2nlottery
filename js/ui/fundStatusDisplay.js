// Fund Status Display Component
import { CONSTANTS } from '../config/constants.js';
import { fundManager } from '../services/fundManager.js';

export class FundStatusDisplay {
    static updateDisplay() {
        const status = fundManager.getFundStatus();
        const statusElement = document.getElementById('fundStatus');
        
        statusElement.innerHTML = `
            <div class="info-card fund-status ${this._getStatusClass(status.healthStatus)}">
                <h3>F2N Fund Status</h3>
                <p><strong>Available Budget:</strong> ${CONSTANTS.CURRENCY_SYMBOL}${status.currentBudget.toLocaleString()}</p>
                <p><strong>Total Collected:</strong> ${CONSTANTS.CURRENCY_SYMBOL}${status.totalCollected.toLocaleString()}</p>
                <p><strong>Total Potential Payouts:</strong> ${CONSTANTS.CURRENCY_SYMBOL}${status.totalPayouts.toLocaleString()}</p>
                <p><strong>Fund Health:</strong> <span class="health-status">${status.healthStatus}</span></p>
            </div>
        `;
    }

    static _getStatusClass(status) {
        const statusMap = {
            'Excellent': 'status-excellent',
            'Good': 'status-good',
            'Moderate': 'status-moderate',
            'Caution': 'status-caution',
            'Critical': 'status-critical'
        };
        return statusMap[status] || 'status-normal';
    }
}