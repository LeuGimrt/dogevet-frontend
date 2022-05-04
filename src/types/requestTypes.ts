export type NewPetData = {
  name: string;
  b_date: string;
  type: string;
  sex: "M" | "F";
};

export type NewConsultationData = {
  pet_id: string;
  symptoms: string;
  medicine: string;
  cost: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
};
