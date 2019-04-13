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
### Instale paquetes para permitir que apt use un repositorio sobre HTTPS:
```
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
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
### Configuramos el repositorio
```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

## Instalando Docker CE
```
sudo apt-get update
udo apt-get install docker-ce
```
#### En caso de querer verificar que Docker CE esta instalado
```
sudo docker run hello-world`
```
