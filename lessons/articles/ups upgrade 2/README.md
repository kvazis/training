### [Модернизация ИБП APC 650, часть 2 - установка LiFePo4 аккумулятора, обновление логики](https://youtu.be/7ekRAkPX7PQ)

#### Пакадж из видео:    

```yaml

lr_ups_1:

    recorder:
      include:
        entities:
          - sensor.0xa4c1382dc9fecb3e_power
          - sensor.0xa4c1382dc9fecb3e_voltage
          - sensor.0xa4c13850763b90bf_power
          - sensor.0xa4c13850763b90bf_voltage
          - sensor.lr_ups_1_load            

    homeassistant:
      customize:
      
        switch.0xa4c1382dc9fecb3e:
          friendly_name: Гостиная UPS 1 in
          icon: phu:apc-ups-upright
        sensor.0xa4c1382dc9fecb3e_power:
          friendly_name: Гостиная UPS 1 in, мощность
          unit_of_measurement: Вт
          device_class: power
        sensor.0xa4c1382dc9fecb3e_voltage:
          friendly_name: Гостиная UPS 1 in, напряжение
        sensor.0xa4c1382dc9fecb3e_energy:
          friendly_name: Гостиная UPS 1 in, энергия
          icon: mdi:chart-line
          
        switch.0xa4c13850763b90bf:
          friendly_name: Гостиная UPS 1 out
          icon: phu:apc-ups-upright
        sensor.0xa4c13850763b90bf_power:
          friendly_name: Гостиная UPS 1 out, мощность
          unit_of_measurement: Вт
          device_class: power
        sensor.0xa4c13850763b90bf_voltage:
          friendly_name: Гостиная UPS 1 out, напряжение
        sensor.0xa4c13850763b90bf_energy:
          friendly_name: Гостиная UPS 1 out, энергия
          icon: mdi:chart-line
          
        sensor.lr_ups_1_load:
          friendly_name: Гостиная UPS 1 потребление
          icon: phu:apc-ups-upright

        sensor.lr_ups_1_power:
          friendly_name: Гостиная UPS 1 отдано энергии
          unit_of_measurement: Вт ч
          
        binary_sensor.lr_ups_1_charging:
          friendly_name: Гостиная UPS 1 зарядка

    input_datetime:
      lr_ups_1_test_start:
        name: Начало тестирования UPS 1
        has_date: true
        has_time: true
        
      lr_ups_1_test_stop:
        name: Завершение тестирования UPS 1
        has_date: true
        has_time: true
        
      lr_ups_1_charging_start:
        name: Начало зарядки UPS 1
        has_date: true
        has_time: true
        
      lr_ups_1_charging_stop:
        name: Завершение зарядки UPS 1
        has_date: true
        has_time: true

    mqtt:
      binary_sensor:
        - name: lr_ups_1_test
          state_topic: "states/lr_ups_1_test"
          
      sensor:
        - name: lr_ups_1_power
          state_topic: "states/lr_ups_1_power"

    switch:
    
      - platform: template
        switches:

          lr_ups_1_test:
            friendly_name: "Гостиная, UPS 1 тест"
            value_template: "{{ is_state('binary_sensor.lr_ups_1_test', 'on') }}"
            turn_on:
              service: mqtt.publish
              data_template:
                topic: "states/lr_ups_1_test"
                payload_template: 'ON'
                retain: true 
            turn_off:
              service: mqtt.publish
              data_template:
                topic: "states/lr_ups_1_test"
                payload_template: 'OFF'
                retain: true 
            icon_template: >-
              {% if is_state('switch.lr_ups_1_test', 'on') %}
                mdi:mdi:home-battery-outline
              {% else %}
                mdi:home-lightning-bolt-outline
              {% endif %}


    template:
     
      - sensor:

          - name: lr_ups_1_load
            state: > 
                {% if states('sensor.0xa4c1382dc9fecb3e_power')|float(0) > states('sensor.0xa4c13850763b90bf_power')|float(0) %} 
                {{ states('sensor.0xa4c1382dc9fecb3e_power')|float(0) - states('sensor.0xa4c13850763b90bf_power')|float(0) }}
                {% else %}
                {{ 10 }}
                {% endif %}

      - binary_sensor:

          - name: lr_ups_1_power
            state: >
              {{ is_state('binary_sensor.electricity', 'on') 
                 or is_state('switch.lr_ups_1_test', 'on') 
              }}
              
          - name: lr_ups_1_charging
            state: >
              {{ states('sensor.lr_ups_1_load')|int > 14 }}
            delay_on: 00:00:30
            delay_off: 00:00:30
            device_class: battery_charging


    automation:


### Автовключение розетки в случае случайного отключения
      - alias: lr_ups1_turn_on
        id: lr_ups1_turn_on
        description: Гостиная автовключение ИБП 1
        initial_state: true
        trigger:
    # Выключение выключателя
        - platform: state
          entity_id: switch.0xa4c1382dc9fecb3e
          to: 'off'
        condition:
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
    # Переключатель тестового прогона
        - condition: state
          entity_id: switch.lr_ups_1_test
          state: 'off'
        action:
    # Включение
        - delay: 00:00:05
        - service: switch.turn_on
          entity_id: switch.0xa4c1382dc9fecb3e

### Сохранение энергии отданной ИБП

      - alias: lr_ups1_power_zero
        id: lr_ups1_power_zero
        description: Обнуление отданной энергии UPS 1
        initial_state: true
        trigger:
        - platform: state
          entity_id: binary_sensor.lr_ups_1_power
          from: 'off'
          to: 'on'
        condition:
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
        action:
        - service: mqtt.publish
          data_template:
            topic: "states/lr_ups_1_power"
            payload_template: "{{ 0.0 }}"
            retain: true 
                      
      - alias: lr_ups1_power_log
        id: lr_ups1_power_log
        description: Запись отданной энергии UPS 1
        initial_state: true
        trigger:
        - platform: time_pattern
          seconds: '/30'
        condition:
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
    # Сенсор электричества или теста
        - condition: state
          entity_id: binary_sensor.lr_ups_1_power
          state: 'on'
    # Сенсор электрики на выходе из UPS
        - condition: state
          entity_id: binary_sensor.0xa4c138135e284964_contact
          state: 'off'
        action:
        - service: mqtt.publish
          data_template:
            topic: "states/lr_ups_1_power"
            payload_template: "{{(states('sensor.lr_ups_1_power') | float + ((states('sensor.0xa4c13850763b90bf_power') | float + 10 )/120))|round(5) }}"
            retain: true 

### Уведомления о работе 

      - alias: lr_ups1_power_notification
        id: lr_ups1_power_notification
        description: Уведомление о результате работы UPS 1
        initial_state: true
        trigger:
    # Отключение сенсора питания UPS
        - platform: state
          entity_id: binary_sensor.0xa4c138135e284964_contact
          from: 'off'
          to: 'on'
    # Восстановление подачи питания
        - platform: state
          entity_id: binary_sensor.electricity
          from: 'on'
          to: 'off'
        condition:
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
    # Переключатель тестового прогона
        - condition: state
          entity_id: switch.lr_ups_1_test
          state: 'off'
        action:
            - choose:
              - conditions:
    # Отключен сенсор питания UPS
                  - condition: state
                    entity_id: binary_sensor.0xa4c138135e284964_contact
                    state: 'on'
    # Отключен сенсор электрики
                  - condition: state
                    entity_id: binary_sensor.electricity
                    state: 'on'
                sequence:
                  - delay: 00:00:02
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                          - !secret chat_id_group_tech
                      message: | 
                           {{"\U000026A1"}} UPS 1 отключился
                           {{"\U0001F559"}} В {{ states('sensor.time_date') }} 
                           {% set s = (as_timestamp(now()) | round(default=0)- strptime(states("input_datetime.electricity_off"), "%Y-%m-%d %H:%M:%S").timestamp() | int) %}
                           {{"\U0000231B"}} {{ 'UPS 1 продержал - {:02d}:{:02d}:{:02d}'.format ( s % 86400 // 3600, s % 3600 // 60, s % 60) }}
                           {{"\U0001F50B"}} Отдано {{ states('sensor.lr_ups_1_power') }} Ватт часов энергии, {{ ((states('sensor.lr_ups_1_power') | float / 194)*100) | round(3)}} % от номинальной емкости
              - conditions:
    # Включен сенсор питания UPS
                  - condition: state
                    entity_id: binary_sensor.0xa4c138135e284964_contact
                    state: 'off'
    # Включен сенсор электрики
                  - condition: state
                    entity_id: binary_sensor.electricity
                    state: 'off'
                sequence:
                  - delay: 00:00:02
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                          - !secret chat_id_group_tech
                      message: | 
                           {{"\U000026A1"}} Питание на UPS 1 восстановлено
                           {{"\U0001F559"}} В {{ states('sensor.time_date') }} 
                           {% set s = (as_timestamp(now()) | round(default=0)- strptime(states("input_datetime.electricity_off"), "%Y-%m-%d %H:%M:%S").timestamp() | int) %}
                           {{"\U0000231B"}} {{ 'UPS 1 продержал - {:02d}:{:02d}:{:02d}'.format ( s % 86400 // 3600, s % 3600 // 60, s % 60) }}
                           {{"\U0001F50B"}} Отдано {{ states('sensor.lr_ups_1_power') }} Ватт часов энергии, {{ ((states('sensor.lr_ups_1_power') | float / 194)*100) | round(3)}} % от номинальной емкости

### Тестирование

      - alias: lr_ups1_test_log
        id: lr_ups1_test_log
        description: Запись времени тестирования UPS 1
        initial_state: true
        trigger:
    # Сработка переключателя тестирования
        - platform: state
          entity_id: switch.lr_ups_1_test
          from: 'off'
          to: 'on'
        - platform: state
          entity_id: switch.lr_ups_1_test
          from: 'on'
          to: 'off'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: switch.lr_ups_1_test
                    state: 'on'
                sequence:        
                  - service: input_datetime.set_datetime
                    target:
                      entity_id: input_datetime.lr_ups_1_test_start
                    data:
                      datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
                  - service: switch.turn_off
                    entity_id: switch.0xa4c1382dc9fecb3e
              - conditions:
                  - condition: state
                    entity_id: switch.lr_ups_1_test
                    state: 'off'
                sequence:        
                  - service: input_datetime.set_datetime
                    target:
                      entity_id: input_datetime.lr_ups_1_test_stop
                    data:
                      datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
                  - service: switch.turn_on
                    entity_id: switch.0xa4c1382dc9fecb3e

      - alias: lr_ups1_finish_test
        id: lr_ups1_finish_test
        description: Завершнение теста UPS 1
        initial_state: true
        trigger:
    # Отключение сенсора питания UPS
        - platform: state
          entity_id: binary_sensor.0xa4c138135e284964_contact
          from: 'off'
          to: 'on'
    # Сработка сенсора электрики
        - platform: state
          entity_id: binary_sensor.electricity
          from: 'off'
          to: 'on'
        condition:
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
    # Переключатель тестового прогона
        - condition: state
          entity_id: switch.lr_ups_1_test
          state: 'on'
        action:
        - service: switch.turn_off
          entity_id: switch.lr_ups_1_test

      - alias: lr_ups1_test_notification
        id: lr_ups1_test_notification
        description: Уведомление о результате тестирования UPS 1
        initial_state: true
        trigger:
    # Сработка переключателя тестирования
        - platform: state
          entity_id: switch.lr_ups_1_test
          from: 'off'
          to: 'on'
        - platform: state
          entity_id: switch.lr_ups_1_test
          from: 'on'
          to: 'off'
        condition:
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
        - condition: state
          entity_id: binary_sensor.electricity
          state: 'off'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: switch.lr_ups_1_test
                    state: 'on'
                sequence:        
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                          - !secret chat_id_group_tech
                      message: | 
                           {{"\U000026A1"}} Запуск прогона UPS 1
                           {{"\U0001F559"}} В {{ states('sensor.time_date') }} 
              - conditions:
                  - condition: state
                    entity_id: switch.lr_ups_1_test
                    state: 'off'
                sequence:
                  - delay: 00:00:02
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                          - !secret chat_id_group_tech
                      message: | 
                           {{"\U000026A1"}} Завершение прогона UPS 1
                           {{"\U0001F559"}} В {{ states('sensor.time_date') }} 
                           {% set s = (strptime(states("input_datetime.lr_ups_1_test_stop"), "%Y-%m-%d %H:%M:%S").timestamp() | int - strptime(states("input_datetime.lr_ups_1_test_start"), "%Y-%m-%d %H:%M:%S").timestamp() | int) %}
                           {{"\U0000231B"}} {{ 'UPS 1 продержал - {:02d}:{:02d}:{:02d}'.format ( s % 86400 // 3600, s % 3600 // 60, s % 60) }}
                           {{"\U0001F50B"}} Отдано {{ states('sensor.lr_ups_1_power') }} Ватт часов энергии, {{ ((states('sensor.lr_ups_1_power') | float / 194)*100) | round(3)}} % от номинальной емкости
                           

      - alias: lr_ups1_charge_log
        id: lr_ups1_charge_log
        description: Запись времени зарядки UPS 1
        initial_state: true
        trigger:
    # Сработка сенсора зарядки
        - platform: state
          entity_id: binary_sensor.lr_ups_1_charging
          from: 'off'
          to: 'on'
        - platform: state
          entity_id: binary_sensor.lr_ups_1_charging
          from: 'on'
          to: 'off'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.lr_ups_1_charging
                    state: 'on'
                sequence:        
                  - service: input_datetime.set_datetime
                    target:
                      entity_id: input_datetime.lr_ups_1_charging_start
                    data:
                      datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.lr_ups_1_charging
                    state: 'off'
                #   - condition: template
                #     value_template: "{{ (states('sensor.lr_ups_1_load')|int) > 1 }}"
                sequence: 
                  - service: input_datetime.set_datetime
                    target:
                      entity_id: input_datetime.lr_ups_1_charging_stop
                    data:
                      datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"


      - alias: lr_ups1_charge_notification
        id: lr_ups1_charge_notification
        description: Уведомление о зарядке UPS 1
        initial_state: true
        trigger:
    # Сработка сенсора зарядки
        - platform: state
          entity_id: binary_sensor.lr_ups_1_charging
          from: 'off'
          to: 'on'
        - platform: state
          entity_id: binary_sensor.lr_ups_1_charging
          from: 'on'
          to: 'off'
        condition:
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.lr_ups_1_charging
                    state: 'on'
                sequence:        
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                          - !secret chat_id_group_tech
                      message: | 
                           {{"\U000026A1"}} UPS 1 - старт зарядки
                           {{"\U0001F559"}} В {{ states('sensor.time_date') }} 
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.lr_ups_1_charging
                    state: 'off'
                sequence: 
                  - delay: 00:00:02
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                          - !secret chat_id_group_tech
                      message: | 
                           {{"\U000026A1"}} UPS 1 - зарядки завершена
                           {{"\U0001F559"}} В {{ states('sensor.time_date') }}
                           {% set s = (strptime(states("input_datetime.lr_ups_1_charging_stop"), "%Y-%m-%d %H:%M:%S").timestamp() | int - strptime(states("input_datetime.lr_ups_1_charging_start"), "%Y-%m-%d %H:%M:%S").timestamp() | int) %}
                           {{"\U0000231B"}} {{ 'Зарядка продлилась - {:02d}:{:02d}:{:02d}'.format ( s % 86400 // 3600, s % 3600 // 60, s % 60) }}

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