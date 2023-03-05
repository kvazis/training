### [Применение 2х канального zigbee реле с сухим контактом для обычного и аварийного освещения](https://youtu.be/_DwgWu9SBso)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Пакадж показанный в видео

```yaml
reserve_light:

    automation:

      - alias: control_screen_light
        id: control_screen_light
        description: Управление подсветкой на зеркале
        initial_state: true
        trigger:
        - platform: state
          entity_id: binary_sensor.0x00124b002265ba65_contact
          from: 'off'
          to: 'on'
        - platform: state
          entity_id: binary_sensor.0x00124b002265ba65_contact
          from: 'on'
          to: 'off'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.0x00124b002265ba65_contact
                    state: 'on'
                  - condition: state
                    entity_id: binary_sensor.electricity
                    state: 'off'                    
                sequence:        
                  - service: switch.turn_on
                    entity_id: switch.0x00124b0023ae464d_right
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.0x00124b002265ba65_contact
                    state: 'off'
                  - condition: state
                    entity_id: binary_sensor.electricity
                    state: 'off' 
                sequence:        
                  - service: switch.turn_off
                    entity_id: switch.0x00124b0023ae464d_right
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.0x00124b002265ba65_contact
                    state: 'on'
                  - condition: state
                    entity_id: binary_sensor.electricity
                    state: 'on'                    
                sequence:        
                  - service: switch.turn_on
                    entity_id: switch.0x00124b0023ae464d_left
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.0x00124b002265ba65_contact
                    state: 'off'
                  - condition: state
                    entity_id: binary_sensor.electricity
                    state: 'on'                    
                sequence:        
                  - service: switch.turn_off
                    entity_id: switch.0x00124b0023ae464d_left
                    
      - alias: switch_screen_light
        id: switch_screen_light
        description: Переключение подсветки на зеркале
        initial_state: true
        trigger:
        - platform: state
          entity_id: binary_sensor.electricity
          from: 'off'
          to: 'on'
        - platform: state
          entity_id: binary_sensor.electricity
          from: 'on'
          to: 'off'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.electricity
                    state: 'on'
                  - condition: state
                    entity_id: switch.0x00124b0023ae464d_right
                    state: 'on' 
                sequence:        
                  - service: switch.turn_on
                    entity_id: switch.0x00124b0023ae464d_left
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.electricity
                    state: 'off'
                  - condition: state
                    entity_id: switch.0x00124b0023ae464d_left
                    state: 'on' 
                sequence:        
                  - service: switch.turn_on
                    entity_id: switch.0x00124b0023ae464d_right

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