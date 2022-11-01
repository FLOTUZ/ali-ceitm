import { gql } from "apollo-server-core";

export const ImagenSchema = gql`
  input CreateImagenInput {
    becarioId: Int!
    concepto: String!
    codigo_cobro: String!
    forma_cobro: String!
    fecha_cobro: DateTime!
    cafeteriaId: Int!
  }

  type Imagen {
    id: Int
    titulo: String
    descripcion: String
    url: String
    problemasId: Int
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    allImagenes(pagination: Pagination): [Imagen]
    imagenById(id: Int!): Imagen
  }

  type Mutation {
    createImagen(data: CreateImagenInput!): Imagen
    updateImagen(id: Int!, data: CreateImagenInput!): Imagen
    deleteImagen(id: Int!): Imagen
  }
`;
