import { useContext } from "react";

import DiagnosisImg from "../assets/diagnosis.jpg";
import SearchImg from "../assets/veterinary1.jpg";
import RegisterImg from "../assets/veterinary2.jpg";
import ViewDogsImg from "../assets/consult.jpg";

import { AuthContext } from "../context/AuthContext";

import { SectionContainer } from "../containers/SectionContainer";
import { StackContainer } from "../containers/StackContainer";
import Card from "../components/Card/index";
import { H5, H1 } from "../elements/Heading";
import { ContainerLinkButton } from "../elements/Button";
import LoadingPage from "./LoadingPage";

const HomePage = () => {
  const { user, status } = useContext(AuthContext);

  if (status === "checking") return <LoadingPage />;

  return (
    <SectionContainer
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 15px",
        flexDirection: "column",
      }}
    >
      <H1 style={{ fontSize: "2.5rem", marginBottom: 20 }} center>
        Elija una opción para empezar
      </H1>
      {user?.role === "ADMIN" && (
        <StackContainer style={{ marginBottom: 30 }} gap={3}>
          <ContainerLinkButton to='/consultations/new'>
            <Card size='sm'>
              <Card.Media url={DiagnosisImg} alt='Imagen de Diagnosis' />
              <Card.Content>
                <H5 center>Nuevo diagnóstico</H5>
              </Card.Content>
            </Card>
          </ContainerLinkButton>
          <ContainerLinkButton to='/pets/search'>
            <Card size='sm'>
              <Card.Media url={SearchImg} alt='Imagen de Diagnosis' />
              <Card.Content>
                <H5 center>Búsqueda de mascotas</H5>
              </Card.Content>
            </Card>
          </ContainerLinkButton>
        </StackContainer>
      )}
      <StackContainer gap={3}>
        <ContainerLinkButton to='/pets/new'>
          <Card size='sm'>
            <Card.Media url={RegisterImg} alt='Imagen de Diagnosis' />
            <Card.Content>
              <H5 center>Registro de mascotas</H5>
            </Card.Content>
          </Card>
        </ContainerLinkButton>
        <ContainerLinkButton to='/pets/my-pets'>
          <Card size='sm'>
            <Card.Media url={ViewDogsImg} alt='Imagen de Diagnosis' />
            <Card.Content>
              <H5 center>Revisar consultas</H5>
            </Card.Content>
          </Card>
        </ContainerLinkButton>
      </StackContainer>
    </SectionContainer>
  );
};

export default HomePage;
