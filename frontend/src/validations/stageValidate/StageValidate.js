const ValidateStage = (values) => {
  const errors = {}
  if (!values.stage) {
    errors.stage = 'Please Enter stage'
  }

  if (!values.roles) {
    errors.roles = 'Please Enter roles'
  }

  return errors
}

export default ValidateStage
