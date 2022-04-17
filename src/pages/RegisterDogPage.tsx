import { useState } from "react";
import { SectionContainer } from "../containers/SectionContainer";
import { Button } from "../elements/Button";
import useForm from "../hooks/useForm";
import { Dog } from "../types/appTypes";
import { H1 } from "../elements/Heading";
import Card from "../components/Card";
import TextField from "../components/TextField";
import Select from "../components/Select";
import dogsApi from "../config/axios";
import toast from "react-hot-toast";
import useUploadFile from "../hooks/useUploadFile";
import Loading from "../components/Loading";

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

const RegisterDogPage = () => {
  const [img, setImg] = useState<File>();
  const { uploadFile, status } = useUploadFile();

  const { name, breed, gender, b_date, onChange, form, setFormValue } = useForm(
    {
      name: "",
      breed: "pitbull",
      gender: "1",
      b_date: "",
    }
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    setImg(files[0]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(form);
    uploadFile(img, registerDog);
  };

  const registerDog = (url: string) => {
    dogsApi
      .post<Dog>("/dogs/new", {
        name,
        b_date,
        breed,
        gender,
        img: url,
      })
      .then((res) => {
        toast.success("Registro exitoso", {
          position: "bottom-center",
          style: {
            backgroundColor: "#4BB543",
            color: "white",
          },
        });
        setFormValue({
          b_date: "",
          breed: "pitbull",
          gender: "1",
          name: "",
        });
        setImg(undefined);
        console.log(res);
      })
      .catch((err) => toast.error("Ocurrió un error 😯"));
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
        <form onSubmit={handleSubmit}>
          <TextField
            handleChange={({ currentTarget: { value } }) =>
              onChange(value, "name")
            }
            label='Nombre'
            name='name'
            value={name}
            type='text'
            placeholder='Ingrese el nombre...'
            required
          />
          <Select
            name='breed'
            label='Raza'
            handleChange={({ currentTarget: { value } }) =>
              onChange(value, "breed")
            }
            value={breed}
            options={breedOptions}
            required
          />
          <Select
            name='gender'
            label='Género'
            handleChange={({ currentTarget: { value } }) =>
              onChange(value, "gender")
            }
            value={gender}
            options={genderOptions}
            required
          />
          <TextField
            handleChange={({ currentTarget: { value } }) =>
              onChange(value, "b_date")
            }
            label='Fecha de Nacimiento'
            name='b_date'
            value={b_date}
            type='date'
            required
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
            bgcolor='dark'
            size='sm'
            className='btn btn-success'
            type='submit'
            fullWidth
            style={{ margin: "20px 0" }}
          >
            Registrar
          </Button>
        </form>
        {status === "uploading" && (
          <Loading fullwidth color='primary' size='sm' />
        )}
      </Card>
    </SectionContainer>
  );
};

export default RegisterDogPage;
