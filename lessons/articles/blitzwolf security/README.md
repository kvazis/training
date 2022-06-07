### [BlitzWolf BW-IS22 - Сигнализация, wi-fi + GSM,  Tuya Smart, интеграция и управление в Home Assistant](https://youtu.be/q8662SThzoQ)

#### Пакадж показанный в обзоре - описание data point и пример применения    

```yaml
tuya_security:

    localtuya:
      - host: !secret tuya_security_host
        device_id: !secret tuya_security_device_id
        local_key: !secret tuya_security_local_key
        friendly_name: Blitzwolf Security System
        protocol_version: '3.3'
        entities:
          - platform: sensor
            friendly_name: security_state
            id: 1
          - platform: sensor
            friendly_name: exit_delay
            id: 2
            unit_of_measurement: 'сек'
          - platform: sensor
            friendly_name: alarm_time
            id: 3
            unit_of_measurement: 'мин'
          - platform: binary_sensor
            friendly_name: sound
            id: 4


    input_select:               
               
      security_state:
        name: Режим сигнализации
        options:
          - disarmed
          - home
          - arm
          - sos
        initial: disarmed
        icon: mdi:shield-account
        
    input_number:
      exit_delay:
        name: Время задержки
        initial: 30
        min: 0
        max: 60
        step: 1
        unit_of_measurement: 'сек'
      alarm_time:
        name: Время тревоги
        initial: 3
        min: 1
        max: 10
        step: 1
        unit_of_measurement: 'мин'

    automation:               
               
    - id: Режим работы сигнализации
      alias: change_exit_delay
      initial_state: true
      trigger:
        - platform: state
          entity_id: input_select.security_state
      action:
        - service: localtuya.set_dp
          data:
           device_id: !secret tuya_security_device_id
           dp: 1
           value: "{{ states('input_select.security_state') }}"
           
    - id: Время задержки
      alias: change_security_state
      initial_state: true
      trigger:
        - platform: state
          entity_id: input_number.exit_delay
      action:
        - service: localtuya.set_dp
          data:
           device_id: !secret tuya_security_device_id
           dp: 2
           value: "{{ states('input_number.exit_delay')| int }}"
           
    - id: Время тревоги
      alias: change_alarm_time
      initial_state: true
      trigger:
        - platform: state
          entity_id: input_number.alarm_time
      action:
        - service: localtuya.set_dp
          data:
           device_id: !secret tuya_security_device_id
           dp: 3
           value: "{{ states('input_number.alarm_time')| int }}"

    switch:                   
      - platform: template
        switches:
          alarm_sound:
            friendly_name: "Звук тревоги"
            value_template: "{{  is_state('binary_sensor.sound', 'on') }}"
            turn_on:
              service: localtuya.set_dp
              data:
                device_id: !secret tuya_security_device_id
                dp: 4
                value: "{{true}}"
            turn_off:
              service: localtuya.set_dp
              data:
                device_id: !secret tuya_security_device_id
                dp: 4
                value: "{{false}}"
            icon_template: >-
              {% if is_state('switch.alarm_sound', 'on') %}
                mdi:volume-high
              {% else %}
                mdi:volume-off
              {% endif %}        
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