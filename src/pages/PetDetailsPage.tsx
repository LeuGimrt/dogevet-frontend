import { useParams } from "react-router-dom";

import styled from "styled-components";

import { SectionContainer } from "../containers/SectionContainer";
import { H1, H4, H2, H6 } from "../elements/Heading";
import Card from "../components/Card";
import { StackContainer } from "../containers/StackContainer";
import { Small } from "../elements/Small";
import usePetDetails from "../hooks/usePetDetails";

const PetDetailsPage = () => {
  const { petId } = useParams();

  const { petDetails } = usePetDetails(petId!);

  const calcTotalDebt = (costos: number[]) => {
    const reducer = (acc: number, curr: number) => acc + curr;
    return costos.reduce(reducer);
  };

  if (!petDetails) return <div>Cargando...</div>;

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
      <Card style={{ margin: "20px auto" }} size='lg'>
        <StackContainer>
          <ExtraInfo>
            <ResponsiveImg src={petDetails.img} alt={petDetails.name} />
          </ExtraInfo>
          <DogInfo>
            <H4 style={{ marginBottom: 0 }}>{petDetails.name}</H4>
            <Small style={{ margin: 0 }}>{petDetails.id}</Small>
            <br />
            <br />
            <hr />
            <br />
            <strong>Tipo de mascota: </strong>
            {petDetails.type} <br /> <br />
            <strong>Fecha de registro: </strong>
            {String(petDetails.registered_at).slice(0, 10)} <br /> <br />
            <strong>Género: </strong>
            {petDetails.sex == "FEMALE" ? "Hembra" : "Macho"} <br /> <br />
            {petDetails.consultations.length > 0 && (
              <strong style={{ fontSize: "1.3rem" }}>
                Deuda total: S/.
                {calcTotalDebt(
                  petDetails.consultations.map((consultation) =>
                    parseFloat(consultation.cost)
                  )
                )}
              </strong>
            )}
          </DogInfo>
        </StackContainer>
      </Card>
      <H2 style={{ fontSize: "1.6rem" }}>Consultas realizadas</H2>
      <Card style={{ padding: "1em", margin: "15px 0" }} size='lg'>
        {petDetails.consultations.map((consultation) => (
          <>
            <StackContainer style={{ padding: "1em 15px" }}>
              <ExtraInfo>
                <H6 center>Veterinario</H6>
                <strong>
                  Nombre:{" "}
                  {consultation.registered_by.firstname +
                    " " +
                    consultation.registered_by.lastname}
                </strong>

                <strong>Correo: {consultation.registered_by.email}</strong>
                <strong>Teléfono: {consultation.registered_by.phone}</strong>
              </ExtraInfo>
              <ConsultInfo>
                <H6>Consulta {consultation.id}</H6>
                <strong>Síntomas: </strong>
                <p>{consultation.symptoms}</p> <br />
                <strong>Medicina: </strong>
                <p>{consultation.medicine}</p> <br />
                <strong>Fecha de consulta: </strong>
                <p>{String(consultation.registered_at).slice(0, 10)}</p> <br />
                <strong>Rayos X</strong> <br /> <br />
                <div>
                  <img
                    style={{ maxWidth: "90%", maxHeight: "400px" }}
                    src={consultation.x_ray_img}
                    alt='Rayos x'
                  />
                </div>
                <br />
                <H6 style={{ textAlign: "end" }}>
                  Costo de la consulta: {consultation.cost}
                </H6>
              </ConsultInfo>
            </StackContainer>
            <hr />
          </>
        ))}
      </Card>
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

const DogInfo = styled.div`
  padding: 1em 2em;
  color: #000;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ExtraInfo = styled.div`
  text-align: center;
  width: 250px;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  & strong {
    margin: 15px 0;
    display: block;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    width: 100%;
    border-right: 1px solid none;
  }
`;

const ConsultInfo = styled.div`
  padding: 0 15px;
  & strong {
    font-weight: 600;
  }
`;

export default PetDetailsPage;
