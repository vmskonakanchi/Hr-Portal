const ValidateStatus = (values) => {
  const errors = {}
  if (!values.hrComments) {
    errors.hrComments = 'Please Enter HR Comments'
  }

  // if (!values.developerComments) {
  //   errors.developerComments = 'Please Enter developerComments'
  // }

  // if (!values.comments) {
  //   errors.comments = 'Please Enter Comments'
  // }
  return errors
}

export default ValidateStatus
