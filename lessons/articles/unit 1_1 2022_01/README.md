### [Supervised Home Assistant. Легкая установка на RaspiOS 64 - Raspberry PI 4B в корпусе Argon One M.2](https://youtu.be/C3684jm62q8)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Команды и ссылки из урока:  

:white_check_mark: **Raspberry Pi OS Lite** - [Загрузка программы для записи образа](https://www.raspberrypi.org/software/)    

:ballot_box_with_check: Обновляем bootloader для загрузки с USB    

:white_check_mark: **RaspiOS 64х** - [Загрузка образа](https://downloads.raspberrypi.org/raspios_arm64/images/)

:ballot_box_with_check: Расширенные настройки в Raspberry Pi Imager - `Ctrl-Shift-X`

:white_check_mark: **Удобный SSH клиент** - [Putty](https://www.putty.org/)

:ballot_box_with_check: Имя пользователя `pi` - пароль установленный при загрузке    
:ballot_box_with_check: Обновление списка пакетов и пакетов
```yaml
sudo apt update
sudo apt upgrade -y
```
:ballot_box_with_check: Обновление прошивки
```yaml
sudo rpi-update
```
:ballot_box_with_check: Перезагрузка - `sudo reboot`     
:ballot_box_with_check: Установка необходимых пакетов    
```yaml
sudo apt-get install -y jq wget curl udisks2 apparmor-utils libglib2.0-bin network-manager dbus
```
:ballot_box_with_check: Настройка wi-fi    
Отключаем dhcpcd
```yaml
sudo nano /etc/dhcpcd.conf
denyinterfaces wlan0
```
`Ctrl X` - для выхода    
`Y` -  для сохранения    
:ballot_box_with_check: Перезагрузка - `sudo reboot`     
:ballot_box_with_check: Интерфейс Network Manager - `sudo nmtui`    
:ballot_box_with_check: `Activate connection` - подключаем wi-fi    
:ballot_box_with_check: `Edit connection` - настройки IP    
:ballot_box_with_check: Приложение для настройки - 
```yaml
sudo raspi-config
5 Localisation Options / I1 Change Locale - ищем и выбираем пробелом ru_RU.UTF-8 UTF-8
5 Localisation Options / I2 Change Timezone - выбираем часовой пояс
```

:ballot_box_with_check: Управление вентилятором    
Установка скрипта - `curl https://download.argon40.com/argon1.sh | bash`    
Настройка включения - `argonone-config`    

:ballot_box_with_check: Исправление ошибки Apparmor
```yaml
sudo nano /boot/cmdline.txt
```
В конец файла вставляем `lsm=apparmor`    
`Ctrl X` - для выхода    
`Y` для сохранения    
:ballot_box_with_check: Перезагрузка - `sudo reboot`     

:ballot_box_with_check: Приоретизация сети    
Таблица маршрутизации - `route`    
Смотрим метрики -`sudo nmtui`    
Route - 0.0.0.0/0 с метрикой после `eth0`    
:ballot_box_with_check: Перезагрузка - `sudo reboot`     
Таблица маршрутизации - `route`    
Смотрим метрики    

:ballot_box_with_check: Данные о сети - `ifconfig`    

:ballot_box_with_check: Установка docker - 
```yaml
sudo curl -fsSL get.docker.com | sh
```
:ballot_box_with_check: Добавляем в группу docker пользователя
```yaml
sudo gpasswd -a $USER docker
newgrp docker
```

:ballot_box_with_check: Установка OS-Agent    
:white_check_mark: [Последний релиз](https://github.com/home-assistant/os-agent/releases/latest)    
Загружаем - `wget https://github.com/home-assistant/os-agent/releases/download/1.2.2/os-agent_1.2.2_linux_aarch64.deb` (номер меняем на актуальный)    
Установка - `sudo dpkg -i os-agent_1.2.2_linux_aarch64.deb`    

:ballot_box_with_check: Установка Home Assisistant Supervised    
Загружаем - `wget https://github.com/home-assistant/supervised-installer/releases/latest/download/homeassistant-supervised.deb`    
Установка - `sudo dpkg -i homeassistant-supervised.deb`    

:ballot_box_with_check: Установка Portainer - 
```yaml
docker pull portainer/portainer-ce
docker volume create portainer_data
docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```
:arrow_right: Веб интерфейс Portainer - IP adress:9000    
:arrow_right: Веб интерфейс Home Assistant - IP adress:8123    

____
#### Поддержать развитие проекта *Умный дом с Alex Kvazis*    
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg/join" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/youtube.png" alt="Youtube Sponsorship" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.patreon.com/alex_kvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/patreon-button.png" alt="Patreon Support" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.buymeacoffee.com/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/buymeacoffee.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.paypal.com/paypalme/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/paypal.png" alt="PayPal Me" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Или перевод любой суммы на -     
* Webmoney - Z243592584952
* BTC - 1Gzr7WQugfnPuWVawu47EiCMTDUBqCAshj
* ETH - 0xa0ce3E29Cf537013649Ae9cdbc08C4853fF91FAc
* LTC - ltc1qs493yk2wk9ywx5h6aruk4p9zm75hx42ekv4ym2
* TRX - TFTCLqvS1tMBwokRHBwz1TCDJ4oD1Z5zPk