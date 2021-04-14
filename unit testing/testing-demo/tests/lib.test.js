const lib = require('../lib');

describe('absolute', () => {
    it('if input is positive it should return positive number', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
        // console.log(result);
    });
    
    it('if input is positive it should return negative number', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('if input is 0 it should return 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
})

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Laxmi');
        expect(result).toMatch(/Laxmi/);
        expect(result).toContain('Laxmi');
    })
})


describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        //Tests never be too specific or too general we have written then in ideal way

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR','AUD', 'USD']))
    })
});

describe('getProduct', () => {
    it('product with given id', () => {
        const result = lib.getProduct(101);
        expect(result).toEqual({ id: 101, price: 10});
    })
});

describe('registerUser', () => {
    it('should return username required when usename is not provided', () => {
        const args = [null, undefined, NaN, 0, '', false];
        args.forEach(arg => {
            expect(() => { lib.registerUser(arg) }).toThrow();
        });
    });

    it('should return user object if it is a valid username', () => {
        const result = lib.registerUser('Laxmi');
        expect(result).toMatchObject({ username: 'Laxmi'});
        expect(result.id).toBeGreaterThan(0);
    });
})