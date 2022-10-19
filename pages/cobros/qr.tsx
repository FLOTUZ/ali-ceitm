import Persona from "../../assets/usuario.svg";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

function CobroQr() {
  const [qrValue, setQrValue] = useState("");

  const getGeneratedQrValue = () => {
    const value = "18120215-19102022-hash";
    setQrValue(value);
  };

  useEffect(() => {
    getGeneratedQrValue();
  }, []);

  return (
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
        <Image src={Persona} alt="Imagen de usuario" height={250} width={250} />
        <Heading as="h3" color={"white"}>
          Emmanuel Esquivel Pardo
        </Heading>
        <Heading as="h3" color={"white"}>
          ITICS
        </Heading>
      </VStack>
    </Center>
  );
}

export default CobroQr;
