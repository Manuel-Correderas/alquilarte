# Inmobiliaria "Alquilarte" - Sistema de Gestión Backend

## 1. Introducción al Proyecto

Este repositorio contiene la versión final del trabajo cuatrimestral de la materia "Desarrollo Web Backend". Desarrollamos una aplicación web fullstack para la gestión integral de la inmobiliaria "Alquilarte", modernizando todos sus procesos administrativos y operativos mediante tecnologías web escalables.

El sistema digitaliza procesos como el registro, la gestión de tareas, contratos, pagos y visitas, mejorando la organización, trazabilidad y eficiencia de la empresa.

## 2. Funcionalidades Principales

* Registro y Login con validación por correo electrónico.
* Paneles diferenciados según el rol: administrador, empleado, propietario e inquilino.
* Gestión de tareas, turnos, departamentos y usuarios.
* CRUD completo de propiedades con imágenes, ubicación y disponibilidad.
* Visualización y firma de contratos, carga de comprobantes y control de deuda.
* Módulo de Mapa con Google Maps embebido.
* Testing con Jest y Supertest.

## 3. Arquitectura del Sistema

El sistema sigue el patrón **MVC (Modelo–Vista–Controlador)**:

* **Modelo:** Mongoose para modelar datos en MongoDB Atlas.
* **Vista:** HTML + Pug + Bootstrap.
* **Controlador:** Conecta las rutas con la lógica de negocio.

Además:

* Autenticación con JWT y sesiones.
* Encriptación de contraseñas con bcrypt.
* Middleware de autorización por rol.
* Testing automatizado.

## 4. Tecnologías Utilizadas

* **Frontend:** HTML + Bootstrap (estructura visual)
* **Backend:** Node.js + Express.js
* **Base de Datos:** MongoDB Atlas
* **Autenticación:** JWT y sesiones
* **Testing:** Jest + Supertest
* **Infraestructura:** Despliegue local y propuesta de uso de AWS para producción

## 5. Instalación y Ejecución

```bash
git clone https://github.com/Manuel-Correderas/alquilarte
cd proyecto-alquilarte
npm install
```

Crear un archivo `.env` con las siguientes variables:

```
PORT=3000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=clave_jwt_segura
SESSION_SECRET=clave_session_segura
EMAIL_SERVICE_PROVIDER=gmail
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=contraseña_app
FRONTEND_URL=http://localhost:3000
```

Luego ejecutar:

```bash
npm run dev
```

Navegar a: `http://localhost:3000`

## 6. Testing

Se realizaron pruebas automatizadas con Jest y Supertest:

* Login exitoso y fallido
* Redirección a login desde raíz
* Manejo de rutas inexistentes (404)

## 7. Asignación de Roles

Integrante

Tareas Realizadas Principales

Manuel Correderas

Desarrollo backend (autenticación, conexión a MongoDB), pruebas automatizadas con Jest, diseño e implementación de modelos y controladores, integración de vistas con lógica del servidor. Además, lideró tareas de organización del repositorio, corrección de bugs y despliegue local.

Daniel Coria

Diseño frontend con HTML y Bootstrap, creación de vistas Pug adaptadas al panel administrativo, navegación entre secciones, animaciones y mejoras visuales para experiencia de usuario. Participó en testing manual y colaboración en documentación.

María Nazar

Redacción de documentación técnica y funcional, elaboración del informe final y guión del video de defensa. Participó en la organización de tareas, pruebas del sistema desde el rol de usuario, y colaboración en el módulo de tareas.

## 8. Infraestructura Recomendada

Aunque se utilizó **Render** en pruebas, se recomienda usar **AWS** para producción:

* EC2, RDS, S3 y Route 53
* Escalabilidad, tolerancia a fallos y backups automáticos
* Ideal para migración futura a entornos de alta demanda

## 9. Panel Administrativo 
Incluye pestañas de:

* **Tareas:** Asignación y seguimiento por estado y empleado
* **Turnos:** Gestión de visitas, filtros por fechas y estado
* **Departamentos:** Relación con propiedades y tareas
* **Usuarios:** Alta, edición, asignación de roles
* **Propiedades:** CRUD con coordenadas y estado
* **Mapa:** Google Maps embebido para buscar y asociar ubicaciones
* **Contratos:** Firma digital, adjuntos, vencimientos
* **Cobranza (en desarrollo):** Validación de pagos, alertas por deuda

## 10. Licencia

MIT - Proyecto educativo
