### [Home Assistant - Mosquitto broker, Zigbee2mqtt, MQTT - октябрь 2023](https://youtu.be/fEu_V1pkjGo)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Команды и ссылки из урока:  

:white_check_mark: **Браузер для MQTT брокера** - [MQTT Explorer](https://mqtt-explorer.com/)    


:ballot_box_with_check: Конфигурация Mosquitto broker    
```yaml
- username: mqtt
  password: mqtt
```

:ballot_box_with_check: Путь для репозитория zigbee2mqtt - `https://github.com/zigbee2mqtt/hassio-zigbee2mqtt`    

:ballot_box_with_check: Порт для USB координатора Sonoff ZB Dongle-P     
```yaml
serial:
  port: /dev/ttyUSB0
```

:ballot_box_with_check: Порт для USB координатора Sonoff ZB Dongle-E     
```yaml
serial:
  port: /dev/ttyACM0
  adapter: ezsp
```

:ballot_box_with_check: Показанный вариант `configuration.yaml` для zigbee2mqtt     
```yaml
mqtt:
  server: mqtt://core-mosquitto:1883
  base_topic: zigbee2mqtt_1
  version: 5
# Serial settings
serial:
  # Location of SLZB-06
  port: tcp://192.168.0.7:6638
  baudrate: 115200
  # Disable green led?
  disable_led: false
# Set output power to max 20
advanced:
  transmit_power: 20
  channel: 11
  pan_id: GENERATE
  network_key: GENERATE
  availability_blocklist: []
  availability_passlist: []
  last_seen: ISO_8601
  log_level: info
homeassistant: true
permit_join: false
```

:ballot_box_with_check: Пример `configuration.yaml` для Sonoff ZB Dongle-P     
```yaml
mqtt:
  server: mqtt://core-mosquitto:1883
  base_topic: zigbee2mqtt_1
  version: 5
serial:
  port: /dev/ttyUSB0
advanced:
  channel: 11
  pan_id: GENERATE
  network_key: GENERATE
  availability_blocklist: []
  availability_passlist: []
  last_seen: ISO_8601
  log_level: info
homeassistant: true
permit_join: false
```
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