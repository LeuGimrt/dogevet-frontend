import { useState } from "react";
import styled from "styled-components";
import petsApi from "../config/axios";
import Card from "../components/Card";
import { SectionContainer } from "../containers/SectionContainer";
import { StackContainer } from "../containers/StackContainer";
import { H4 } from "../elements/Heading";
import { Small } from "../elements/Small";
import { Pet, SearchState } from "../types/dataTypes";
import TextField from "../components/TextField/index";
import { Button } from "../elements/Button";

const SearchPetsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [state, setState] = useState<SearchState>("idle");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setState("searching");
    console.log(searchValue);

    petsApi
      .get<Pet[]>(`/pets/${searchValue}`)
      .then((res) => {
        setPets(res.data);
        console.log(res.data);
        setState("results-done");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SectionContainer
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "50px 15px",
      }}
    >
      <H4>Búsqueda de mascotas 🐶</H4> <br />
      <Card style={{ padding: "1.5em" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            handleChange={({ currentTarget: { value } }) =>
              setSearchValue(value)
            }
            label='Búsqueda'
            placeholder='Ingrese el nombre o código'
            name='search-pet'
            required
          />
          <Button type='submit' size='sm' bgcolor='primary'>
            Buscar
          </Button>
        </form>
      </Card>
      {state === "idle" ? (
        <div style={{ padding: "2rem 1rem" }}>
          Debe ingresar un término para buscar...
        </div>
      ) : state === "searching" ? (
        <div style={{ padding: "2rem 1rem" }}>Espere un momento...</div>
      ) : pets.length == 0 ? (
        <div style={{ padding: "2rem 1rem" }}>
          No se encontraron resultados 😅
        </div>
      ) : (
        pets.map((pet) => (
          <Card style={{ margin: "20px auto" }} size='lg'>
            <StackContainer>
              <ImgContainer>
                <ResponsiveImg src={pet.img} alt={pet.name} />
              </ImgContainer>
              <PetInfo>
                <H4 style={{ marginBottom: 0 }}>{pet.name}</H4>
                <Small style={{ margin: 0 }}>{pet.id}</Small>
                <br />
                <br />
                <hr />
                <br />
                <strong>Tipo de mascota: </strong>
                {pet.type} <br /> <br />
                <strong>Fecha de registro: </strong>
                {String(pet.registered_at).slice(0, 10)} <br /> <br />
              </PetInfo>
            </StackContainer>
          </Card>
        ))
      )}
    </SectionContainer>
  );
};

const ResponsiveImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px 0 0 3px;
  @media (max-width: 768px) {
    max-height: 180px;
    width: 100%;
  }
`;

const PetInfo = styled.div`
  padding: 1em 2em;
  color: #000;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ImgContainer = styled.div`
  width: 200px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default SearchPetsPage;
