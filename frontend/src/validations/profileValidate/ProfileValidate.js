const ValidateProfile = (values) => {
  const errors = {}

  if (!values.oldPassword) {
    errors.oldPassword = 'Please Enter oldPassword'
  }

  if (!values.newPassword) {
    errors.newPassword = 'Please Enter newPassword'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please Enter confirmPassword'
  }

  return errors
}

export default ValidateProfile
