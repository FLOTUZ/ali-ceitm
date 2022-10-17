import {
  Button,
  Center,
  CircularProgress,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Head from "next/head";

import * as Yup from "yup";
import SelectComponent from "../select.component";
import TextField from "../text.field";

import { useQuery, gql } from "@apollo/client";
import { Carrera } from "@prisma/client";
import { useEffect, useState } from "react";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Muy corto minimo 2 caracteres")
    .max(20, "Muy Largo maximo 20 caracteres")
    .required("Es requerido")
    .nullable(),

  password: Yup.string()
    .min(8, "Muy corto! minimo 8 caracteres")
    .max(255, "Muy Largo! maximo 255 caracteres")
    .required("Es requerido")
    .nullable(),

  email: Yup.string().email("Correo invalido").required("Required"),

  nombres: Yup.string()
    .min(2, "Muy corto! minimo 2 caracteres")
    .max(50, "Muy Largo! maximo 50 caracteres")
    .required("Es requerido")
    .nullable(),

  a_paterno: Yup.string()
    .min(2, "Muy corto! minimo 2 caracteres")
    .max(50, "Muy Largo! maximo 50 caracteres")
    .required("Es requerido")
    .nullable(),

  a_materno: Yup.string()
    .min(2, "Muy corto! minimo 2 caracteres")
    .max(50, "Muy Largo! maximo 50 caracteres")
    .required("Es requerido")
    .nullable(),

  n_control: Yup.string()
    .min(8, "Muy corto! minimo 8 caracteres")
    .max(10, "Muy Largo! maximo 10 caracteres")
    .required("Es requerido")
    .nullable(),

  telefono: Yup.string()
    .min(10, "Muy corto! minimo 10 caracteres")
    .max(10, "Muy Largo! maximo 10 caracteres")
    .required("Es requerido")
    .nullable(),

  whatsapp: Yup.string()
    .min(10, "Muy corto! minimo 10 caracteres")
    .max(15, "Muy Largo! maximo 15 caracteres")
    .required("Es requerido")
    .nullable(),

  email_institucional: Yup.string()
    .email("Correo invalido")
    .min(20, "Muy corto! minimo 20 caracteres")
    .max(27, "Muy Largo! maximo 27 caracteres")
    .required("Es requerido")
    .nullable(),

  campus: Yup.number().required("Selecciona una opcion").nullable(),

  carrera: Yup.number().required("Selecciona una opcion").nullable(),
});

export const CONSULTA = gql`
  query GetCarreras {
    allCarreras {
      id
      nombre
    }
  }
`;

function SignInForm() {
  const { loading, error, data } = useQuery(CONSULTA);

  const [carrerasList, setCarrerasList] = useState<Carrera[]>([]);

  const {
    isSubmitting,
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    validationSchema: SignupSchema,
    initialValues: {
      username: null,
      password: null,
      email: null,
      nombres: null,
      a_paterno: null,
      a_materno: null,
      n_control: null,
      telefono: null,
      whatsapp: null,
      email_institucional: null,
      campus: null,
      carrera: null,
    },
    onSubmit: async (values: any) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (data) {
      setCarrerasList(data.allCarreras);
    }
  }, [data]);

  if (loading) {
    return (
      <Center h={"100vh"}>
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (error) {
    return <div>Error: ${error.message}</div>;
  }

  return (
    <Container>
      <Head>
        <title>Registro de usuario | CEITM</title>
      </Head>

      <Heading mb={8} mt={8}>
        Registro de usuario
      </Heading>

      <form onSubmit={handleSubmit} autoSave={"on"}>
        <TextField
          name={"username"}
          type="text"
          label="Usuario (Requerido)"
          handleChange={handleChange}
          errors={errors.username}
          touched={touched.username}
        />

        <TextField
          name={"email"}
          type="text"
          label="Email Personal (Requerido)"
          handleChange={handleChange}
          errors={errors.email}
          touched={touched.email}
        />

        <TextField
          name={"password"}
          type="password"
          label="Contraseña (Requerido)"
          handleChange={handleChange}
          errors={errors.password}
          touched={touched.password}
        />

        <TextField
          name={"nombres"}
          type="text"
          label="Nombre (s) (Requerido)"
          handleChange={handleChange}
          errors={errors.nombres}
          touched={touched.nombres}
        />

        <TextField
          name={"a_paterno"}
          type="text"
          label="Apellido Paterno (Requerido)"
          handleChange={handleChange}
          errors={errors.a_paterno}
          touched={touched.a_paterno}
        />

        <TextField
          name={"a_materno"}
          type="text"
          label="Apellido Materno (Requerido)"
          handleChange={handleChange}
          errors={errors.a_paterno}
          touched={touched.a_materno}
        />

        <TextField
          name={"n_control"}
          type="text"
          label="Numero de control (Requerido)"
          handleChange={handleChange}
          errors={errors.n_control}
          touched={touched.n_control}
        />

        <TextField
          name={"telefono"}
          type="tel"
          label="Telefono (Requerido)"
          handleChange={handleChange}
          errors={errors.telefono}
          touched={touched.telefono}
        />

        <TextField
          name={"whatsapp"}
          type="tel"
          label="Whatsapp (Requerido)"
          handleChange={handleChange}
          errors={errors.whatsapp}
          touched={touched.whatsapp}
        />

        <TextField
          name={"email_institucional"}
          type="email"
          label="Email Institucional (Requerido)"
          handleChange={handleChange}
          errors={errors.email_institucional}
          touched={touched.email}
        />

        <SelectComponent
          name={"campus"}
          label={"Campus (Requerido)"}
          placeholder={"Selecciona campus"}
          touched={touched.campus}
          errors={errors.campus}
          handleChange={(e) =>
            setFieldValue("campus", parseInt(e.target.value))
          }
        >
          <option value={1}>Campus 1</option>
          <option value={2}>Campus 2</option>
        </SelectComponent>

        <SelectComponent
          name={"carrera"}
          label={"Carerra (Requerido)"}
          placeholder={"Selecciona carrera"}
          touched={touched.carrera}
          errors={errors.carrera}
          handleChange={(e) =>
            setFieldValue("carrera", parseInt(e.target.value))
          }
        >
          {carrerasList.map((carrera) => (
            <option key={carrera.id} value={carrera.id}>
              {carrera.nombre}
            </option>
          ))}
        </SelectComponent>

        <Center mt={8} mb={8}>
          <Button
            type="submit"
            w={"100%"}
            height={"3rem"}
            bgColor="black"
            color={"white"}
            _hover={{ bgColor: "blueviolet" }}
          >
            {isSubmitting ? "Loading..." : "Registrar"}
          </Button>
        </Center>
      </form>
    </Container>
  );
}

export default SignInForm;
