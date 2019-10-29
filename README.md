# PCesfam

#### Proyecto orientado al menejo y el control de las horas médicas de pacientes cronicos en el contexto de salud publica.

## **Backend**

##### Backend desarrollado con nodejs, utilizando express y mongodb bajo el marco de una arquitectura api rest.

#### Pre requisitos
1. Tener instalado nodejs y npm (https://nodejs.org/es/)
2. Tener instalado mongodb server (https://www.mongodb.com/what-is-mongodb)

#### Despliegue
1. Instalar dependencias (**npm install**)
2. Ejecutar el proyecto (**npm start**)

## **Frontend**

#### Frontend desarrollado con angular 8 y ionic

#### Pre requisitos
1. Tener instalado nodejs y npm (https://nodejs.org/es/)

#### Despliegue
1. Instalar dependencias (**npm install**)
2. Ejecutar el proyecto (**ionic lab --ssl true**) **--ssl true se utiliza ya que los servicios de google no permiten el uso de dominios que no sean https.

#### Creacion apk 
ionic cordova build **PLATAFORMA** --verbose
  ##### PLATAFORMA
  - android
  - ios

## **Funcionalidades faltantes**
- Validaciones de formularios
- Eliminar eventos de google calendar
- Configuración de usuario

