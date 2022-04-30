import { SectionContainer } from "../containers/SectionContainer";
import Card from "../components/Card/index";
import { StackContainer } from "../containers/StackContainer";
import { H1 } from "../elements/Heading";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { AvatarImg } from "../components/Navbar/styles";
import TextField from "../components/TextField/index";
import useForm from "../hooks/useForm";
import { Consultation, Dog } from "../types/appTypes";
import dogsApi from "../config/axios";
import Select from "../components/Select/index";
import { Button } from "../elements/Button";
import toast from "react-hot-toast";
import useUploadFile from "../hooks/useStorage";

const NewConsultPage = () => {
  const [img, setImg] = useState<File>();
  const { uploadFile } = useUploadFile("consults");

  const [dogsOptions, setDogsOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const { user } = useContext(AuthContext);
  const {
    dogId,
    symptoms,
    blood_test,
    medicine,
    cost,
    onChange,
    form,
    setFormValue,
  } = useForm({
    dogId: "",
    symptoms: "",
    blood_test: "",
    medicine: "",
    cost: "",
  });

  useEffect(() => {
    loadDogs();
  }, []);

  const loadDogs = async () => {
    try {
      const res = await dogsApi.get<Dog[]>("/dogs/allDogs");
      const opts = res.data.map((dog) => {
        return {
          label: `${dog.name} - ${dog.id}`,
          value: dog.id,
        };
      });
      setDogsOptions(opts);
      setFormValue({
        dogId: res.data[0].id.toString(),
        symptoms: "",
        blood_test: "",
        medicine: "",
        cost: "",
      });
    } catch (error) {
      toast.error("No se pudieron obtener las mascotas");
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    setImg(files[0]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(form);
    if (!img) return;
    try {
      const url = await uploadFile(img);
      console.log("Registrando");

      registerConsult(url);
    } catch (error: any) {
      toast.error("Ocurrió un error: ", error);
    }
  };

  const registerConsult = (url: string) => {
    dogsApi
      .post<Consultation>("/consults/new", {
        dogId,
        symptoms,
        blood_test,
        medicine,
        cost,
        x_ray_img: url,
      })
      .then((res) => {
        toast.success("Registro exitoso", {
          style: {
            backgroundColor: "#4BB543",
            color: "white",
          },
        });
        setFormValue({
          dogId: dogsOptions[0].value,
          symptoms: "",
          blood_test: "",
          medicine: "",
          cost: "",
        });
        setImg(undefined);
        console.log(res);
      })
      .catch((err) => toast.error("No se logró registrar el diagnóstico"));
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
        </div>
        <Card size='md' style={{ padding: "1.5em" }}>
          <H1 center style={{ fontSize: "2rem" }}>
            Nuevo diagnóstico
          </H1>
          <form onSubmit={handleSubmit}>
            <Select
              name='dog-id'
              label='Canino (Código - Nombre)'
              handleChange={({ currentTarget: { value } }) =>
                onChange(value, "dogId")
              }
              value={dogId}
              options={dogsOptions}
              required
            />
            <TextField
              handleChange={({ currentTarget: { value } }) =>
                onChange(value, "symptoms")
              }
              value={symptoms}
              label='Síntomas'
              name='symptoms'
              placeholder='Ingrese los síntomas...'
            />
            <TextField
              handleChange={({ currentTarget: { value } }) =>
                onChange(value, "blood_test")
              }
              value={blood_test}
              label='Examen de Sangre'
              name='blood_test'
              placeholder='Ingrese los resultados del examen de sangre...'
            />
            <TextField
              handleChange={({ currentTarget: { value } }) =>
                onChange(value, "medicine")
              }
              value={medicine}
              label='Medicina'
              name='medicine'
              placeholder='Ingrese la medicina...'
            />
            <TextField
              handleChange={({ currentTarget: { value } }) =>
                onChange(value, "cost")
              }
              value={cost}
              label='Costo total'
              name='cost'
              placeholder='Ingrese el costo total...'
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
              bgcolor='dark'
              size='sm'
              className='btn btn-success'
              type='submit'
              fullWidth
              style={{ margin: "20px 0" }}
            >
              Generar diagnóstico
            </Button>
          </form>
        </Card>
      </StackContainer>
    </SectionContainer>
  );
};

export default NewConsultPage;
