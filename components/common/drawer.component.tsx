import Link from "next/link";
import { useContext } from "react";
import {
  Box,
  Center,
  Drawer,
  Text,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

import { AuthContext } from "context/auth.provider";
import { routes } from "configs/routes";

interface DrawerComponentProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const DrawerComponent = ({ onClose, isOpen, title }: DrawerComponentProps) => {
  const { role } = useContext(AuthContext);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
        <DrawerBody>
          {routes.map((route, index) =>
            route.roles.includes(role?.rol_name!) ? (
              <Link
                key={index}
                href={route.path}
                style={{
                  listStyle: "none",
                }}
              >
                <a>
                  <Box
                    mt={"0.5rem"}
                    w={"100%"}
                    h={"3rem"}
                    bgColor={"black"}
                    color={"white"}
                    textAlign="center"
                    borderRadius="lg"
                    _hover={{
                      bgColor: "white",
                      color: "black",
                      shadow: "2xl",
                      border: "1px",
                      borderColor: "gray",
                    }}
                  >
                    <Center h="100%">
                      <Text fontWeight={"bold"}>{route.title}</Text>
                    </Center>
                  </Box>
                </a>
              </Link>
            ) : null
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
