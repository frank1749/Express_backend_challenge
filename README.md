# LicifyFrank

Este proyecto fue desarrollado en nodejs la versión express 4.18.2.

# Run local project

Ejecuta el comando npm run dev para iniciar el proyecto

# Info general

Mi proyecto lo desarrolle en Express y estoy ejecutando seeders para rellenar la base de datos de usuarios. Tengo lógica y cifrado de contraseñas. Los comandos para ejecutar los seeders son npm run seed:import (crea usuarios) y npm run seed:destroy (elimina usuarios).
Dentro del proyecto encontrarás la colección postman para ejecutar los servicios localmente.
En este proyecto, implementé una arquitectura 100% MVC (Modelo-Vista-Controlador) como el enfoque principal. Este enfoque arquitectónico se seleccionó cuidadosamente para ofrecer una comprensión clara y mejorar la escalabilidad del código.

# Database

Es relevante destacar que he creado un archivo denominado .env con el propósito de establecer una variable de entorno destinada a la conexión con la base de datos. Además, he implementado la estructura de los modelos de la base de datos utilizando la biblioteca Mongoose.
