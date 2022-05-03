import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { useFormik } from "formik";
import toast from "react-hot-toast";

import DiagnosisImg from "../assets/diagnosis.jpg";

import { AxiosErrorResponse } from "../types/dataTypes";

import { AuthContext } from "../context/AuthContext";
import { SectionContainer } from "../containers/SectionContainer";
import { StackContainer } from "../containers/StackContainer";
import Card from "../components/Card";
import { H1 } from "../elements/Heading";
import TextField from "../components/TextField";
import { Button } from "../elements/Button";

import { loginValidations } from "../utils/validations";

const LoginPage = () => {
  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginValidations,
      onSubmit: () => login(),
    });

  const login = async () => {
    try {
      await signin(values);
      navigate("/home");
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
      }}
    >
      <Card size='lg'>
        <StackContainer>
          <div style={{ maxWidth: "50%", backgroundColor: "#000" }}>
            <ResponsiveImg src={DiagnosisImg} alt='Imagen' />
          </div>
          <SectionContainer style={{ padding: "2em", width: "100%" }}>
            <H1 style={{ fontSize: "2rem" }} center>
              Iniciar Sesión
            </H1>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                handleChange={handleChange}
                label='Correo'
                name='email'
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
                handleChange={handleChange}
                label='Contraseña'
                name='password'
                value={values.password}
                placeholder='Ingrese su contraseña...'
                type='password'
                onBlur={handleBlur}
                required
              />
              <TextField.Validations
                touched={touched.password}
                message={errors.password}
              />

              <Button
                bgcolor='dark'
                size='sm'
                type='submit'
                fullWidth
                style={{ margin: "10px 0" }}
              >
                Ingresar
              </Button>
            </form>
            <div>
              ¿Aún no tienes una cuenta? <Link to='/register'>Registrarse</Link>
            </div>
          </SectionContainer>
        </StackContainer>
      </Card>
    </SectionContainer>
  );
};

const ResponsiveImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px 0 0 3px;
  opacity: 0.7;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default LoginPage;
