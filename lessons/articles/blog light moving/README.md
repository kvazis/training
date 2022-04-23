* [Блог. Home Assistant - датчики движения в автоматизациях управления освещением](https://youtu.be/SK9CYq5GtH8)

# Сенсор и автоматизации показанные в видео

* Классическая автоматизация управления освещением по датчику движения

```yaml

      - id: Управление освещением по датчику движения, вариант 1
        alias: light_moving_control_1
        initial_state: false
        trigger:
    # Датчик движения
        - platform: state
          entity_id: binary_sensor.0x54ef441000118375_occupancy
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.0x54ef441000118375_occupancy
                    state: 'on'
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
                    entity_id: binary_sensor.0x54ef441000118375_occupancy
                    state: 'off'
                  - condition: state
                    entity_id: light.0x54ef44100035a3eb
                    state: 'on'
                sequence:
                  - service: light.turn_off
                    entity_id:
                      - light.0x54ef44100035a3eb 

```

* Пакадж - контрольный темплейт сенсор и автоматизация 

```yaml

light_moving:

    template:
     
      - binary_sensor:

          - name: 0x54ef44100035a3eb_light
            state: >
              {{ is_state('binary_sensor.0x54ef441000118375_occupancy', 'off')  
                 and is_state('light.0x54ef44100035a3eb', 'on')
              }}
            delay_on: 00:00:05

    automation:
    
      - id: Управление освещением по датчику движения, вариант 2
        alias: light_moving_control_2
        initial_state: true
        trigger:
    # Датчик движения
        - platform: state
          entity_id: binary_sensor.0x54ef441000118375_occupancy
    # Сенсор шаблона
        - platform: state
          entity_id: binary_sensor.0x54ef44100035a3eb_light
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.0x54ef441000118375_occupancy
                    state: 'on'
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
                    entity_id: binary_sensor.0x54ef44100035a3eb_light
                    state: 'on'
                sequence:
                  - service: light.turn_off
                    entity_id:
                      - light.0x54ef44100035a3eb  

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