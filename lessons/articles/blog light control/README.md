* [Блог. Home Assistant - контроль включения светильников после восстановления питания](https://youtu.be/Ib7lZYB35E8)

# Примеры кода из обзора 

# Метод 1 - отработка по состоянию unavailable


```yaml

    input_boolean:
      yeelight_color_0x531e4b4:
        name: unavailable
        icon: mdi:lightbulb-off-outline
            
    automation:

      - id: Фиксация сбоя электропитания
        alias: light_unavailable_fixed
        initial_state: true
        trigger:
        - platform: state
          entity_id: light.yeelight_color_0x531e4b4
          to: 'unavailable'
        action:
        - service: input_boolean.turn_on
          target:
            entity_id: input_boolean.yeelight_color_0x531e4b4

      - id: Отключение лампочки после сбоя электропитания
        alias: light_unavailable_auto_off
        initial_state: true
        trigger:
        - platform: state
          entity_id: light.yeelight_color_0x531e4b4
          to: 'on'
        condition:
        - condition: state
          entity_id: input_boolean.yeelight_color_0x531e4b4
          state: 'on'
        action:
        - service: light.turn_off
          entity_id: light.yeelight_color_0x531e4b4
        - service: input_boolean.turn_off
          target:
            entity_id: input_boolean.yeelight_color_0x531e4b4
            
      - id: Управление лампочкой
        alias: light_manual_control
        initial_state: true
        trigger:
    # Выключатель
        - platform: state
          entity_id: sensor.0x00158d0001718ca8_action
          to: 'single_left'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: light.yeelight_color_0x531e4b4
                    state: 'off'
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.yeelight_color_0x531e4b4
                    data_template:
                      brightness_pct: 100
                      kelvin: 4000
              - conditions:
                  - condition: state
                    entity_id: light.yeelight_color_0x531e4b4
                    state: 'on'
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.yeelight_color_0x531e4b4
                    data_template:
                      brightness_pct: 1
                      kelvin: 2700
                  - service: light.turn_off
                    entity_id:
                      - light.yeelight_color_0x531e4b4
```

# Метод 2 - отработка правомерности включения светильника


```yaml

    template:
     
      - binary_sensor:

          - name: 0x54ef44100035a3eb_control
            state: >
              {{ is_state('sensor.0x00158d0001718ca8_action', 'single_left')  
                 or is_state('sensor.0x00158d0002af829b_action', 'single')
              }}
            delay_off: 00:00:03

    automation:
    
      - id: Управление лампочкой версия 2
        alias: light_manual_control_2
        initial_state: true
        trigger:
    # Сенсор включения
        - platform: state
          entity_id: binary_sensor.0x54ef44100035a3eb_control
          to: 'on'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: light.0x54ef44100035a3eb
                    state: 'off'
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.0x54ef44100035a3eb
                    data_template:
                      brightness_pct: 100
                      kelvin: 4000
              - conditions:
                  - condition: state
                    entity_id: light.0x54ef44100035a3eb
                    state: 'on'
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.0x54ef44100035a3eb
                    data_template:
                      brightness_pct: 1
                      kelvin: 2700
                  - service: light.turn_off
                    entity_id:
                      - light.0x54ef44100035a3eb                     
                      
      - id: Отключение лампочки после сбоя электропитания 2
        alias: light_unavailable_auto_off_2
        initial_state: true
        trigger:
        - platform: state
          entity_id: light.0x54ef44100035a3eb
          to: 'on'
        condition:
        - condition: state
          entity_id: binary_sensor.0x54ef44100035a3eb_control
          state: 'off'
        action:
        - service: light.turn_off
          entity_id: light.0x54ef44100035a3eb

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