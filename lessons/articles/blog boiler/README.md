### [Блог. Home Assistant - Автоматизация работы бойлера, передача параметров на резервный сервер](https://youtu.be/3yAJ-4mT5vk)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Карточка таймера [Flipdown Timer Card](https://github.com/pmongloid/flipdown-timer-card) - есть в HACS    

:ballot_box_with_check: Пакадж автоматизации бойлера без синхронизации данных с резервным сервером    

```yaml
kn_boiler:

    recorder:
      include:
        entities:
           - switch.0x00158d0001d35bc0
           - sensor.0x00158d0001d35bc0_power
           
    homeassistant:
      customize:
        
        switch.0x00158d0001d35bc0:
          friendly_name: Бойлер кухня, питание
          icon: mdi:power-plug
        sensor.0x00158d0001d35bc0_power:
          friendly_name: Бойлер кухня
          unit_of_measurement: Вт
          device_class: power


    mqtt:
      binary_sensor:
        - name: kn_boiler_mode
          state_topic: "states/water_heater_kn"
          
    switch:
    
      - platform: template
        switches:

          kn_boiler_mode:
            friendly_name: "Режим нагрева бойлера кухня"
            value_template: "{{ is_state('binary_sensor.kn_boiler_mode', 'on') }}"
            turn_on:
              service: mqtt.publish
              data_template:
                topic: "states/water_heater_kn"
                payload_template: 'ON'
                retain: true 
            turn_off:
              service: mqtt.publish
              data_template:
                topic: "states/water_heater_kn"
                payload_template: 'OFF'
                retain: true 
            icon_template: >-
              {% if is_state('switch.kn_boiler_mode', 'on') %}
                mdi:water-boiler
              {% else %}
                mdi:water-boiler-off
              {% endif %}
        
    input_datetime:
      kn_boiler_1:
        name: Бойлер кухня - 1 период
        has_date: false
        has_time: true
        
      kn_boiler_2:
        name: Бойлер кухня - 2 период
        has_date: false
        has_time: true

      kn_boiler_3:
        name: Бойлер кухня - 3 период
        has_date: false
        has_time: true
        
      kn_boiler_timer:
        name: Бойлер кухня - длительность работы
        has_date: false
        has_time: true
        
        
    timer:

        kn_boiler:
          name: Кухня бойлер - 
          restore: true        
        
        
    automation:

      - id: Включение бойлера кухня
        alias: kn_boiler_on
        initial_state: true
        trigger:    
         - platform: time
           at: input_datetime.kn_boiler_1
         - platform: time
           at: input_datetime.kn_boiler_2
         - platform: time
           at: input_datetime.kn_boiler_3
        condition:
         - condition: state
           entity_id: switch.0x00158d0001d35bc0
           state: 'off'
         - condition: state
           entity_id: binary_sensor.kn_boiler_mode
           state: 'on'
         - condition: state
           entity_id: switch.control_mode
           state: 'on'
        action:
         - service: switch.turn_on
           entity_id: switch.0x00158d0001d35bc0  
           
      - id: Проверка корректности включения бойлера кухня
        alias: kn_boiler_impossible
        initial_state: true
        trigger:
         - platform: state
           entity_id: switch.0x00158d0001d35bc0
           from: 'off'    
           to: 'on'
        condition:
         - condition: state
           entity_id: switch.control_mode
           state: 'on'
        action:
            - choose:
    # Разрешенное включение
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.kn_boiler_mode
                    state: 'on'
                sequence:
                  - service: timer.start
                    entity_id: timer.kn_boiler
                    data_template: 
                        duration: >
                              {{strptime(states("input_datetime.kn_boiler_timer"), "%H:%M:%S").time()}}
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                          - !secret chat_id_group_tech
                      message: | 
                          {{"\U00002714"}} Включение бойлера на кухне. Время события - {{ states.sensor.time_date.state }}
    # Случайное включение
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.kn_boiler_mode
                    state: 'off'
                sequence:
                  - service: switch.turn_off
                    entity_id: switch.0x00158d0001d35bc0
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                         - !secret chat_id_group_tech
                      message: | 
                          {{"\U0001F6AB"}} Включение бойлера на кухне невозможно, отключен режим нагрева воды. Время события - {{ states.sensor.time_date.state }}

        
      - id: Выключение бойлера кухня
        alias: kn_boiler_off
        initial_state: true
        trigger:    
         - platform: event
           event_type: timer.finished
           event_data:
             entity_id: timer.kn_boiler
        condition:
         - condition: state
           entity_id: switch.0x00158d0001d35bc0
           state: 'on'
         - condition: state
           entity_id: switch.control_mode
           state: 'on'
        action:
         - service: switch.turn_off
           entity_id: switch.0x00158d0001d35bc0        
        
      - id: Уведомление при выключении бойлера на кухне
        alias: kn_boiler_notify_off
        initial_state: true
        trigger:
         - platform: state
           entity_id: switch.0x00158d0001d35bc0
           from: 'on'
           to: 'off'
        condition:
         - condition: state
           entity_id: switch.control_mode
           state: 'on'
         - condition: state
           entity_id: binary_sensor.kn_boiler_mode
           state: 'on'
        action:
         - service: timer.cancel
           entity_id: timer.kn_boiler
         - service: telegram_bot.send_message
           data_template:
             target:
                 - !secret chat_id_group_tech
             message: | 
                  {{"\U00002716"}} Выключение бойлера на кухне. Время события - {{ states.sensor.time_date.state }}        
      

```

