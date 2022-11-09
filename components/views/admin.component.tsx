import DefaultLayout from "@/layouts/default-layout.component";
import CurrentPersonaComponent from "components/logic/current-persona.component";

const AdminComponent = () => {
  return (
    <>
      <DefaultLayout drawerTitle="Admin" heading="Perfil">
        <CurrentPersonaComponent />
      </DefaultLayout>
    </>
  );
};

export default AdminComponent;
