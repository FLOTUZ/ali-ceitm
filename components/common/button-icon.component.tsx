import { Box, IconButton } from "@chakra-ui/react";
interface ButtonIconComponentProps {
  arialabel: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const ButtonIconComponent = ({
  onClick,
  arialabel,
  children,
}: ButtonIconComponentProps) => {
  return (
    <Box textAlign={"end"}>
      <IconButton
      colorScheme={"gray"}
        onClick={onClick}
        aria-label={arialabel}
        _hover={{
          color: "black",
          bgColor: "white",
        }}
      >
        {children}
      </IconButton>
    </Box>
  );
};

export default ButtonIconComponent;
