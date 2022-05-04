import { NewPetData, NewConsultationData } from "../types/requestTypes";

export const registerInitialState = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  password: "",
};

export const newPetInitialValues: NewPetData = {
  name: "",
  type: "Gato",
  sex: "M",
  b_date: "",
};

export const newConsultationInitialValues: NewConsultationData = {
  pet_id: "",
  symptoms: "",
  medicine: "",
  cost: "",
};

export const petTypeOptions = [
  { label: "Gato", value: "Gato" },
  { label: "Perro", value: "Perro" },
  { label: "Hámster", value: "Hámster" },
  { label: "Pájaro", value: "Pájaro" },
  { label: "Pez", value: "Pez" },
  { label: "Otro", value: "Otro" },
];

export const sexOptions = [
  { label: "Macho", value: "M" },
  { label: "Hembra", value: "F" },
];
