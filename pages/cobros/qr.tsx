import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import { Carrera, Persona } from "@prisma/client";

const GENERATE_CODE = gql`
  query CREATE_COBRO_CODE {
    generateCobroCode {
      id
      codigo_cobro
      concepto
    }
  }
`;

const GET_CURRENT_PERSONA = gql`
  query GET_CURRENT_PERSONA {
    currentPersona {
      id
      nombres
      a_paterno
      a_materno
      carreraId
    }
  }
`;

const GET_CARRERA_BY_ID = gql`
  query GET_CARRERA_BY_ID($id: Int!) {
    carreraById(id: $id) {
      id
      nombre
    }
  }
`;

function CobroQr() {
  const [qrValue, setQrValue] = useState("");
  const [pesonaValue, setPesonaValue] = useState<Persona | null>();
  const [carreraValue, setCarreraValue] = useState<Carrera | null>();

  const { data, loading, error } = useQuery(GENERATE_CODE);
  const {
    data: dataPersona,
    loading: loadingPersona,
    error: personaError,
  } = useQuery(GET_CURRENT_PERSONA);

  const {
    data: dataCarrera,
    loading: loadingCarrera,
    error: carreraError,
  } = useQuery(GET_CARRERA_BY_ID, {
    variables: {
      id: pesonaValue?.carreraId,
    },
  });

  useEffect(() => {
    if (data) {
      setQrValue(data.generateCobroCode.codigo_cobro);
    }

    if (dataPersona) {
      setPesonaValue(dataPersona.currentPersona);
    }
  }, [data, dataPersona]);

  useEffect(() => {
    if (dataCarrera) {
      setCarreraValue(dataCarrera.carreraById);
    }
  }, [dataCarrera]);

  if (loading || loadingPersona || loadingCarrera) {
    return <LoaderComponent />;
  }

  if (error) {
    return (
      <ErrorComponent
        errorCode={error["graphQLErrors"][0]["extensions"]["code"]}
        message={error.message}
      />
    );
  }

  if (personaError) {
    return (
      <ErrorComponent
        errorCode={personaError["graphQLErrors"][0]["extensions"]["code"]}
        message={personaError.message}
      />
    );
  }

  if (carreraError) {
    return (
      <ErrorComponent
        errorCode={carreraError["graphQLErrors"][0]["extensions"]["code"]}
        message={carreraError.message}
      />
    );
  }

  return (
    <>
      <Center h={"100vh"} bgColor="black">
        <VStack>
          <Heading as="h4" color={"white"}>
            {qrValue}
          </Heading>
          <div style={{ background: "white", padding: "16px" }}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={qrValue}
              level={"H"}
              viewBox={`0 0 256 256`}
            />
          </div>
          <Box h={10} />
          {/* <Image
            src={Persona}
            alt="Imagen de usuario"
            height={100}
            width={100}
          /> */}
          <Heading as="h3" color={"grey"} textAlign="center">
            {pesonaValue?.nombres} {pesonaValue?.a_paterno}{" "}
            {pesonaValue?.a_materno}
          </Heading>
          <Heading as="h4" size={"lg"} color={"grey"} textAlign="center">
            {carreraValue?.nombre}
          </Heading>
        </VStack>
      </Center>
    </>
  );
}

export default CobroQr;
