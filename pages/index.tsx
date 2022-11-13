import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import Desayuno from "../assets/desayuno.svg";
import Comida from "../assets/comida.svg";
import Cafeteria from "../assets/cafeteria.svg";
import CalendarioSemanal from "../assets/calendario-semanal.svg";
import CalendarioDiario from "../assets/calendario-diario.svg";
import Reloj from "../assets/reloj.svg";
import QrSCanner from "../assets/qr-scanner.png";
import Qr from "../assets/qrcode.svg";
import Logout from "../assets/logout.png";
import Usuario from "../assets/usuario.svg";
import Becado from "../assets/becado.png";

import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import { AuthContext } from "context/auth.provider";
import { useAllSettingsQuery } from "gql/generated/graphql";
import {
  Button,
  Center,
  Container,
  IconButton,
  SimpleGrid,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Settings } from "@prisma/client";
import { MoonIcon } from "@chakra-ui/icons";
import { FiSun } from "react-icons/fi";

function Index() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [time, setTime] = useState<string>("--:--:--");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isBreakfastHour, setIsBreakfastHour] = useState<boolean>(false);
  const [isPairWeek, setisPairWeek] = useState<boolean>(false);
  const [place, setPlace] = useState<string>("");

  const [isCobrador, setIsCobrador] = useState<boolean>(false);
  const { user, logout, refetchUser } = useContext(AuthContext);

  const {
    data: settingsData,
    loading: loadingSettings,
    error: errorSettings,
    refetch: refetchSettings,
  } = useAllSettingsQuery();

  //======================== STATE ========================

  useEffect(() => {
    if (user?.roleId == 4) {
      setIsCobrador(true);
    } else {
      setIsCobrador(false);
    }
  }, [user?.roleId]);

  const settingsState = useCallback(() => {
    if (errorSettings) {
      return;
    }
    const settings = settingsData?.allSettings as Settings[];

    //Get setting item by name
    const alimento = settings.find((setting) => setting.nombre === "alimento");
    const semana = settings.find((setting) => setting.nombre === "semana");
    const lugar = settings.find((setting) => setting.nombre === "lugar");

    if (settings) {
      setIsBreakfastHour(alimento!.valor == "DESAYUNO");
      setisPairWeek(semana!.valor == "PAR");
      setPlace(lugar!.valor);
    }
  }, [settingsData, errorSettings]);

  const calculateCurrentDate = () => {
    const date = moment().format("DD/MM/YYYY");
    setCurrentDate(date);
  };

  //================= FETCH =================

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
      refetchUser();
    }, 5000);
    return () => clearInterval(interval);
  }, [settingsState, refetchSettings, refetchUser]);

  useEffect(() => {
    calculateCurrentDate();

    const interval = setInterval(() => {
      setTime(moment().format("LTS"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //================= LOADERS =================

  if (loadingSettings) {
    return <LoaderComponent />;
  }

  //================= ERROR HANDLING =================

  if (errorSettings) {
    return <ErrorComponent message={errorSettings.networkError?.message!} />;
  }

  return (
    <>
      <IconButton
        aria-label="theme"
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MoonIcon /> : <FiSun />}
      />

      <SimpleGrid columns={[2, 3, 3]} p={3}>
        <Container h={150} w={150} p={19}>
          <Center h={"100%"}>
            <VStack>
              <Image src={Reloj} alt="Hora actual en el sistema" />
              <Text>{time}</Text>
            </VStack>
          </Center>
        </Container>

        <Container h={150} w={150} p={19}>
          <Center h={"100%"}>
            <VStack>
              <Image src={CalendarioDiario} alt="Fecha" />
              <Text>{currentDate}</Text>
            </VStack>
          </Center>
        </Container>

        {isBreakfastHour ? (
          <Container h={150} w={150} p={19}>
            <Center h={"100%"}>
              <VStack>
                <Image src={Desayuno} alt="Desayuno" />
                <Text>Desayuno</Text>
              </VStack>
            </Center>
          </Container>
        ) : (
          <Container h={150} w={150} p={19}>
            <Center h={"100%"}>
              <VStack>
                <Image src={Comida} alt="Comida" />
                <Text>Comida</Text>
              </VStack>
            </Center>
          </Container>
        )}

        <Container h={150} w={150} p={19}>
          <Center h={"100%"}>
            <VStack>
              <Image src={CalendarioSemanal} alt="Es semana par o non" />
              {isPairWeek ? <Text>PAR</Text> : <Text>NON</Text>}
            </VStack>
          </Center>
        </Container>

        <Container h={150} w={150} p={19}>
          <Center h={"100%"}>
            <VStack>
              <Image src={Cafeteria} alt="Cafeteria" />
              <Text>{place}</Text>
            </VStack>
          </Center>
        </Container>
        {isCobrador ? (
          <Link href={"/cobros/cobrador"}>
            <a>
              <Container h={150} w={150} p={19}>
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
              <Container h={150} w={150} p={19}>
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

        <Link href={"/convocatorias"}>
          <a>
            <Container h={150} w={150} p={19}>
              <Center h={"100%"}>
                <VStack>
                  <Image src={Becado} alt="Perfil" />
                  <Text>{"Convocatorias"}</Text>
                </VStack>
              </Center>
            </Container>
          </a>
        </Link>

        <Link href={"/perfil"}>
          <a>
            <Container h={150} w={150} p={19}>
              <Center h={"100%"}>
                <VStack>
                  <Image src={Usuario} alt="Perfil" />
                  <Text>{"Ver perfil"}</Text>
                </VStack>
              </Center>
            </Container>
          </a>
        </Link>

        <Center h={"100%"}>
          <Button
            h={150}
            w={150}
            bgColor="transparent"
            onClick={logout}
            _hover={{ bgColor: "black" }}
          >
            <Container p={19}>
              <VStack>
                <Image src={Logout} alt="Salir" />
                <Text>{"Salir"}</Text>
              </VStack>
            </Container>
          </Button>
        </Center>
      </SimpleGrid>
    </>
  );
}

export default Index;
