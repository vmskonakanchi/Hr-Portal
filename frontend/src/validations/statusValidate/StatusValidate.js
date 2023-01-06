const ValidateStatus = (values) => {
  const errors = {}
  if (!values.status) {
    errors.status = 'Please Enter status'
  }

  return errors
}

export default ValidateStatus
