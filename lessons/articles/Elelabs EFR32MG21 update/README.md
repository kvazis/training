### [Обновляем прошивку на Zigbee стиках EFR32MG21, часть 2 - консоль, утилита Elelabs](https://youtu.be/0G53NNZ4mqM)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Команды и ссылки из урока:  

:white_check_mark: [Репозиторий с прошивками для EFR32MG21](https://github.com/xsp1989/zigbeeFirmware/tree/master/firmware/Zigbee3.0_Dongle-NoSigned/EZSP)    
:white_check_mark: [Репозиторий Elelabs](https://github.com/Elelabs/elelabs-zigbee-ezsp-utility#readme)    

:white_check_mark: **Удобный SSH клиент** - [Putty](https://www.putty.org/)

:ballot_box_with_check: Переход в режим root    
```yaml
sudo -s
```

:ballot_box_with_check: Обновление списка пакетов и пакетов    
```yaml
apt update
apt upgrade -y
```

:ballot_box_with_check: Установка пакетов git и python3    
```yaml
apt-get install -y git python3-pip
```

:ballot_box_with_check: Клонируем репозиторий с утилитой прошивки    
```yaml
git clone https://github.com/Elelabs/elelabs-zigbee-ezsp-utility.git
```

:ballot_box_with_check: Переходм в папку с утилитой прошивки    
```yaml
cd elelabs-zigbee-ezsp-utility
```

:ballot_box_with_check: Установка утилиты прошивки    
```yaml
pip3 install -r requirements.txt
```

:ballot_box_with_check: Качаем файл прошивки - при необходимости меняем ссылку на актуальный файл    
```yaml
wget https://github.com/xsp1989/zigbeeFirmware/raw/master/firmware/Zigbee3.0_Dongle-NoSigned/EZSP/ncp-uart-sw_6.10.3_115200.gbl
```

:ballot_box_with_check: Проверка порта стика    
```yaml
ls -l /dev/serial/by-id
```

:ballot_box_with_check: Проверка версии прошивки    
```yaml
python3 Elelabs_EzspFwUtility.py probe -p /dev/ttyACM0
```

:ballot_box_with_check: Прошивка    
```yaml
python3 Elelabs_EzspFwUtility.py flash -f ncp-uart-sw_6.10.3_115200.gbl -p /dev/ttyACM0
```

:ballot_box_with_check: Если Home Assistant не загружается - используем `reboot` для перезагрузки хоста. Из пользовательского режима - `sudo reboot`    

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







