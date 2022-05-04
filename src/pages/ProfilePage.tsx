import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import petsApi from "../config/axios";
import Card from "../components/Card";
import { AvatarImg } from "../components/Navbar/styles";
import TextField from "../components/TextField";
import { SectionContainer } from "../containers/SectionContainer";
import { StackContainer } from "../containers/StackContainer";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../elements/Button";
import { H1 } from "../elements/Heading";
import { User } from "../types/dataTypes";
import { editUserValidations } from "../utils/validations";
import { Spinner } from "../elements/Spinner";

const ProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        firstname: user?.firstname,
        lastname: user?.lastname,
        phone: user?.phone,
      },
      validationSchema: editUserValidations,
      onSubmit: () => editUser(),
    });

  const editUser = () => {
    setIsSending(true);
    petsApi
      .put<User>("/user/edit", values)
      .then((res) => {
        toast.success("Información actualizada");
        updateUser(res.data);
      })
      .catch((err) => toast.error("No se logró actualizar la información"))
      .finally(() => {
        setIsSending(false);
        setIsActive(false);
      });
  };

  return (
    <SectionContainer
      flex
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      py={5}
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
            bgcolor='dark'
            onClick={() => setIsActive((value) => !value)}
            disabled={isActive}
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
              handleChange={handleChange}
              value={values.firstname}
              required
              disabled={!isActive}
              onBlur={handleBlur}
            />
            <TextField.Validations
              touched={touched.firstname}
              message={errors.firstname}
            />
            <TextField
              handleChange={handleChange}
              value={values.lastname}
              label='Apellidos'
              name='lastname'
              required
              disabled={!isActive}
              onBlur={handleBlur}
            />
            <TextField.Validations
              touched={touched.lastname}
              message={errors.lastname}
            />

            <TextField
              handleChange={handleChange}
              value={values.phone}
              label='Teléfono'
              name='phone'
              pattern='^[0-9]{9}$'
              type='tel'
              required
              disabled={!isActive}
              onBlur={handleBlur}
            />
            <TextField.Validations
              touched={touched.phone}
              message={errors.phone}
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
              bgcolor='primary'
              size='md'
              className='btn btn-success'
              type='submit'
              fullWidth
              style={{ margin: "20px 0" }}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Spinner
                    color='primary'
                    size='xs'
                    style={{ marginRight: 6 }}
                  />{" "}
                  Actualizando...
                </>
              ) : (
                "ACTUALIZAR INFORMACIÓN"
              )}
            </Button>
          </form>
        </Card>
      </StackContainer>
    </SectionContainer>
  );
};

export default ProfilePage;
