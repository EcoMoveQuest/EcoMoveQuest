# Configuración del proyecto EcoMoveQuest en Windows sin Git

## 1. Descargar los archivos del proyecto

1. Ve al siguiente enlace: [https://github.com/EcoMoveQuest/EcoMoveQuest](https://github.com/EcoMoveQuest/EcoMoveQuest)
2. Haz clic en el botón "Code" en la esquina superior derecha y selecciona "Download ZIP".
3. Extrae el archivo ZIP en la ubicación deseada en tu computadora. La carpeta extraída se llamará `EcoMoveQuest-main`.

## 2. Instalar Node.js

1. Si aún no lo tienes instalado, descarga el instalador de Node.js para Windows desde el sitio web oficial [https://nodejs.org/es/download/](https://nodejs.org/es/download/) y ejecuta el instalador.
2. Esto instalará tanto Node.js como npm (Node Package Manager). Después de que la instalación esté completa, reinicia tu computadora.

## 3. Verificar la instalación de Node.js

1. Abre una ventana de Símbolo del sistema o PowerShell y escribe los siguientes comandos para verificar que Node.js y npm se hayan instalado correctamente:

       node -v
       npm -v

   Ambos comandos deben mostrar sus respectivos números de versión.

## 4. Instalar dependencias

1. Navega a la carpeta del proyecto `EcoMoveQuest-main` en una ventana de Símbolo del sistema o PowerShell utilizando el comando `cd`.
2. Ejecuta el siguiente comando para instalar las dependencias necesarias (express y body-parser) para la aplicación:

       npm install express body-parser

## 5. Ejecutar la aplicación Node.js

1. En la ventana de Símbolo del sistema o PowerShell, ejecuta el siguiente comando para iniciar la aplicación Node.js:

       node app.js

   La aplicación debería estar ejecutándose y deberías ver el mensaje "Server running at http://localhost:3000" en la consola.

## 6. Ejecutar el script serial-to-rest

1. Abre una nueva ventana de PowerShell (no cierres la que está ejecutando la aplicación Node.js). Asegúrate de que el script `serial-to-rest.ps1` esté en la carpeta del proyecto `EcoMoveQuest-main`.
2. Ejecuta el siguiente comando para permitir la ejecución de scripts en PowerShell:

       Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

   Confirma que deseas cambiar la política de ejecución cuando se te solicite. Luego, ejecuta el siguiente comando para ejecutar el script `serial-to-rest.ps1`:

       .\serial-to-rest.ps1

   Este script leerá los datos del puerto serie y los enviará al endpoint `/arrivals` de la aplicación Node.js.

## 7. Acceder al sitio web

1. Abre tu navegador web y navega a `http://localhost:3000/forest` para ver el bosque. A medida que el script `serial-to-rest.ps1` envíe colores al endpoint `/arrivals`, puedes actualizar la página `/forest` para ver el bosque actualizado con los árboles agregados.
