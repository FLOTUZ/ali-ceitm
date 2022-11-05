import ButtonIconComponent from "@/common/button-icon.component";
import DrawerComponent from "@/common/drawer.component";
import { Box, Heading, HStack, Spacer, useDisclosure } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

interface DefaultLayoutProps {
  heading: string;
  drawerTitle?: string;
  children?: React.ReactNode;
}

const DefaultLayout = ({
  heading,
  drawerTitle,
  children,
}: DefaultLayoutProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box p={8} m={0} h={"100vh"}>
      <HStack>
        <Heading>{heading}</Heading>
        <Spacer/>
        <ButtonIconComponent arialabel="open-drawer" onClick={onOpen}>
          <FiMenu size={40} />
        </ButtonIconComponent>
      </HStack>
      <DrawerComponent
        title={drawerTitle ? drawerTitle : "Menu"}
        isOpen={isOpen}
        onClose={onClose}
      />
      {children}
    </Box>
  );
};

export default DefaultLayout;
