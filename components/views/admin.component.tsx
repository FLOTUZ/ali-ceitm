import DefaultLayout from "@/layouts/default-layout.component";
import DrawerComponent from "@/common/drawer.component";

import { Heading, useDisclosure } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import ButtonIconComponent from "@/common/button-icon.component";
import CurrentPersonaComponent from "components/logic/current-persona.component";

const AdminComponent = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <DefaultLayout>
        <DrawerComponent
          title={"Administrador"}
          isOpen={isOpen}
          onClose={onClose}
        />
        <ButtonIconComponent arialabel="open-drawer" onClick={onOpen}>
          <FiMenu size={40} />
        </ButtonIconComponent>

        <Heading as={"h1"} color="white">
          Perfil
        </Heading>
        <CurrentPersonaComponent />
      </DefaultLayout>
    </>
  );
};

export default AdminComponent;
