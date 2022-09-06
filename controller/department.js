const Employee = require("../models/employee");
const Department = require("../models/department");

const {
    departmentValidationRules
} = require("../utils/validations");

exports.createDepartment = async(req, res) => {

    // Request Body Validation check
    const result = departmentValidationRules(req.body)

    const { value, error } = result; 

    const valid = error == null;

    const existingDepartment = await Department.findOne({
        name: req.body.name
    })
    console.log(`${existingDepartment} line 19`)
    if ( valid && existingDepartment == undefined ) {

        // Create New Department
        try {
            const newDepartment = await new Department({
                name: req.body.name
              });
            newDepartment.save()
            .then((department) => {
                
                // Send success response
                res.status(201).json({
                    success: true,
                    message: "Department created successfully",
                    data: department
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

    // Send response due to validation error
    res.status(422).send({
        success: false,
        message: "Invalid Details"
    })
    }

   
}

exports.getAllDepartment = async (req, res) => {
    
    try {

    await Department.find({})
    .then((departments) => {
        // console.log(departments)
        res.status(200).json({
            success: true,
            data: departments
        })
    })
    .catch((err) => {
        res.status(501).json({
            success: false,
            data: err
        })
    })

    } catch (err) {
        res.status(501).json({
            success: false,
            data: null
        })
    }
    // Get all departments in the department collect
    
}
