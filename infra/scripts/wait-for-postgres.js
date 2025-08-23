const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(err, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\n🟢 Postgres está pronto e aguardando conexões.\n\n");
  }
}

process.stdout.write("\n\n🟡 Aguardando o Postgres aceitar conexões");
checkPostgres();
