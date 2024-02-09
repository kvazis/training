### [Raspberry PI 4B - Установка Supervised Home Assistant на Debian 12 Bookworm - февраль 2024](https://youtu.be/MwZBE6aRHhE)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Команды и ссылки из урока:  

:white_check_mark: **Raspberry Pi OS Lite** - [Загрузка программы для записи образа](https://www.raspberrypi.org/software/)    

:white_check_mark: **Удобный SSH клиент** - [Putty](https://www.putty.org/)

:ballot_box_with_check: Имя пользователя и пароль установленные при загрузке    

:ballot_box_with_check: Переход в режим root    
```yaml
sudo -s
```
:ballot_box_with_check: Обновление списка пакетов и пакетов    
```yaml
apt update
apt upgrade -y
```
:ballot_box_with_check: Обновление прошивки - только при необходимости!    
```yaml
rpi-update
```

:ballot_box_with_check: Установка необходимых пакетов    
```yaml
apt-get install -y jq wget curl udisks2 apparmor-utils libglib2.0-bin network-manager dbus systemd-journal-remote systemd-resolved
```
:ballot_box_with_check: Запуск Network Manager    
```yaml
systemctl start NetworkManager
 
systemctl enable NetworkManager
```
   
:ballot_box_with_check: Приложение для настройки - 
```yaml
sudo raspi-config
5 Localisation Options / I1 Change Locale - ищем и выбираем пробелом ru_UA.UTF-8 UTF-8
5 Localisation Options / I2 Change Timezone - выбираем часовой пояс
```

:ballot_box_with_check: Дополнительные настройки для устранения ошибок в НА    
```yaml
nano /boot/firmware/cmdline.txt
```
В конец первой строки файла вставляем `systemd.unified_cgroup_hierarchy=false lsm=apparmor`    
`Ctrl X` - для выхода    
`Y` для сохранения    

:ballot_box_with_check: Перезагрузка - `reboot` 

:ballot_box_with_check: Скрипт управления вентилятором для корпусов Argon M2    
Установка скрипта - `curl https://download.argon40.com/argon1.sh | bash`    
Настройка включения - `argonone-config`      


:ballot_box_with_check: Установка docker - 
```yaml
sudo curl -fsSL get.docker.com | sh
```

:ballot_box_with_check: Выход из режима root    
```yaml
exit
```

:ballot_box_with_check: Добавляем в группу docker пользователя
```yaml
sudo gpasswd -a $USER docker
newgrp docker
```

:ballot_box_with_check: Установка OS-Agent    
:white_check_mark: [Последний релиз](https://github.com/home-assistant/os-agent/releases/latest) (при необходимости, в команде ниже номер меняем на актуальный)    
Загружаем - `wget https://github.com/home-assistant/os-agent/releases/download/1.6.0/os-agent_1.6.0_linux_aarch64.deb`    
Установка - `sudo dpkg -i os-agent_1.6.0_linux_aarch64.deb`    

:ballot_box_with_check: Установка Home Assisistant Supervised    
:white_check_mark: [Последний релиз](https://github.com/home-assistant/supervised-installer/releases) (при необходимости, в команде ниже номер меняем на актуальный)    
Загружаем - `wget https://github.com/home-assistant/supervised-installer/releases/download/1.6.0/homeassistant-supervised.deb`    

Установка - `sudo dpkg -i homeassistant-supervised.deb`    

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