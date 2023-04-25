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

## 6. Encontrar el puerto serie en uso

1. Abre una ventana de PowerShell y ejecuta el siguiente comando para obtener una lista de los puertos serie disponibles en tu computadora:

        [System.IO.Ports.SerialPort]::getportnames()

   Esto te proporcionará información detallada sobre los puertos serie disponibles, incluyendo los nombres de los puertos, como 'COM3' o 'COM4'.

## 7. Cambiar el puerto serie en el script serial-to-rest

1. Abre el archivo `serial-to-rest.ps1` con un editor de texto como Notepad++ o Visual Studio Code.
2. Busca la línea que contiene lo siguiente:

       $portName = 'COM3'

3. Cambia `'COM3'` al nombre del puerto serie que deseas utilizar según lo identificado en el paso 6. Por ejemplo, si deseas utilizar el puerto COM4, la línea debe ser:

       $portName = 'COM4'

4. Guarda el archivo y cierra el editor de texto.

## 8. Ejecutar el script serial-to-rest

1. Abre una nueva ventana de PowerShell (no cierres la que está ejecutando la aplicación Node.js). Asegúrate de que el script `serial-to-rest.ps1` esté en la carpeta del proyecto `EcoMoveQuest-main`.
2. Navega a la carpeta del proyecto `EcoMoveQuest-main` utilizando el comando `cd`.
3. Ejecuta el siguiente comando para ejecutar el script `serial-to-rest.ps1`:

       .\serial-to-rest.ps1

   El script comenzará a leer los datos del puerto serie y los enviará al servidor web local.

## 9. Acceder al sitio web

1. Abre tu navegador web preferido.
2. Ve a la dirección [http://localhost:3000](http://localhost:3000).
3. Deberías ver el sitio web del proyecto EcoMoveQuest en funcionamiento y recibir los datos enviados por el script serial-to-rest.

¡Listo! Ahora tienes el proyecto EcoMoveQuest funcionando en tu computadora con Windows.
