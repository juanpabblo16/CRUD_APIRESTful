# Utiliza una imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y yarn.lock al contenedor
COPY package.json yarn.lock ./

# Instala las dependencias usando Yarn
RUN yarn install --frozen-lockfile

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que la aplicación escucha (usualmente 3000)
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["node", "dist/index.js"]
