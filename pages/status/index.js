import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000,
  });

  return (
    <>
      <h1>Status</h1>

      <div>
        <p>
          <strong>Data Atualização: </strong>
          {isLoading ? "Carregando..." : data.updated_at}
        </p>

        <p>
          <strong>Versão do Postgres: </strong>
          {isLoading ? "Carregando..." : data.dependencies.database.version}
        </p>

        <p>
          <strong>Conexões Máximas: </strong>
          {isLoading
            ? "Carregando..."
            : data.dependencies.database.max_connections}
        </p>

        <p>
          <strong>Conexões Abertas: </strong>
          {isLoading
            ? "Carregando..."
            : data.dependencies.database.opened_connections}
        </p>
      </div>
    </>
  );
}
