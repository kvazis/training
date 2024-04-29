### [Home Assistant - восстановление после сбоя, установка с нуля](https://youtu.be/wszxrHQSGaE)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Команды показанные в уроке:    

:ballot_box_with_check: Настройка сети    
```yaml
nmtui
```

:ballot_box_with_check: Перезагрузка    
```yaml
reboot
```

:ballot_box_with_check: Добавление репозитория и обновление списка пакетов    
```yaml
sudo add-apt-repository universe && sudo apt-get update
```

:ballot_box_with_check: Обновление пакетов    
```yaml
sudo apt-get -y dist-upgrade
```

:ballot_box_with_check: Установка приложений    
```yaml
sudo apt-get -y install ftpd mc apparmor git watchdog mosquitto
```

:ballot_box_with_check: Настройка Mosquitto - Останавливаем  Mosquitto    
```yaml
sudo /etc/init.d/mosquitto stop
```

:ballot_box_with_check: меняем содержимое конфига в    
```yaml
sudo nano /etc/mosquitto/mosquitto.conf
```

```yaml
##Начало

pid_file /var/run/mosquitto.pid

persistence true
persistence_location /var/lib/mosquitto/

log_dest topic

log_type error
log_type warning
log_type notice
log_type information

connection_messages true
log_timestamp true

include_dir /etc/mosquitto/conf.d
##Конец
```
:ballot_box_with_check: Старт Mosquitto    
```yaml
sudo /etc/init.d/mosquitto start
```

:ballot_box_with_check: Настройка WatchDog (при зависании компа - перегружает его), одной строкой    
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

:ballot_box_with_check: Перезагрузка    
```yaml
reboot
```

:ballot_box_with_check: Вход под root, версия докера:    
```yaml
docker --version
```

:ballot_box_with_check: Установка Hass.io для Khadas VIM2 Basic (для 64 разрядных ARM):    
```yaml
curl -sL https://raw.githubusercontent.com/home-assistant/hassio-installer/master/hassio_install.sh | bash -s -- -m raspberrypi3-64
```

:ballot_box_with_check: Все поддерживаемые типы платформ:    
```yaml
https://github.com/home-assistant/hassio-installer
```

:ballot_box_with_check: Список запущенных контейнеров    
```yaml
docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Names}}"	
```

Веб интерфейс - `http://ваш IP:8123`

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