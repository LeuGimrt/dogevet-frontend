import { H1, H5 } from "../../elements/Heading";
import { Container, HeroContent } from "./styles";
import { LinkButton } from "../../elements/Button";

const HeroSection = () => {
  return (
    <Container>
      <HeroContent>
        <H1 color='#E2D21C'>Bienvenido a DogeVet</H1>
        <H5 color='#fff'>La plataforma ideal para el cuidado de mascotas</H5>
        <br />
        <LinkButton to='/login' bgColor='primary' size='lg'>
          Empezar &rArr;
        </LinkButton>
      </HeroContent>
    </Container>
  );
};

export default HeroSection;
