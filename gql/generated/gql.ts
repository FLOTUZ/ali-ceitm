/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query CarreraById($id: Int!) {\n  carreraById(id: $id) {\n    id\n    nombre\n  }\n}": types.CarreraByIdDocument,
    "query GenerateCobroCode {\n  generateCobroCode {\n    id\n    codigo_cobro\n    concepto\n  }\n}": types.GenerateCobroCodeDocument,
    "mutation RealizarCobro($codigo: String!) {\n  realizeCobro(codigo: $codigo) {\n    concepto\n    codigo_cobro\n    fecha_cobro\n  }\n}": types.RealizarCobroDocument,
    "query GetAllCarreras {\n  allCarreras {\n    id\n    nombre\n  }\n}": types.GetAllCarrerasDocument,
    "query CobrosBecario {\n  currentPersona {\n    id\n    nombres\n    a_paterno\n    a_materno\n    carreraId\n  }\n  cobrosRealizados {\n    id\n    codigo_cobro\n    forma_cobro\n    was_forced\n    fecha_cobro\n    cafeteriaId\n    createdAt\n  }\n  cobrosNoRealizados {\n    id\n    codigo_cobro\n    forma_cobro\n    was_forced\n    fecha_cobro\n    cafeteriaId\n    createdAt\n  }\n}": types.CobrosBecarioDocument,
    "query CobrosCajero {\n  cobrosRegistradosPorCajero {\n    id\n    becarioId\n    concepto\n    codigo_cobro\n    fecha_cobro\n    updatedAt\n  }\n}": types.CobrosCajeroDocument,
    "query PersonaSession {\n  currentPersona {\n    id\n    nombres\n    a_paterno\n    a_materno\n    carreraId\n  }\n}": types.PersonaSessionDocument,
    "query AllSettings {\n  allSettings {\n    id\n    nombre\n    valor\n  }\n}": types.AllSettingsDocument,
    "query CurrentUser {\n  currentUser {\n    id\n    email\n    roleId\n    is_active\n  }\n  currentRole {\n    id\n    rol_name\n  }\n}": types.CurrentUserDocument,
};

export function graphql(source: "query CarreraById($id: Int!) {\n  carreraById(id: $id) {\n    id\n    nombre\n  }\n}"): (typeof documents)["query CarreraById($id: Int!) {\n  carreraById(id: $id) {\n    id\n    nombre\n  }\n}"];
export function graphql(source: "query GenerateCobroCode {\n  generateCobroCode {\n    id\n    codigo_cobro\n    concepto\n  }\n}"): (typeof documents)["query GenerateCobroCode {\n  generateCobroCode {\n    id\n    codigo_cobro\n    concepto\n  }\n}"];
export function graphql(source: "mutation RealizarCobro($codigo: String!) {\n  realizeCobro(codigo: $codigo) {\n    concepto\n    codigo_cobro\n    fecha_cobro\n  }\n}"): (typeof documents)["mutation RealizarCobro($codigo: String!) {\n  realizeCobro(codigo: $codigo) {\n    concepto\n    codigo_cobro\n    fecha_cobro\n  }\n}"];
export function graphql(source: "query GetAllCarreras {\n  allCarreras {\n    id\n    nombre\n  }\n}"): (typeof documents)["query GetAllCarreras {\n  allCarreras {\n    id\n    nombre\n  }\n}"];
export function graphql(source: "query CobrosBecario {\n  currentPersona {\n    id\n    nombres\n    a_paterno\n    a_materno\n    carreraId\n  }\n  cobrosRealizados {\n    id\n    codigo_cobro\n    forma_cobro\n    was_forced\n    fecha_cobro\n    cafeteriaId\n    createdAt\n  }\n  cobrosNoRealizados {\n    id\n    codigo_cobro\n    forma_cobro\n    was_forced\n    fecha_cobro\n    cafeteriaId\n    createdAt\n  }\n}"): (typeof documents)["query CobrosBecario {\n  currentPersona {\n    id\n    nombres\n    a_paterno\n    a_materno\n    carreraId\n  }\n  cobrosRealizados {\n    id\n    codigo_cobro\n    forma_cobro\n    was_forced\n    fecha_cobro\n    cafeteriaId\n    createdAt\n  }\n  cobrosNoRealizados {\n    id\n    codigo_cobro\n    forma_cobro\n    was_forced\n    fecha_cobro\n    cafeteriaId\n    createdAt\n  }\n}"];
export function graphql(source: "query CobrosCajero {\n  cobrosRegistradosPorCajero {\n    id\n    becarioId\n    concepto\n    codigo_cobro\n    fecha_cobro\n    updatedAt\n  }\n}"): (typeof documents)["query CobrosCajero {\n  cobrosRegistradosPorCajero {\n    id\n    becarioId\n    concepto\n    codigo_cobro\n    fecha_cobro\n    updatedAt\n  }\n}"];
export function graphql(source: "query PersonaSession {\n  currentPersona {\n    id\n    nombres\n    a_paterno\n    a_materno\n    carreraId\n  }\n}"): (typeof documents)["query PersonaSession {\n  currentPersona {\n    id\n    nombres\n    a_paterno\n    a_materno\n    carreraId\n  }\n}"];
export function graphql(source: "query AllSettings {\n  allSettings {\n    id\n    nombre\n    valor\n  }\n}"): (typeof documents)["query AllSettings {\n  allSettings {\n    id\n    nombre\n    valor\n  }\n}"];
export function graphql(source: "query CurrentUser {\n  currentUser {\n    id\n    email\n    roleId\n    is_active\n  }\n  currentRole {\n    id\n    rol_name\n  }\n}"): (typeof documents)["query CurrentUser {\n  currentUser {\n    id\n    email\n    roleId\n    is_active\n  }\n  currentRole {\n    id\n    rol_name\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;