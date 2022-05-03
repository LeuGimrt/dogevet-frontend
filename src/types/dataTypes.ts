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
  pets: Pet[];
};

export type Pet = {
  id: number;
  name: string;
  type: string;
  sex: string;
  b_date: string;
  img: string;
  registered_at: string;
  registered_by_id: number;
};

export type PetDetails = Pet & {
  consultations: Consultation[];
};

export type Consultation = {
  id: number;
  symptoms: string;
  x_ray_img: string;
  registered_at: string;
  medicine: string;
  cost: string;
  registered_by: User;
  registered_by_id: string;
  pet_id: number;
};

export type SearchState = "idle" | "searching" | "results-done";
