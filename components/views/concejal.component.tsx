import ButtonIconComponent from "@/common/button-icon.component";
import DrawerComponent from "@/common/drawer.component";
import DefaultLayout from "@/layouts/default-layout.component";

import { useDisclosure, Heading } from "@chakra-ui/react";
import CurrentPersonaComponent from "components/logic/current-persona.component";

import { FiMenu } from "react-icons/fi";
const ConcejalComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DefaultLayout>
      <DrawerComponent title="Concejal" isOpen={isOpen} onClose={onClose} />
      <ButtonIconComponent arialabel="open-drawer" onClick={onOpen}>
        <FiMenu size={40} />
      </ButtonIconComponent>

      <Heading as={"h1"} color="white">
        Perfil
      </Heading>
      <CurrentPersonaComponent />
    </DefaultLayout>
  );
};

export default ConcejalComponent;
