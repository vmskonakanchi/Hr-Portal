const ValidateCandidate = (values) => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Please Enter Name'
  } else if (values.name.length > 20) {
    errors.name = 'Name cannot exceed 20 characters'
  }

  if (!values.email) {
    errors.email = 'Please Enter Email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid Email'
  }

  if (!values.phone) {
    errors.phone = 'Please Enter phone'
  } else if (values.phone.length > 10) {
    errors.phone = 'Phone cannot exceed 10 numbers'
  } else if (values.phone.length < 10) {
    errors.phone = 'Phone cannot be less than 10 numbers'
  }

  // if (!values.location) {
  //   errors.location = 'Please Enter location'
  // }

  if (!values.department) {
    errors.department = 'Please Enter department'
  }

  if (!values.qualification) {
    errors.qualification = 'Please Enter Qualification'
  }

  if (!values.stage) {
    errors.stage = 'Please Enter Stage'
  }

  // if (!values.skills) {
  //   errors.skills = 'Please Enter skills'
  // }

  if (!values.experience) {
    errors.experience = 'Please Enter experience'
  }

  if (!values.source) {
    errors.source = 'Please Enter source'
  }

  // if (!values.position) {
  //   errors.position = 'Please Enter position'
  // }

  // if (!values.salary) {
  //   errors.salary = 'Please Enter salary'
  // }

  // if (!values.resume) {
  //   errors.resume = 'Please Enter resume'
  // }

  return errors
}

export default ValidateCandidate
