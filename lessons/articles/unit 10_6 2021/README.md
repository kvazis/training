### [Home Assistant. Урок 10.6 Практические кейсы - увлажнение воздуха в помещении](https://youtu.be/MPtem0rtt0o)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Пакадж показанный в видео

```yaml
unit_10_6:

# Увлажнитель воздуха с механическим управлением

    binary_sensor:
    
    # Режим увлажнения  
      - platform: mqtt
        name: humidity_mode
        state_topic: "humidity/mode"
        payload_on: "ON"
        payload_off: "OFF"

    # Время увлажнения  
      - platform: tod
        name: humidity_time
        after: '09:00'
        before: '22:00'
        
      - platform: template
        sensors:
        
          room_windows:
            friendly_name: "Окна в комнате"
            device_class: window
            delay_on:
                seconds: 30
            value_template: >-
              {{ is_state('binary_sensor.0x00158d000445206b_contact', 'on') 
              or is_state('binary_sensor.0xec1bbdfffedf6a6a_contact', 'on')  }}
            icon_template: >-
              {% if is_state('binary_sensor.room_windows', 'on') %}
                mdi:window-open-variant
              {% else %}
                mdi:window-closed-variant
              {% endif %}        

          humidity:
            friendly_name: "Увлажнение"
            value_template: >-
              {{ is_state('binary_sensor.room_windows', 'off')  
                 and is_state('binary_sensor.humidity_mode', 'on')
                 and is_state('binary_sensor.humidity_time', 'on') }}
            icon_template: >-
              {% if is_state("binary_sensor.humidity", "on") %}
              mdi:water-percent
              {% else %}
              mdi:air-humidifier
              {% endif %}

    input_number:

          humidity_level:
            name: Установка уровня влажности
            initial: 50
            min: 30
            max: 70
            step: 1

    switch:
    
      - platform: template
        switches:
          humidity_mode:
            friendly_name: "Режим увлажнения воздуха"
            value_template: "{{  is_state('binary_sensor.humidity_mode', 'on') }}"
            turn_on:
              service: mqtt.publish
              data_template:
                topic: "humidity/mode"
                payload_template: 'ON'
                retain: true 
            turn_off:
              service: mqtt.publish
              data_template:
                topic: "humidity/mode"
                payload_template: 'OFF'
                retain: true 
            icon_template: >-
              {% if is_state("switch.humidity_mode", "on") %}
              mdi:air-humidifier
              {% else %}
              mdi:air-humidifier-off
              {% endif %}
              
    automation:
            
        - alias: humidity
          id: 'Работа увлажнителя'
          initial_state: true
          trigger:
            - platform: homeassistant
              event: start
            - platform: state
              entity_id:
                - input_number.humidity_level
                - sensor.0x00158d0001dcd47e_humidity
                - binary_sensor.humidity              
          action:
            service_template: >-
              {% set hi = (states('input_number.humidity_level') | float) + 5 %}
              {% set lo = (states('input_number.humidity_level') | float) - 5 %}
              {% set humidity = states('sensor.0x00158d0001dcd47e_humidity') | float %}
              {% if humidity > hi %}
                switch.turn_off
              {% elif states.binary_sensor.humidity.state == 'off' %} 
                switch.turn_off
              {% elif humidity < lo and states.binary_sensor.humidity.state == 'on' %}
                switch.turn_on
              {% else %}
                switch.turn_{{states('switch.0x60a423fffe7ff8c8_switch') | lower}}
              {% endif %}
            entity_id: switch.0x60a423fffe7ff8c8_switch
            
            
        - alias: water_warning
          id: 'Предупреждение о недостатке воды'
          initial_state: true
          trigger:
        ## Падение мощности менее 10 Ватт
           - platform: numeric_state
             entity_id: sensor.0x60a423fffe7ff8c8_power
             below: 10
             for:
               minutes: 2
          condition:
        ## Увлажнитель включен
             - condition: state
               entity_id: switch.0x60a423fffe7ff8c8_switch
               state: 'on'
          action:
            - service: telegram_bot.send_message
              data_template:
                target:
                    - !secret chat_id_group
                message: | 
                     {{"\U0001F6B1"}} Закончилась вода в увлажнителе или он выключен вручную {{ states('sensor.time_date') }} 
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