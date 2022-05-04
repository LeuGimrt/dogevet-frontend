import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import petsApi from "../config/axios";
import { Pet } from "../types/dataTypes";

const useAllPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const res = await petsApi.get<Pet[]>("/pets/all");
      setPets(res.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("No se pudieron obtener las mascotas");
    }
  };

  return {
    pets,
    isLoading,
  };
};

export default useAllPets;
