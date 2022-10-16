import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { InputHTMLAttributes } from "react";

interface ITextFieldProps {
  name: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  label: string;
  value?: string;
  errors?: string;
  touched?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = (props: ITextFieldProps) => {
  return (
    <>
      <FormControl>
        <FormLabel>{props.label}</FormLabel>
        <Input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
          bgColor={props.errors && props.touched ? "red.100" : "gray.100"}
          _focus={{ bgColor: "gray.100" }}
        />
      </FormControl>
      {props.touched && props.errors ? (
        <>
          <Text color="red.500" fontSize="sm">
            Errores: {props.errors}
          </Text>
        </>
      ) : null}
    </>
  );
};

export default TextField;
