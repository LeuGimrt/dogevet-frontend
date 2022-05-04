import { H6 } from "../../elements/Heading";
import { User } from "../../types/dataTypes";
import Card from "../Card";
import { AvatarImg } from "../Navbar/styles";
import { FieldContainer } from "./styles";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <Card size='sm' style={{ alignSelf: "flex-start", padding: "1em 2em" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AvatarImg
          src='https://cdn-icons-png.flaticon.com/512/147/147144.png'
          alt='Usuario'
          size={100}
        />
      </div>
      <br />
      <H6 style={{ textAlign: "center" }}>Veterinario</H6>
      <FieldContainer>
        <strong>Nombres: </strong> {user?.firstname! + " " + user?.lastname!}
      </FieldContainer>
      <FieldContainer>
        <strong>Correo: </strong> {user?.email}
      </FieldContainer>
      <FieldContainer>
        <strong>Teléfono: </strong> {user?.phone}
      </FieldContainer>
    </Card>
  );
};

export default UserCard;
