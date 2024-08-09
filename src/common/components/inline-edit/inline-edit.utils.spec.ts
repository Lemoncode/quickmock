import { addPxSuffix, calculateCoordinateValue } from "./inline-edit.utils";

describe('addPxSuffix', () => {
    test("should return 'px' with a postiive number", () => {
        expect(addPxSuffix(10)).toBe('10px');
    })
    test("should return 'px' with a negative number", () => {
        expect(addPxSuffix(-10)).toBe('-10px');
    })
    test("should return 'px' with a zero", () => {
        expect(addPxSuffix(0)).toBe('0px');
    })
    test("should return 'px' with a decimal number", () => {
        expect(addPxSuffix(0.1)).toBe('0.1px');
    })
});

describe('calculateCoordinateValue', () => {
    test("should return the coordinate value multiplied by scale with 'px' suffix", () => {
        expect(calculateCoordinateValue(5, 2)).toBe('10px');
    })
    test("should handle negative values correctly", () => {
        expect(calculateCoordinateValue(-5, 2)).toBe('-10px');
    })
    test("should handle negative scales correctly", () => {
        expect(calculateCoordinateValue(5, -2)).toBe('-10px');
    })
    test("should return '0px' when value is '0'", () => {
        expect(calculateCoordinateValue(0, 2)).toBe('0px');
    })
    test("should return correctly when scale is decimal", () => {
        expect(calculateCoordinateValue(1, 1.5)).toBe('1.5px');
    })
});