### [Блог. Home Assistant - Rest sensor, взаимодействие основного и резервного серверов автоматизаций](https://youtu.be/1KTHQkkGJeU)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


:ballot_box_with_check: Запись в `secrets.yaml`    
```yaml
reserve_secret_token: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ79yvHbEASI4ZTMTY1ODIzMzQ1NiwiZXhypcofi472ZjMwMzg0MjwIjoxOTczNTkzNDU2fQ.JK5IPXYkEvk0ZjRkODR9.eyJpc3MiOiTHV_TuKUCqGF1ClNGEzMGJmNWE4YTY2MCIsImlhdCI6MFM
```

:ballot_box_with_check: Запись в `configuration.yaml`    
В разделе `homeassistant:` (если не объявлен, то создаем)    
```yaml
  auth_providers:
   - type: homeassistant
```

:ballot_box_with_check: Код Rest сенсора, который получает данные из `sensor.online_custom`    
```yaml
    sensor:
         - platform: rest
           resource: http://192.168.0.61:8123/api/states/sensor.online_custom
           name: reserve_state
           force_update: true
           headers: 
             Authorization: !secret reserve_secret_token
             content-type: 'application/json'
           value_template: '{{ value_json.state }}'
```

:ballot_box_with_check: Код Template сенсора `sensor.online_custom` - время от последней перезагрузки    

```yaml
   ## Штатный сенсор времени с последней перезагрузки
    sensor:    
    - platform: uptime
      name: online    
    
   ## Преобразование в удобный формат
    template:
    
      - sensor:
      
          - name: online_custom
            state: >
               {% set s = as_timestamp (now()) | int -as_timestamp(states('sensor.online')) | int %}
               {{ '{:d} дн. {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}      
      
```


:ballot_box_with_check: Код Template сенсора `sensor.server_telemetry` - уровень отказа    

```yaml
    template:
    
      - sensor:
      
          - name: server_telemetry
            state: >
                {% set light = (states('sensor.count_light_unavailable') | int) *20 %} 
                {% set switch = (states('sensor.count_switch_unavailable') | int) *20 %}
                {% set sensor = (states('sensor.count_sensor_unavailable') | int) *5 %}
                {% set binary_sensor = (states('sensor.count_binary_sensor_unavailable') | int) *5 %}
                {{light + switch + sensor + binary_sensor}}      
      

```


:ballot_box_with_check: Код Rest сенсора, который получает данные из `sensor.server_telemetry`    


```yaml

         - platform: rest
           resource: http://192.168.0.61:8123/api/states/sensor.server_telemetry
           name: reserve_telemetry
           force_update: true
           headers: 
             Authorization: !secret reserve_secret_token
             content-type: 'application/json'
           value_template: '{{ value_json.state }}'
      
```

:ballot_box_with_check: Автоматизация резервного сервера    


```yaml

    automation:
    
      - id: Переключение режима работы
        alias: main_control
        initial_state: true
        trigger:
    # Сенсор состояния основного сервера
        - platform: state
          entity_id: sensor.main_telemetry
        condition:
    # Режима работы сервера выключен
        - condition: state
          entity_id: switch.control_mode
          state: 'off'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: sensor.main_telemetry
                    state: 'unavailable'
                sequence:
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                        - !secret chat_id_group_tech
                      message: |
                         *Луиджи нас покинул. Время события {{ states('sensor.time_date') }} *
                         *Джованни теперь главный*
                  - service: switch.turn_on
                    entity_id: switch.control_mode
    
              - conditions:
                  - condition: template
                    value_template: "{{ (states('sensor.main_telemetry')|int) >= 100 }}"
                  - condition: template
                    value_template: "{{ (states('sensor.server_telemetry')|int) < (states('sensor.main_telemetry')|int) }}"
                sequence:
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                        - !secret chat_id_group_tech
                      message: |
                         *У Луиджи проблемы, уровень сбоя {{ states('sensor.main_telemetry') }} время события {{ states('sensor.time_date') }} *
                         *Джованни немного порулит системой*
                  - service: switch.turn_on
                    entity_id: switch.control_mode

```

:ballot_box_with_check: Автоматизации основного сервера    

```yaml

    automation:
    
      - id: Возврат режима работы
        alias: main_control
        initial_state: true
        trigger:
    # Сенсор состояния основного сервера
        - platform: state
          entity_id: sensor.server_telemetry
    # Сенсор состояния резервного сервера
        - platform: state
          entity_id: sensor.reserve_telemetry
          to: 'unavailable'  
        condition:
    # Режима работы сервера выключен
        - condition: state
          entity_id: switch.control_mode
          state: 'off'
        - condition: template
          value_template: "{{ (states('sensor.server_telemetry')|int) < 100 }}"
        - condition: template
          value_template: "{{ (states('sensor.server_telemetry')|int) <= (states('sensor.reserve_telemetry')|int) }}"
        action:
        - service: telegram_bot.send_message
          data_template:
            target:
              - !secret chat_id_group_tech
            message: |
               *Луиджи возвращает себе управление в {{ states('sensor.time_date') }} *
        - service: switch.turn_on
          entity_id: switch.control_mode
    
      - id: Уведомление о сбое резервного сервера
        alias: reserve_notification
        initial_state: true
        trigger:
        - platform: state
          entity_id: sensor.reserve_telemetry
          to: 'unavailable'      
        condition:
    # Режима работы сервера выключен
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
        action:
        - service: telegram_bot.send_message
          data_template:
            target:
              - !secret chat_id_group_tech
            message: |
               *Джованни покинул нас в {{ states('sensor.time_date') }} *
               *Контроль у Луиджи*
               
      
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


