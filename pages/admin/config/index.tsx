import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import SelectComponent from "@/forms/select.component";
import TextFieldComponent from "@/forms/text.field";
import DefaultLayout from "@/layouts/default-layout.component";
import {
  Button,
  Container,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  Settings,
  useAllSettingsQuery,
  useUpdateManySettingsMutation,
} from "gql/generated/graphql";
import { SettingsDTO } from "graphql/settings/settings.dto";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function Config() {
  const toast = useToast();
  const router = useRouter();

  const [settings, setSettings] = useState<Settings[]>([]);

  const { loading, error, refetch } = useAllSettingsQuery({
    onCompleted(data) {
      setSettings(data.allSettings as Settings[]);
    },
  });
  const [updateSettings, { loading: loadingUpdateSettings }] =
    useUpdateManySettingsMutation({
      onCompleted(data) {
        toast({
          title: "Settings updated",
          description: "Settings updated successfully",
          status: "success",
          duration: 5000,
        });
        router.push("/");
      },
      onError(error) {
        console.log(error);
      },
    });

  const formSettings = useFormik({
    initialValues: {
      alimento: undefined,
      lugar: undefined,
      semana: undefined,
      strikes: undefined,
      hora_cambio: undefined,
    },
    onSubmit: (values: any) => {
      let data: SettingsDTO[] = [];
      Object.keys(values).forEach((key) => {
        let value = values[key];
        if (value) {
          data.push({
            nombre: key,
            valor: value,
          });
        }
      });
      updateSettings({
        variables: {
          settingsArray: data,
        },
      });
    },
  });

  useEffect(() => {
    if (settings.length == 0) {
      refetch();
    }
  }, [refetch, settings]);

  if (loading) return <LoaderComponent />;

  if (error) return <ErrorComponent message={error.message} />;

  return (
    <>
      <DefaultLayout heading={"Configuraciones"}>
        <Container>
          <form onSubmit={formSettings.handleSubmit}>
            <SelectComponent
              name={"alimento"}
              label="Turno de alimento (Opcional)"
              placeholder={"Seleccione turno de alimento"}
              defaultValue={
                settings.find((setting) => setting.nombre === "alimento")?.valor
              }
              handleChange={formSettings.handleChange}
            >
              <option value="DESAYUNO">DESAYUNO</option>
              <option value="COMIDA">COMIDA</option>
            </SelectComponent>

            <SelectComponent
              name={"lugar"}
              label={"Lugar de cobro"}
              placeholder={"Seleccione lugar de cobro"}
              defaultValue={
                settings.find((setting) => setting.nombre === "lugar")?.valor
              }
              handleChange={formSettings.handleChange}
            >
              <option value="CAMPUS 1 - 1">CAMPUS 1 - 1</option>
              <option value="CAMPUS 1 - 2">CAMPUS 1 - 2</option>
              <option value="CAMPUS 2">CAMPUS 2</option>
            </SelectComponent>

            <SelectComponent
              name={"semana"}
              label={"Semana de cobro (Opcional)"}
              placeholder={"Seleccione una semana de cobro"}
              defaultValue={
                settings.find((setting) => setting.nombre === "semana")?.valor
              }
              handleChange={formSettings.handleChange}
            >
              <option value="NON">NON</option>
              <option value="PAR">PAR</option>
            </SelectComponent>

            <FormLabel>Strikes permitidos (Opcional)</FormLabel>
            <Input
              name={"strikes"}
              type={"number"}
              min={1}
              max={10}
              defaultValue={
                settings.find((setting) => setting.nombre === "strikes")?.valor
              }
              onChange={formSettings.handleChange}
            />

            <TextFieldComponent
              name={"hora_cambio"}
              type={"time"}
              label={"hora de cambio"}
              defaultValue={
                settings.find((setting) => setting.nombre === "hora_cambio")
                  ?.valor
              }
              handleChange={formSettings.handleChange}
            />
            <Button
              h={"4rem"}
              w={"100%"}
              mt={8}
              colorScheme={"blue"}
              type={"submit"}
              isLoading={loadingUpdateSettings}
            >
              Guardar
            </Button>
          </form>
        </Container>
      </DefaultLayout>
    </>
  );
}

export default Config;
