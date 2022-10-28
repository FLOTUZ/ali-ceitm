import DefaultLayout from "@/layouts/default-layout.component";
import DrawerComponent from "@/common/drawer.component";

import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

const AdminComponent = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <DefaultLayout>
        <DrawerComponent title={"Administrador"} isOpen={isOpen} onClose={onClose} />
        <Box textAlign={"end"}>
          <IconButton
            bgColor={"black"}
            color="white"
            onClick={onOpen}
            aria-label="Search database"
            _hover={{
              color: "black",
              bgColor: "white",
            }}
          >
            <FiMenu size={40} />
          </IconButton>
        </Box>
      </DefaultLayout>
    </>
  );
};

export default AdminComponent;
