// Common validation utilities
export const validators = {
    isPositiveNumber: (value) => {
        return !isNaN(value) && value > 0;
    },

    isWithinRange: (value, min, max) => {
        return value >= min && value <= max;
    },

    isValidName: (name) => {
        return name.trim().length >= 2;
    },

    hasValidLength: (array, requiredLength) => {
        return array.length === requiredLength;
    }
};