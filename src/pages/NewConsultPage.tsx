import { SectionContainer } from "../containers/SectionContainer";
import Card from "../components/Card/index";
import { StackContainer } from "../containers/StackContainer";
import { H1 } from "../elements/Heading";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { AvatarImg } from "../components/Navbar/styles";
import TextField from "../components/TextField/index";
import useForm from "../hooks/useForm";
import { Consultation, Pet } from "../types/dataTypes";
import petsApi from "../config/axios";
import Select from "../components/Select/index";
import { Button } from "../elements/Button";
import toast from "react-hot-toast";
import useStorage from "../hooks/useStorage";

const NewConsultPage = () => {
  const [img, setImg] = useState<File>();
  const { uploadFile } = useStorage("consults");

  const [petsOptions, setPetsOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const { user } = useContext(AuthContext);
  const { pet_id, symptoms, medicine, cost, onChange, form, setFormValue } =
    useForm({
      pet_id: "",
      symptoms: "",
      medicine: "",
      cost: "",
    });

  useEffect(() => {
    loadDogs();
  }, []);

  const loadDogs = async () => {
    try {
      const res = await petsApi.get<Pet[]>("/pets/all");
      const opts = res.data.map((pet) => {
        return {
          label: `${pet.id} - ${pet.name}`,
          value: String(pet.id),
        };
      });
      setPetsOptions(opts);
      setFormValue({
        pet_id: String(res.data[0].id),
        symptoms: "",
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
    petsApi
      .post<Consultation>("/consults/new", {
        pet_id: parseInt(pet_id),
        symptoms,
        medicine,
        cost: parseFloat(cost),
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
          pet_id: petsOptions[0].value,
          symptoms: "",
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
              name='pet_id'
              label='Canino (Código - Nombre)'
              handleChange={({ currentTarget: { value } }) =>
                onChange(value, "pet_id")
              }
              value={pet_id}
              options={petsOptions}
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
