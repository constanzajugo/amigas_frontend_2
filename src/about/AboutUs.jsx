import React from 'react';
import Navbar from '../common/Navbar';
import './AboutUs.css';

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="about-us-container">
        <h1>Nosotras</h1>
        <div className="info-box">
          <img src="/assets/dominga.jpg" alt="Dominga Browne" className="info-box-image" />
          <div className="info-box-content">
            <h2>Dominga Browne</h2>
            <p>Dominga Browne es estudiante de Ingeniería Civíl de la Pontifica Universidad Católica De Chile y es generación 2020. Su major es Investigación Operativa y su minor Tecnologías de Información.</p>
          </div>
        </div>
        <div className="info-box">
          <img src="/assets/josefina.jpg" alt="Josefina Fuenzalida" className="info-box-image" />
          <div className="info-box-content">
            <h2>Josefina Fuenzalida</h2>
            <p>Josefina Fuenzalida es estudiante de Ingeniería Civíl de la Pontifica Universidad Católica De Chile y es generación 2020. Su major es Investigación Operativa y su minor Tecnologías de Información.</p>
          </div>
        </div>
        <div className="info-box">
          <img src="/assets/constanza.jpg" alt="Constanza Jugo" className="info-box-image" />
          <div className="info-box-content">
            <h2>Constanza Jugo</h2>
            <p>Constanza Jugo es estudiante de Ingeniería Civíl de la Pontifica Universidad Católica De Chile y es generación 2020. Su major es Investigación Operativa y su minor Tecnologías de Información.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
