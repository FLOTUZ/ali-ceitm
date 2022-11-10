import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import DefaultLayout from "@/layouts/default-layout.component";
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  Beca,
  useAutoInscripcionMutation,
  useOnlyBecaByIdQuery,
} from "gql/generated/graphql";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { BsClock, BsFlag } from "react-icons/bs";

const VerConvocatoria = () => {
  const router = useRouter();
  const toast = useToast();
  const { becaId } = router.query;
  const [detallesBeca, setDetallesBeca] = useState<Beca>();
  const {
    isOpen: selectTurnoIsOpen,
    onOpen: selectTurnoOnOpen,
    onClose: SelectTurnoOnClose,
  } = useDisclosure();

  const { loading: becaDetallesLoading, error: becaDetallesError } =
    useOnlyBecaByIdQuery({
      variables: {
        id: Number(becaId),
      },
      onCompleted(data) {
        setDetallesBeca(data.becaById as Beca);
      },
    });

  const [
    autoInscribirse,
    { loading: autoinscripcionLoading, error: autoInscripcionError },
  ] = useAutoInscripcionMutation({
    onCompleted(data) {
      console.log(data);
      toast({
        title: "Inscripción exitosa",
        description: "Se ha inscrito correctamente a la beca",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const formTurno = useFormik({
    initialValues: {
      turno: undefined,
    },
    onSubmit: (values) => {
      autoInscribirse({
        variables: {
          becaId: Number(becaId),
          turno: values.turno!,
        },
      });
    },
  });

  if (becaDetallesLoading) return <LoaderComponent />;
  if (becaDetallesError) return <ErrorComponent message={"error.message"} />;

  return (
    <DefaultLayout heading={`Ver convocatoria`}>
      <Head>
        <title>Ver convocatoria | {detallesBeca?.nombre}</title>
      </Head>

      <Container
        borderWidth={1}
        borderColor={"gray.300"}
        boxShadow={"md"}
        p={4}
      >
        <Center h={"100%"}>
          <Heading as="h1" size="xl" textAlign={"center"}>
            {detallesBeca?.nombre}
          </Heading>
        </Center>
      </Container>
      <Container mt={8}>
        <HStack>
          <BsFlag />
          <Text>Inicia: {moment(detallesBeca?.inicia).format("LL")}</Text>
        </HStack>
        <HStack>
          <BsClock />
          <Text>Termina: {moment(detallesBeca?.termina).format("LL")}</Text>
        </HStack>
      </Container>
      <Container mt={8}>
        <Heading size={"md"}>Descripcion</Heading>
        <Text size={"md"} mb={8}>
          {detallesBeca?.descripcion}
        </Text>
      </Container>
      <Container>
        <Badge colorScheme="green">Becas alimenticias</Badge>
      </Container>
      <Container>
        {detallesBeca?.is_active ? (
          <Button
            w={"100%"}
            mt={8}
            h={16}
            colorScheme="blue"
            fontSize={22}
            onClick={selectTurnoOnOpen}
          >
            Inscribirme
          </Button>
        ) : (
          <Box>
            <Text mt={8} textAlign={"center"}>
              Esta convocatoria ya no esta disponible
            </Text>
          </Box>
        )}
      </Container>

      <>
        <Modal
          isOpen={selectTurnoIsOpen}
          onClose={SelectTurnoOnClose}
          size="lg"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Selecciona de cobro preferido</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={formTurno.handleSubmit}>
              <ModalBody>
                <Text mb={8}>
                  Por favor selecciona el turno de beca alimenticia que
                  prefieras
                </Text>
                <Text as={"mark"}>
                  NOTA: El elegir un turno no te asegura que te toque ese turno
                  para cobrar
                </Text>
                <Box mt={8}>
                  <RadioGroup
                    name="turno"
                    value={formTurno.values.turno}
                    onChange={(value) =>
                      formTurno.setFieldValue("turno", Number(value))
                    }
                  >
                    <Stack direction="row" justifyContent={"center"}>
                      <Spacer />
                      <Radio size={"lg"} value={1} isRequired>
                        DESAYUNO
                      </Radio>
                      <Spacer />
                      <Radio size={"lg"} value={2} isRequired>
                        COMIDA
                      </Radio>
                      <Spacer />
                    </Stack>
                  </RadioGroup>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="outline"
                  colorScheme="red"
                  w={"100%"}
                  mr={3}
                  onClick={SelectTurnoOnClose}
                >
                  Cancelar
                </Button>
                <Button
                  isLoading={autoinscripcionLoading}
                  colorScheme={"blue"}
                  w={"100%"}
                  type="submit"
                >
                  Enviar
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    </DefaultLayout>
  );
};

export default VerConvocatoria;
