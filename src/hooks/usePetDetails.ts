import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import petsApi from "../config/axios";
import { PetDetails as PetDetailsType } from "../types/dataTypes";

const usePetDetails = (petId: string) => {
  const [petDetails, setPetDetails] = useState<PetDetailsType>();

  useEffect(() => {
    loadPetDetails();
  }, []);

  const loadPetDetails = async () => {
    try {
      const res = await petsApi.get<PetDetailsType>(`/pets/details/${petId}`);
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
