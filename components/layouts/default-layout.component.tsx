import { Box } from "@chakra-ui/react";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Box p={8} m={0} h={"100vh"}>
      {children}
    </Box>
  );
};

export default DefaultLayout;
