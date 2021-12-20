import enumerations from "../util/enumerations";

export const isValidAnswer = (validation, answer) => {
  if (answer)
    switch (validation?.type) {
      case enumerations.textValidations.EMAIL.value: {
        const pattern = enumerations.textValidations.EMAIL.regExp;
        if (!pattern.test(answer)) {
          return {
            isValid: false,
            message: "Please enter valid email address.",
          };
        } else return { isValid: true };
      }
      case enumerations.textValidations.MOBILE_NUMBER.value: {
        const pattern = enumerations.textValidations.MOBILE_NUMBER.regExp;
        if (!pattern.test(answer)) {
          return {
            isValid: false,
            message: "Please enter valid mobile number.",
          };
        } else return { isValid: true };
      }

      default:
        return { isValid: true };
    }
  else return { isValid: true };
};
