import { useState } from "react";
import { SectionContainer } from "../containers/SectionContainer";
import { Button } from "../elements/Button";
import { AxiosErrorResponse, Pet } from "../types/dataTypes";
import { H1 } from "../elements/Heading";
import Card from "../components/Card";
import TextField from "../components/TextField";
import Select from "../components/Select";
import petsApi from "../config/axios";
import toast from "react-hot-toast";
import useStorage from "../hooks/useStorage";
import { Spinner } from "../elements/Spinner";
import { useFormik } from "formik";
import { newDogValidations } from "../utils/validations";
import {
  petTypeOptions,
  sexOptions,
  newPetInitialValues,
} from "../utils/constants";

const NewPetPage = () => {
  const [img, setImg] = useState<File>();
  const [isSending, setIsSending] = useState(false);
  const { uploadFile } = useStorage("pets");

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues: newPetInitialValues,
    validationSchema: newDogValidations,
    onSubmit: () => registerPet(),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    setImg(files[0]);
  };

  const registerPet = async () => {
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
      .post<Pet>("/pets/new", {
        ...values,
        img: url,
      })
      .then(() => {
        toast.success("Registro exitoso", {
          position: "bottom-center",
          style: {
            backgroundColor: "#4BB543",
            color: "white",
          },
        });
        setValues(newPetInitialValues);
        setImg(undefined);
      })
      .catch((error) => {
        const err = error as AxiosErrorResponse;
        toast.error(err.response.data.error.message);
      });
  };

  return (
    <SectionContainer
      flex
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Card size='md' style={{ padding: "2em" }}>
        <H1 style={{ fontSize: "2.5rem" }} center>
          Registro de mascota 🐶
        </H1>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            handleChange={handleChange}
            label='Nombre'
            name='name'
            value={values.name}
            type='text'
            placeholder='Ingrese el nombre...'
            onBlur={handleBlur}
            required
          />
          <TextField.Validations touched={touched.name} message={errors.name} />
          <Select
            name='type'
            label='Tipo de mascota'
            handleChange={handleChange}
            value={values.type}
            options={petTypeOptions}
            onBlur={handleBlur}
            required
          />
          <Select.Validations touched={touched.type} message={errors.type} />
          <Select
            name='sex'
            label='Sexo'
            handleChange={handleChange}
            value={values.sex}
            options={sexOptions}
            onBlur={handleBlur}
            required
          />
          <Select.Validations touched={touched.sex} message={errors.sex} />

          <TextField
            handleChange={handleChange}
            label='Fecha de Nacimiento'
            name='b_date'
            value={values.b_date}
            type='date'
            onBlur={handleBlur}
            required
          />
          <TextField.Validations
            touched={touched.b_date}
            message={errors.b_date}
          />

          <TextField
            handleChange={handleImageChange}
            label='Imagen'
            name='img'
            type='file'
            accept='image/*'
            required
          />
          <Button
            bgcolor='primary'
            size='md'
            type='submit'
            fullWidth
            style={{ margin: "20px 0" }}
            disabled={isSending}
          >
            {isSending ? (
              <>
                <Spinner color='primary' size='xs' style={{ marginRight: 6 }} />{" "}
                Registrando...
              </>
            ) : (
              "REGISTRAR"
            )}
          </Button>
        </form>
      </Card>
    </SectionContainer>
  );
};

export default NewPetPage;
