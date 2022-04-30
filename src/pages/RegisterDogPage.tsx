import { useState } from "react";
import { SectionContainer } from "../containers/SectionContainer";
import { Button } from "../elements/Button";
import useForm from "../hooks/useForm";
import { AxiosErrorResponse, Dog } from "../types/appTypes";
import { H1 } from "../elements/Heading";
import Card from "../components/Card";
import TextField from "../components/TextField";
import Select from "../components/Select";
import dogsApi from "../config/axios";
import toast from "react-hot-toast";
import useStorage from "../hooks/useStorage";
import { Spinner } from "../elements/Spinner";

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

const initialValues = {
  name: "",
  breed: "pitbull",
  gender: "1",
  b_date: "",
};

const RegisterDogPage = () => {
  const [img, setImg] = useState<File>();
  const [isSending, setIsSending] = useState(false);
  const { uploadFile } = useStorage("pets");

  const { name, breed, gender, b_date, onChange, form, setFormValue } =
    useForm(initialValues);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    setImg(files[0]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(form);

    if (!img) return;

    setIsSending(true);

    try {
      const url = await uploadFile(img);
      registerDog(url);
    } catch (error: any) {
      toast.error("Ocurrió un error: ", error);
    }
    setIsSending(false);
  };

  const registerDog = (url: string) => {
    dogsApi
      .post<Dog>("/dogs/new", {
        ...form,
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
        setFormValue(initialValues);
        setImg(undefined);
        console.log(res);
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
            disabled={isSending}
          >
            {isSending ? (
              <>
                <Spinner color='primary' size='xs' style={{ marginRight: 6 }} />{" "}
                Registrando...
              </>
            ) : (
              "Registrar"
            )}
          </Button>
        </form>
      </Card>
    </SectionContainer>
  );
};

export default RegisterDogPage;
