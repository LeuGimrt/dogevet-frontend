import { useContext, useState } from "react";
import toast from "react-hot-toast";
import dogsApi from "../config/axios";
import Card from "../components/Card";
import { AvatarImg } from "../components/Navbar/styles";
import TextField from "../components/TextField";
import { SectionContainer } from "../containers/SectionContainer";
import { StackContainer } from "../containers/StackContainer";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../elements/Button";
import { H1 } from "../elements/Heading";
import useForm from "../hooks/useForm";
import { User } from "../types/appTypes";

const ProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);
  const { firstname, lastname, phone, form, setFormValue, onChange } = useForm({
    firstname: user?.firstname,
    lastname: user?.lastname,
    phone: user?.phone,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("alo");

    dogsApi
      .put<User>("/user/edit", form)
      .then((res) => {
        toast.success("Información actualizada");
        updateUser(res.data);
      })
      .catch((err) => toast.error("No se logró actualizar la información"));
  };

  return (
    <SectionContainer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "50px 15px",
      }}
    >
      <StackContainer gap={1}>
        <div style={{ padding: "1.5em" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AvatarImg
              src='https://cdn-icons-png.flaticon.com/512/147/147144.png'
              alt='Usuario'
              size={100}
            />
          </div>
          <br />
          <strong>Nombres: </strong> {user?.firstname! + " " + user?.lastname!}{" "}
          <br />
          <br />
          <strong>Correo: </strong> {user?.email} <br />
          <br />
          <strong>Teléfono: </strong> {user?.phone} <br />
          <br />
          <Button
            size='sm'
            bgcolor='secondary'
            onClick={() => setIsActive((value) => !value)}
          >
            Editar
          </Button>
        </div>
        <Card size='md' style={{ padding: "1.5em" }}>
          <H1 center style={{ fontSize: "2rem" }}>
            Información personal
          </H1>
          <form onSubmit={handleSubmit}>
            <TextField
              name='firstname'
              label='Nombres'
              handleChange={({ currentTarget: { value } }) =>
                onChange(value, "firstname")
              }
              value={firstname}
              required
              disabled={!isActive}
            />
            <TextField
              handleChange={({ currentTarget: { value } }) =>
                onChange(value, "lastname")
              }
              value={lastname}
              label='Apellidos'
              name='lastname'
              required
              disabled={!isActive}
            />
            <TextField
              handleChange={({ currentTarget: { value } }) =>
                onChange(value, "phone")
              }
              value={phone}
              label='Teléfono'
              name='phone'
              pattern='^[0-9]{9}$'
              type='tel'
              required
              disabled={!isActive}
            />
            <TextField
              handleChange={() => {}}
              value={user?.email}
              label='Correo'
              name='email'
              disabled
              placeholder='Ingrese la medicina...'
            />
            <TextField
              handleChange={() => {}}
              value={user?.role === "ADMIN" ? "Veterinario" : "Usuario"}
              label='Estado'
              name='role'
              disabled
            />

            <Button
              bgcolor='dark'
              size='sm'
              className='btn btn-success'
              type='submit'
              fullWidth
              style={{ margin: "20px 0" }}
            >
              Actualizar información
            </Button>
          </form>
        </Card>
      </StackContainer>
    </SectionContainer>
  );
};

export default ProfilePage;
