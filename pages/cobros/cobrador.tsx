import {
  Button,
  Center,
  Heading,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Text,
  VStack,
} from "@chakra-ui/react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";

function Cobrador() {
  const [qrData, setQrData] = useState("");
  const [qrerror, setQrerror] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  //get operating system and browser
  const getOS = () => {
    const platform = window.navigator.platform;

    if (platform == "Win32" || platform == "linux") {
      setShowScanner(true);
    }
  };

  useEffect(() => {
    getOS();
  }, []);

  return (
    <Center h="100%" mt={"2rem"} p="1rem" color={"white"} bgColor={"black"}>
      <VStack h={500} width={500}>
        <Heading>Cobrador</Heading>
        {showScanner ? (
          <QrScanner
            hideCount={true}
            scanDelay={2000}
            onDecode={(result) => {
              setQrData(result);
            }}
            onError={(error) => {
              setQrerror(error?.message);
            }}
          />
        ) : (
          <>
            <Text>El scanner QR no esta disponible </Text>

            <form>
              <Text mt={"2rem"} textAlign={"center"}>
                Ingrese el codigo de cobro
              </Text>
              <Input
                mt={"1rem"}
                placeholder="6 digitos"
                type="text"
                name="qr"
                textAlign={"center"}
                maxLength={6}
                minLength={6}
                value={qrData}
                onChange={(e) => setQrData(e.target.value)}
              />
              <Button h={"3rem"} w="100%" mt={"1rem"} colorScheme={"blue"}>
                REGISTRAR
              </Button>
            </form>
          </>
        )}
        <Text color={"white"}>{qrData}</Text>
        <Text color={"white"}>{qrerror}</Text>
      </VStack>
    </Center>
  );
}
export default Cobrador;
