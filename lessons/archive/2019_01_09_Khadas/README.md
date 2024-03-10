### [Khadas VIM2 Basic - мощный одноплатник, установка hassio, сравнение с raspberry](https://youtu.be/SK5HRrRd9zM)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Ресурсы:    

:white_check_mark: **Операционная система** - [Официальный сайт Khadas](https://docs.khadas.com/products/sbc/vim2/install-os/start)    
:white_check_mark: **Удобный SSH клиент** - [Putty](https://www.putty.org/)

#### Команды:    

:ballot_box_with_check: Логин и пароль по умолчанию = `root / khadas` и `khadas / khadas`     

:ballot_box_with_check: Network Manager     
```yaml
sudo nmtui
```
:ballot_box_with_check: Создание нового пользователя    
```yaml
adduser имя
```
:ballot_box_with_check: Репозиторий и список пакетов    
```yaml
sudo add-apt-repository universe && sudo apt-get update
```
:ballot_box_with_check: Обновление пакетов    
```yaml
sudo apt-get -y upgrade
sudo apt-get -y dist-upgrade
```
:ballot_box_with_check: FTP сервер Midnight Commander  APP armor git watchdog ntpdate    
```yaml
sudo apt-get -y install ftpd mc apparmor git watchdog bluez ntpdate
```
:ballot_box_with_check: Часовой пояс    
```yaml
sudo dpkg-reconfigure tzdata
```
:ballot_box_with_check: Синхронизация     
```yaml
sudo ntpdate -u ntp.time.in.ua
```
:ballot_box_with_check: Установка WatchDog (при зависании компа - перегружает его)   
```yaml
sudo ln -s  /lib/systemd/system/watchdog.service /etc/systemd/system/multi-user.target.wants/watchdog.service
sudo systemctl enable watchdog.service
sudo systemctl start watchdog.service
```
:ballot_box_with_check: Зависимости и докер     
```yaml
sudo apt-get -y install avahi-daemon jq docker.io
```
:ballot_box_with_check: Добавление пользователя    
```yaml
sudo usermod -aG docker имя
```
:ballot_box_with_check: перезагрузка – вход под root, версия докера    
```yaml
docker --version
```
:ballot_box_with_check: Установка Hass.io для Khadas VIM2 Basic (для 64 разрядных ARM)    
```yaml
curl -Lo installer.sh https://raw.githubusercontent.com/home-assistant/supervised-installer/master/installer.sh
bash installer.sh --machine raspberrypi3-64
```

:arrow_right: Веб интерфейс Home Assistant - `http://IP adress:8123`    

____
#### Поддержать развитие проекта *Умный дом с Alex Kvazis*    
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg/join" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/youtube.png" alt="Youtube Sponsorship" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.patreon.com/alex_kvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/patreon-button.png" alt="Patreon Support" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.buymeacoffee.com/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/buymeacoffee.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.paypal.com/paypalme/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/paypal.png" alt="PayPal Me" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Или перевод любой суммы на -     
* Webmoney - Z243592584952
* BTC - 1PAjXcNbLtUKLY8d5HDnfxRqc5Zchj1fU3    
* TON - UQBEShkfKCFhvqlTs_oIpa6kFIQJguJR30hDXany1cCAbCfe    
* USDT (TRON (TRC20)) - TEpnJcLDRbkwq5oQpjVET9NbPpHKB7QMrD    