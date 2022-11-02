import { Button, Input, Text, useToast } from "@chakra-ui/react";
import { useRealizarCobroMutation } from "gql/generated/graphql";
import { useEffect, useState, useCallback } from "react";

const CobradorTexto = () => {
  const toast = useToast();
  const [qrData, setQrData] = useState("");
  const [realizarCobro] = useRealizarCobroMutation({
    //cache: false,
    onCompleted: (data) => {
      if (data.realizeCobro) {
        toast({
          title: "Cobro realizado",
          description: "El cobro se realizó correctamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const cobro = async () => {
    if (qrData != "") {
      await realizarCobro({ variables: { codigo: qrData } });

      setQrData("");
    }
  };

  return (
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
        onClick={() => cobro()}
      >
        REGISTRAR
      </Button>
    </form>
  );
};

export default CobradorTexto;
