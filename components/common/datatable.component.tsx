import { Cobro } from "@prisma/client";
import { useState, useEffect, useCallback } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface DatatableComponentProps {
  title?: string;
  data: any[] | undefined;
  onRowClicked: (row: any) => void;
}

const DatatableComponent = ({
  title,
  data,
  onRowClicked,
}: DatatableComponentProps) => {
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
            return row[key];
          },
        };
      });
      setColumnsDT(columns);
    }
  }, [data]);

  useEffect(() => {
    columnsOfData();
  }, [columnsOfData]);

  return (
    <DataTable
      title={title ?? ""}
      columns={columdDT}
      data={data!}
      fixedHeader={true}
      onRowClicked={(row) => {
        onRowClicked(row);
      }}
      dense
      highlightOnHover
    />
  );
};

export default DatatableComponent;
