const supertest = require('supertest');
const app = require("../app");

jest.mock("../controller/employee");

const employeeService = require("../controller/employee");

const mockTdentity = {
    success: true,
    message: "Operation successful",
    status: 200
}

employeeService.createEmployee.mockResolvedValue(mockTdentity);

// Create Employee
it("tests the create Login endpoint", async () => {

    const response = await supertest(app).post('/emloyee/createEmployee').send({
        "username": "dave250",
        "name": "Dave King",
        "email": "davey@gmail.com",
        "position": "Accounts Manager",
        "department": "Accounts"
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(typeof {value: response.body}).toBe('object');

})

jest.setTimeout(70000);