// Firestore Configuration
export const FIRESTORE_CONFIG = {
    collections: {
        AGENTS: 'agents',
        BETS: 'bets',
        DRAWS: 'draws',
        FUND_RECORDS: 'fundRecords',
        SETTINGS: 'settings'
    },
    indexes: {
        BETS_BY_DATE: ['timestamp', 'agentId'],
        BETS_BY_DRAW: ['drawType', 'drawTime']
    }
};