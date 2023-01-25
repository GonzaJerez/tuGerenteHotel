# tuGerente Hotel

## Sistema de reservas de habitación (prueba técnica)

### Preparacion

1. Clonar el repositorio

        gh repo clone GonzaJerez/tuGerenteHotel

2. Instalar dependencias

        npm install

3. Establecer las variables de entorno en el archivo ".env.example" (modificarlas si es necesario) y cambiar el nombre del archivo a ".env".

### Levantar entorno de desarrollo

*Haber completado el paso de "Preparación " primero*

1. Levantar la base de datos de desarrollo

        npm run db-dev-up

2. Ejecutar la aplicación en modo desarrollo

        npm run dev

3. Al finalizar, cerrar la base de datos

        npm run db-dev-down


### Levantar en entorno de producción 

*Haber completado el paso de "Preparación " primero*

Crea contenedor de la base de datos y de la aplicación

1. Ejecutar aplicación completa

        npm run prod

2. Al terminar, cerrar los contenedores

        npm run down-prod

### Endpoints

#### Reservas

Los endpoints para manejar el flujo de las reservas son:

- **(GET) /api/reservations**: obtener todas las reservas existentes (pendientes, pagadas y eliminadas).
Admite querys para obtener las reservas de manera paginada.
- **(GET) /api/reservations/{id}**: obtener una reserva por id
- **(POST) /api/reservations**: crear una nueva reserva
- **(PUT) /api/reservations/{id}**: pagar una reserva
- **(DELETE) /api/reservations/{id}**: cancelar una reserva

#### Habitaciones

- **(GET) /api/rooms/load**: cargar en base de datos habitaciones creadas por defecto. Esto permite poder hacer posteriormente reservas en estas habitaciones.
- **(GET) /api/rooms**: obtener todas las habitaciones existentes en el hotel. Esto permite obtener el id de la habitación deseada para poder crear una reserva en la misma.

### Documentacion en Postman

https://documenter.getpostman.com/view/17531746/2s8ZDczKxc