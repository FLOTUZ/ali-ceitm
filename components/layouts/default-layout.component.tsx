import ButtonIconComponent from "@/common/button-icon.component";
import DrawerComponent from "@/common/drawer.component";
import { ArrowBackIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiMenu, FiSun } from "react-icons/fi";

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
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  return (
    <Box p={8} m={0} h={"100vh"}>
      <Head>
        <title>{heading}</title>
      </Head>
      <HStack>
        <ButtonIconComponent
          arialabel="open-drawer"
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </ButtonIconComponent>
        <Heading>{heading}</Heading>
        <Spacer />
        <IconButton
          aria-label="theme"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <MoonIcon /> : <FiSun />}
        />
        <ButtonIconComponent arialabel="open-drawer" onClick={onOpen}>
          <FiMenu size={40} />
        </ButtonIconComponent>
      </HStack>
      <DrawerComponent
        title={drawerTitle ? drawerTitle : "Menu"}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Spacer h={5} />
      {children}
    </Box>
  );
};

export default DefaultLayout;
