import { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { SectionContainer } from "../containers/SectionContainer";
import { Pet } from "../types/dataTypes";
import petsApi from "../config/axios";
import Card from "../components/Card";
import { StackContainer } from "../containers/StackContainer";
import { ContainerLinkButton } from "../elements/Button";
import { H4, H3 } from "../elements/Heading";
import { Small } from "../elements/Small";
import LoadingPage from "./LoadingPage";

const MyPetsPage = () => {
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

  if (isLoading) return <LoadingPage title='Mis mascotas 🐶' />;

  if (myPets.length == 0)
    return (
      <SectionContainer
        flex
        fullheight
        flexDirection='column'
        alignItems='center'
        py={3}
      >
        <H3>Mis mascotas 🐶</H3>
        <div style={{ padding: "2rem" }}>
          Aún no tiene mascotas registradas 😮 <br />
        </div>
        <Link to='/pets/new'>Ir a registro</Link>
      </SectionContainer>
    );

  return (
    <SectionContainer
      flex
      fullheight
      flexDirection='column'
      alignItems='center'
      py={3}
    >
      <H3>Mis mascotas 🐶</H3>
      {myPets.map((pet) => (
        <ContainerLinkButton style={{ width: "100%" }} to={`/pets/${pet.id}`}>
          <Card style={{ margin: "20px auto" }} size='lg'>
            <StackContainer>
              <ImgContainer>
                <ResponsiveImg src={pet.img} alt={pet.name} />
              </ImgContainer>
              <PetInfo>
                <H4 style={{ marginBottom: 0 }}>{pet.name}</H4>
                <Small style={{ margin: 0 }}>{pet.id}</Small>
                <br />
                <br />
                <hr />
                <br />
                <strong>Tipo de mascota: </strong>
                {pet.type} <br /> <br />
                <strong>Fecha de registro: </strong>
                {String(pet.registered_at).slice(0, 10)} <br /> <br />
              </PetInfo>
            </StackContainer>
          </Card>
        </ContainerLinkButton>
      ))}
    </SectionContainer>
  );
};

const ResponsiveImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px 0 0 3px;
  @media (max-width: 768px) {
    max-height: 180px;
    width: 100%;
  }
`;

const PetInfo = styled.div`
  padding: 1em 2em;
  color: #000;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ImgContainer = styled.div`
  width: 200px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default MyPetsPage;
