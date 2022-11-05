import { FormControl, FormLabel, Select, Text } from "@chakra-ui/react";

interface ISelectProps {
  name: string;
  label: string;
  placeholder: string;
  children?: React.ReactNode[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  errors?: string;
  touched?: boolean;
}

const SelectComponent = (props: ISelectProps) => {
  return (
    <FormControl>
      <FormLabel>{props.label}</FormLabel>
      <Select
        name={props.name}
        placeholder={props.placeholder}
        onChange={(e) => props.handleChange(e)}
        bgColor={props.touched && props.errors ? "red.100" : undefined}
      >
        {props.children?.map((child) => {
          return child;
        })}
      </Select>
      {props.touched && props.errors ? (
        <>
          <Text color="red.500" fontSize="sm">
            {props.errors}
          </Text>
        </>
      ) : null}
    </FormControl>
  );
};

export default SelectComponent;
