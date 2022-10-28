import { useContext } from "react";
import { AuthContext } from "providers/auth.provider";
import { Button } from "@chakra-ui/react";
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
    </ErrorComponent>
  );
}

export default Perfil;
