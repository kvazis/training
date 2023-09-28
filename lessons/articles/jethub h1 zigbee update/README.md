### [JetHome JetHub H1 - обновляем прошивку Zigbee модуля с сохранением NVRAM, без перепривязки устройств](https://youtu.be/QaKIUPci67w)

#### Текстовая версия - ссылки и команды из урока

:white_check_mark: [Репозиторий zigpy-znp](https://github.com/zigpy/zigpy-znp/)    

:ballot_box_with_check: NVRAM - `pip3 install git+https://github.com/zigpy/zigpy-znp/`    
:ballot_box_with_check: Чтение NVRAM - `python3 -m zigpy_znp.tools.nvram_read /dev/ttyAML2 -o backup.json`
:ballot_box_with_check: Прошивка    
:white_check_mark: [Репозиторий cc2538-bsl](https://github.com/JelmerT/cc2538-bsl)    
:ballot_box_with_check: Качаем утилиту для прошивки `git clone https://github.com/JelmerT/cc2538-bsl.git`    
:ballot_box_with_check: Устанавливаем дополнительные пакеты - `pip3 install pyserial intelhex python-magic`    
:ballot_box_with_check: Установка unzip - `sudo apt-get install -y unzip`    

:white_check_mark: Репозитории с прошивками - основная ветка    
:white_check_mark: [Прошивка из урока для CC2652P - launchpad](https://github.com/Koenkk/Z-Stack-firmware/tree/Z-Stack_Home_3.x.0_20211217/coordinator/Z-Stack_3.x.0/bin)    
:white_check_mark: [Прошивка для CC2538 - UART](https://github.com/jethome-ru/zigbee-firmware/tree/master/ti/coordinator/cc2538_cc2592)    
:white_check_mark: [Ветка для разработчиков](https://github.com/Koenkk/Z-Stack-firmware/tree/develop/coordinator/Z-Stack_3.x.0/bin)    

:ballot_box_with_check: Качаем и распаковываем прошивку -     
```yaml
wget https://github.com/Koenkk/Z-Stack-firmware/raw/develop/coordinator/Z-Stack_3.x.0/bin/CC1352P2_CC2652P_launchpad_coordinator_20220103.zip && unzip CC1352P2_CC2652P_launchpad_coordinator_20220103.zip
```
:ballot_box_with_check: Список файлов - `ls`    
:ballot_box_with_check: Переходим в режим root - `sudo bash`    
:ballot_box_with_check: Переводим модуль в режим SBL (serial bootloader):
```yaml
echo 0 > /sys/class/gpio/gpio510/value
echo 1 > /sys/class/gpio/gpio507/value
echo 0 > /sys/class/gpio/gpio507/value
```
:ballot_box_with_check: Прошиваем
```yaml
python3 cc2538-bsl/cc2538-bsl.py -p /dev/ttyAML2 -e -w CC1352P2_CC2652P_launchpad_coordinator_20220103.hex
```
:ballot_box_with_check: Возвращаем в рабочий режим
```yaml
echo 1 > /sys/class/gpio/gpio510/value
echo 1 > /sys/class/gpio/gpio507/value
echo 0 > /sys/class/gpio/gpio507/value
```
:ballot_box_with_check: Выходим из режима root - `exit`    
:ballot_box_with_check: Записываем NVRAM
```yaml
python3 -m zigpy_znp.tools.nvram_write /dev/ttyAML2 -i backup.json
```
:ballot_box_with_check: Дополнительно (в уроке этого нет) - очистка NVRAM
```yaml
python3 -m zigpy_znp.tools.nvram_reset /dev/ttyAML2
```

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