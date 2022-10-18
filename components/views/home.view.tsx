import Link from "next/link";
import { axiosClient } from "services/axios-client.service";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Center, CircularProgress, Stack } from "@chakra-ui/react";

function Home() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const healthAction = useCallback(async () => {
    try {
      console.log(await axiosClient().post("/health"));
      setIsLogged(true);
    } catch (error) {
      setIsLogged(false);
      router.push("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    healthAction();
  }, [healthAction]);

  return (
    <Center height={"100vh"}>
      {isLogged ? (
        <Stack spacing={4}>
          <h1>Hola! Ve a la API</h1>

          <Button
            colorScheme="teal"
            onClick={async () => {
              const response = await axiosClient().post("/health");
              response.status === 200
                ? (window.location.pathname = "/api/graphql")
                : null;
            }}
          >
            API GRAPHQL
          </Button>
        </Stack>
      ) : isLoading ? (
        <CircularProgress isIndeterminate color="green.300" />
      ) : (
        <h1>Debes iniciar sesión</h1>
      )}
    </Center>
  );
}

export default Home;
