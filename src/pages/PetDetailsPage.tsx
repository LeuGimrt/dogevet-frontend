import { useParams } from "react-router-dom";

import { SectionContainer } from "../containers/SectionContainer";
import { H1, H2 } from "../elements/Heading";
import Card from "../components/Card";
import usePetDetails from "../hooks/usePetDetails";
import LoadingPage from "./LoadingPage";
import PetCard from "../components/PetCard";
import ConsultationCard from "../components/ConsultationCard";

const PetDetailsPage = () => {
  const { petId } = useParams();

  const { petDetails } = usePetDetails(petId!);

  if (!petDetails) return <LoadingPage />;

  return (
    <SectionContainer
      flex
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      py={5}
    >
      <H1 style={{ fontSize: "2rem" }} center>
        Detalles de {petDetails.name}
      </H1>
      <PetCard pet={petDetails} consultations={petDetails.consultations} />
      <H2 style={{ fontSize: "1.6rem" }}>Consultas realizadas</H2>
      <Card style={{ padding: "1em", margin: "15px 0" }} size='lg'>
        {petDetails.consultations.length === 0 ? (
          <small style={{ textAlign: "center", display: "block" }}>
            Aún no tiene consultas registradas
          </small>
        ) : (
          petDetails.consultations.map((consultation) => (
            <ConsultationCard
              key={consultation.id}
              consultation={consultation}
            />
          ))
        )}
      </Card>
    </SectionContainer>
  );
};

export default PetDetailsPage;
