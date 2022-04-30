import * as Yup from "yup";

// Login validations

const emailValidation = Yup.string()
  .trim()
  .max(100, "El máximo de caracteres es de 100")
  .email("Debe tener un formato adecuado")
  .required("Requerido");

const passwordValidation = Yup.string()
  .trim()
  .min(8, "La contraseña debe tener un mínimo de 8 caracteres")
  .max(20, "El máximo de caracteres es de 20")
  .required("Requerido");

// Register validations

const nameValidation = Yup.string()
  .trim()
  .max(50, "El máximo de caracteres es de 50")
  .required("Requerido");

const phoneValidation = Yup.string()
  .trim()
  .length(9, "Debe tener 9 dígitos")
  .matches(/^[0-9]+$/, "Debe tener 9 dígitos")
  .required("Requerido");

const passwordRegexValidation = Yup.string()
  .trim()
  .min(8, "La contraseña debe tener un mínimo de 8 caracteres")
  .matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    "Debe coincidir con el formato"
  )
  .max(20, "El máximo de caracteres es de 20")
  .required("Requerido");

// New dog validations

const genderValidation = Yup.string()
  .trim()
  .oneOf(["0", "1"], "Debe ser masculino o femenino")
  .required("Requerido");

const bDateValidation = Yup.date().required("Requerido");

// Validation objects

export const loginValidations = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export const registerValidations = Yup.object({
  firstname: nameValidation,
  lastname: nameValidation,
  phone: phoneValidation,
  email: emailValidation,
  password: passwordRegexValidation,
});

export const newDogValidations = Yup.object({
  name: nameValidation,
  breed: nameValidation,
  gender: genderValidation,
  b_date: bDateValidation,
});
