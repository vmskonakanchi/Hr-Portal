const Validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Please Enter Email'
  }

  if (!values.password) {
    errors.password = 'Please Enter password'
  }

  return errors
}

export default Validate
