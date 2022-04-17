import HeroSection from "../components/HeroSection";
import { SectionContainer } from "../containers/SectionContainer";
import { H3, H5 } from "../elements/Heading";
import { StackContainer } from "../containers/StackContainer";
import Card from "../components/Card";
import DiagnosisImg from "../assets/diagnosis.jpg";
import ConsultImg from "../assets/consult.jpg";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <SectionContainer style={{ padding: "30px 10px" }}>
        <H3 center>Servicios</H3>
        <StackContainer gap={2} justify='center'>
          <Card size='sm'>
            <Card.Media url={DiagnosisImg} alt='Diagnóstico de la mascota' />
            <Card.Content>
              <H5 center>Diagnóstico de su máscota</H5>
              <p style={{ textAlign: "center" }}>
                Se registrarán en el sistema los síntomas, rayos X, medicinas y
                resultados de exámenes para posteriormente facilitar la
                consulta.
              </p>
            </Card.Content>
          </Card>
          <Card size='sm'>
            <Card.Media url={ConsultImg} alt='Diagnóstico de la mascota' />
            <Card.Content>
              <H5 center>Consulta de Información</H5>
              <p style={{ textAlign: "center" }}>
                Puede consultar la información del diagnóstico realizado a su
                mascota, donde apreciará cada detalle almacenado por el sistema.
              </p>
            </Card.Content>
          </Card>
        </StackContainer>
      </SectionContainer>
    </>
  );
};

export default LandingPage;
