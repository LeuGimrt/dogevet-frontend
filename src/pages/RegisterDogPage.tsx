import { useState } from "react";
import { SectionContainer } from "../containers/SectionContainer";
import { Button } from "../elements/Button";
import { AxiosErrorResponse, Dog, NewDogData } from "../types/dataTypes";
import { H1 } from "../elements/Heading";
import Card from "../components/Card";
import TextField from "../components/TextField";
import Select from "../components/Select";
import dogsApi from "../config/axios";
import toast from "react-hot-toast";
import useStorage from "../hooks/useStorage";
import { Spinner } from "../elements/Spinner";
import { useFormik } from "formik";
import { newDogValidations } from "../utils/validations";

const breedOptions = [
  { label: "Pitbull", value: "pitbull" },
  { label: "Bulldog", value: "bulldog" },
  { label: "Shih Tzu", value: "shihtzu" },
  { label: "Pequinés", value: "pequines" },
  { label: "San Bernardo", value: "san-bernardo" },
  { label: "Chihuaha", value: "chihuaha" },
];

const genderOptions = [
  { label: "Macho", value: "1" },
  { label: "Hembra", value: "0" },
];

const initialValues: NewDogData = {
  name: "",
  breed: "pitbull",
  gender: "1",
  b_date: "",
};

const RegisterDogPage = () => {
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
    initialValues,
    validationSchema: newDogValidations,
    onSubmit: () => registerDog(),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    setImg(files[0]);
  };

  const registerDog = async () => {
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
    dogsApi
      .post<Dog>("/dogs/new", {
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
        setValues(initialValues);
        setImg(undefined);
      })
      .catch((error) => {
        const err = error as AxiosErrorResponse;
        toast.error(err.response.data.error.message);
      });
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
            name='breed'
            label='Raza'
            handleChange={handleChange}
            value={values.breed}
            options={breedOptions}
            onBlur={handleBlur}
            required
          />
          <Select.Validations touched={touched.breed} message={errors.breed} />
          <Select
            name='gender'
            label='Género'
            handleChange={handleChange}
            value={values.gender}
            options={genderOptions}
            onBlur={handleBlur}
            required
          />
          <Select.Validations
            touched={touched.gender}
            message={errors.gender}
          />

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

export default RegisterDogPage;
