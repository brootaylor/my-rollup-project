import { add, divide, square, cube } from './maths';

test('Dummy test', () => {
    const result = 2 * 3;
    expect(result).toBe(6);
});

// Addition test
test('Should add up to 4', () => {
    const result = add(2);
    expect(result).toBe(4);
});

// Division test
test('Division should result in 1', () => {
    const result = divide(10);
    expect(result).toBe(1);
});

// Squared test
test('Squared result should 100', () => {
    const result = square(10);
    expect(result).toBe(100);
});

// Cube test
test('Cubed result should 1000', () => {
    const result = cube(10);
    expect(result).toBe(1000);
});