import Link from "next/link";

function Home() {
  return (
    <>
      <h1>Hola! Ve a la API</h1>
      <Link href={"/api/graphql"}>
        <a>
          <h1> Next.js</h1>
        </a>
      </Link>
    </>
  );
}

export default Home;
