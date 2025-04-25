import Joi from 'joi';

export const createPersonnelSchema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  role: Joi.string().valid('Admin', 'HR', 'Employee', 'Payroll_Manager', 'Recruiter', 'Manager').required(),
  personnel: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    middle_name: Joi.string().allow(''),
    date_of_birth: Joi.date().iso(),
    gender: Joi.string().valid('Male', 'Female', 'Other'),
    civil_status: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed'),
    contact_number: Joi.string().allow(''),
    address: Joi.string().allow(''),
    department_id: Joi.string().uuid(),
    designation: Joi.string().allow(''),
    employment_type: Joi.string().valid('Regular', 'Contractual', 'Part_time', 'Temporary', 'Consultant').required(),
    date_hired: Joi.date().iso(),
    salary: Joi.number().min(0),
    gsis_number: Joi.string().allow(''),
    pagibig_number: Joi.string().allow(''),
    philhealth_number: Joi.string().allow(''),
    sss_number: Joi.string().allow(''),
    tin_number: Joi.string().allow('')
  }).required()
});

export const updatePersonnelSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  role: Joi.string().valid('Admin', 'HR', 'Employee', 'Payroll_Manager', 'Recruiter', 'Manager'),
  personnel: Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    middle_name: Joi.string().allow(''),
    date_of_birth: Joi.date().iso(),
    gender: Joi.string().valid('Male', 'Female', 'Other'),
    civil_status: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed'),
    contact_number: Joi.string().allow(''),
    address: Joi.string().allow(''),
    department_id: Joi.string().uuid(),
    designation: Joi.string().allow(''),
    employment_type: Joi.string().valid('Regular', 'Contractual', 'Part_time', 'Temporary', 'Consultant'),
    date_hired: Joi.date().iso(),
    salary: Joi.number().min(0),
    gsis_number: Joi.string().allow(''),
    pagibig_number: Joi.string().allow(''),
    philhealth_number: Joi.string().allow(''),
    sss_number: Joi.string().allow(''),
    tin_number: Joi.string().allow('')
  })
}); 