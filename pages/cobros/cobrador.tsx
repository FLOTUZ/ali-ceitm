import CobradorQR from "@/views/cobrador/cobrador-qr";
import CobradorTexto from "@/views/cobrador/cobrador-texto";
import {
  Center,
  Heading,
  HStack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

function Cobrador() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <Center h="100%" mt={"2rem"} p="1rem" color={"white"} bgColor={"black"}>
      <VStack h={500} width={500}>
        <HStack>
          <Text> QR </Text>
          <Switch
            size="lg"
            isChecked={!showScanner}
            onChange={() => {
              setShowScanner(showScanner ? false : true);
            }}
          />
          <Text> Texto </Text>
        </HStack>
        <Heading>Cobrador</Heading>
        {showScanner ? <CobradorQR /> : <CobradorTexto />}
      </VStack>
    </Center>
  );
}
export default Cobrador;
