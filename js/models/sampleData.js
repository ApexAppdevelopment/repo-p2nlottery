// Sample Data for Initial Setup
export const SAMPLE_DATA = {
    settings: {
        fundConfig: {
            initialBudget: 5000000,
            maxPayoutRatio: 0.7,
            safetyThreshold: 0.9,
            minRequiredBalance: 100000,
            lastUpdated: new Date(),
            updatedBy: 'system'
        },
        drawConfig: {
            types: [
                {
                    name: '6/58',
                    label: 'Ultra Lotto 6/58',
                    maxNumber: 58,
                    payoutRatio: 900
                },
                {
                    name: '6/55',
                    label: 'Grand Lotto 6/55',
                    maxNumber: 55,
                    payoutRatio: 850
                },
                // Add other draw types...
            ],
            schedules: [
                {
                    type: '6/58',
                    time: '20:00',
                    daysOfWeek: [1, 3, 5] // Monday, Wednesday, Friday
                },
                // Add other schedules...
            ],
            cutoffMinutes: 30,
            lastUpdated: new Date()
        },
        systemConfig: {
            maintenanceMode: false,
            version: '1.0.0',
            minAppVersion: '1.0.0',
            features: {
                betPlacement: true,
                resultChecking: true,
                reports: true
            }
        }
    },
    agents: [
        {
            agentId: 'F2N 0000-01',
            name: 'Maria Santos',
            balance: 10000,
            status: 'active',
            maxDailyBets: 1000,
            createdAt: new Date(),
            lastLoginAt: new Date(),
            permissions: ['place_bets', 'view_reports']
        }
    ]
};