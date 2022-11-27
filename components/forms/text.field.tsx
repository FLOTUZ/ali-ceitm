import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { InputHTMLAttributes, useState } from "react";

interface ITextFieldProps {
  name: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  label: string;
  value?: string;
  isRequired?: boolean;
  defaultValue?: string;
  errors?: string;
  touched?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldComponent = (props: ITextFieldProps) => {
  const [showPassoword, setshowPassoword] = useState(false);
  return (
    <>
      <FormControl>
        <FormLabel>
          {props.label} {props.isRequired ? "(Requerido)" : "(Opcional)"}
        </FormLabel>
        <InputGroup>
          <Input
            type={props.type === "password" ? (showPassoword ? "text" : "password") : props.type}
            name={props.name}
            value={props.value}
            isRequired={props.isRequired}
            defaultValue={props.defaultValue}
            onChange={props.handleChange}
            bgColor={props.errors && props.touched ? "red.100" : undefined}
          />
          {props.type === "password" ? (
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setshowPassoword(!showPassoword)}
              >
                {showPassoword ? "Ocultar" : "Ver"}
              </Button>
            </InputRightElement>
          ) : null}
        </InputGroup>
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
