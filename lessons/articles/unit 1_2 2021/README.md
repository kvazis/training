### [Home Assistant. Урок 1.2 - Установка Ubuntu Server на Raspberry PI 4B или 3B+, boot from USB SSD](https://youtu.be/GMOo0Af9eTw)

#### :ru: Команды и ссылки из урока:  

:white_check_mark: **Raspberry Pi OS Lite** - [Загрузка программы для записи образа](https://www.raspberrypi.org/software/)    

:ballot_box_with_check: Обновляем bootloader для загрузки с USB

:white_check_mark: **Удобный SSH клиент** - [Putty](https://www.putty.org/)

:ballot_box_with_check: Логин / пароль по умолчанию - `ubuntu / ubuntu`    

:heavy_exclamation_mark:Вставлять скопированный текст в консоль - правой клавишей мышки    

:ballot_box_with_check: Создание нового пользователя - `sudo adduser #имя пользователя`    
:ballot_box_with_check: Добавление пользователя в группу sudo - `sudo usermod -aG sudo #имя пользователя`    
:ballot_box_with_check: Переключение на нового пользователя - `su #имя пользователя`    
:ballot_box_with_check: Репозиторий и список пакетов - `sudo add-apt-repository universe && sudo apt update`    
:ballot_box_with_check: Обновление пакетов - `sudo apt upgrade`    

:ballot_box_with_check: Настройка сети - Установка сетевых инструментов и Network Manager
```yaml
sudo apt install net-tools network-manager
sudo systemctl start NetworkManager.service
sudo systemctl enable NetworkManager.service

sudo reboot
```

:ballot_box_with_check: Список файлов - `ls /etc/netplan`    
:ballot_box_with_check: Делаем копию файла - `sudo cp /etc/netplan/50-cloud-init.yaml /etc/netplan/50-cloud-init.yaml.BAK`

:ballot_box_with_check: Передаем управление network-manager - `sudo nano /etc/netplan/50-cloud-init.yaml`    
:heavy_exclamation_mark: Ctrl-K - удаление строки    
```yaml
network:
    version: 2
    renderer: NetworkManager
```
:heavy_exclamation_mark: Выход - Ctrl-X    
:heavy_exclamation_mark: Сохранить изменения - Y    
```yaml
sudo netplan generate
sudo netplan apply
sudo reboot

sudo nmtui

sudo reboot
```
:ballot_box_with_check: FTP сервер Midnight Commander  APP armor git watchdog ntpdate -    
`sudo apt-get -y install ftpd mc apparmor git watchdog bluez ntpdate`    

:ballot_box_with_check: Часовой пояс - `sudo dpkg-reconfigure tzdata`    
:ballot_box_with_check: Зависимости и докер - `sudo apt-get -y install avahi-daemon jq docker.io`    
:ballot_box_with_check: Добавление пользователя -`sudo usermod -aG docker #имя пользователя`    
:ballot_box_with_check: Перезагрузка - `sudo reboot`    

:ballot_box_with_check: Входим на новый адрес    
:ballot_box_with_check: Переходим в режим рута - `sudo su`    
:ballot_box_with_check: Установка Hass.io для 64 разрядных ARM -     
```yaml
curl -Lo installer.sh https://raw.githubusercontent.com/home-assistant/supervised-installer/master/installer.sh
bash installer.sh --machine raspberrypi4-64
```
:ballot_box_with_check: Веб интерфейс Home Assistant - `http://YOUR IP:8123/`    

:ballot_box_with_check: Установка Portainer -     
```yaml
docker pull portainer/portainer-ce
docker volume create portainer_data
docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```
:ballot_box_with_check: Выход из консоли - `exit` - возможно несколько раз    
:ballot_box_with_check: Веб интерфейс Portainer - `http://YOUR IP:9000/`    

:ballot_box_with_check: Список интерфейсов - `ifconfig`    
:ballot_box_with_check: Маршруты - `route`    

____
### Как поддержать развитие проекта?
* [Стать спонсором моего Youtube](http://kvazis.link/sponsorship)
* [Подписаться на Patreon](http://kvazis.link/patreon)
* [Перевод через Paypal](http://kvazis.link/paypal)
* Webmoney - Z243592584952
* BTC - 1Gzr7WQugfnPuWVawu47EiCMTDUBqCAshj
* ETH - 0xa0ce3E29Cf537013649Ae9cdbc08C4853fF91FAc
* LTC - ltc1qs493yk2wk9ywx5h6aruk4p9zm75hx42ekv4ym2
* TRX - TFTCLqvS1tMBwokRHBwz1TCDJ4oD1Z5zPk