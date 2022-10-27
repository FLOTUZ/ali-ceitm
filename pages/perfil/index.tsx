import { useContext } from "react";
import { AuthContext } from "providers/auth.provider";
import { Button, Heading } from "@chakra-ui/react";
import ErrorComponent from "@/common/error.component";
import CobrosBecarioComponent from "@/views/cobros-becario.component";
import CobrosCajeroComponent from "@/views/cobros-cajero.component";

function Perfil() {
  const { role, logout } = useContext(AuthContext);

  if (role?.rol_name == "CAJERO") {
    return <CobrosCajeroComponent />;
  }

  if (role?.rol_name == "BECARIO") {
    return <CobrosBecarioComponent />;
  }

  if (role?.rol_name == "ADMIN") {
    return <Heading>ADMIN</Heading>;
  }

  return (
    <ErrorComponent message="NO AUTENTICADO">
      <Button onClick={logout}>Login</Button>
    </ErrorComponent>
  );
}

export default Perfil;
