// Utility functions for formatting
export const formatters = {
    currency: (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
    },

    date: (dateString) => {
        return new Date(dateString).toLocaleString('en-PH', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    },

    number: (num, padLength = 2) => {
        return num.toString().padStart(padLength, '0');
    }
};