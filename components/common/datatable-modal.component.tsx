import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

interface DatatableModalComponentProps {
  title?: string;
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

const DatatableModalComponent = ({
  title,
  isOpen,
  onClose,
  children,
}: DatatableModalComponentProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title ? title : "Modal"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DatatableModalComponent;
