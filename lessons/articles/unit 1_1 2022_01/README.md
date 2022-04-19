* [Supervised Home Assistant. Легкая установка на RaspiOS 64 - Raspberry PI 4B в корпусе Argon One M.2](https://youtu.be/C3684jm62q8)

# Текстовая версия - ссылки и команды из урока

* Raspberry Pi Imager
* [Загрузка программы для записи образа](https://www.raspberrypi.org/software/)

* Обновляем bootloader для загрузки с USB
* [Образы 64х RaspiOS](https://downloads.raspberrypi.org/raspios_arm64/images/)

* Расширенные настройки в Raspberry Pi Imager - Ctrl-Shift-X

* [Удобный SSH клиент Putty](https://www.putty.org/)

* Имя пользователя pi - пароль установленный при загрузке 

* Обновление списка пакетов и пакетов
```yaml
sudo apt update
sudo apt upgrade -y
```
* Обновление прошивки
```yaml
sudo rpi-update
```
* Перезагрузка
```yaml
sudo reboot
```
* Установка необходимых пакетов
```yaml
sudo apt-get install -y jq wget curl udisks2 apparmor-utils libglib2.0-bin network-manager dbus
```
* Настройка wi-fi
Отключаем dhcpcd
```yaml
sudo nano /etc/dhcpcd.conf
denyinterfaces wlan0
```
Ctrl X - для выхода

Y для сохранения
* Перезагрузка
```yaml
sudo reboot
```
```yaml
sudo nmtui
```

```yaml
Activate connection - подключаем wi-fi
Edit connection - настройки IP
```
* Приложение для настройки - 
```yaml
sudo raspi-config
5 Localisation Options / I1 Change Locale - ищем и выбираем пробелом ru_RU.UTF-8 UTF-8
5 Localisation Options / I2 Change Timezone - выбираем часовой пояс
```
* Управление вентилятором
* Установка скрипта
```yaml
curl https://download.argon40.com/argon1.sh | bash

argonone-config
```

* Исправление ошибки Apparmor
```yaml
sudo nano /boot/cmdline.txt
В конец файла
lsm=apparmor
Ctrl X - для выхода
Y для сохранения
```
* Перезагрузка
```yaml
sudo reboot
```
* Приоретизация сети
* Таблица маршрутизации
```yaml
route
```
Смотрим метрики
```yaml
sudo nmtui
Route - 0.0.0.0/0 с метрикой после eth0
```
* Перезагрузка
```yaml
sudo reboot
```
* Таблица маршрутизации
```yaml
route
```
Смотрим метрики
* Данные о сети
```yaml
ifconfig
```
* Установка docker - 
```yaml
sudo curl -fsSL get.docker.com | sh
```
* Добавляем в группу docker пользователя
```yaml
sudo gpasswd -a $USER docker
newgrp docker
```
* Установка OS-Agent
* [Последний релиз](https://github.com/home-assistant/os-agent/releases/latest)
```yaml
wget https://github.com/home-assistant/os-agent/releases/download/1.2.2/os-agent_1.2.2_linux_aarch64.deb (меняем на актуальную)

sudo dpkg -i os-agent_1.2.2_linux_aarch64.deb
```
* Установка Home Assisistant Supervised
```yaml
wget https://github.com/home-assistant/supervised-installer/releases/latest/download/homeassistant-supervised.deb

sudo dpkg -i homeassistant-supervised.deb
```
* ставим Portainer - 
```yaml
docker pull portainer/portainer-ce
docker volume create portainer_data
docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```
* Веб интерфейс Portainer - IP adress:9000
* Веб интерфейс Home Assistant - IP adress:8123

# Как поддержать развитие проекта?
* [Стать спонсором моего Youtube](http://kvazis.link/sponsorship)
* [Подписаться на Patreon](http://kvazis.link/patreon)
* [Перевод через Paypal](http://kvazis.link/paypal)
* Webmoney - Z243592584952
* BTC - 1Gzr7WQugfnPuWVawu47EiCMTDUBqCAshj
* ETH - 0xa0ce3E29Cf537013649Ae9cdbc08C4853fF91FAc
* LTC - ltc1qs493yk2wk9ywx5h6aruk4p9zm75hx42ekv4ym2
* TRX - TFTCLqvS1tMBwokRHBwz1TCDJ4oD1Z5zPk