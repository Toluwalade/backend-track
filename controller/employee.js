const Employee = require("../models/employee");
const Department = require("../models/department");
const {
    employeeValidationRules
} = require("../utils/validations");

exports.createEmployee = async(req, res) => {

    const result = employeeValidationRules(req.body)

    const { value, error } = result; 

    const valid = error == null;
    
    const existingEmployee = await Employee.findOne({ username: req.body.username})
    
    const existingDepartment = await Department.findOne({ name: req.body.department })
 
    if ( valid && existingEmployee == undefined && existingDepartment ) {

        try {
            const newEmployee = await new Employee({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                position: req.body.position,
                department: existingDepartment._id
              });
            newEmployee.save()
            existingDepartment.employee.push(newEmployee)
            existingDepartment.save()
            .then(() => {
            
                // Send success response 
                res.status(200).json({
                    success: true,
                    message: "Employee created successfully"
                })

            })
            .catch((err) => {

                 // Send failure response
                 res.status(501).json({
                    success: false,
                    message: err
                })

            })
        } catch(err) {

                // Send failure response
                res.status(500).json({
                    success: false,
                    message: err
                })

        }

    } else {
    
    // Send response due to data validation error
    res.status(422).send({
        success: false,
        message: "Invalid Details"
    })

    }

}

exports.updateEmployee = async (req, res) => {
    
    const result = employeeValidationRules(req.body)

    const { value, error } = result; 

    const valid = error == null;

    const existingEmployee = await Employee.findOne({ username: req.body._id})
    
    const existingDepartment = await Department.findOne({ name: req.body.department })
 
    if ( valid && existingEmployee == undefined && existingDepartment ) {

        try {

            const updatedEmployee = await Employee.findOneAndUpdate( {_id: req.body._id}, {
                
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                position: req.body.position,
                department: existingDepartment._id

            }, { useFindAndModify: false })

            if (updatedEmployee !== null) {
                await Department.updateOne(
                    { "employee": req.body._id},
                    { "$pull": { "employee": req.body._id} }
                )
                existingDepartment.employee.push(updatedEmployee)
                existingDepartment.save()
                .then(() => {

                // Send success response 
                res.status(200).json({
                    success: true,
                    message: "Employee updated successfully"
                })
                
                })
                .catch((err) => {

                // Send failure response
                 res.status(501).json({
                    success: false,
                    message: err
                })

                })
            }

        } catch (err) {
            
          // Send failure response
          res.status(500).json({
            success: false,
            message: err
        })

        }

    } else {

    // Send response due to data validation error
    res.status(422).send({
        success: false,
        message: "Invalid Details"
    })

    }

}

exports.getEmployees = async (req, res) => {
    
    try {
        await Employee.find({})
        .select("-__V")
        .populate( "department", "name",  Department)
        .then((employee) => {
            // console.log(employee)
            res.status(200).json({
                success: true,
                data: employee
            })
        })
        .catch((err) => {
            
            res.status(501).json({
                success: false,
                message: "Operation Failed"
            })

        })
    } catch(err) {

          // Send failure response
          res.status(500).json({
            success: false,
            message: err
        })

    }

}

exports.deleteEmployee = async (req, res) => {
    
    try {

        const employee = await Employee.findOneAndRemove(
            { _id: req.body._id}
        )

        if ( employee !== null ) {
            await Department.updateOne(
                { "employee": req.body._id },
                { "$pull": { "employee": req.body._id} }
            )
            .then(() => {

                 // Send success response
                 res.status(200).json({
                    success: true,
                    message: "Employee Deleted successfully",
                   
                })

            })
            .catch((err) => {

                // Send failure response
                res.status(501).json({
                    success: false,
                    message: err
                })

            })
        }

    } catch(err) {

              // Send failure response
              res.status(500).json({
                success: false,
                message: err
            })

    }

}