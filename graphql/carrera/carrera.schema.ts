import { gql } from "apollo-server-core";

export const CarreraSchema = gql`
  input CreateCarreraInput {
    nombre: String
  }

  type Carrera {
    id: Int
    nombre: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    allCarreras: [Carrera]
    carreraById(id: Int): Carrera
  }

  type Mutation {
    createCarrera(data: CreateCarreraInput): Carrera
    updateCarrera(id: Int, data: CreateCarreraInput): Carrera
    deleteCarrera(id: Int): Carrera
  }
`;
