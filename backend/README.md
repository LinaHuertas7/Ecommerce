- npm run start - Comando para correr el servidor
- npx sequelize-cli db:migrate - Correr las migraciones
- npx sequelize-cli db:seed:all - Correr las semillas

- npx sequelize-cli db:migrate:undo:all - Eliminar
- npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string