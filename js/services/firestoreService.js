// Firestore Service
import { initializeApp } from 'firebase/app';
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    getDoc,
    query,
    where,
    orderBy,
    limit
} from 'firebase/firestore';
import { FIRESTORE_CONFIG } from '../config/firestoreConfig.js';

class FirestoreService {
    constructor() {
        // Initialize Firebase (add your config)
        const firebaseConfig = {
            // Your Firebase config here
        };
        
        const app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);
    }

    // Bet Operations
    async createBet(betData) {
        const betRef = doc(collection(this.db, FIRESTORE_CONFIG.collections.BETS));
        await setDoc(betRef, {
            ...betData,
            timestamp: new Date(),
            status: 'pending'
        });
        return betRef.id;
    }

    async getBetsByAgent(agentId, startDate, endDate) {
        const betsRef = collection(this.db, FIRESTORE_CONFIG.collections.BETS);
        const q = query(
            betsRef,
            where('agentId', '==', agentId),
            where('timestamp', '>=', startDate),
            where('timestamp', '<=', endDate),
            orderBy('timestamp', 'desc')
        );
        return await this.getDocs(q);
    }

    // Fund Operations
    async updateFundRecord(recordData) {
        const recordRef = doc(collection(this.db, FIRESTORE_CONFIG.collections.FUND_RECORDS));
        await setDoc(recordRef, {
            ...recordData,
            timestamp: new Date()
        });
        return recordRef.id;
    }

    async getFundStatus() {
        const configRef = doc(this.db, FIRESTORE_CONFIG.collections.SETTINGS, 'fundConfig');
        return await getDoc(configRef);
    }

    // Draw Operations
    async getUpcomingDraws() {
        const drawsRef = collection(this.db, FIRESTORE_CONFIG.collections.DRAWS);
        const q = query(
            drawsRef,
            where('status', '==', 'scheduled'),
            where('drawTime', '>=', new Date()),
            orderBy('drawTime'),
            limit(10)
        );
        return await this.getDocs(q);
    }

    // Helper Methods
    async getDocs(query) {
        const snapshot = await query;
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
}

export const firestoreService = new FirestoreService();