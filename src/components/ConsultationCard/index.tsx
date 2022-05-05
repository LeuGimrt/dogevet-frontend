import { StackContainer } from "../../containers/StackContainer";
import { Consultation } from "../../types/dataTypes";
import styled from "styled-components";
import { H6 } from "../../elements/Heading";

type Props = {
  consultation: Consultation;
};

const ConsultationCard = ({ consultation }: Props) => {
  return (
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
  );
};

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

export default ConsultationCard;
