## Quickstart
  ```sh
git clone https://github.com/koltis/prueba-tecnica.git
  ```

## Development

- Start the Mysql Database 

  ```sh
  npm run docker
  ```

- Initial setup:

  ```sh
  npm run build
  ```

- Run the  seed

  ```sh
  npm run seed
  ```

- Start dev server:

  ```sh
  npm run dev
  ```
- 
Para realizar peticiones a las rutas de los productos, hay un middleware que verifica que el usuario envíe un token que lo identifique y añade la información del usuario a la req. Se puede acceder a esa información desde req.user. Para poder usar esas rutas, hay que iniciar sesión y añadir el token al encabezado Authorization de esta manera: "Bearer token".
