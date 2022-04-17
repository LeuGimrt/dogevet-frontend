import { useContext } from "react";

import { SectionContainer } from "../containers/SectionContainer";
import { StackContainer } from "../containers/StackContainer";
import Card from "../components/Card/index";
import { H5, H1 } from "../elements/Heading";
import DiagnosisImg from "../assets/diagnosis.jpg";
import SearchImg from "../assets/veterinary1.jpg";
import RegisterImg from "../assets/veterinary2.jpg";
import ViewDogsImg from "../assets/consult.jpg";
import { ContainerLinkButton } from "../elements/Button";
import { AuthContext } from "../context/AuthContext";
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
          <ContainerLinkButton to='/new-consultation'>
            <Card size='sm'>
              <Card.Media url={DiagnosisImg} alt='Imagen de Diagnosis' />
              <Card.Content>
                <H5 center>Nuevo diagnóstico</H5>
              </Card.Content>
            </Card>
          </ContainerLinkButton>
          <ContainerLinkButton to='/search-dogs'>
            <Card size='sm'>
              <Card.Media url={SearchImg} alt='Imagen de Diagnosis' />
              <Card.Content>
                <H5 center>Búsqueda canina</H5>
              </Card.Content>
            </Card>
          </ContainerLinkButton>
        </StackContainer>
      )}
      <StackContainer gap={3}>
        <ContainerLinkButton to='/register-dog'>
          <Card size='sm'>
            <Card.Media url={RegisterImg} alt='Imagen de Diagnosis' />
            <Card.Content>
              <H5 center>Registro perruno</H5>
            </Card.Content>
          </Card>
        </ContainerLinkButton>
        <ContainerLinkButton to='/view-dogs'>
          <Card size='sm'>
            <Card.Media url={ViewDogsImg} alt='Imagen de Diagnosis' />
            <Card.Content>
              <H5 center>Registro de consultas</H5>
            </Card.Content>
          </Card>
        </ContainerLinkButton>
      </StackContainer>
    </SectionContainer>
  );
};

export default HomePage;
