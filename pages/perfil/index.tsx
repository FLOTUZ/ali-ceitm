import { useContext } from "react";
import { AuthContext } from "context/auth.provider";
import { Button, Text } from "@chakra-ui/react";
import ErrorComponent from "@/common/error.component";
import CobrosBecarioComponent from "@/views/cobros-becario.component";
import CobrosCajeroComponent from "@/views/cobros-cajero.component";
import AdminComponent from "@/views/admin.component";
import ConcejalComponent from "@/views/concejal.component";

function Perfil() {
  const { role, logout } = useContext(AuthContext);

  if (role?.rol_name == "CAJERO") {
    return <CobrosCajeroComponent />;
  }

  if (role?.rol_name == "BECARIO") {
    return <CobrosBecarioComponent />;
  }

  if (role?.rol_name == "CONCEJAL") {
    return <ConcejalComponent />;
  }

  if (role?.rol_name == "ADMIN") {
    return <AdminComponent />;
  }

  return (
    <ErrorComponent message="NO AUTENTICADO">
      <Button onClick={logout}>Login</Button>
      <Text>Si el error persiste, refresca la pagina</Text>
    </ErrorComponent>
  );
}

export default Perfil;
