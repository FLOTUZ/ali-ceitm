import QRCode from "react-qr-code";
import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import { useEffect, useState } from "react";
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import { Carrera, Persona } from "@prisma/client";
import {
  useCarreraByIdLazyQuery,
  useGenerateCobroCodeQuery,
  usePersonaSessionQuery,
} from "gql/generated/graphql";

function CobroQr() {
  const [qrValue, setQrValue] = useState("");
  const [pesonaValue, setPesonaValue] = useState<Persona | null>();
  const [carreraValue, setCarreraValue] = useState<Carrera | null>();

  const {
    data: dataQR,
    loading: loadingQR,
    error: qrError,
  } = useGenerateCobroCodeQuery();

  const {
    data: dataPersona,
    loading: loadingPersona,
    error: personaError,
  } = usePersonaSessionQuery();

  const [
    getCarrera,
    { data: dataCarrera, loading: loadingCarrera, error: carreraError },
  ] = useCarreraByIdLazyQuery();

  useEffect(() => {
    if (dataQR) {
      setQrValue(dataQR.generateCobroCode?.codigo_cobro as string);
    }

    if (dataPersona) {
      setPesonaValue(dataPersona.currentPersona! as Persona);
    }

    if (dataCarrera) {
      setCarreraValue(dataCarrera.carreraById! as Carrera);
    }
  }, [dataQR, dataCarrera, dataPersona]);

  useEffect(() => {
    if (pesonaValue) {
      getCarrera({
        variables: { id: pesonaValue!.carreraId },
      });
    }
  }, [getCarrera, pesonaValue]);

  if (loadingQR || loadingPersona || loadingCarrera) {
    return <LoaderComponent />;
  }

  if (qrError) {
    return (
      <ErrorComponent
        errorCode={qrError["graphQLErrors"][0]["extensions"]["code"]}
        message={qrError.message}
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
      <Center h={"100vh"}>
        <VStack>
          <Heading as="h4">{qrValue}</Heading>
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
