const createPool = require('@databases/pg');
const { sql } = require('@databases/pg');
const db = createPool('postgres://test-user@localhost:5432/test-db');

db.query(sql.file('my-file.sql'))
  .catch((ex) => {
    console.error(ex);
    process.exitCode = 1;
  })
  .then(() => db.dispose());
