# Not That Easy Taxi!

## Tecnologias usadas

* [Leaflet](https://leafletjs.com/)
* [UI Semantic React](https://react.semantic-ui.com/)
* [Docker](https://www.docker.com/)
* [Postgres](https://www.postgresql.org/)
* [Axios](https://github.com/axios/axios)
* [React](https://reactjs.org/)
* [Node](https://nodejs.org/es/)

## Instalacion de NodeJS

### Actualizacion de la base de datos de paquetes
```
sudo apt-get update
```
### Instalando node y nodeJs

```
 sudo apt-get install node
 sudo apt-get install nodejs
 ```
#### Verificando la instalaciòn

```
nodejs -v
nodejs
```
## Instalando NPM

```
sudo apt-get install npm
```
## Postgres

### Instalando Postgres
```
sudo apt-get install postgresql
```
### Instalacion de PostGis

Debido a que en este proyecto se manejan mapas a traves de los cuales obtenemos informacion se hace necesaria la instalacion de la extension PostGis

#### Añadiendo los paquetes de postGis
```
sudo add-apt-repository ppa:ubuntugis/ubuntugis-unstable
sudo apt update
```
#### Instalando PostGis

```
sudo apt install postgis postgresql-9.6-postgis-2.3

sudo -u postgres psql -c "CREATE EXTENSION postgis; CREATE EXTENSION postgis_topology;" gisdata
```

## Instalaciòn de Docker

Cabe aclarar que esta parte se encuentra en desarrollo, por lo que puede presentar ciertos inconvenientes

### En caso de tener una version vieja de docker procedemos a desinstalarlo
```
sudo apt-get remove docker docker-engine docker.io containerd runc
```
### Actualizacion de la base de datos de paquetes
```
sudo apt-get update
```
### Instalando Docker ...
```
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
```
#### Agregamos el repositorio Docker a documentos APT
```
sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
```
#### Actualizamos nuevamente la base de datos de paquetes
```
sudo apt-get update
```
#### Configuramos el repositorio
```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```
#### Nos aseguramos de instalar el repositorio de Docker
```
apt-cache policy docker-engine
```
#### Instalamos Docker
```
sudo apt-get install -y docker-engine
```
Para comprobar que se esta ejecutando usamos 
```
sudo systemctl status docker
```
En donde en caso de estar ejecutandose veremos ``` Active: active(running)```
(para terminar el proceso de este comando usamos Ctrl+c)

## Instalando Docker CE
```
sudo apt-get update
udo apt-get install docker-ce
```
#### En caso de querer verificar que Docker CE esta instalado
```
sudo docker run hello-world`
```
## Instalando docker-compose

#### Usamos este comando para descargar la version actual de Docker compose

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
#### Aplicando permisos
```
sudo chmod +x /usr/local/bin/docker-compose
```

#### Verificando la instalacion
```
docker-compose --version
```

### Usando docker-compose

Al momento de utilizar docker-compose debemos asegurarnos de encontrarnos en la carpeta del proyecto, en este caso "ProyectoBases", ademàs de tener el archivo ```docker-compose.yml``` o ```docker-compose.yaml ```
 
Usamos el siguiente codigo:

```
docker-compose build
docker-compose up
```

## La app

Empezaremos por clonar o descargar el repositorio, una vez esto utilizamos la terminal del sistema para llegar a la ubicacion de la carpeta "ProyectoBases", una vez ahi, accedemos a la carpeta del backEnd ```project-backend/src``` y ejecutamos el comando 
```
node backend.js
```
Una vez esto accedemos a la carpeta del frontEnd ```/project-frontend``` y ejecutamos el comando
```
npm start
```
