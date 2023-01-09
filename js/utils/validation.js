function emailValidator(email) {
  const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
  return email.match(regEx) ? true : false;
}

function passwordValidator(password, confirmPassword) {
  console.log(password);
  console.log(confirmPassword);
  if (!password) {
    return false;
  }
  if (!confirmPassword) {
    return false;
  }
  if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
}

export { emailValidator, passwordValidator };
