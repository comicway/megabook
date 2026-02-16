import { calculateStreak } from './streak';

test('deberia devolver 1 si el dia anterior es true', () => {

    const days = {
        0: true,
        1: true,
        2: false,
        3: true,
        4: false,
        5: true,
        6: true
    };
    expect(calculateStreak(days)).toBe(1);
});