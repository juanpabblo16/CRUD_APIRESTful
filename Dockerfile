# Usa una imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración y de dependencias
COPY package.json yarn.lock ./

# Instala las dependencias usando Yarn
RUN yarn install --frozen-lockfile

# Copia todo el código de la aplicación
COPY . .

# Compila el proyecto TypeScript a JavaScript
RUN yarn build

# Expone el puerto en el que la aplicación escucha
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["node", "dist/index.js"]
