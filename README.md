# CRUD Node.js con TypeScript y MongoDB

## Integrantes:
- Juan Pablo Acevedo
- Jesus Garces
- Ariel Pabon

---

Este proyecto es una implementación de un CRUD utilizando Node.js, TypeScript, GraphQL, React y MongoDB. El desarrollo se llevó a cabo cumpliendo los requerimientos del taller "2024B-CI3-TallerNode", abarcando la gestión de usuarios con roles y permisos específicos. Próximamente se integrará la gestión de comentarios y reacciones a estos mismos.

## 📋 Requisitos del Taller

Para cumplir con los requerimientos del taller, hemos desarrollado las siguientes funcionalidades:

1. **CRUD Completo de Usuarios**: Permite la creación, lectura, actualización y eliminación de usuarios.
2. **Gestión de Roles y Permisos**: Implementación de roles específicos (`superadmin`, `regular`) que restringen acciones según el nivel de permisos.
3. **Autenticación y Autorización**: Sistema de autenticación mediante JWT para proteger las rutas y controlar accesos.
4. **Protección de Rutas**: Verificación de roles antes de permitir acciones sensibles, como la eliminación de usuarios.
5. **Mensajes de Error y Acciones Denegadas**: Mensajes claros al usuario cuando intenta realizar acciones no autorizadas.

## 🚀 Cómo Ejecutar el Proyecto

### 1. **Clonar el Repositorio**


```bash
git clone https://github.com/tu-usuario/nombre-repositorio.git
cd nombre-repositorio

```

### 2\. **Instalar Dependencias**

Asegúrate de tener Node.js y npm instalados en tu máquina. Luego ejecuta:

```bash
npm install
```

### 3\. **Configuración de Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
*   `PORT`: El puerto en el que correrá la aplicación.
*   `MONGODB_URL`: URI de conexión a tu base de datos MongoDB.
*   `JWT_SECRET`: Clave secreta para la generación de JWT.

### 4\. **Iniciar el Servidor**

Inicia el servidor en modo de desarrollo con el siguiente comando:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000`.

<p>

GraphQL se iniciara en `http://localhost:3000/graphql`.

Te mostrara la pantalla de inicio de Apollo Server

![](/imgs//apolloServer.png)

🧪 Pruebas de Funcionalidad
---------------------------

Para probar las funcionalidades del CRUD, puedes usar herramientas como Postman o cURL. Algunas rutas principales incluyen:

En la carpeta Docs hay un [Archivo](/Docs/thunder-collection_postman_comments_manager.json) que contiene la colleccion lista para inportar y probar los endpoints.

## Usuarios

*   **POST /api/users**: Crear un nuevo usuario.
*   **POST /api/users/login**: Iniciar sesión y obtener un token JWT.
*   **GET /api/users/:id**: Obtener los datos de un usuario específico.
*   **PUT /api/users/:id**: Actualizar los datos de un usuario.
*   **DELETE /api/users/:id**: Eliminar un usuario (solo accesible para `superadmin`).

## Gestión de Comentarios

*   **POST /api/comments:** Crear un comentario.
*   **GET /api/comments:** Listar todos los comentarios.
*   **GET /api/comments/id:** Obtener un comentario específico.
*   **PUT /api/comments/id:** Actualizar un comentari(solo por el autor).
*   **DELETE /api/comments/id:** Eliminar un comentario (solo por el autor o superadmin).

## Gestión de Reacciones

* **POST /api/reactions:** Crear una reacción a un comentario.
* **DELETE /api/reactions/:** Eliminar una reacción (solo por el autor).
* **GET /api/reactions:** Ver todas las reacciones de un comentario.

## GraphQL

Puedes ingresar querys y mutaciones en la consola, en el archivo [help](/Docs/help.graphql) encontraras algunas querys y mutaciones que puedes probar.

🛡️ Gestión de Roles y Permisos
-------------------------------

La aplicación cuenta con una verificación robusta de roles que permite a los usuarios con rol de `superadmin` realizar todas las acciones, mientras que los usuarios de rol `regular` tienen permisos limitados.

### Ejemplos de restricciones:

*   **Eliminación de Usuarios**: Solo `superadmin` puede eliminar usuarios.
*   **Actualización de Usuarios**: Solo `superadmin` puede actualizar datos críticos de otros usuarios.



🛠️ Tecnologías Utilizadas
--------------------------

*   **Node.js**: Entorno de ejecución de JavaScript.
* **GraphQL**: Lenguaje para consultas
* **React**: Usado para construir un Cliente para GraphQL
*   **TypeScript**: Superset de JavaScript que añade tipos estáticos.
*   **Express**: Framework para aplicaciones web en Node.js.
*   **MongoDB**: Base de datos NoSQL para almacenar usuarios, comentarios y reacciones.
*   **Mongoose**: ODM para interactuar con MongoDB.
*   **JWT**: Autenticación y autorización basada en tokens.

📜 Licencia
-----------

Este proyecto está bajo la licencia MIT.

* * *

¡Esperamos que encuentres útil este CRUD y su implementación! Si tienes alguna duda o sugerencia, no dudes en abrir un issue en el repositorio.