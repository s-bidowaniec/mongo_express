const Employee = require('../employee.model')
const expect = require('chai').expect;
const mongoose = require('mongoose');
const Department = require("../department.model");


describe('Employee', () => {
    // ERROR - lack of required parameters
    it('should throw an error if no "firstName" arg', () => {
        const emp = new Employee({lastName: "Surname", departmentID: "depId"}); // create new Employee, but don't set `firstName` attr value
        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
        });
    });
    it('should throw an error if no "lastName" arg', () => {
        const emp = new Employee({firstName: "Name", departmentID: "depId"}); // create new Employee, but don't set `lastName` attr value
        emp.validate(err => {
            expect(err.errors.lastName).to.exist;
        });
    });
    it('should throw an error if no "departmentID" arg', () => {
        const emp = new Employee({firstName: "Name", lastName: "Surname"}); // create new Employee, but don't set `departmentID` attr value
        emp.validate(err => {
            expect(err.errors.departmentID).to.exist;
        });
    });
    // ERROR - argument type
    it('should throw an error if "firstName" is not a String', () => {
        const cases = [[], {}, undefined];
        for(let caseValue of cases) {
            const emp = new Employee({firstName: caseValue, lastName: "Surname", departmentID: "depId"});
            emp.validate(err => {
                expect(err.errors.firstName).to.exist;
            });
        }
    });
    it('should throw an error if "lastName" is not a String', () => {
        const cases = [[], {}, undefined];
        for(let caseValue of cases) {
            const emp = new Employee({firstName: "Name", lastName: caseValue, departmentID: "depId"});
            emp.validate(err => {
                expect(err.errors.lastName).to.exist;
            });
        }
    });
    it('should throw an error if "departmentID" is not a String', () => {
        const cases = [[], {}, undefined];
        for(let caseValue of cases) {
            const emp = new Employee({firstName: "Name", lastName: "Surname", departmentID: caseValue});
            emp.validate(err => {
                expect(err.errors.departmentID).to.exist;
            });
        }
    });
    // VALID
    it('should not throw an error with proper input data', () => {
        const emp = new Employee({firstName: "Name", lastName: "Surname", departmentID: "depId"}); // create new Employee, but don't set `firstName` attr value
        emp.validate(err => {
            expect(err).to.be.null;
        });
    });
});