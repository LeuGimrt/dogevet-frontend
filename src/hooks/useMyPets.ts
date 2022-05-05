import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import petsApi from "../config/axios";
import { Pet } from "../types/dataTypes";

const useMyPets = () => {
  const [myPets, setMyPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMyPets();
  }, []);

  const loadMyPets = async () => {
    try {
      const res = await petsApi.get<Pet[]>("/pets/");
      setMyPets(res.data);
      setIsLoading(false);
      console.log(res.data);
    } catch (error) {
      toast.error("Ocurrió un error ");
      console.log(error);
    }
  };

  return {
    isLoading,
    myPets,
  };
};

export default useMyPets;
