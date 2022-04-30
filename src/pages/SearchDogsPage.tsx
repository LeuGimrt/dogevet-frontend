import { useState } from "react";
import styled from "styled-components";
import dogsApi from "../config/axios";
import Card from "../components/Card";
import { SectionContainer } from "../containers/SectionContainer";
import { StackContainer } from "../containers/StackContainer";
import { H4 } from "../elements/Heading";
import { Small } from "../elements/Small";
import { Dog, SearchState } from "../types/dataTypes";
import TextField from "../components/TextField/index";
import { Button } from "../elements/Button";

const SearchDogsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [state, setState] = useState<SearchState>("idle");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setState("searching");
    console.log(searchValue);

    dogsApi.get<Dog[]>(`/dogs/${searchValue}`).then((res) => {
      setDogs(res.data);
      console.log(res.data);
      setState("results-done");
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
      ) : dogs.length == 0 ? (
        <div style={{ padding: "2rem 1rem" }}>
          No se encontraron resultados 😅
        </div>
      ) : (
        dogs.map((dog) => (
          <Card style={{ margin: "20px auto" }} size='lg'>
            <StackContainer>
              <ImgContainer>
                <ResponsiveImg src={dog.img} alt={dog.name} />
              </ImgContainer>
              <DogInfo>
                <H4 style={{ marginBottom: 0 }}>{dog.name}</H4>
                <Small style={{ margin: 0 }}>{dog.id}</Small>
                <br />
                <br />
                <hr />
                <br />
                <strong>Raza: </strong>
                {dog.breed} <br /> <br />
                <strong>Fecha de registro: </strong>
                {String(dog.registered_at).slice(0, 10)} <br /> <br />
              </DogInfo>
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

const DogInfo = styled.div`
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

export default SearchDogsPage;
