import Persona from "../../assets/usuario.svg";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";

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

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
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
            height={250}
            width={250}
          />
          <Heading as="h3" color={"white"}>
            Emmanuel Esquivel Pardo
          </Heading>
          <Heading as="h3" color={"white"}>
            ITICS
          </Heading>
        </VStack>
      </Center>
    </>
  );
}

export default CobroQr;
