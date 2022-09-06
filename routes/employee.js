const router = require('express').Router();
const { createEmployee, updateEmployee, getEmployees, deleteEmployee} = require("../controller/employee");


// Swagger Definitions

// Create Employee
/**
 * @swagger
 * /employee/createEmployee:
 *   post:
 *     description: Create an employee
 *     parameters:
 *       - name: Request body
 *         in: body
 *         description: Request body object
 *         schema:
 *           type: object
 *           required: 
 *             - username
 *             - name
 *             - email
 *             - position
 *             - department
 *           properties:
 *             username: 
 *               type: string
 *             name: 
 *               type: string  
 *             email:
 *               type: string
 *             position: 
 *               type: string
 *             department: 
 *               type: string
 *     responses: 
 *       200:
 *         description: Response body object
 *         schema: 
 *           type: object  
 *           properties: 
 *             message:
 *               type: string
 *             success: 
 *               type: boolean
 *       422:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *       500:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *       501:
 *          description: Not implemented
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true] 
 *             
 */
router.post('/createEmployee', createEmployee);


// Update Employee
// Swagger Definition
/**
 * 
 * 
 * 
 */
router.put('/updateEmployee', updateEmployee);

// Get Employees
// Swagger Definition
router.get('/getEmployees', getEmployees);

// Delete Employee
// Swagger Definition
router.delete('/deleteEmployee', deleteEmployee);

module.exports = router;