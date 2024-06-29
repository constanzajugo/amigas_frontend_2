import React from 'react';
import Navbar from '../common/Navbar'; 
import './Instructions.css';
// import logo from '../../assets/LX.png'; 

export default function Instructions() {
    return (
        <div>
            <Navbar />
            <div className="instructions-container">
                <h1>Life Experience - Instrucciones</h1>
                <p>Life Experience es una emocionante aplicación web que recrea la experiencia de un juego de mesa clásico, pero con un enfoque renovado y distinto. Simula la vida de las personas a través de distintas etapas y decisiones clave, desde la educación y la carrera hasta la formación de una familia.</p>
                
                <h2>Registro e Inicio de Sesión</h2>
                <p>Para comenzar, accede a la página web de Life Experience y elige iniciar sesión. Si ya tienes una cuenta, ingresa tu nombre de usuario y contraseña. De lo contrario, presiona "Crear Cuenta" e ingresa tu correo electrónico, nombre de usuario y contraseña. También puedes elegir un avatar.</p>
                
                <h2>Inicio de Partida</h2>
                <p>Una vez iniciada la sesión, puedes crear una nueva partida convirtiéndote en el usuario jefe, o unirte a una partida existente creada por otro usuario. Si no hay partidas disponibles, puedes crear una nueva o volver al menú principal.</p>
                
                <h2>Distribución Inicial de Recursos</h2>
                <p>Antes de comenzar el juego, se distribuyen recursos iniciales entre los jugadores. Cada jugador recibe 10 puntos de Experiencia de Vida (EV), los cuales ayudan a completar desafíos durante el juego.</p>
                
                <h2>Desarrollo del Juego</h2>
                <p>El juego se desarrolla por turnos no sincrónicos. Cada jugador tira un dado virtual para avanzar por el tablero y realiza acciones según la casilla en la que caiga. La interacción con otras casillas y jugadores es clave para acumular puntos de experiencia y avanzar hacia la meta.</p>
                
                <h2>Interacción entre Jugadores</h2>
                <p>Los jugadores pueden interactuar de diversas formas durante el juego, como intercambiar recursos, formar alianzas estratégicas o competir por el control de ciertas casillas. La comunicación entre jugadores puede realizarse a través de un chat integrado en la interfaz del juego.</p>
                
                <h2>Fin del Juego</h2>
                <p>La partida continúa hasta que uno de los jugadores alcanza la meta en el tablero. Se muestra un mensaje de felicitación al ganador y se ofrecen opciones para iniciar una nueva partida, unirse a una existente o salir del juego.</p>
            </div>
        </div>
    );
}
