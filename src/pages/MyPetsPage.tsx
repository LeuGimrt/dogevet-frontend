import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { SectionContainer } from "../containers/SectionContainer";
import { Pet } from "../types/dataTypes";
import petsApi from "../config/axios";
import { ContainerLinkButton } from "../elements/Button";
import { H3 } from "../elements/Heading";
import LoadingPage from "./LoadingPage";
import PetCard from "../components/PetCard";
import useMyPets from "../hooks/useMyPets";

const MyPetsPage = () => {
  const { isLoading, myPets } = useMyPets();

  if (isLoading) return <LoadingPage title='Mis mascotas 🐶' />;

  return (
    <SectionContainer
      flex
      fullheight
      flexDirection='column'
      alignItems='center'
      py={3}
    >
      <H3>Mis mascotas 🐶</H3>
      {myPets.length == 0 ? (
        <>
          <div style={{ padding: "2rem" }}>
            Aún no tiene mascotas registradas 😮 <br />
          </div>
          <Link to='/pets/new'>Ir a registro</Link>
        </>
      ) : (
        myPets.map((pet) => (
          <ContainerLinkButton
            key={pet.id}
            style={{ width: "100%" }}
            to={`/pets/${pet.id}`}
          >
            <PetCard pet={pet} />
          </ContainerLinkButton>
        ))
      )}
    </SectionContainer>
  );
};

export default MyPetsPage;
