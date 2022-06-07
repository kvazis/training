### [Блог. Home Assistant - датчики движения в автоматизациях управления освещением](https://youtu.be/SK9CYq5GtH8)

#### Сенсор и автоматизации показанные в видео

:ballot_box_with_check: Классическая автоматизация управления освещением по датчику движения

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

:ballot_box_with_check: Пакадж - контрольный темплейт сенсор и автоматизация 

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