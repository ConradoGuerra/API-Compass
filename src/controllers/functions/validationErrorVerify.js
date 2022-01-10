module.exports = validationErrorVerify = (errors) =>{

  if (errors.length > 0) {
    const error = new Error(errors[0].msg);
    error.statusCode = 422;
    throw error;
  }
  return
}