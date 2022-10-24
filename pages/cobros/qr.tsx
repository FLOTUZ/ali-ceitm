import Persona from "../../assets/usuario.svg";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";

const GENERATE_CODE = gql`
  query CREATE_COBRO_CODE {
    generateCobroCode {
      id
      codigo_cobro
      concepto
    }
  }
`;

function CobroQr() {
  const [qrValue, setQrValue] = useState("");

  const { data, loading, error } = useQuery(GENERATE_CODE);

  useEffect(() => {
    if (data) {
      setQrValue(data.generateCobroCode.codigo_cobro);
    }
  }, [data]);

  if (loading) {
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

  return (
    <>
      <Center h={"100vh"} bgColor="black">
        <VStack>
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
          <Image
            src={Persona}
            alt="Imagen de usuario"
            height={100}
            width={100}
          />
          <Heading as="h3" color={"white"} textAlign="center">
            Emmanuel Esquivel Pardo
          </Heading>
          <Heading as="h3" color={"white"} textAlign="center">
            ITICS
          </Heading>
        </VStack>
      </Center>
    </>
  );
}

export default CobroQr;