:ballot_box_with_check: Пакадж автоматизации бойлера с синхронизацией данных    

```yaml
kn_boiler:

    recorder:
      include:
        entities:
           - switch.0x00158d0001d35bc0
           - sensor.0x00158d0001d35bc0_power
           
    homeassistant:
      customize:
        
        switch.0x00158d0001d35bc0:
          friendly_name: Бойлер кухня, питание
          icon: mdi:power-plug
        sensor.0x00158d0001d35bc0_power:
          friendly_name: Бойлер кухня
          unit_of_measurement: Вт
          device_class: power


    mqtt:
      binary_sensor:
        - name: kn_boiler_mode
          state_topic: "states/water_heater_kn"

      sensor:
        - name: kn_boiler_1_on_mqtt
          state_topic: "states/period/kn_boiler_1"

        - name: kn_boiler_2_on_mqtt
          state_topic: "states/period/kn_boiler_2"

        - name: kn_boiler_3_on_mqtt
          state_topic: "states/period/kn_boiler_3"

        - name: kn_boiler_timer_on_mqtt
          state_topic: "states/timer/kn_boiler"
          
    switch:
    
      - platform: template
        switches:

          kn_boiler_mode:
            friendly_name: "Режим нагрева бойлера кухня"
            value_template: "{{ is_state('binary_sensor.kn_boiler_mode', 'on') }}"
            turn_on:
              service: mqtt.publish
              data_template:
                topic: "states/water_heater_kn"
                payload_template: 'ON'
                retain: true 
            turn_off:
              service: mqtt.publish
              data_template:
                topic: "states/water_heater_kn"
                payload_template: 'OFF'
                retain: true 
            icon_template: >-
              {% if is_state('switch.kn_boiler_mode', 'on') %}
                mdi:water-boiler
              {% else %}
                mdi:water-boiler-off
              {% endif %}
        
    input_datetime:
      kn_boiler_1:
        name: Бойлер кухня - 1 период
        has_date: false
        has_time: true
        
      kn_boiler_2:
        name: Бойлер кухня - 2 период
        has_date: false
        has_time: true

      kn_boiler_3:
        name: Бойлер кухня - 3 период
        has_date: false
        has_time: true
        
      kn_boiler_timer:
        name: Бойлер кухня - длительность работы
        has_date: false
        has_time: true
        
        
    timer:

        kn_boiler:
          name: Кухня бойлер - 
          restore: true        
        
        
    automation:

      - id: Включение бойлера кухня
        alias: kn_boiler_on
        initial_state: true
        trigger:    
         - platform: time
           at: input_datetime.kn_boiler_1
         - platform: time
           at: input_datetime.kn_boiler_2
         - platform: time
           at: input_datetime.kn_boiler_3
        condition:
         - condition: state
           entity_id: switch.0x00158d0001d35bc0
           state: 'off'
         - condition: state
           entity_id: binary_sensor.kn_boiler_mode
           state: 'on'
         - condition: state
           entity_id: switch.control_mode
           state: 'on'
        action:
         - service: switch.turn_on
           entity_id: switch.0x00158d0001d35bc0  
           
      - id: Проверка корректности включения бойлера кухня
        alias: kn_boiler_impossible
        initial_state: true
        trigger:
         - platform: state
           entity_id: switch.0x00158d0001d35bc0
           from: 'off'    
           to: 'on'
        condition:
         - condition: state
           entity_id: switch.control_mode
           state: 'on'
        action:
            - choose:
    # Разрешенное включение
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.kn_boiler_mode
                    state: 'on'
                sequence:
                  - service: timer.start
                    entity_id: timer.kn_boiler
                    data_template: 
                        duration: >
                              {{strptime(states("input_datetime.kn_boiler_timer"), "%H:%M:%S").time()}}
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                          - !secret chat_id_group_tech
                      message: | 
                          {{"\U00002714"}} Включение бойлера на кухне. Время события - {{ states.sensor.time_date.state }}
    # Случайное включение
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.kn_boiler_mode
                    state: 'off'
                sequence:
                  - service: switch.turn_off
                    entity_id: switch.0x00158d0001d35bc0
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                         - !secret chat_id_group_tech
                      message: | 
                          {{"\U0001F6AB"}} Включение бойлера на кухне невозможно, отключен режим нагрева воды. Время события - {{ states.sensor.time_date.state }}

        
      - id: Выключение бойлера кухня
        alias: kn_boiler_off
        initial_state: true
        trigger:    
         - platform: event
           event_type: timer.finished
           event_data:
             entity_id: timer.kn_boiler
        condition:
         - condition: state
           entity_id: switch.0x00158d0001d35bc0
           state: 'on'
         - condition: state
           entity_id: switch.control_mode
           state: 'on'
        action:
         - service: switch.turn_off
           entity_id: switch.0x00158d0001d35bc0        
        
      - id: Уведомление при выключении бойлера на кухне
        alias: kn_boiler_notify_off
        initial_state: true
        trigger:
         - platform: state
           entity_id: switch.0x00158d0001d35bc0
           from: 'on'
           to: 'off'
        condition:
         - condition: state
           entity_id: switch.control_mode
           state: 'on'
         - condition: state
           entity_id: binary_sensor.kn_boiler_mode
           state: 'on'
        action:
         - service: timer.cancel
           entity_id: timer.kn_boiler
         - service: telegram_bot.send_message
           data_template:
             target:
                 - !secret chat_id_group_tech
             message: | 
                  {{"\U00002716"}} Выключение бойлера на кухне. Время события - {{ states.sensor.time_date.state }}        
        
      - id: Дублирование таймера кухня на резервном сервере
        alias: kn_boiler_timer_double
        initial_state: true
        trigger:
         - platform: state
           entity_id: switch.0x00158d0001d35bc0
           from: 'on'
           to: 'off'
         - platform: state
           entity_id: switch.0x00158d0001d35bc0
           from: 'off'
           to: 'on'
        condition:
    # Работает на выключенном сервере!!!
         - condition: state
           entity_id: switch.control_mode
           state: 'off'
        action:
            - choose:
    # Выключение таймера
              - conditions:
                  - condition: state
                    entity_id: switch.0x00158d0001d35bc0
                    state: 'on'
                sequence:
                  - service: timer.start
                    entity_id: timer.kn_boiler
                    data_template: 
                        duration: >
                              {{strptime(states("input_datetime.kn_boiler_timer"), "%H:%M:%S").time()}}   

      - id: Сохранение периода 1 бойлера в кухне в mqtt
        alias: kn_boiler_1_on_mqtt
        initial_state: true
        trigger:    
         - platform: state
           entity_id: input_datetime.kn_boiler_1
        action:
            - choose:
    # Сервер активен
              - conditions:
                  - condition: state
                    entity_id: switch.control_mode
                    state: 'on'
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/period/kn_boiler_1"
                      payload_template: "{{states('input_datetime.kn_boiler_1')}}"
                      retain: true 
    # Сервер неактивен
              - conditions:
                  - condition: state
                    entity_id: switch.control_mode
                    state: 'off'
                sequence:
                  - service: input_datetime.set_datetime
                    target:
                     entity_id: input_datetime.kn_boiler_1
                    data:
                      time: "{{states('sensor.kn_boiler_1_on_mqtt')}}"

      - id: Синхронизация периода 1 бойлера в кухне с mqtt
        alias: kn_boiler_1_on_mqtt
        initial_state: true
        trigger:    
        - platform: state
          entity_id: sensor.kn_boiler_1_on_mqtt
        condition:
          - condition: template
            value_template: "{{states('input_datetime.kn_boiler_1') != states('sensor.kn_boiler_1_on_mqtt')}}"
        action:
          - service: input_datetime.set_datetime
            target:
             entity_id: input_datetime.kn_boiler_1
            data:
              time: "{{states('sensor.kn_boiler_1_on_mqtt')}}"
              
      - id: Сохранение периода 2 бойлера в кухне в mqtt
        alias: kn_boiler_2_on_mqtt
        initial_state: true
        trigger:    
         - platform: state
           entity_id: input_datetime.kn_boiler_2
        action:
            - choose:
    # Сервер активен
              - conditions:
                  - condition: state
                    entity_id: switch.control_mode
                    state: 'on'
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/period/kn_boiler_2"
                      payload_template: "{{states('input_datetime.kn_boiler_2')}}"
                      retain: true 
    # Сервер неактивен
              - conditions:
                  - condition: state
                    entity_id: switch.control_mode
                    state: 'off'
                sequence:
                  - service: input_datetime.set_datetime
                    target:
                     entity_id: input_datetime.kn_boiler_2
                    data:
                      time: "{{states('sensor.kn_boiler_2_on_mqtt')}}"

      - id: Синхронизация периода 2 бойлера в кухне с mqtt
        alias: kn_boiler_2_on_mqtt
        initial_state: true
        trigger:    
        - platform: state
          entity_id: sensor.kn_boiler_2_on_mqtt
        condition:
          - condition: template
            value_template: "{{states('input_datetime.kn_boiler_2') != states('sensor.kn_boiler_2_on_mqtt')}}"
        action:
          - service: input_datetime.set_datetime
            target:
             entity_id: input_datetime.kn_boiler_2
            data:
              time: "{{states('sensor.kn_boiler_2_on_mqtt')}}"
              
      - id: Сохранение периода 3 бойлера в кухне в mqtt
        alias: kn_boiler_3_on_mqtt
        initial_state: true
        trigger:    
         - platform: state
           entity_id: input_datetime.kn_boiler_3
        action:
            - choose:
    # Сервер активен
              - conditions:
                  - condition: state
                    entity_id: switch.control_mode
                    state: 'on'
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/period/kn_boiler_3"
                      payload_template: "{{states('input_datetime.kn_boiler_3')}}"
                      retain: true 
    # Сервер неактивен
              - conditions:
                  - condition: state
                    entity_id: switch.control_mode
                    state: 'off'
                sequence:
                  - service: input_datetime.set_datetime
                    target:
                     entity_id: input_datetime.kn_boiler_3
                    data:
                      time: "{{states('sensor.kn_boiler_3_on_mqtt')}}"

      - id: Синхронизация периода 3 бойлера в кухне с mqtt
        alias: kn_boiler_3_on_mqtt
        initial_state: true
        trigger:    
        - platform: state
          entity_id: sensor.kn_boiler_3_on_mqtt
        condition:
          - condition: template
            value_template: "{{states('input_datetime.kn_boiler_3') != states('sensor.kn_boiler_3_on_mqtt')}}"
        action:
          - service: input_datetime.set_datetime
            target:
             entity_id: input_datetime.kn_boiler_3
            data:
              time: "{{states('sensor.kn_boiler_3_on_mqtt')}}"
              
      - id: Сохранение таймера бойлера в кухне в mqtt
        alias: kn_boiler_timer_on_mqtt
        initial_state: true
        trigger:    
         - platform: state
           entity_id: input_datetime.kn_boiler_timer
        action:
            - choose:
    # Сервер активен
              - conditions:
                  - condition: state
                    entity_id: switch.control_mode
                    state: 'on'
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/timer/kn_boiler"
                      payload_template: "{{states('input_datetime.kn_boiler_timer')}}"
                      retain: true 
    # Сервер неактивен
              - conditions:
                  - condition: state
                    entity_id: switch.control_mode
                    state: 'off'
                sequence:
                  - service: input_datetime.set_datetime
                    target:
                     entity_id: input_datetime.kn_boiler_timer
                    data:
                      time: "{{states('sensor.kn_boiler_timer_on_mqtt')}}"

      - id: Синхронизация таймера бойлера в кухне с mqtt
        alias: kn_boiler_timer_on_mqtt
        initial_state: true
        trigger:    
        - platform: state
          entity_id: sensor.kn_boiler_timer_on_mqtt
        condition:
          - condition: template
            value_template: "{{states('input_datetime.kn_boiler_timer') != states('sensor.kn_boiler_timer_on_mqtt')}}"
        action:
          - service: input_datetime.set_datetime
            target:
             entity_id: input_datetime.kn_boiler_timer
            data:
              time: "{{states('sensor.kn_boiler_timer_on_mqtt')}}"							  
        
        

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