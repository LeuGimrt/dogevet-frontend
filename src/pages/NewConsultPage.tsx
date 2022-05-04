import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import { SectionContainer } from "../containers/SectionContainer";
import Card from "../components/Card/index";
import { StackContainer } from "../containers/StackContainer";
import { H1 } from "../elements/Heading";
import { AuthContext } from "../context/AuthContext";
import { AvatarImg } from "../components/Navbar/styles";
import TextField from "../components/TextField/index";
import { Consultation } from "../types/dataTypes";
import petsApi from "../config/axios";
import Select from "../components/Select/index";
import { Button } from "../elements/Button";
import useStorage from "../hooks/useStorage";
import { newConsultationValidations } from "../utils/validations";
import { newConsultationInitialValues } from "../utils/constants";
import useAllPets from "../hooks/useAllPets";
import { Spinner } from "../elements/Spinner";

const NewConsultPage = () => {
  const [img, setImg] = useState<File>();
  const [isSending, setIsSending] = useState(false);
  const { uploadFile } = useStorage("consults");
  const { pets } = useAllPets();

  const { user } = useContext(AuthContext);

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues: newConsultationInitialValues,
    validationSchema: newConsultationValidations,
    onSubmit: () => registerConsultation(),
  });

  useEffect(() => {
    if (!pets || pets.length == 0) return;
    setValues({
      ...newConsultationInitialValues,
      pet_id: String(pets[0].id),
    });
  }, [pets]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    setImg(files[0]);
  };

  const registerConsultation = async () => {
    console.log(values);

    if (!img) {
      toast.error("Se debe adjuntar una imagen");
      return;
    }

    setIsSending(true);

    try {
      const url = await uploadFile(img);
      sendData(url);
    } catch (error: any) {
      toast.error("Ocurrió un error: ", error);
    }
    setIsSending(false);
  };

  const sendData = (url: string) => {
    petsApi
      .post<Consultation>("/consults/new", {
        pet_id: parseFloat(values.pet_id),
        symptoms: values.symptoms,
        medicine: values.medicine,
        cost: parseFloat(values.cost),
        x_ray_img: url,
      })
      .then((res) => {
        toast.success("Registro exitoso", {
          style: {
            backgroundColor: "#4BB543",
            color: "white",
          },
        });
        setValues({
          ...newConsultationInitialValues,
          pet_id: String(pets[0].id),
        });
        setImg(undefined);
        console.log(res);
      })
      .catch((err) => toast.error("No se logró registrar el diagnóstico"));
  };

  return (
    <SectionContainer
      flex
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      py={4}
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
        </div>
        <Card size='md' style={{ padding: "1.5em" }}>
          <H1 center style={{ fontSize: "2rem" }}>
            Nuevo diagnóstico
          </H1>
          <form onSubmit={handleSubmit}>
            <Select
              name='pet_id'
              label='Canino (Código - Nombre)'
              handleChange={handleChange}
              value={values.pet_id}
              options={pets.map((pet) => ({
                label: `${pet.id} - ${pet.name}`,
                value: pet.id,
              }))}
              onBlur={handleBlur}
              required
            />
            <Select.Validations
              touched={touched.pet_id}
              message={errors.pet_id}
            />
            <TextField
              handleChange={handleChange}
              value={values.symptoms}
              label='Síntomas'
              name='symptoms'
              placeholder='Ingrese los síntomas...'
              onBlur={handleBlur}
            />
            <TextField.Validations
              touched={touched.symptoms}
              message={errors.symptoms}
            />
            <TextField
              handleChange={handleChange}
              value={values.medicine}
              label='Medicina'
              name='medicine'
              placeholder='Ingrese la medicina...'
              onBlur={handleBlur}
            />
            <TextField.Validations
              touched={touched.medicine}
              message={errors.medicine}
            />

            <TextField
              handleChange={handleChange}
              value={values.cost}
              label='Costo total'
              type='number'
              name='cost'
              placeholder='Ingrese el costo total...'
            />
            <TextField.Validations
              touched={touched.cost}
              message={errors.cost}
            />

            <TextField
              handleChange={handleImageChange}
              label='Imagen de Rayos X'
              name='x-ray-img'
              type='file'
              accept='image/*'
              required
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
                  Generando...
                </>
              ) : (
                "GENERAR DIAGNÓSTICO"
              )}
            </Button>
          </form>
        </Card>
      </StackContainer>
    </SectionContainer>
  );
};

export default NewConsultPage;
