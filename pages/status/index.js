import useSWR from "swr";

async function fetchStatus() {
  const response = await fetch("/api/v1/status");
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  const response = useSWR("status", fetchStatus);

  return (
    <>
      <h1>Status</h1>

      <div>
        <p>
          <strong>Data Atualização: </strong>
          {response.isLoading ? "Carregando" : response.data.updated_at}
        </p>

        <p>
          <strong>Versão do Postgres: </strong>
          {response.isLoading
            ? "Carregando"
            : response.data.dependencies.database.version}
        </p>

        <p>
          <strong>Conexões Máximas: </strong>
          {response.isLoading
            ? "Carregando"
            : response.data.dependencies.database.max_connections}
        </p>

        <p>
          <strong>Conexões Abertas: </strong>
          {response.isLoading
            ? "Carregando"
            : response.data.dependencies.database.opened_connections}
        </p>
      </div>
    </>
  );
}
