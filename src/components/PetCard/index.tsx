import styled from "styled-components";
import { StackContainer } from "../../containers/StackContainer";
import { H4 } from "../../elements/Heading";
import { Small } from "../../elements/Small";
import { Consultation, Pet, PetDetails } from "../../types/dataTypes";
import Card from "../Card";

type Props = {
  pet: Pet | PetDetails;
  consultations?: Consultation[];
};

const PetCard = ({ pet, consultations }: Props) => {
  const calcTotalDebt = (costos: number[]) => {
    const reducer = (acc: number, curr: number) => acc + curr;
    return costos.reduce(reducer);
  };

  return (
    <Card style={{ margin: "20px auto" }} size='lg'>
      <StackContainer>
        <ImgContainer>
          <ResponsiveImg src={pet.img} alt={pet.name} />
        </ImgContainer>
        <PetInfo>
          <H4 style={{ marginBottom: 0 }}>
            {pet.name} - {pet.id}
          </H4>
          <hr style={{ margin: "1em 0" }} />
          <strong>Tipo de mascota: </strong>
          {pet.type} <br /> <br />
          <strong>Fecha de registro: </strong>
          {String(pet.registered_at).slice(0, 10)} <br /> <br />
          <strong>Sexo: </strong>
          {pet.sex == "FEMALE" ? "Hembra" : "Macho"} <br /> <br />
          {consultations && consultations.length > 0 && (
            <strong style={{ fontSize: "1.3rem" }}>
              Deuda total: S/.
              {calcTotalDebt(
                consultations.map((consultation) =>
                  parseFloat(consultation.cost)
                )
              )}
            </strong>
          )}
        </PetInfo>
      </StackContainer>
    </Card>
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

export default PetCard;
