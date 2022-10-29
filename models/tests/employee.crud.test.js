const Employee = require('../employee.model');
const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', ()=>{
    // ConnectDB
    before(async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
            console.error(err);
        }});
    // READ
    describe('Reading data', () => {
        before(async () => {
            const testEmpOne = new Employee({firstName: "Name1", lastName: "Surname1", departmentID: "dep2"});
            await testEmpOne.save();
            const testEmpTwo = new Employee({firstName: "Name2", lastName: "Surname2", departmentID: "dep2"});
            await testEmpTwo.save();
        });
        after(async () => {
            await Employee.deleteMany();
        });
        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });
        it('should return a proper document by "firstName" with "findOne" method', async () => {
            const expectedName = 'Name1';
            const employee = await Employee.findOne({ firstName: expectedName });
            expect(employee.firstName).to.be.equal(expectedName);
        });
        it('should return a proper document by "lastName" with "findOne" method', async () => {
            const expectedName = 'Surname1';
            const employee = await Employee.findOne({ lastName: expectedName });
            expect(employee.lastName).to.be.equal(expectedName);
        });
    });
    // CREATE
    describe('Creating data', () => {
        after(async () => {
            await Employee.deleteMany();
        });
        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({firstName: "Name1", lastName: "Surname1", departmentID: "dep2"});
            await employee.save();
            expect(employee.isNew).to.be.false;
        });
    });
    // UPDATE
    describe('Updating data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({firstName: "Name1", lastName: "Surname1", departmentID: "dep2"});
            await testEmpOne.save();
            const testEmpTwo = new Employee({firstName: "Name2", lastName: "Surname2", departmentID: "dep2"});
            await testEmpTwo.save();
        });
        afterEach(async () => {
            await Employee.deleteMany();
        });
        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'Name1' }, { $set: { firstName: '=Name1=' }});
            const updatedDepartment = await Employee.findOne({ firstName: '=Name1=' });
            expect(updatedDepartment).to.not.be.null;
        });
        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'Name1' });
            employee.firstName = '=Name1=';
            await employee.save();
            const updatedEmployee = await Employee.findOne({ firstName: '=Name1=' });
            expect(updatedEmployee).to.not.be.null;
        });
        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
            const employees = await Employee.find({ firstName: 'Updated!' });
            expect(employees.length).to.be.equal(2);
        });
    });
    // DELETE
    describe('Removing data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({firstName: "Name1", lastName: "Surname1", departmentID: "dep2"});
            await testEmpOne.save();
            const testEmpTwo = new Employee({firstName: "Name2", lastName: "Surname2", departmentID: "dep2"});
            await testEmpTwo.save();
        });
        afterEach(async () => {
            await Employee.deleteMany();
        });
        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'Name1' });
            const removedEmp = await Employee.findOne({ firstName: 'Name1' });
            expect(removedEmp).to.be.null;
        });
        it('should properly remove one document with "remove" method', async () => {
            const emp = await Employee.findOne({ firstName: 'Name1' });
            await emp.remove();
            const removedEmp = await Employee.findOne({ firstName: 'Name1' });
            expect(removedEmp).to.be.null;
        });
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const removedEmployees = await Employee.find();
            expect(removedEmployees.length).to.be.equal(0);
        });
    });
    // POPULATE
    describe('Removing data', () => {
        beforeEach(async () => {
            const testDepOne = new Department({ name: 'Department #1' });
            await testDepOne.save();
            const testEmpOne = new Employee({firstName: "Name1", lastName: "Surname1", departmentID: testDepOne._id});
            await testEmpOne.save();
        });
        afterEach(async () => {
            await Employee.deleteMany();
            await Department.deleteMany();
        });
        it('should properly populate department data', async () => {
            const emp = await Employee.findOne({firstName: "Name1"}).populate('departmentID');
            const dep = await Department.findOne({ name: 'Department #1' });
            expect(emp.departmentID.name).to.be.equal('Department #1');
        });
    });
});
