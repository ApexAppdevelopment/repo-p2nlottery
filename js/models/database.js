// Database Schema Models
export const DATABASE_SCHEMA = {
    // Agents Collection
    agents: {
        fields: {
            agentId: 'string',
            name: 'string',
            balance: 'number',
            status: 'string', // active, suspended, inactive
            maxDailyBets: 'number',
            createdAt: 'timestamp',
            lastLoginAt: 'timestamp',
            permissions: 'array' // ['place_bets', 'view_reports', etc.]
        },
        subcollections: {
            transactions: {
                fields: {
                    type: 'string', // credit, debit, commission
                    amount: 'number',
                    timestamp: 'timestamp',
                    reference: 'string',
                    description: 'string'
                }
            }
        }
    },

    // Bets Collection
    bets: {
        fields: {
            ticketId: 'string',
            agentId: 'string',
            bettorName: 'string',
            selectedNumbers: 'array',
            betAmount: 'number',
            expectedPayout: 'number',
            drawType: 'string',
            drawTime: 'timestamp',
            status: 'string', // pending, won, lost, cancelled
            timestamp: 'timestamp',
            payoutStatus: 'string', // pending, paid, void
            winningAmount: 'number',
            fundStatus: {
                availableBudget: 'number',
                totalCollected: 'number'
            }
        }
    },

    // Draws Collection
    draws: {
        fields: {
            drawType: 'string',
            drawTime: 'timestamp',
            status: 'string', // scheduled, completed, cancelled
            winningNumbers: 'array',
            prizePool: 'number',
            totalBets: 'number',
            totalPayout: 'number',
            winners: 'number'
        },
        subcollections: {
            results: {
                fields: {
                    numbers: 'array',
                    timestamp: 'timestamp',
                    verifiedBy: 'string'
                }
            }
        }
    },

    // Fund Records Collection
    fundRecords: {
        fields: {
            timestamp: 'timestamp',
            type: 'string', // initial, collected, payout, adjustment
            amount: 'number',
            balance: 'number',
            description: 'string',
            reference: 'string',
            recordedBy: 'string'
        }
    },

    // Settings Collection
    settings: {
        documents: {
            fundConfig: {
                fields: {
                    initialBudget: 'number',
                    maxPayoutRatio: 'number',
                    safetyThreshold: 'number',
                    minRequiredBalance: 'number',
                    lastUpdated: 'timestamp',
                    updatedBy: 'string'
                }
            },
            drawConfig: {
                fields: {
                    types: 'array', // [{name, maxNumber, payoutRatio}]
                    schedules: 'array', // [{type, time, daysOfWeek}]
                    cutoffMinutes: 'number',
                    lastUpdated: 'timestamp'
                }
            },
            systemConfig: {
                fields: {
                    maintenanceMode: 'boolean',
                    version: 'string',
                    minAppVersion: 'string',
                    features: 'map' // {featureName: boolean}
                }
            }
        }
    }
};