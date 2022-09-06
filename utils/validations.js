const Joi = require("joi");

const employeeValidationRules = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(1).max(255).required(),
        name: Joi.string().min(1).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        position: Joi.string().min(6).max(255).required(),
        department: Joi.string().min(1).max(255).required(), 
        _id: Joi.string().min(1).max(255) 
    });
    return schema.validate(data);
}

const departmentValidationRules = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required()
    });
    return schema.validate(data);
}

module.exports = {
    employeeValidationRules,
    departmentValidationRules
};