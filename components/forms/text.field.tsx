import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { InputHTMLAttributes } from "react";

interface ITextFieldProps {
  name: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  label: string;
  value?: string;
  defaultValue?: string;
  errors?: string;
  touched?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldComponent = (props: ITextFieldProps) => {
  return (
    <>
      <FormControl>
        <FormLabel>{props.label}</FormLabel>
        <Input
          type={props.type}
          name={props.name}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.handleChange}
          bgColor={props.errors && props.touched ? "red.100" : undefined}
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

export default TextFieldComponent;
