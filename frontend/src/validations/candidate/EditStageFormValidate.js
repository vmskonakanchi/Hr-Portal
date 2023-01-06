const ValidateCandidate = (values) => {
    const errors = {}
    if (!values.stage) {
      errors.stage = 'Please Enter stage'
    }
    // if (!values.developers) {
    //   errors.developers = 'Please Enter developers'
    // }
  
    // if (!values.hrMembers) {
    //   errors.hrMembers = 'Please Enter hrMembers'
    // }
  
    if (!values.status) {
      errors.status = 'Please Enter status'
    }
  
    return errors
  }
  
  export default ValidateCandidate
  