const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
    // ERROR - lack of required parameters
    it('should throw an error if no "name" arg', () => {
        const dep = new Department({}); // create new Department, but don't set `name` attr value
        dep.validate(err => {
            expect(err.errors.name).to.exist;
        });
    });
    // ERROR - argument type
    it('should throw an error if "name" is not a string', () => {
        const cases = [{}, []];
        for(let name of cases) {
            const dep = new Department({ name });
            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });
    // ERROR - argument length
    it('should throw an error if "name" lengths exceeds range 5-20', () => {
        const cases = ['', 'a', 'aaaa', 'qwertyqwertyqwertyqwe'];
        for(let name of cases) {
            const dep = new Department({ name });
            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });
    // VALID
    it('should not throw an error if "name" is ok', () => {
        const cases = ['qwert', 'department_name', 'qwertyqwertyqwertyqw'];
        for(let name of cases) {
            const dep = new Department({ name });
            dep.validate(err => {
                expect(err).to.be.null;
            });
        }
    });
});
