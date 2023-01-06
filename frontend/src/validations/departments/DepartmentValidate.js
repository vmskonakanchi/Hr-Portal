const ValidateDepartments = (values) => {
    const errors = {}
    if (!values.departments) {
      errors.departments = 'Please Enter Department'
    }

    return errors
  }

  export default ValidateDepartments
