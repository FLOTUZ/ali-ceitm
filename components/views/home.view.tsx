import Desayuno from "../../assets/desayuno.svg";
import Comida from "../../assets/comida.svg";
import Cafeteria from "../../assets/cafeteria.svg";
import CalendarioSemanal from "../../assets/calendario-semanal.svg";
import CalendarioDiario from "../../assets/calendario-diario.svg";
import Reloj from "../../assets/reloj.svg";
import Qr from "../../assets/qrcode.svg";

import Image from "next/image";
import moment from "moment";

import { Center, Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

const GET_SETTINGS = gql`
  query GetSettings {
    allSettings {
      id
      nombre
      valor
    }
  }
`;

function Home() {
  const [time, setTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState("");
  const [isBreakfastHour, setIsBreakfastHour] = useState<boolean>(false);
  const [isPairWeek, setisPairWeek] = useState(false);

  //get settings
  const { data, loading, error } = useQuery(GET_SETTINGS);

  const isMoreThan12PM = () => {
    const isTimeOfBreakfast = moment().isAfter(
      moment().hour(12).minute(0).second(0)
    );
    setIsBreakfastHour(isTimeOfBreakfast);
  };

  const calculatePairOrInpairWeek = () => {
    const week = moment().week();
    const isPair = week % 2 === 0;
    setisPairWeek(isPair);
  };

  const calculateCurrentDate = () => {
    const date = moment().format("DD/MM/YYYY");
    setCurrentDate(date);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      isMoreThan12PM();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("LTS"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculatePairOrInpairWeek();
    calculateCurrentDate();
  }, []);

  if (loading) return <p>Loading...</p>;

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
            <Image src={CalendarioDiario} alt="Cafeteria" />
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
            <Text>{"Cafetería"}</Text>
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

export default Home;
