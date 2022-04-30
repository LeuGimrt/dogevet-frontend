import { Link } from "react-router-dom";

import { useFormik } from "formik";
import toast from "react-hot-toast";

import dogsApi from "../config/axios";
import { User, AxiosErrorResponse } from "../types/dataTypes";
import ConsultImg from "../assets/consult.jpg";
import { SectionContainer } from "../containers/SectionContainer";
import Card from "../components/Card";
import { StackContainer } from "../containers/StackContainer";
import styled from "styled-components";
import { Button } from "../elements/Button";
import TextField from "../components/TextField";
import { H1 } from "../elements/Heading";
import { Small } from "../elements/Small";
import { registerValidations } from "../utils/validations";

const initialState = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const {
    values,
    handleSubmit,
    setValues,
    handleBlur,
    handleChange,
    errors,
    touched,
  } = useFormik({
    initialValues: initialState,
    validationSchema: registerValidations,
    onSubmit: () => registerUser(),
  });

  const registerUser = async () => {
    try {
      const res = await dogsApi.post<User>("/auth/register", values);
      toast.success("Registro exitoso", {
        style: {
          backgroundColor: "#4BB543",
          color: "white",
        },
      });
      setValues(initialState);
      console.log(res);
    } catch (error: any) {
      const err = error as AxiosErrorResponse;

      toast.error(err.response.data.error.message);
    }
  };

  return (
    <SectionContainer
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 15px",
      }}
    >
      <Card size='lg'>
        <StackContainer>
          <SectionContainer style={{ padding: "2em", width: "100%" }}>
            <H1 style={{ fontSize: "2rem" }} center>
              Registro
            </H1>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                label='Nombres'
                handleChange={handleChange}
                value={values.firstname}
                name='firstname'
                type='text'
                placeholder='Ingrese su(s) nombre(s)...'
                onBlur={handleBlur}
                required
              />
              <TextField.Validations
                touched={touched.firstname}
                message={errors.firstname}
              />
              <TextField
                label='Apellidos'
                name='lastname'
                handleChange={handleChange}
                value={values.lastname}
                type='text'
                placeholder='Ingrese sus apellidos...'
                onBlur={handleBlur}
                required
              />
              <TextField.Validations
                touched={touched.lastname}
                message={errors.lastname}
              />
              <TextField
                label='Correo'
                name='email'
                handleChange={handleChange}
                value={values.email}
                type='email'
                placeholder='Ingrese su correo...'
                onBlur={handleBlur}
                required
              />
              <TextField.Validations
                touched={touched.email}
                message={errors.email}
              />
              <TextField
                label='Teléfono'
                name='phone'
                handleChange={handleChange}
                value={values.phone}
                type='tel'
                pattern='^[0-9]{9}$'
                placeholder='Ingrese 9 dígitos...'
                onBlur={handleBlur}
                required
              />
              <TextField.Validations
                touched={touched.phone}
                message={errors.phone}
              />
              <TextField
                label='Contraseña'
                name='password'
                handleChange={handleChange}
                value={values.password}
                type='password'
                placeholder='Ingrese su contraseña...'
                onBlur={handleBlur}
                required
              />
              <TextField.Validations
                touched={touched.password}
                message={errors.password}
              />{" "}
              <br />
              <Small>
                Nota: <br />
                La contraseña debe tener al menos 8 caracteres, 1 dígito y 1
                mayúscula
              </Small>
              <Button
                bgcolor='dark'
                size='sm'
                className='btn btn-success'
                type='submit'
                fullWidth
                style={{ margin: "15px 0" }}
              >
                Registrarse
              </Button>
            </form>

            <div>
              ¿Ya tienes una cuenta? <Link to='/login'>Iniciar sesión</Link>
            </div>
          </SectionContainer>
          <div style={{ maxWidth: "50%", backgroundColor: "#000" }}>
            <ResponsiveImg src={ConsultImg} alt='Imagen' />
          </div>
        </StackContainer>
      </Card>
    </SectionContainer>
  );
};

const ResponsiveImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 3px 3px 0;
  opacity: 0.7;
  @media (max-width: 768px) {
    display: none;
  }
`;

export default RegisterPage;
