import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Beca = {
  __typename?: 'Beca';
  createdAt?: Maybe<Scalars['DateTime']>;
  descripcion?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  inicia?: Maybe<Scalars['DateTime']>;
  is_active?: Maybe<Scalars['Boolean']>;
  nombre?: Maybe<Scalars['String']>;
  termina?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Becario = {
  __typename?: 'Becario';
  becaId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  en_lista_espera?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  personaId?: Maybe<Scalars['Int']>;
  puede_cobrar?: Maybe<Scalars['Boolean']>;
  semana_cobro?: Maybe<Scalars['String']>;
  turno?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Cafeteria = {
  __typename?: 'Cafeteria';
  campus?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  direccion?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  nombre?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Carrera = {
  __typename?: 'Carrera';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  nombre?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Cobro = {
  __typename?: 'Cobro';
  becarioId?: Maybe<Scalars['Int']>;
  cafeteriaId?: Maybe<Scalars['Int']>;
  codigo_cobro?: Maybe<Scalars['String']>;
  concepto?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  fecha_cobro?: Maybe<Scalars['DateTime']>;
  forma_cobro?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  was_forced?: Maybe<Scalars['Boolean']>;
};

export type CreateBecaInput = {
  descripcion: Scalars['String'];
  inicia: Scalars['DateTime'];
  is_active?: InputMaybe<Scalars['Boolean']>;
  nombre: Scalars['String'];
  termina?: InputMaybe<Scalars['DateTime']>;
};

export type CreateBecatioInput = {
  becaId: Scalars['Boolean'];
  en_lista_espera: Scalars['Boolean'];
  personaId: Scalars['Int'];
  puede_cobrar: Scalars['Boolean'];
  semana_cobro: Scalars['String'];
  turno: Scalars['String'];
};

export type CreateCafeteriaInput = {
  campus: Scalars['String'];
  direccion?: InputMaybe<Scalars['String']>;
  nombre: Scalars['String'];
};

export type CreateCarreraInput = {
  nombre?: InputMaybe<Scalars['String']>;
};

export type CreateCobroInput = {
  becarioId: Scalars['Int'];
  cafeteriaId: Scalars['Int'];
  codigo_cobro: Scalars['String'];
  concepto: Scalars['String'];
  fecha_cobro?: InputMaybe<Scalars['DateTime']>;
  forma_cobro?: InputMaybe<Scalars['String']>;
  was_forced: Scalars['Boolean'];
};

export type CreateImagenInput = {
  becarioId: Scalars['Int'];
  cafeteriaId: Scalars['Int'];
  codigo_cobro: Scalars['String'];
  concepto: Scalars['String'];
  fecha_cobro: Scalars['DateTime'];
  forma_cobro: Scalars['String'];
};

export type CreatePersonaInput = {
  a_materno: Scalars['String'];
  a_paterno: Scalars['String'];
  cafeteriaId?: InputMaybe<Scalars['Int']>;
  campus: Scalars['Int'];
  carreraId: Scalars['Int'];
  email_institucional: Scalars['String'];
  imagenesId?: InputMaybe<Scalars['Int']>;
  n_control: Scalars['String'];
  nombres: Scalars['String'];
  telefono: Scalars['String'];
  userId: Scalars['Int'];
  whatsapp: Scalars['String'];
};

export type CreateProblemaInput = {
  descripcion: Scalars['String'];
  titulo: Scalars['String'];
};

export type CreateRoleInput = {
  is_deleted: Scalars['Boolean'];
  rol_name: Scalars['String'];
};

export type CreateSettingsInput = {
  nombre?: InputMaybe<Scalars['String']>;
  valor?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  roleId?: InputMaybe<Scalars['Int']>;
};

export type Imagen = {
  __typename?: 'Imagen';
  createdAt?: Maybe<Scalars['DateTime']>;
  descripcion?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  problemasId?: Maybe<Scalars['Int']>;
  titulo?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBeca?: Maybe<Beca>;
  createBecario?: Maybe<Becario>;
  createCafeteria?: Maybe<Cafeteria>;
  createCarrera?: Maybe<Carrera>;
  createImagen?: Maybe<Imagen>;
  createPersona?: Maybe<Persona>;
  createProblema?: Maybe<Problema>;
  createRole?: Maybe<Role>;
  createSetting?: Maybe<Settings>;
  createUser?: Maybe<User>;
  deleteBeca?: Maybe<Beca>;
  deleteBecario?: Maybe<Becario>;
  deleteCafeteria?: Maybe<Cafeteria>;
  deleteCarrera?: Maybe<Carrera>;
  deleteCobro?: Maybe<Scalars['Boolean']>;
  deleteImagen?: Maybe<Imagen>;
  deletePersona?: Maybe<Persona>;
  deleteProblema?: Maybe<Problema>;
  deleteRole?: Maybe<Role>;
  deleteSetting?: Maybe<Settings>;
  deleteUser?: Maybe<User>;
  forceCobro?: Maybe<Cobro>;
  realizeCobro?: Maybe<Cobro>;
  updateBeca?: Maybe<Beca>;
  updateBecario?: Maybe<Becario>;
  updateCafeteria?: Maybe<Cafeteria>;
  updateCarrera?: Maybe<Carrera>;
  updateCobro?: Maybe<Cobro>;
  updateImagen?: Maybe<Imagen>;
  updatePersona?: Maybe<Persona>;
  updateProblema?: Maybe<Problema>;
  updateRole?: Maybe<Role>;
  updateSetting?: Maybe<Settings>;
  updateUser?: Maybe<User>;
};


export type MutationCreateBecaArgs = {
  data: CreateBecaInput;
};


export type MutationCreateBecarioArgs = {
  data: CreateBecatioInput;
};


export type MutationCreateCafeteriaArgs = {
  data: CreateCafeteriaInput;
};


export type MutationCreateCarreraArgs = {
  data?: InputMaybe<CreateCarreraInput>;
};


export type MutationCreateImagenArgs = {
  data: CreateImagenInput;
};


export type MutationCreatePersonaArgs = {
  data: CreatePersonaInput;
};


export type MutationCreateProblemaArgs = {
  data: CreateProblemaInput;
};


export type MutationCreateRoleArgs = {
  data: CreateRoleInput;
};


export type MutationCreateSettingArgs = {
  data?: InputMaybe<CreateSettingsInput>;
};


export type MutationCreateUserArgs = {
  data?: InputMaybe<CreateUserInput>;
};


export type MutationDeleteBecaArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteBecarioArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCafeteriaArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCarreraArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationDeleteCobroArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteImagenArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePersonaArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProblemaArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSettingArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationForceCobroArgs = {
  id: Scalars['Int'];
};


export type MutationRealizeCobroArgs = {
  codigo: Scalars['String'];
};


export type MutationUpdateBecaArgs = {
  data: CreateBecaInput;
  id: Scalars['Int'];
};


export type MutationUpdateBecarioArgs = {
  data: CreateBecatioInput;
  id: Scalars['Int'];
};


export type MutationUpdateCafeteriaArgs = {
  data: CreateCafeteriaInput;
  id: Scalars['Int'];
};


export type MutationUpdateCarreraArgs = {
  data?: InputMaybe<CreateCarreraInput>;
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateCobroArgs = {
  data?: InputMaybe<CreateCobroInput>;
  id: Scalars['Int'];
};


export type MutationUpdateImagenArgs = {
  data: CreateImagenInput;
  id: Scalars['Int'];
};


export type MutationUpdatePersonaArgs = {
  data: CreatePersonaInput;
  id: Scalars['Int'];
};


export type MutationUpdateProblemaArgs = {
  data: CreateProblemaInput;
  id: Scalars['Int'];
};


export type MutationUpdateRoleArgs = {
  data: CreateRoleInput;
  id: Scalars['Int'];
};


export type MutationUpdateSettingArgs = {
  data?: InputMaybe<CreateSettingsInput>;
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Pagination = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type Persona = {
  __typename?: 'Persona';
  a_materno?: Maybe<Scalars['String']>;
  a_paterno?: Maybe<Scalars['String']>;
  cafeteriaId?: Maybe<Scalars['Int']>;
  campus?: Maybe<Scalars['Int']>;
  carreraId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email_institucional?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  imagenesId?: Maybe<Scalars['Int']>;
  n_control?: Maybe<Scalars['String']>;
  nombres?: Maybe<Scalars['String']>;
  telefono?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['Int']>;
  whatsapp?: Maybe<Scalars['String']>;
};

export type Problema = {
  __typename?: 'Problema';
  createdAt?: Maybe<Scalars['DateTime']>;
  descripcion?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  titulo?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  allBecarios?: Maybe<Array<Maybe<Becario>>>;
  allBecas?: Maybe<Array<Maybe<Beca>>>;
  allCafeterias?: Maybe<Array<Maybe<Cafeteria>>>;
  allCarreras?: Maybe<Array<Maybe<Carrera>>>;
  allCobros?: Maybe<Array<Maybe<Cobro>>>;
  allImagenes?: Maybe<Array<Maybe<Imagen>>>;
  allPersonas?: Maybe<Array<Maybe<Persona>>>;
  allProblemas?: Maybe<Array<Maybe<Problema>>>;
  allRoles?: Maybe<Array<Maybe<Role>>>;
  allSettings?: Maybe<Array<Maybe<Settings>>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  becaById?: Maybe<Beca>;
  becarioById?: Maybe<Becario>;
  cafeteriaById?: Maybe<Cafeteria>;
  carreraById?: Maybe<Carrera>;
  cobroById?: Maybe<Cobro>;
  cobrosNoRealizados?: Maybe<Array<Maybe<Cobro>>>;
  cobrosRealizados?: Maybe<Array<Maybe<Cobro>>>;
  cobrosRegistradosPorCajero?: Maybe<Array<Maybe<Cobro>>>;
  currentPersona?: Maybe<Persona>;
  currentRole?: Maybe<Role>;
  currentUser?: Maybe<User>;
  generateCobroCode?: Maybe<Cobro>;
  imagenById?: Maybe<Imagen>;
  personaById?: Maybe<Persona>;
  problemaById?: Maybe<Problema>;
  roleById?: Maybe<Role>;
  settingById?: Maybe<Settings>;
  settingByNombre?: Maybe<Settings>;
  userById?: Maybe<User>;
};


export type QueryAllBecariosArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAllBecasArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAllCafeteriasArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAllCobrosArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAllImagenesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAllPersonasArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAllProblemasArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAllUsersArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryBecaByIdArgs = {
  id: Scalars['Int'];
};


export type QueryBecarioByIdArgs = {
  id: Scalars['Int'];
};


export type QueryCafeteriaByIdArgs = {
  id: Scalars['Int'];
};


export type QueryCarreraByIdArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryCobroByIdArgs = {
  id: Scalars['Int'];
};


export type QueryImagenByIdArgs = {
  id: Scalars['Int'];
};


export type QueryPersonaByIdArgs = {
  id: Scalars['Int'];
};


export type QueryProblemaByIdArgs = {
  id: Scalars['Int'];
};


export type QueryRoleByIdArgs = {
  id: Scalars['Int'];
};


export type QuerySettingByIdArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QuerySettingByNombreArgs = {
  nombre: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['Int'];
};

export type Role = {
  __typename?: 'Role';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  is_deleted?: Maybe<Scalars['Boolean']>;
  rol_name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Settings = {
  __typename?: 'Settings';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  nombre?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  valor?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  is_active: Scalars['Boolean'];
  is_deleted: Scalars['Boolean'];
  roleId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
};

export type CarreraByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CarreraByIdQuery = { __typename?: 'Query', carreraById?: { __typename?: 'Carrera', id?: number | null, nombre?: string | null } | null };

export type GenerateCobroCodeQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateCobroCodeQuery = { __typename?: 'Query', generateCobroCode?: { __typename?: 'Cobro', id?: number | null, codigo_cobro?: string | null, concepto?: string | null } | null };

export type RealizarCobroMutationVariables = Exact<{
  codigo: Scalars['String'];
}>;


export type RealizarCobroMutation = { __typename?: 'Mutation', realizeCobro?: { __typename?: 'Cobro', concepto?: string | null, codigo_cobro?: string | null, fecha_cobro?: any | null } | null };

export type GetAllCarrerasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCarrerasQuery = { __typename?: 'Query', allCarreras?: Array<{ __typename?: 'Carrera', id?: number | null, nombre?: string | null } | null> | null };

export type CobrosBecarioQueryVariables = Exact<{ [key: string]: never; }>;


export type CobrosBecarioQuery = { __typename?: 'Query', currentPersona?: { __typename?: 'Persona', id?: number | null, nombres?: string | null, a_paterno?: string | null, a_materno?: string | null, carreraId?: number | null } | null, cobrosRealizados?: Array<{ __typename?: 'Cobro', id?: number | null, codigo_cobro?: string | null, forma_cobro?: string | null, was_forced?: boolean | null, fecha_cobro?: any | null, cafeteriaId?: number | null, createdAt?: any | null } | null> | null, cobrosNoRealizados?: Array<{ __typename?: 'Cobro', id?: number | null, codigo_cobro?: string | null, forma_cobro?: string | null, was_forced?: boolean | null, fecha_cobro?: any | null, cafeteriaId?: number | null, createdAt?: any | null } | null> | null };

export type CobrosCajeroQueryVariables = Exact<{ [key: string]: never; }>;


export type CobrosCajeroQuery = { __typename?: 'Query', cobrosRegistradosPorCajero?: Array<{ __typename?: 'Cobro', id?: number | null, becarioId?: number | null, concepto?: string | null, codigo_cobro?: string | null, fecha_cobro?: any | null, updatedAt?: any | null } | null> | null };

export type PersonaSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type PersonaSessionQuery = { __typename?: 'Query', currentPersona?: { __typename?: 'Persona', id?: number | null, nombres?: string | null, a_paterno?: string | null, a_materno?: string | null, carreraId?: number | null } | null };

export type AllSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSettingsQuery = { __typename?: 'Query', allSettings?: Array<{ __typename?: 'Settings', id?: number | null, nombre?: string | null, valor?: string | null } | null> | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: number, email: string, roleId?: number | null, is_active: boolean } | null, currentRole?: { __typename?: 'Role', id?: number | null, rol_name?: string | null } | null };


export const CarreraByIdDocument = gql`
    query CarreraById($id: Int!) {
  carreraById(id: $id) {
    id
    nombre
  }
}
    `;

/**
 * __useCarreraByIdQuery__
 *
 * To run a query within a React component, call `useCarreraByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCarreraByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCarreraByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCarreraByIdQuery(baseOptions: Apollo.QueryHookOptions<CarreraByIdQuery, CarreraByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CarreraByIdQuery, CarreraByIdQueryVariables>(CarreraByIdDocument, options);
      }
export function useCarreraByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CarreraByIdQuery, CarreraByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CarreraByIdQuery, CarreraByIdQueryVariables>(CarreraByIdDocument, options);
        }
export type CarreraByIdQueryHookResult = ReturnType<typeof useCarreraByIdQuery>;
export type CarreraByIdLazyQueryHookResult = ReturnType<typeof useCarreraByIdLazyQuery>;
export type CarreraByIdQueryResult = Apollo.QueryResult<CarreraByIdQuery, CarreraByIdQueryVariables>;
export const GenerateCobroCodeDocument = gql`
    query GenerateCobroCode {
  generateCobroCode {
    id
    codigo_cobro
    concepto
  }
}
    `;

/**
 * __useGenerateCobroCodeQuery__
 *
 * To run a query within a React component, call `useGenerateCobroCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateCobroCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateCobroCodeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenerateCobroCodeQuery(baseOptions?: Apollo.QueryHookOptions<GenerateCobroCodeQuery, GenerateCobroCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateCobroCodeQuery, GenerateCobroCodeQueryVariables>(GenerateCobroCodeDocument, options);
      }
export function useGenerateCobroCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateCobroCodeQuery, GenerateCobroCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateCobroCodeQuery, GenerateCobroCodeQueryVariables>(GenerateCobroCodeDocument, options);
        }
export type GenerateCobroCodeQueryHookResult = ReturnType<typeof useGenerateCobroCodeQuery>;
export type GenerateCobroCodeLazyQueryHookResult = ReturnType<typeof useGenerateCobroCodeLazyQuery>;
export type GenerateCobroCodeQueryResult = Apollo.QueryResult<GenerateCobroCodeQuery, GenerateCobroCodeQueryVariables>;
export const RealizarCobroDocument = gql`
    mutation RealizarCobro($codigo: String!) {
  realizeCobro(codigo: $codigo) {
    concepto
    codigo_cobro
    fecha_cobro
  }
}
    `;
export type RealizarCobroMutationFn = Apollo.MutationFunction<RealizarCobroMutation, RealizarCobroMutationVariables>;

/**
 * __useRealizarCobroMutation__
 *
 * To run a mutation, you first call `useRealizarCobroMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRealizarCobroMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [realizarCobroMutation, { data, loading, error }] = useRealizarCobroMutation({
 *   variables: {
 *      codigo: // value for 'codigo'
 *   },
 * });
 */
export function useRealizarCobroMutation(baseOptions?: Apollo.MutationHookOptions<RealizarCobroMutation, RealizarCobroMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RealizarCobroMutation, RealizarCobroMutationVariables>(RealizarCobroDocument, options);
      }
export type RealizarCobroMutationHookResult = ReturnType<typeof useRealizarCobroMutation>;
export type RealizarCobroMutationResult = Apollo.MutationResult<RealizarCobroMutation>;
export type RealizarCobroMutationOptions = Apollo.BaseMutationOptions<RealizarCobroMutation, RealizarCobroMutationVariables>;
export const GetAllCarrerasDocument = gql`
    query GetAllCarreras {
  allCarreras {
    id
    nombre
  }
}
    `;

/**
 * __useGetAllCarrerasQuery__
 *
 * To run a query within a React component, call `useGetAllCarrerasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCarrerasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCarrerasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCarrerasQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCarrerasQuery, GetAllCarrerasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCarrerasQuery, GetAllCarrerasQueryVariables>(GetAllCarrerasDocument, options);
      }
export function useGetAllCarrerasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCarrerasQuery, GetAllCarrerasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCarrerasQuery, GetAllCarrerasQueryVariables>(GetAllCarrerasDocument, options);
        }
export type GetAllCarrerasQueryHookResult = ReturnType<typeof useGetAllCarrerasQuery>;
export type GetAllCarrerasLazyQueryHookResult = ReturnType<typeof useGetAllCarrerasLazyQuery>;
export type GetAllCarrerasQueryResult = Apollo.QueryResult<GetAllCarrerasQuery, GetAllCarrerasQueryVariables>;
export const CobrosBecarioDocument = gql`
    query CobrosBecario {
  currentPersona {
    id
    nombres
    a_paterno
    a_materno
    carreraId
  }
  cobrosRealizados {
    id
    codigo_cobro
    forma_cobro
    was_forced
    fecha_cobro
    cafeteriaId
    createdAt
  }
  cobrosNoRealizados {
    id
    codigo_cobro
    forma_cobro
    was_forced
    fecha_cobro
    cafeteriaId
    createdAt
  }
}
    `;

/**
 * __useCobrosBecarioQuery__
 *
 * To run a query within a React component, call `useCobrosBecarioQuery` and pass it any options that fit your needs.
 * When your component renders, `useCobrosBecarioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCobrosBecarioQuery({
 *   variables: {
 *   },
 * });
 */
export function useCobrosBecarioQuery(baseOptions?: Apollo.QueryHookOptions<CobrosBecarioQuery, CobrosBecarioQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CobrosBecarioQuery, CobrosBecarioQueryVariables>(CobrosBecarioDocument, options);
      }
export function useCobrosBecarioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CobrosBecarioQuery, CobrosBecarioQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CobrosBecarioQuery, CobrosBecarioQueryVariables>(CobrosBecarioDocument, options);
        }
export type CobrosBecarioQueryHookResult = ReturnType<typeof useCobrosBecarioQuery>;
export type CobrosBecarioLazyQueryHookResult = ReturnType<typeof useCobrosBecarioLazyQuery>;
export type CobrosBecarioQueryResult = Apollo.QueryResult<CobrosBecarioQuery, CobrosBecarioQueryVariables>;
export const CobrosCajeroDocument = gql`
    query CobrosCajero {
  cobrosRegistradosPorCajero {
    id
    becarioId
    concepto
    codigo_cobro
    fecha_cobro
    updatedAt
  }
}
    `;

/**
 * __useCobrosCajeroQuery__
 *
 * To run a query within a React component, call `useCobrosCajeroQuery` and pass it any options that fit your needs.
 * When your component renders, `useCobrosCajeroQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCobrosCajeroQuery({
 *   variables: {
 *   },
 * });
 */
export function useCobrosCajeroQuery(baseOptions?: Apollo.QueryHookOptions<CobrosCajeroQuery, CobrosCajeroQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CobrosCajeroQuery, CobrosCajeroQueryVariables>(CobrosCajeroDocument, options);
      }
export function useCobrosCajeroLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CobrosCajeroQuery, CobrosCajeroQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CobrosCajeroQuery, CobrosCajeroQueryVariables>(CobrosCajeroDocument, options);
        }
export type CobrosCajeroQueryHookResult = ReturnType<typeof useCobrosCajeroQuery>;
export type CobrosCajeroLazyQueryHookResult = ReturnType<typeof useCobrosCajeroLazyQuery>;
export type CobrosCajeroQueryResult = Apollo.QueryResult<CobrosCajeroQuery, CobrosCajeroQueryVariables>;
export const PersonaSessionDocument = gql`
    query PersonaSession {
  currentPersona {
    id
    nombres
    a_paterno
    a_materno
    carreraId
  }
}
    `;

/**
 * __usePersonaSessionQuery__
 *
 * To run a query within a React component, call `usePersonaSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonaSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonaSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function usePersonaSessionQuery(baseOptions?: Apollo.QueryHookOptions<PersonaSessionQuery, PersonaSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonaSessionQuery, PersonaSessionQueryVariables>(PersonaSessionDocument, options);
      }
export function usePersonaSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonaSessionQuery, PersonaSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonaSessionQuery, PersonaSessionQueryVariables>(PersonaSessionDocument, options);
        }
export type PersonaSessionQueryHookResult = ReturnType<typeof usePersonaSessionQuery>;
export type PersonaSessionLazyQueryHookResult = ReturnType<typeof usePersonaSessionLazyQuery>;
export type PersonaSessionQueryResult = Apollo.QueryResult<PersonaSessionQuery, PersonaSessionQueryVariables>;
export const AllSettingsDocument = gql`
    query AllSettings {
  allSettings {
    id
    nombre
    valor
  }
}
    `;

/**
 * __useAllSettingsQuery__
 *
 * To run a query within a React component, call `useAllSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSettingsQuery(baseOptions?: Apollo.QueryHookOptions<AllSettingsQuery, AllSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSettingsQuery, AllSettingsQueryVariables>(AllSettingsDocument, options);
      }
export function useAllSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSettingsQuery, AllSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSettingsQuery, AllSettingsQueryVariables>(AllSettingsDocument, options);
        }
export type AllSettingsQueryHookResult = ReturnType<typeof useAllSettingsQuery>;
export type AllSettingsLazyQueryHookResult = ReturnType<typeof useAllSettingsLazyQuery>;
export type AllSettingsQueryResult = Apollo.QueryResult<AllSettingsQuery, AllSettingsQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    email
    roleId
    is_active
  }
  currentRole {
    id
    rol_name
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;