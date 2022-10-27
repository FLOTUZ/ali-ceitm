import SelectComponent from "../select.component";
import TextFieldComponent from "../text.field";
import Head from "next/head";

import {
  Button,
  Center,
  CircularProgress,
  Container,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { SignupSchema } from "./auth.validators";
import { useQuery } from "@apollo/client";
import { Carrera } from "@prisma/client";
import { useEffect, useState } from "react";
import { createUsuario } from "./auth.actions";
import { useRouter } from "next/router";
import { UserDto } from "graphql/user/user.dto";
import { PersonaDTO } from "graphql/persona/persona.dto";
import { useGetAllCarrerasQuery } from "gql/generated/graphql";

function SingupForm() {
  const {
    loading: loadingCarreras,
    error: errorCarreras,
    data: dataCarreras,
  } = useGetAllCarrerasQuery();

  const toast = useToast();
  const router = useRouter();

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
      carreraId: null,
    },
    onSubmit: async (values: any) => {
      const user = values as UserDto;
      const persona = values as PersonaDTO;

      try {
        const response = await createUsuario(user, persona);

        if (response.status === 201) {
          toast({
            title: "Usuario creado",
            description: "Se ha creado el usuario correctamente",
            status: "success",
            isClosable: true,
            duration: 7000,
            position: "top-right",
          });
          router.push("/auth/login");
        }
        //catch with error code from axios
      } catch (error: any) {
        toast({
          title: "No se ha podido crear el usuario",
          description: error.response.data.error,
          status: "error",
          isClosable: true,
          duration: 7000,
          position: "top-right",
        });
      }
    },
  });

  useEffect(() => {
    if (dataCarreras) {
      setCarrerasList(dataCarreras.allCarreras as Carrera[]);
    }
  }, [dataCarreras]);

  if (loadingCarreras) {
    return (
      <Center h={"100vh"}>
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (errorCarreras) {
    return <div>Error: ${errorCarreras.message}</div>;
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
        <TextFieldComponent
          name={"email"}
          type="text"
          label="Email Personal (Requerido)"
          handleChange={handleChange}
          errors={errors.email}
          touched={touched.email}
        />

        <TextFieldComponent
          name={"password"}
          type="password"
          label="Contraseña (Requerido)"
          handleChange={handleChange}
          errors={errors.password}
          touched={touched.password}
        />

        <TextFieldComponent
          name={"nombres"}
          type="text"
          label="Nombre (s) (Requerido)"
          handleChange={handleChange}
          errors={errors.nombres}
          touched={touched.nombres}
        />

        <TextFieldComponent
          name={"a_paterno"}
          type="text"
          label="Apellido Paterno (Requerido)"
          handleChange={handleChange}
          errors={errors.a_paterno}
          touched={touched.a_paterno}
        />

        <TextFieldComponent
          name={"a_materno"}
          type="text"
          label="Apellido Materno (Requerido)"
          handleChange={handleChange}
          errors={errors.a_paterno}
          touched={touched.a_materno}
        />

        <TextFieldComponent
          name={"n_control"}
          type="text"
          label="Numero de control (Requerido)"
          handleChange={handleChange}
          errors={errors.n_control}
          touched={touched.n_control}
        />

        <TextFieldComponent
          name={"telefono"}
          type="tel"
          label="Telefono (Requerido)"
          handleChange={handleChange}
          errors={errors.telefono}
          touched={touched.telefono}
        />

        <TextFieldComponent
          name={"whatsapp"}
          type="tel"
          label="Whatsapp (Requerido)"
          handleChange={handleChange}
          errors={errors.whatsapp}
          touched={touched.whatsapp}
        />

        <TextFieldComponent
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
          name={"carreraId"}
          label={"Carerra (Requerido)"}
          placeholder={"Selecciona carrera"}
          touched={touched.carreraId}
          errors={errors.carreraId}
          handleChange={(e) =>
            setFieldValue("carreraId", parseInt(e.target.value))
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

export default SingupForm;
