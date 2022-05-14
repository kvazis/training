### [Home Assistant. Урок 9.5 - Интеграции Tuya и Local Tuya, Обновление 11.2021](https://youtu.be/RjlwAIPTk-4)

####  Текстовая версия инструкции по интеграциям Tuya и Local Tuya

:ballot_box_with_check: `Cloud — Development — My Cloud Projects`    
:ballot_box_with_check: `Create Cloud Project`    
:ballot_box_with_check: Добавляем `Device Status Notification`    
:ballot_box_with_check: Подключение приложения - `Device — Link Tuya App Account — Add App Account`
:ballot_box_with_check: Настройки — Интеграции — Добавить интеграцию — Tuya    
:ballot_box_with_check: С страницы Authorization — берем `Access ID/Client ID`, `Access Secret/Client Secret`    

:ballot_box_with_check: HACS
```yaml
sudo bash
wget -O - https://get.hacs.xyz | bash -
```

:ballot_box_with_check: Установка tuya-cli
```yaml
sudo apt-get install npm
sudo npm i @tuyapi/cli -g
```
:ballot_box_with_check: Получение ключей
```yaml
tuya-cli wizard
```
:ballot_box_with_check: Ручное получение ключей - `API Explorer — Smart Home Management System — Device Management — Get device details`    

:ballot_box_with_check: Пример изменения datapoint
```yaml
  - service: localtuya.set_dp
    data:
      device_id: ID устройства
      dp: 21
      value: "scene"
```

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