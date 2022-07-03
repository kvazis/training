### [JetHome JetHub H1 контроллер умного дома, установка Supervised Home Assistant, настройка zigbee2mqtt](https://youtu.be/DbcoGo_Puc8)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Команды и ссылки из урока:  

:white_check_mark: **JetHub H1** - [Официальная wiki страница](https://wiki.jethome.ru/jethub_h1)    

:white_check_mark: [Amlogic Burning Tool](https://wiki.jethome.ru/burning_tool_manual)    
:white_check_mark: [Скачать с зеркала jethome](http://update.jethome.ru/tools/USB_Burning_Tool_v2.2.3.zip)    
:white_check_mark: [Образ JetHub Armbian](http://update.jethome.ru/armbian/release/)    
:white_check_mark: **Удобный SSH клиент** - [Putty](https://www.putty.org/)    

:ballot_box_with_check: Логин / пароль по умолчанию - `root 1234`    
:heavy_exclamation_mark:Вставлять скопированный текст в консоль - правой клавишей мышки    

:ballot_box_with_check: Переключение на нового пользователя -`su #имя пользователя`    
:ballot_box_with_check: Обновление списка пакетов - `sudo apt update`    
:ballot_box_with_check: Обновление пакетов - `sudo apt upgrade`    

:ballot_box_with_check: Установка Docker - `sudo curl -fsSL get.docker.com | sh`    
:ballot_box_with_check: Добавления текущего пользователя в группу docker - `sudo usermod -aG docker $USER`    

:ballot_box_with_check: Установка необходимых пакетов - `sudo apt-get install -y jq wget curl udisks2 libglib2.0-bin network-manager dbus`    

:white_check_mark: **OS Agent** - [список версий](https://github.com/home-assistant/os-agent/releases)    
:ballot_box_with_check: Загрузка пакета OS Agent - `sudo wget https://github.com/home-assistant/os-agent/releases/download/1.2.2/os-agent_1.2.2_linux_aarch64.deb`    
:ballot_box_with_check: Проверка файла - `sudo ls`    
:ballot_box_with_check: Установка - `sudo dpkg -i os-agent_1.2.2_linux_aarch64.deb`    

:ballot_box_with_check: Загрузка пакета Home Assistant - `sudo wget https://github.com/home-assistant/supervised-installer/releases/latest/download/homeassistant-supervised.deb`    
:ballot_box_with_check: Проверка файла - `sudo ls`    
:ballot_box_with_check: Установка - `sudo dpkg -i homeassistant-supervised.deb`    
:ballot_box_with_check: При запросе выбираем - **odroid-c2**     

:ballot_box_with_check: Репозиторий zigbee2mqtt - `https://github.com/zigbee2mqtt/hassio-zigbee2mqtt`    
:ballot_box_with_check: Порт - `port: /dev/ttyAML2`    
:ballot_box_with_check: Уровень логирования - `log_level: info`    
:ballot_box_with_check: Время от последнего отклика - `last_seen: ISO_8601`    

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




