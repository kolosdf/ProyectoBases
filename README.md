# Not That Easy Taxi!

## Instalaciòn de Docker

### En caso de tener una version vieja de docker procedemos a desinstalarlo
```
sudo apt-get remove docker docker-engine docker.io containerd runc
```
### Actualizacion de la base de datos de paquetes
```
sudo apt-get update
```
### Instalando Docker
```
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
```
### Agregamos el repositorio Docker a documentos APT
```
sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
```
### Actualizamos nuevamente la base de datos de paquetes
```
sudo apt-get update
```
### 
