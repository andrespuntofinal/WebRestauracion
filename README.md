# FrontRestauracion

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## SUBIR IMAGEN A CONTAINER REGISTRY GCP
1. docker login
1. docker tag backresta andrespuntofinal/webrestauracion:backresta
1. docker push andrespuntofinal/webrestauracion:backresta
1. Ingresar a la consola de GCP y ejecutar: docker pull andrespuntofinal/webrestauracion:backresta
1. docker tag andrespuntofinal/webrestauracion:backresta gcr.io/webrestauracion-3240c/backresta:v2
1. docker push gcr.io/webrestauracion-3240c/backresta:v2

4. En caso de error por pemisos ejecutar: gcloud auth configure-docker

5. url https://apirestauracion.onrender.com
