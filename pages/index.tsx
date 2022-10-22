import Desayuno from "../assets/desayuno.svg";
import Comida from "../assets/comida.svg";
import Cafeteria from "../assets/cafeteria.svg";
import CalendarioSemanal from "../assets/calendario-semanal.svg";
import CalendarioDiario from "../assets/calendario-diario.svg";
import Reloj from "../assets/reloj.svg";
import QrSCanner from "../assets/qr-scanner.png";
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
import { Settings, User } from "@prisma/client";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";

const GET_SETTINGS = gql`
  query GetSettings {
    allSettings {
      id
      nombre
      valor
    }
  }
`;

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      roleId
      is_active
    }
  }
`;

function Index() {
  const [time, setTime] = useState<string>("--:--:--");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isBreakfastHour, setIsBreakfastHour] = useState<boolean>(false);
  const [isPairWeek, setisPairWeek] = useState<boolean>(false);
  const [place, setPlace] = useState<string>("");

  const [isCobrador, setIsCobrador] = useState<boolean>(false);

  const router = useRouter();
  const toast = useToast();

  const {
    data: settingsData,
    loading: loadingSettings,
    error: errorSettings,
    refetch: refetchSettings,
  } = useQuery(GET_SETTINGS);

  const {
    data: currentUserData,
    loading: loadingCurrentUser,
    error: currentUserError,
  } = useQuery(GET_CURRENT_USER);

  //======================== STATE ========================

  const settingsState = useCallback(() => {
    if (errorSettings) {
      return;
    }
    const settings = settingsData.allSettings as Settings[];

    //Get setting item by name
    const alimento = settings.find((setting) => setting.nombre === "alimento");
    const semana = settings.find((setting) => setting.nombre === "semana");
    const lugar = settings.find((setting) => setting.nombre === "lugar");

    if (settings) {
      setIsBreakfastHour(alimento!.valor === "DESAYUNO");
      setisPairWeek(semana!.valor === "PAR");
      setPlace(lugar!.valor);
    }
  }, [settingsData, errorSettings]);

  const currentUserState = useCallback(() => {
    if (currentUserError) {
      return;
    }

    const userData = currentUserData.currentUser as User;

    if (userData.roleId === 4) {
      setIsCobrador(true);
    }
  }, [currentUserData, currentUserError]);

  const calculateCurrentDate = () => {
    const date = moment().format("DD/MM/YYYY");
    setCurrentDate(date);
  };

  //================= FETCH =================
  useEffect(() => {
    if (currentUserData) {
      currentUserState();
    }
  }, [currentUserState, currentUserData]);

  useEffect(() => {
    if (settingsData) {
      settingsState();
    }
  }, [settingsData, settingsState]);

  //================= INTERVALS =================

  useEffect(() => {
    const interval = setInterval(() => {
      refetchSettings();
      settingsState();
    }, 5000);
    return () => clearInterval(interval);
  }, [settingsState, refetchSettings]);

  useEffect(() => {
    calculateCurrentDate();

    const interval = setInterval(() => {
      setTime(moment().format("LTS"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //================= LOADERS =================

  if (loadingSettings || loadingCurrentUser) {
    return <LoaderComponent />;
  }

  //================= ERROR HANDLING =================

  if (errorSettings) {
    return <ErrorComponent message={errorSettings.networkError?.message!} />;
  }

  if (currentUserError) {
    return <ErrorComponent message={currentUserError.message} />;
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

      {isCobrador ? (
        <Link href={"/cobros/scanner"}>
          <a>
            <Container h={150} w={150} p={19} bgColor={"black"} color="white">
              <Center h={"100%"}>
                <VStack>
                  <Image src={QrSCanner} alt="Escanner QR" />
                  <Text>{"Cobrar beca"}</Text>
                </VStack>
              </Center>
            </Container>
          </a>
        </Link>
      ) : (
        <Link href={"/cobros/qr"}>
          <a>
            <Container h={150} w={150} p={19} bgColor={"black"} color="white">
              <Center h={"100%"}>
                <VStack>
                  <Image src={Qr} alt="Generar QR" />
                  <Text>{"Generar QR"}</Text>
                </VStack>
              </Center>
            </Container>
          </a>
        </Link>
      )}
    </SimpleGrid>
  );
}

export default Index;
