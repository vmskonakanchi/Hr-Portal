export const registerValidation = (values) => {
  const errors = {};
  if (!values.employeeId) {
    errors.employeeId = "Required";
  }
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  }
  if (!values.roles) {
    errors.roles = "Required";
  }
  if (!values.department) {
    errors.department = "Required";
  }
  return errors;
};

export const loginValidation = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};
