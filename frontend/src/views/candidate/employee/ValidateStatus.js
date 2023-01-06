const ValidateEmpStatus = (values) => {
  const errors = {}

  if (!values.developerComments) {
    errors.developerComments = 'Please Enter developerComments'
  }

  return errors
}

export default ValidateEmpStatus
