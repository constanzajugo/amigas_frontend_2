# Life Experience - Juego de mesa digital

## Descripción

Life Experience es un juego de mesa digital donde los jugadores pueden avanzar en un tablero virtual, completar desafíos y acumular experiencia de vida (EV). Este proyecto está dividido en dos partes: el frontend (Amigas_frontend) y el backend (Amigas_backend).

## Tabla de Contenidos

1. [Tecnologías Utilizadas](#tecnologías-utilizadas)
2. [Estructura del Proyecto](#estructura-del-proyecto)
   - [Backend](#backend)
   - [Frontend](#frontend)
3. [Instalación y Configuración](#instalación-y-configuración)
   - [Backend](#backend-1)
   - [Frontend](#frontend-1)
4. [Endpoints](#endpoints)
   - [Autenticación](#autenticación)
   - [Usuarios](#usuarios)
   - [Tablero](#tablero)
   - [Juego](#juego)
   - [Autorización](#autorización)
5. [Cómo Jugar](#cómo-jugar)

## Tecnologías Utilizadas

- **Frontend:**
  - React
  - Vite
  - CSS

- **Backend:**
  - Node.js
  - Koa
  - Sequelize
  - PostgreSQL
  - JWT (JSON Web Tokens)
  - Socket.IO

## Estructura del Proyecto

### Backend
Entiendo, aseguremos que se vea correctamente en Markdown:

### Backend

```
backend
├── .yarn
├── node_modules
├── src
│   ├── config
│   │   ├── Rhistory
│   │   └── config.js
│   ├── Game
│   │   ├── CambioTurno.js
│   │   ├── InfoJuego.js
│   │   ├── GameCreator.js  
│   │   └── IniciarJuego.js
│   ├── lib
│   │   └── auth
│   ├── migrations
│   ├── models
│   │   ├── board.js
│   │   ├── box.js
│   │   ├── card.js
│   │   ├── game.js
│   │   ├── player.js
│   │   └── user.js
│   ├── routes
│   │   ├── authentication.js
│   │   ├── board.js
│   │   ├── cardRoutes.js
│   │   ├── characters.js
│   │   ├── diceRoll.js
│   │   ├── game.js
│   │   ├── movePlayer.js
│   │   ├── scopeExample.js
│   │   └── users.js
│   ├── seeders
│   │   └── app.js
│   ├── index.js
│   └── routes.js
└── package.json
```

### Frontend
```
src
├── game
│   ├── Board.jsx
│   ├── Board.css
│   ├── Card.jsx
│   ├── Card.css
│   ├── CardButton.jsx
│   ├── CardButton.css
│   ├── Instructions.jsx
│   ├── Instructions.css
│   ├── SalaEspera.jsx
│   └── SalaEspera.css
│   └── GameContext.jsx
├── profile
│   ├── Login.jsx
│   ├── Login.css
│   ├── Logout.jsx
│   ├── Signup.jsx
│   ├── UserWelcome.jsx
│   ├── SelectAvatar.jsx
├── protected
│   ├── AdminCheck.jsx
│   ├── UserCheck.jsx
├── about
│   ├── AboutUs.jsx
│   ├── AboutUs.css
├── auth
│   ├── AuthProvider.jsx
│   ├── AuthContext.jsx
├── common
│   ├── App.jsx
│   ├── App.css
│   ├── Navbar.jsx
│   ├── Navbar.css
│   ├── Routing.jsx
│   ├── index.css
│   └── main.jsx
public
├── assets
│   ├──Tarjetas individuales web
│   │   ├──1.png 
│   │   ├──2.png (etc)
│   ├── avatar1.png (etc)
│   ├── etc (profesiones, seguros, propiedades)
index.html
vite.config.js
package.json
yarn.lock
```

## Instalación y Configuración

### Backend

1. **Clonar el repositorio:**
   ```sh
   git clone <URL-del-repositorio>
   cd Amigas_backend

2. **Instalar dependencias:**
   ```yarn install``` (antes, si es necesario, borrar node_modules: ```rm -rf node_modules```

3. **Configurar la base de datos:**
  En archivo ```.env```
   ```DB_USERNAME = username
      DB_PASSWORD = constraseña
      DB_NAME = amigas 
      DB_HOST = 'localhost'
      JWT_SECRET = jwt_secret
      

4. **Ejecutar migraciones y seeders:**
   ```yarn sequelize db:migrate
      yarn sequelize db:seed:all
   
5. **Iniciar el server:**
    ```yarn dev```

### Frontend
1. **Clonar el repositorio:**
   ```sh
     git clone <URL-del-repositorio>
     cd Amigas_frontend
   
2. **Instalar dependencias:**
  ```yarn install``` (antes, si es necesario, borrar node_modules: rm rf COMPLETAR )

4. **Configurar el entorno:**
  En archivo ```.env```: ```VITE_BACKEND_URL="http://localhost:3000"```

6. **Iniciar la app:**
  ```yarn dev```

## Endpoints
### Autenticación
- ```POST /signup```: Registra un nuevo usuario con un correo electrónico, nombre de usuario y contraseña.
- ```POST /login```: Autentica a un usuario y devuelve un token JWT si las credenciales son válidas.
  
### Usuarios
- ```PUT /update-avatar```: Actualiza el avatar de un usuario existente.
- ```GET /```: Lista todos los usuarios registrados.
- ```GET /```:id: Muestra la información de un usuario específico por su ID.
- ```DELETE /:id```: Elimina un usuario específico por su ID.
  
### Tablero
- ```GET /boardData```: Obtiene los datos del tablero, incluyendo los jugadores asociados.
  
### Juego
- ```POST /dice```: Lanza un dado y devuelve un resultado aleatorio.
- ```POST /movePlayer```: Mueve un jugador en el tablero basado en el resultado del dado.
  
### Casillas
- ```GET /boxes/:playerId```: Obtiene la información de una casilla específica para un jugador determinado.
  
### ResetGame
- ```POST /resetGame/reset```: Este endpoint permite resetear el juego. Se establece la experiencia de vida de todos los jugadores a 10 y se reinicia su posición en el tablero a la casilla 1. Este endpoint está diseñado para ser usado por un administrador del juego o durante la fase de desarrollo para reiniciar el estado del juego fácilmente.
  
#### Autorización
- ```GET /protecteduser```: Ruta protegida que requiere el scope de usuario.
- ```GET /protectedadmin```: Ruta protegida que requiere el scope de administrador.

## Cómo Jugar
#### Registro e Inicio de Sesión:
- Regístrate o inicia sesión usando los endpoints /signup y /login.
- Selecciona un avatar para tu perfil.
- Actualmente el inicio de sesión funciona con los usuarios guardados en la base de datos:
  - mail: constanza.jugo@uc.cl, clave: constanza123
  - mail: domingabrowner@uc.cl, clave: dominga123
  - mail: josefina.fuenzalida@uc.cl, clave: josefina123
  - mail: pancito@uc.cl, clave:  pancito123
  - mail: fabielmejor@uc.cl, clave: fabi123
- Se puede llevar a cabo el registro de usuarios (con su elección de avatar), se puede empezar a jugar con este, lo único que no resulta es que se vea la foto que se eligió (el avatar)
- Se puede jugar con los jugadores guardados en las seeds (mismos del punteo inicial) con su avatar visible

#### Inicio del Juego:
- Una vez logueado, únete a una sala de espera.
- Cuando todos los jugadores estén listos, inicia el juego, cada jugador debe seleccionar el botón "Ir a jugar" para entrar a la sala
  
### Jugando el Juego:
- Lanza el dado para avanzar en el tablero. (El botón es amarillo y se encuentra en el centro del tablero). Abajo del botón se imprime el resultado del dado, y la ficha del jugador se mueve la cantidad de casillas correspondiente a este resultado).
- Acumula experiencia de vida (EV): Cada jugador comienza el juego con 10 EV, al caer en una casilla, aparece la tarjeta correspondiente al efecto que tiene caer en esta, este puede sumar, reatar o mantener igual la cantidad de EV (estas se van actualizando en la tabla "Players", en la columna life_experience de la base de datos).

### Fin del Juego:
- El juego termina cuando un jugador llega a la casilla final.
- La experiencia de vida acumulada determina el ganador.
- La implementación del fin del juego no se alcanzó a desarrollar.

### Admin:
- 

## ESLint
- Se ejecutó ESLint para corregir problemas y mantener un estilo de código consistente en todo el proyecto. Al correr ESLint, se detectaron algunos errores en el archivo yarn-1.22.22.cjs. Dado que este archivo fue generado automáticamente por Yarn, se decidió permitir que existan errores en él, sin que afecte la funcionalidad del proyecto.

## Deploy
-

