import { formatDate, calculateDaysLeft } from '../src/client/js/updateUI'; 

describe('formatDate', () => {
    test('should format a valid timestamp correctly', () => {
        expect(formatDate(1710096000000)).toBe('10/03/2024');
    });

    test('should return null if timestamp is missing', () => {
        expect(formatDate(null)).toBeNull();
        expect(formatDate(undefined)).toBeNull();
    });

    test('should handle invalid timestamps gracefully', () => {
        expect(formatDate('invalid')).toBe('NaN/NaN/NaN');
    });
});

describe('calculateDaysLeft', () => {
    test('should return correct days left', () => {
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 5);
        expect(calculateDaysLeft(futureDate.getTime())).toBe('5 day(s)');
    });

    test('should return "Trip is today" if the date is today', () => {
        const today = new Date();
        expect(calculateDaysLeft(today.getTime())).toBe('Trip is today');
    });

    test('should return "Trip has passed" for past dates', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 3);
        expect(calculateDaysLeft(pastDate.getTime())).toBe('Trip has passed');
    });

    test('should return null if timestamp is missing', () => {
        expect(calculateDaysLeft(null)).toBeNull();
        expect(calculateDaysLeft(undefined)).toBeNull();
    });
});
