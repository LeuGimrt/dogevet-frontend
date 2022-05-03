import { useEffect, useState } from "react";
import dogsApi from "../config/axios";
import { PetDetails as PetDetailsType } from "../types/dataTypes";
import toast from "react-hot-toast";

const usePetDetails = (dogId: string) => {
  const [petDetails, setPetDetails] = useState<PetDetailsType>();

  useEffect(() => {
    loadDogDetails();
  }, []);

  const loadDogDetails = async () => {
    try {
      const res = await dogsApi.get<PetDetailsType>(`/dogs/details/${dogId}`);
      setPetDetails(res.data);
    } catch (error) {
      toast.error("Ocurrió un error");
    }
  };

  return {
    petDetails,
  };
};

export default usePetDetails;
