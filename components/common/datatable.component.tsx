import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Cobro } from "@prisma/client";
import { useState, useEffect, useCallback } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import DatatableModalComponent from "./datatable-modal.component";

interface DatatableComponentProps {
  title?: string;
  data: any[] | undefined;
  onRowClicked?: (row: any) => void;
}

const DatatableComponent = ({
  title,
  data,
  onRowClicked,
}: DatatableComponentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [columdDT, setColumnsDT] = useState<TableColumn<Cobro>[]>([]);
  const columnsOfData = useCallback(() => {
    if (data && data.length > 0) {
      const columns = Object.keys(data[0]).map((key) => {
        return {
          name: key,
          //If is a date, convert to string
          selector: (row: any) => {
            if (row[key] instanceof Date) {
              return row[key].toISOString();
            }
            //If is a boolean, convert to string
            if (typeof row[key] === "boolean") {
              return row[key].toString();
            }
            //If is object, open modal with details
            if (typeof row[key] === "object" && row[key] !== null) {
              setModalContent(<DatatableComponent data={row[key]} />);
              return (
                <Button colorScheme={"facebook"} onClick={onOpen}>
                  Ver detalles
                </Button>
              );
            }

            return row[key];
          },
        };
      });
      setColumnsDT(columns);
    }
  }, [data, onOpen]);

  useEffect(() => {
    columnsOfData();
  }, [columnsOfData]);

  return (
    <>
      <DataTable
        title={title ?? ""}
        columns={columdDT}
        data={data!}
        fixedHeader={true}
        onRowClicked={(row) => {
          if (onRowClicked) {
            onRowClicked(row);
          }
        }}
        highlightOnHover
      />
      <DatatableModalComponent
        title="Detalles"
        isOpen={isOpen}
        onClose={onClose}
      >
        {modalContent}
      </DatatableModalComponent>
    </>
  );
};

export default DatatableComponent;
