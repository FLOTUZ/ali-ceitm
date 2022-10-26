import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import { useMutation } from "@apollo/client";
import {
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Switch,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Cobro } from "@prisma/client";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { gql } from "apollo-server-core";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const REALIZAR_COBRO = gql`
  mutation realizarCobro($codigo: String!) {
    realizeCobro(codigo: $codigo) {
      concepto
      codigo_cobro
      fecha_cobro
    }
  }
`;

function Cobrador() {
  const toast = useToast();
  const [qrData, setQrData] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const [realizarCobro, { data, loading, error }] = useMutation(
    REALIZAR_COBRO,
    { errorPolicy: "all" }
  );

  const router = useRouter();

  //get operating system and browser
  const getOS = () => {
    const platform = window.navigator.platform;

    if (platform == "Win32" || platform == "linux") {
      setShowScanner(true);
    }
  };

  const cobrar = () => {
    realizarCobro({ variables: { codigo: qrData } });
  };

  const cobro = useCallback(() => {
    if (data && error == undefined) {
      const cobro = data.realizeCobro as Cobro;

      toast({
        title: "Cobro realizado",
        description: `Cobro realizado con éxito. Código: ${cobro.codigo_cobro}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setQrData("");
    }
  }, [data, error, toast]);

  useEffect(() => {
    getOS();
  }, []);

  useEffect(() => {
    if (data) {
      cobro();
    }
  }, [cobro, data]);

  if (loading) {
    return <LoaderComponent />;
  }
  if (error) {
    return (
      <ErrorComponent message={error.message}>
        <Button onClick={router.reload}>Regresar</Button>
      </ErrorComponent>
    );
  }
  return (
    <Center h="100%" mt={"2rem"} p="1rem" color={"white"} bgColor={"black"}>
      <VStack h={500} width={500}>
        <HStack>
          <Text> QR </Text>
          <Switch
            size="lg"
            onChange={() => {
              setShowScanner(showScanner ? false : true);
            }}
          />
          <Text> Texto </Text>
        </HStack>
        <Heading>Cobrador</Heading>
        {showScanner ? (
          <QrScanner
            hideCount={true}
            scanDelay={2000}
            onDecode={(result) => {
              if (result.length > 6) {
                setQrData("Este QR no es válido");
              }
              setQrData(result);
              realizarCobro();
            }}
            onError={(error) => {
              console.log(error?.message);
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
                autoComplete="off"
                maxLength={6}
                minLength={6}
                value={qrData}
                onChange={(e) => setQrData(e.target.value)}
              />
              <Button
                h={"3rem"}
                w="100%"
                mt={"1rem"}
                colorScheme={"blue"}
                onClick={cobrar}
              >
                REGISTRAR
              </Button>
            </form>
          </>
        )}
        <Text color={"white"}>{qrData}</Text>
      </VStack>
    </Center>
  );
}
export default Cobrador;
