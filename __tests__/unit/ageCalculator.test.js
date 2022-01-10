it("should return the age (years) from the difference between the date now and the user birthday", () => {
  const ageCalculator = (userBirthday) => {
    //Date difference (in milliseconds)
    const dateDifferenceMS = Date.now() - new Date(userBirthday);

    //Function to convert milliseconds to years | Função para converter milissegundos para anos
    const msToYears = (dateDifferenceMS) => {
      // (dateDifferenceMS * (3.17097919837651 * 10-¹¹) is the formula to convert milissecondts do years
      return Math.floor(
        dateDifferenceMS * (3.17097919837651 * Math.pow(10, -11))
      );
    };

    const userAge = msToYears(dateDifferenceMS);
    return userAge;
  };

  expect(ageCalculator("1988-07-27")).toBe(33);
});
