import Desayuno from "../assets/desayuno.svg";
import Comida from "../assets/comida.svg";
import Cafeteria from "../assets/cafeteria.svg";
import CalendarioSemanal from "../assets/calendario-semanal.svg";
import CalendarioDiario from "../assets/calendario-diario.svg";
import Reloj from "../assets/reloj.svg";
import Qr from "../assets/qrcode.svg";

import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import {
  Center,
  CircularProgress,
  Container,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Settings } from "@prisma/client";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const GET_SETTINGS = gql`
  query GetSettings {
    allSettings {
      id
      nombre
      valor
    }
  }
`;

function Index() {
  const [time, setTime] = useState<string>("--:--:--");
  const [currentDate, setCurrentDate] = useState("");
  const [isBreakfastHour, setIsBreakfastHour] = useState<boolean>(false);
  const [isPairWeek, setisPairWeek] = useState(false);
  const [place, setPlace] = useState<string>("");

  const router = useRouter();
  const toast = useToast();

  const { data, loading, error, refetch } = useQuery(GET_SETTINGS);

  const getSettings = useCallback(() => {
    if (error) {
      return;
    }
    const settings = data.allSettings as Settings[];
    
    //Get setting item by name
    const alimento = settings.find((setting) => setting.nombre === "alimento");
    const semana = settings.find((setting) => setting.nombre === "semana");
    const lugar = settings.find((setting) => setting.nombre === "lugar");

    if (settings) {
      setIsBreakfastHour(alimento!.valor === "DESAYUNO");
      setisPairWeek(semana!.valor === "PAR");
      setPlace(lugar!.valor);
    }
  }, [data, error]);

  const calculateCurrentDate = () => {
    const date = moment().format("DD/MM/YYYY");
    setCurrentDate(date);
  };

  //Show data of graphql settings
  useEffect(() => {
    if (data) {
      getSettings();
    }
  }, [data, getSettings]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      getSettings();
    }, 5000);
    return () => clearInterval(interval);
  }, [getSettings, refetch]);

  useEffect(() => {
    calculateCurrentDate();

    const interval = setInterval(() => {
      setTime(moment().format("LTS"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Center h={"100vh"} bgColor={"black"}>
        <CircularProgress color={"blue"} />
      </Center>
    );
  }
  if (error) {
    if (error.message.includes("status code 400")) {
      toast({
        title: "Sesion expirada",
        description: "Inicia sesion nuevamente",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      router.push("/auth/login");
      return;
    }
    return (
      <Center h={"100%"}>
        <Text>Error:</Text>
        <Text>{error.networkError?.message}</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid columns={[2, 3, 3]} bgColor="black">
      <Container h={150} w={150} p={19} bgColor={"black"} color="white">
        <Center h={"100%"}>
          <VStack>
            <Image src={Reloj} alt="Hora actual en el sistema" />
            <Text>{time}</Text>
          </VStack>
        </Center>
      </Container>

      <Container h={150} w={150} p={19} bgColor={"black"} color="white">
        <Center h={"100%"}>
          <VStack>
            <Image src={CalendarioDiario} alt="Fecha" />
            <Text>{currentDate}</Text>
          </VStack>
        </Center>
      </Container>

      {isBreakfastHour ? (
        <Container h={150} w={150} p={19} bgColor={"black"} color="white">
          <Center h={"100%"}>
            <VStack>
              <Image src={Desayuno} alt="Desayuno" />
              <Text>Desayuno</Text>
            </VStack>
          </Center>
        </Container>
      ) : (
        <Container h={150} w={150} p={19} bgColor={"black"} color="white">
          <Center h={"100%"}>
            <VStack>
              <Image src={Comida} alt="Comida" />
              <Text>Comida</Text>
            </VStack>
          </Center>
        </Container>
      )}

      <Container h={150} w={150} p={19} bgColor={"black"} color="white">
        <Center h={"100%"}>
          <VStack>
            <Image src={CalendarioSemanal} alt="Es semana par o non" />
            {isPairWeek ? <Text>NON</Text> : <Text>PAR</Text>}
          </VStack>
        </Center>
      </Container>

      <Container h={150} w={150} p={19} bgColor={"black"} color="white">
        <Center h={"100%"}>
          <VStack>
            <Image src={Cafeteria} alt="Cafeteria" />
            <Text>{place}</Text>
          </VStack>
        </Center>
      </Container>

      <Link href={"/cobros/qr"}>
        <a>
          <Container h={150} w={150} p={19} bgColor={"black"} color="white">
            <Center h={"100%"}>
              <VStack>
                <Image src={Qr} alt="Cafeteria" />
                <Text>{"Generar QR"}</Text>
              </VStack>
            </Center>
          </Container>
        </a>
      </Link>
    </SimpleGrid>
  );
}

export default Index;
