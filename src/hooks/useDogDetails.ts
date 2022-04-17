import { useEffect, useState } from "react";
import dogsApi from "../config/axios";
import { DogDetails } from "../types/appTypes";
import toast from "react-hot-toast";

const useDogDetails = (dogId: string) => {
  const [dogDetails, setDogDetails] = useState<DogDetails>();

  useEffect(() => {
    loadDogDetails();
  }, []);

  const loadDogDetails = async () => {
    try {
      const res = await dogsApi.get<DogDetails>(`/dogs/details/${dogId}`);
      setDogDetails(res.data);
    } catch (error) {
      toast.error("Ocurrió un error");
    }
  };

  return {
    dogDetails,
  };
};

export default useDogDetails;
