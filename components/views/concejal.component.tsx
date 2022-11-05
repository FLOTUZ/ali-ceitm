import ButtonIconComponent from "@/common/button-icon.component";
import DatatableComponent from "@/common/datatable.component";
import DrawerComponent from "@/common/drawer.component";
import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import DefaultLayout from "@/layouts/default-layout.component";

import { useDisclosure, Heading, Text } from "@chakra-ui/react";
import CurrentPersonaComponent from "components/logic/current-persona.component";
import { useCobrosBecarioQuery } from "gql/generated/graphql";

import { FiMenu } from "react-icons/fi";
const ConcejalComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data: dataCobros,
    error: errorCobros,
    loading: loadingCobros,
  } = useCobrosBecarioQuery();

  if (loadingCobros) {
    return <LoaderComponent />;
  }

  return (
    <DefaultLayout>
      <DrawerComponent title="Concejal" isOpen={isOpen} onClose={onClose} />
      <ButtonIconComponent arialabel="open-drawer" onClick={onOpen}>
        <FiMenu size={40} />
      </ButtonIconComponent>

      <Heading as={"h1"}>
        Perfil
      </Heading>
      <CurrentPersonaComponent />
      {errorCobros ? (
        <Heading as="h2" size="lg" color={"red"} textAlign="center">
          {errorCobros.message}
        </Heading>
      ) : (
        <DatatableComponent
          title="Cobros de concejal"
          data={dataCobros?.cobrosRealizados!}
        />
      )}
    </DefaultLayout>
  );
};

export default ConcejalComponent;
