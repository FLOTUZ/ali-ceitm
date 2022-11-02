import LoaderComponent from "@/common/loader.component";
import { Center, Text, useToast } from "@chakra-ui/react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useRealizarCobroMutation } from "gql/generated/graphql";
import { useEffect, useState, useCallback } from "react";

const CobradorQR = () => {
  const toast = useToast();
  const [qrData, setQrData] = useState("");
  const [showScanner, setShowScanner] = useState(true);

  const [realizarCobro, { loading }] = useRealizarCobroMutation({
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

  //get operating system and browser
  const getOS = () => {
    const platform = window.navigator.platform;

    if (platform == "Win32" || platform == "linux") {
      setShowScanner(true);
    }
  };

  const cobro = useCallback(async () => {
    if (qrData != "") {
      await realizarCobro({ variables: { codigo: qrData } });

      setQrData("");
    }
  }, [qrData, realizarCobro]);

  useEffect(() => {
    getOS();
  }, []);

  useEffect(() => {
    cobro();
  }, [cobro, qrData]);

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <Center
      h="100%"
      w={"inherit"}
      mt={"2rem"}
      p="1rem"
      color={"white"}
      bgColor={"black"}
    >
      {showScanner ? (
        <QrScanner
          hideCount={true}
          scanDelay={5000}
          onDecode={(result) => {
            if (result.length > 6) {
              setQrData("Este QR no es válido");
              return;
            }
            setQrData(result);
            cobro();
          }}
          onError={(error) => {
            console.log(error?.message);
          }}
        />
      ) : (
        <Text>Este dispositivo no es compatible con la cámara</Text>
      )}
    </Center>
  );
};

export default CobradorQR;
