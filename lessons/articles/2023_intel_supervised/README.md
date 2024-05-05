### [Мини ПК AC8-N на Intel N100 - часть 2. Debian 12, Supervised Home Assistant](https://youtu.be/seiqmMsx6JQ)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Ресурсы:    

:white_check_mark: **Операционная система** - [Debian 12 Bookworm](https://cdimage.debian.org/debian-cd/current/amd64/iso-dvd/)    
:white_check_mark: **Программа для записи образа на USB Flash** - [Balena Etcher](https://etcher.balena.io/)    
:white_check_mark: **Удобный SSH клиент** - [Putty](https://www.putty.org/)

#### Команды:    

:ballot_box_with_check: Статус сети и IP адрес -     
```yaml
ip a
```
:ballot_box_with_check: Переход в режим root    
```yaml
su
```
:ballot_box_with_check: Редактируем файл sources    
```yaml
nano /etc/apt/sources.list
```
`Ctrl X` - для выхода    
`Y` для сохранения    
:ballot_box_with_check: Обновление списка пакетов и пакетов    
```yaml
apt update && apt upgrade -y && apt autoremove -y
```
:ballot_box_with_check: Установка sudo    
```yaml
apt-get install -y sudo
```
:ballot_box_with_check: Добавление пользователя в группу sudo    
```yaml
nano /etc/sudoers
```
`Ctrl X` - для выхода    
`Y` для сохранения    
:ballot_box_with_check: Выход из su, переход в sudo    
```yaml
exit
sudo -i
```
:ballot_box_with_check: Установка необходимых пакетов    
```yaml
apt-get install -y jq wget curl udisks2 apparmor-utils libglib2.0-bin network-manager dbus systemd-journal-remote systemd-resolved bluez nfs-common cifs-utils
```
:ballot_box_with_check: Прописываем DNS    
```yaml
nano /etc/systemd/resolved.conf
```
`Ctrl X` - для выхода    
`Y` для сохранения    
:ballot_box_with_check: Перезапуск DNS    
```yaml
systemctl restart systemd-resolved
```
:ballot_box_with_check: Установка docker - 
```yaml
curl -fsSL get.docker.com | sh
```

:ballot_box_with_check: Установка OS-Agent    
:white_check_mark: [Последний релиз](https://github.com/home-assistant/os-agent/releases/latest)    
Загружаем - `wget https://github.com/home-assistant/os-agent/releases/download/1.6.0/os-agent_1.6.0_linux_x86_64.deb` (номер меняем на актуальный)    
Установка - `dpkg -i os-agent_1.6.0_linux_x86_64.deb`    

:ballot_box_with_check: Установка Home Assisistant Supervised    
:white_check_mark: [Последний релиз](https://github.com/home-assistant/supervised-installer/releases)    
Загружаем - `wget https://github.com/home-assistant/supervised-installer/releases/download/1.5.0/homeassistant-supervised.deb`    
Установка - `dpkg -i homeassistant-supervised.deb`    

:arrow_right: Веб интерфейс Home Assistant - `http://IP adress:8123`    

:arrow_right: Информация о системе - `http://IP adress:8123/hassio/system`    

____
#### Поддержать развитие проекта *Умный дом с Alex Kvazis*    
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg/join" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/youtube.png" alt="Youtube Sponsorship" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.patreon.com/alex_kvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/patreon-button.png" alt="Patreon Support" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.buymeacoffee.com/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/buymeacoffee.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.paypal.com/paypalme/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/paypal.png" alt="PayPal Me" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Или перевод любой суммы на -     
* Webmoney - Z243592584952    
* USDT TRON (TRC20) - TUvBLFpVAFiR7Z64MEjkXvZcdf1DGDEYTu    
* BTC - bc1qpqma0ndrmxw70y28esdaghu2pl8ttf97nh0ghc    
* ETH - 0xD4D06B1B1a6879ce4B36922F6ad96ddf30FD7E1A    
* TON - UQBEShkfKCFhvqlTs_oIpa6kFIQJguJR30hDXany1cCAbCfe    