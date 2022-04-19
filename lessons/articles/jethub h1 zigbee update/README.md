* [JetHome JetHub H1 - обновляем прошивку Zigbee модуля с сохранением NVRAM, без перепривязки устройств](https://youtu.be/QaKIUPci67w)

# Текстовая версия - ссылки и команды из урока

* [Репозиторий zigpy-znp](https://github.com/zigpy/zigpy-znp/)

* NVRAM
```yaml
pip3 install git+https://github.com/zigpy/zigpy-znp/
```
* Чтение NVRAM
```yaml
python3 -m zigpy_znp.tools.nvram_read /dev/ttyAML2 -o backup.json
```

* Прошивка
* [Репозиторий cc2538-bsl](https://github.com/JelmerT/cc2538-bsl)

* Качаем утилиту для прошивки
```yaml
git clone https://github.com/JelmerT/cc2538-bsl.git
```
* Устанавливаем дополнительные пакеты
```yaml
pip3 install pyserial intelhex python-magic
```
* Установка unzip
```yaml
sudo apt-get install -y unzip
```
* Репозитории с прошивками - основная ветка
* [Прошивка из урока для CC2652P - launchpad](https://github.com/Koenkk/Z-Stack-firmware/tree/Z-Stack_Home_3.x.0_20211217/coordinator/Z-Stack_3.x.0/bin)
* [Прошивка для CC2538 - UART](https://github.com/jethome-ru/zigbee-firmware/tree/master/ti/coordinator/cc2538_cc2592)
* [Ветка для разработчиков](https://github.com/Koenkk/Z-Stack-firmware/tree/develop/coordinator/Z-Stack_3.x.0/bin)

* Качаем и распаковываем прошивку
```yaml
wget https://github.com/Koenkk/Z-Stack-firmware/raw/develop/coordinator/Z-Stack_3.x.0/bin/CC1352P2_CC2652P_launchpad_coordinator_20220103.zip && unzip CC1352P2_CC2652P_launchpad_coordinator_20220103.zip
```
* Список файлов 
```yaml
ls
```
* Переходим в режим root
```yaml
sudo bash
```
* Переводим модуль в режим SBL (serial bootloader):
```yaml
echo 0 > /sys/class/gpio/gpio510/value
echo 1 > /sys/class/gpio/gpio507/value
echo 0 > /sys/class/gpio/gpio507/value
```
* Прошиваем
```yaml
python3 cc2538-bsl/cc2538-bsl.py -p /dev/ttyAML2 -e -w CC1352P2_CC2652P_launchpad_coordinator_20220103.hex
```
* Возвращаем в рабочий режим
```yaml
echo 1 > /sys/class/gpio/gpio510/value
echo 1 > /sys/class/gpio/gpio507/value
echo 0 > /sys/class/gpio/gpio507/value
```
* Выходим из режима root
```yaml
exit 
```
* Записываем NVRAM
```yaml
python3 -m zigpy_znp.tools.nvram_write /dev/ttyAML2 -i backup.json
```
* Дополнительно (в уроке этого нет) - очистка NVRAM
```yaml
python3 -m zigpy_znp.tools.nvram_reset /dev/ttyAML2
```

# Как поддержать развитие проекта?
* [Стать спонсором моего Youtube](http://kvazis.link/sponsorship)
* [Подписаться на Patreon](http://kvazis.link/patreon)
* [Перевод через Paypal](http://kvazis.link/paypal)
* Webmoney - Z243592584952
* BTC - 1Gzr7WQugfnPuWVawu47EiCMTDUBqCAshj
* ETH - 0xa0ce3E29Cf537013649Ae9cdbc08C4853fF91FAc
* LTC - ltc1qs493yk2wk9ywx5h6aruk4p9zm75hx42ekv4ym2
* TRX - TFTCLqvS1tMBwokRHBwz1TCDJ4oD1Z5zPk