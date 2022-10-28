import DrawerComponent from "@/common/drawer.component";
import DefaultLayout from "@/layouts/default-layout.component";
import {
  useDisclosure,
  Box,

  IconButton,
} from "@chakra-ui/react";

import { FiMenu } from "react-icons/fi";
const ConcejalComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <DefaultLayout>
      <DrawerComponent title="Concejal" isOpen={isOpen} onClose={onClose} />
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
  );
};

export default ConcejalComponent;
