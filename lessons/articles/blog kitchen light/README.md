### [Блог. Home Assistant. Пример организации управления освещением в помещении](https://youtu.be/Jog7RV3Wqfk)

#### Примеры кода из видео


```yaml
kn_light:

    homeassistant:
      customize:

        light.kn_ceiling_light:
          friendly_name: Кухня, люстра
          icon: mdi:ceiling-light
          
        light.gateway_light_7811dc64f4c8:
          friendly_name: Кухня шлюз
          icon: mdi:star-circle
          
        switch.0x54ef4410000f4741_right:
          friendly_name: Кухня, питание люстра
        switch.0x54ef4410000f4741_left:
          friendly_name: Кухня, реле слева
        sensor.0x54ef4410000f4741_action:
          friendly_name: Кухня, Aqara E1 на входе
          
        sensor.0x04cf8cdf3c794209_action:
          friendly_name: Кухня, Aqara Opple на входе
          
        sensor.0x04cf8cdf3c772379_illuminance_lux:
          friendly_name: Кухня, освещенность
        sensor.0x04cf8cdf3c772379_battery:
          friendly_name: Кухня, освещенность

        binary_sensor.0x00158d0001e16204_occupancy:
          friendly_name: Кухня, движение 1
        sensor.0x00158d0001e16204_battery:
          friendly_name: Кухня, движение 1

        binary_sensor.0x54ef441000118375_occupancy:
          friendly_name: Кухня, движение 2
        sensor.0x54ef441000118375_battery:
          friendly_name: Кухня, движение 2
          
        binary_sensor.kn_occupancy:
          friendly_name: Кухня, присутствие
          
        binary_sensor.kn_night:
          friendly_name: Кухня, ночной режим
          icon: mdi:weather-night

    template:

      - binary_sensor:

    # Сборный сенсор присутствия
          - name: kn_occupancy
            state: >
              {{ is_state('binary_sensor.0x00158d0001e16204_occupancy', 'on')  
                 or is_state('binary_sensor.0x54ef441000118375_occupancy', 'on')
                 or is_state('binary_sensor.kn_tv_work', 'on')
              }}
            delay_off: 
                minutes: 3
            device_class: occupancy
            icon: >
              {% if is_state("binary_sensor.kn_occupancy", "on") %}
              mdi:home-circle
              {% else %}
              mdi:home-circle-outline
              {% endif %}
              
    # Сенсор определения забытой люстры, включенной вручную
          - name: kn_ceiling_long_work
            state: >
              {{ is_state('binary_sensor.kn_occupancy', 'off')  
                 and is_state('input_boolean.kn_ceiling_light', 'on')
              }}
            delay_on: 
                minutes: 15
            device_class: light
            icon: >
              {% if is_state("binary_sensor.kn_ceiling_long_work", "on") %}
              mdi:lightbulb-on
              {% else %}
              mdi:lightbulb
              {% endif %}

    # Сенсор определяющий недоступность люстры
          - name: kn_ceiling_unavailable
            state: >
              {{ is_state('light.kn_ceiling_light', 'unavailable')  
              }}
            delay_on: 
                minutes: 5
            device_class: problem
            icon: >
              {% if is_state("binary_sensor.kn_ceiling_unavailable", "on") %}
              mdi:ceiling-light-outline
              {% else %}
              mdi:ceiling-light
              {% endif %}
          
    input_boolean:
    
    # Переключатель для определения того, что свет включен вручную
      kn_ceiling_light:
        name: Кухня ручное включение света
        icon: mdi:lightbulb-off-outline

    binary_sensor:

    # Интервал для пониженной яркости в ночное время 
      - platform: tod
        name: kn_night
        after: '23:00'
        before: '05:00'

    automation:

      - id: Кухня, перезагрузка зависшей люстры
        alias: kn_ceiling_reboot
        initial_state: true
        trigger:
    # Проверка раз в 5 минут, перезагрузка если люстра недоступна
        - platform: time_pattern
          minutes: '/5'
        condition:
    # Сенсор определяющий недоступность люстры
        - condition: state
          entity_id: binary_sensor.kn_ceiling_unavailable
          state: 'on'
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
        action:
    # Перезагрузка по питанию
        - service: switch.turn_off
          entity_id: switch.0x54ef4410000f4741_right
        - delay: 00:00:05
        - service: switch.turn_on
          entity_id: switch.0x54ef4410000f4741_right
          
      - id: Кухня, фиксация ручного включения люстры
        alias: kn_ceiling_manual_inpbool
        initial_state: true
        trigger:
    # Виртуальная кнопка для интерфейса
        - platform: state
          entity_id: input_button.kn_ceiling_light
    # Выключатель на входе в кухню - правая кнопка
        - platform: state
          entity_id: sensor.0x54ef4410000f4741_action
          to: 'single_right'
    # 6 клавишник на входе
        - platform: state
          entity_id: sensor.0x04cf8cdf3c794209_action
          to: 'button_1_single'
    # 4 клавишник на комоде
        - platform: state
          entity_id: sensor.0x04cf8cdf3c7942ca_action
          to: 'button_4_single'
        action:
    # Переключатель ручного управления
        - service: input_boolean.toggle
          target:
            entity_id: input_boolean.kn_ceiling_light
            
      - id: Кухня, ручное управление люстрой
        alias: kn_ceiling_manual_control
        initial_state: true
        trigger:
    # Переключатель ручного управления
        - platform: state
          entity_id: input_boolean.kn_ceiling_light
        condition:
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
        action:
            - choose:
    # Включение люстры
              - conditions:
                  - condition: state
                    entity_id: input_boolean.kn_ceiling_light
                    state: 'on'
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.kn_ceiling_light
                    data_template:
                      brightness_pct: 100
                      kelvin: 4000
    # Выключение люстры
              - conditions:
                  - condition: state
                    entity_id: input_boolean.kn_ceiling_light
                    state: 'off'
                sequence:
                  - service: light.turn_off
                    entity_id:
                      - light.kn_ceiling_light
                      
      - id: Кухня, контроль включения люстры
        alias: kn_ceiling_manual_control
        initial_state: true
        trigger:
    # Отслеживание включения люстры
        - platform: state
          entity_id: light.kn_ceiling_light
          to: 'on'
        condition:
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
    # Переключатель ручного управления выключен
        - condition: state
          entity_id: input_boolean.kn_ceiling_light
          state: 'off'
    # Сенсор присутствия выключен
        - condition: state
          entity_id: binary_sensor.kn_occupancy
          state: 'off'
        action:
    # Выключение люстры
        - service: light.turn_off
          entity_id:
            - light.kn_ceiling_light
            
      - id: Кухня, автоматическое включение освещения
        alias: kn_ceiling_auto_light_on
        initial_state: true
        trigger:
    # Сработка любого из сенсоров движения, они обновляются быстрее сенсора присутствия
        - platform: state
          entity_id: binary_sensor.0x00158d0001e16204_occupancy
          to: 'on'
          from: 'off'
        - platform: state
          entity_id: binary_sensor.0x54ef441000118375_occupancy
          to: 'on'
          from: 'off'
        condition:
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
    # Переключатель ручного управления выключен
        - condition: state
          entity_id: input_boolean.kn_ceiling_light
          state: 'off'
    # Уровень освещенности нниже 100
        - condition: numeric_state
          entity_id: sensor.0x04cf8cdf3c772379_illuminance_lux
          below: 100
        action:
            - choose:
    # Включение люстры в дневное время - проверка сенсора time of day
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.kn_night
                    state: 'off'
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.kn_ceiling_light
                    data_template:
                      brightness_pct: 70
                      kelvin: 3000
    # Включение люстры в ночное время - проверка сенсора time of day
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.kn_night
                    state: 'on'
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.kn_ceiling_light
                    data_template:
                      brightness_pct: 10
                      kelvin: 3000
             
      - id: Кухня, автоматическое выключение освещения
        alias: kn_ceiling_auto_light_off
        initial_state: true
        trigger:
    # Отключение сенсора присутствия
        - platform: state
          entity_id: binary_sensor.kn_occupancy
          to: 'off'
        condition:
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
    # Переключатель ручного управления выключен - люстра не была включена вручную
        - condition: state
          entity_id: input_boolean.kn_ceiling_light
          state: 'off'
    # Люстра работает
        - condition: state
          entity_id: light.kn_ceiling_light
          state: 'on'
        action:
    # Выключение люстры
        - service: light.turn_off
          entity_id: 
           - light.kn_ceiling_light
           
      - id: Кухня, альтернативное выключение освещения
        alias: kn_ceiling_alt_light_off
        initial_state: true
        trigger:
    # Сенсор определения забытой люстры
        - platform: state
          entity_id: binary_sensor.kn_ceiling_long_work
          to: 'on'
    # 6 клавишник на входе
        - platform: state
          entity_id: sensor.0x04cf8cdf3c794209_action
          to: 'button_1_double'
        condition:
    # Переключатель режима работы сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
        action:
    # Выключение люстры
        - service: light.turn_off
          entity_id: 
           - light.kn_ceiling_light

      - id: Кухня, синхронизация люстры и переключателя
        alias: kn_ceiling_input_boolean
        initial_state: true
        trigger:
    # Выключение люстры
        - platform: state
          entity_id: light.kn_ceiling_light
          to: 'off'
        condition:
    # Переключатель ручного управления
        - condition: state
          entity_id: input_boolean.kn_ceiling_light
          state: 'on'
        action:
    # Выключение переключателя ручного управления
        - service: input_boolean.turn_off
          target:
            entity_id: input_boolean.kn_ceiling_light
           


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