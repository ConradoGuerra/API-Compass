module.exports = validationErrorVerify = (errors) =>{

  if (errors.length > 0) {
    const error = new Error("Please, insert a valid data.");
    error.statusCode = 422;
    throw error;
  }
  return
}