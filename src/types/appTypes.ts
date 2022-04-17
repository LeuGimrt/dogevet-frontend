export type ErrorResponse = {
  error: {
    message: string;
  };
};

export type AxiosErrorResponse = {
  response: {
    data: ErrorResponse;
  };
};

export type LoginResponse = {
  user: User;
  token: string;
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  registered_at: Date;
  dogs: Dog[];
};

export type Dog = {
  id: string;
  name: string;
  breed: string;
  gender: number;
  b_date: string;
  img: string;
  registered_at: Date;
  registered_by_id: string;
};

export type DogDetails = {
  id: string;
  name: string;
  breed: string;
  gender: number;
  b_date: string;
  img: string;
  registered_at: string;
  registered_by_id: string;
  consultations: Consultation[];
};

export type Consultation = {
  id: string;
  symptoms: string;
  x_ray_img: string;
  registered_at: string;
  blood_test: string;
  medicine: string;
  cost: string;
  registered_by: User;
  registered_by_id: string;
  dog_id: number;
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

// export type RegisteredBy = {
//   id: number;
//   firstname: string;
//   lastname: string;
//   email: string;
//   phone: string;
//   password: string;
//   role: string;
//   registered_at: string;
// };

export type SearchState = "idle" | "searching" | "results-done";
