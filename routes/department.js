const router = require('express').Router();
const { createDepartment,  getAllDepartment } = require("../controller/department");

// Create Department
// Swagger Definition
/**
 * @swagger
 * /department/createDepartment:
 *   post:
 *     description: Create an employee
 *     parameters:
 *       - name: Request body
 *         in: body
 *         description: Request body object
 *         schema:
 *           type: object
 *           required: 
 *             - name
 *           properties:
 *             name: 
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
router.post('/createDepartment', createDepartment);
router.get('/getAllDepartment', getAllDepartment)

module.exports = router;