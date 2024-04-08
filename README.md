# AlertaQvapayYoPoGa

## Descripción del Proyecto

AlertaQvapayYoPoGa es una aplicación web desarrollada con Angular que proporciona una plataforma para mostrar ofertas a los usuarios de manera interactiva y atractiva. El objetivo principal del proyecto es ofrecer una interfaz visualmente atractiva para que los usuarios puedan ver y interactuar con diferentes ofertas.

## Tecnologías Utilizadas

- **Angular**: Utilizado para construir la aplicación web.
- **TypeScript**: Lenguaje de programación principal para el desarrollo.
- **RxJS**: Utilizado para la programación reactiva.
- **Karma y Jasmine**: Herramientas para pruebas unitarias.
- **HTML y CSS**: Utilizados para estructurar y diseñar la aplicación.

## Organización del Código

La estructura del proyecto se organiza de la siguiente manera:

- `src`: Contiene el código fuente de la aplicación.
 - `app`: Contiene los componentes y módulos principales de la aplicación.
    - `ofertas`: Contiene componentes relacionados con la visualización de ofertas.
    - `service`: Contiene servicios para interactuar con APIs.
 - `assets`: Contiene recursos estáticos como imágenes o fuentes.
- `angular.json`: Archivo de configuración de Angular.
- `package.json`: Contiene metadatos del proyecto y dependencias.
- `proxy.conf.json`: Archivo de configuración para ajustes de proxy.
- `README.md`: Contiene información sobre el proyecto y cómo ejecutarlo.
- Archivos `tsconfig`: Archivos de configuración para TypeScript.

## Scripts Disponibles

- **Servidor de desarrollo**: Ejecuta `ng serve --proxy-config proxy.conf.json -o` para iniciar un servidor de desarrollo en `http://localhost:4200/`.
- **Generación de código**: Usa `ng generate` para generar nuevos componentes, directivas, pipes, servicios, etc.
- **Construcción**: Ejecuta `ng build` para construir el proyecto. La salida se almacenará en el directorio `dist/`.
- **Pruebas unitarias**: Ejecuta `ng test` para ejecutar pruebas unitarias usando Karma.
- **Pruebas E2E**: Las pruebas E2E pueden ejecutarse usando `ng e2e`.
- **Ayuda adicional**: Para obtener más información sobre los comandos de Angular CLI, usa `ng help` o consulta la documentación de Angular CLI.

## Contribuir

Si estás interesado en contribuir a este proyecto, por favor, revisa las pautas de contribución y abre un issue o pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
