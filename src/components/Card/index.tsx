import { H3 } from "../../elements/Heading";
import { CardContainer, Container, MediaContainer, MediaImg } from "./styles";

type ContainerProps = {
  children: React.ReactNode;
};

type CardProps = ContainerProps & {
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
};

type CardMediaProps = {
  url: string;
  alt: string;
};

const Card = ({ children, size = "md", style = {} }: CardProps) => {
  return (
    <CardContainer size={size} style={style}>
      {children}
    </CardContainer>
  );
};

const Header = ({ title }: { title: string }) => {
  return (
    <>
      <Container>
        <H3>{title}</H3>
      </Container>
      <hr />
    </>
  );
};

const Media = ({ url, alt }: CardMediaProps) => {
  return (
    <MediaContainer>
      <MediaImg src={url} alt={alt} />
    </MediaContainer>
  );
};

const Content = ({ children }: ContainerProps) => {
  return <Container>{children}</Container>;
};

const Actions = ({ children }: ContainerProps) => {
  return (
    <>
      <hr />
      <Container>{children}</Container>
    </>
  );
};

Card.Header = Header;
Card.Media = Media;
Card.Content = Content;
Card.Actions = Actions;

export default Card;
