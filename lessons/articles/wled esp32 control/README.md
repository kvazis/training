### [Управляем адресными светодиодами на ESP32, прошивка WLED, применение в Home Assistant](https://youtu.be/QrwpbsMGq_s)

#### Пакадж для управления адресной лентой через контроллер WLED из Home Assistant

```yaml
wled_light:

    automation:
    
        - id: wled_light_control
          alias: WLED управление
          initial_state: true
          trigger:       
           - platform: state
             entity_id: sensor.0x00158d0001718ca8_action
             to: 'single_left'
          action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: light.wled
                    state: 'off'
                sequence:
                  - service: light.turn_on
                    data:
                      entity_id: light.wled
                      effect: Police
              - conditions:
                  - condition: state
                    entity_id: light.wled
                    state: 'on'
                sequence:
                  - service: light.turn_off
                    entity_id: 
                       - light.wled

        - id: wled_light_preset
          alias: WLED пресеты
          initial_state: true
          trigger:       
           - platform: state
             entity_id: sensor.0x00158d0002af829b_action
             to: 'single'
          action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: light.wled
                    state: 'off'
                sequence:
                  - service: select.select_option
                    data:
                      entity_id: select.wled_preset
                      option: Preset 1
              - conditions:
                  - condition: state
                    entity_id: light.wled
                    state: 'on'
                sequence:
                  - service: light.turn_off
                    entity_id: 
                       - light.wled
                       
        - id: wled_light_playlist
          alias: WLED плейлисты
          initial_state: true
          trigger:       
           - platform: state
             entity_id: sensor.0x00158d0002af829b_action
             to: 'double'
          action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: light.wled
                    state: 'off'
                sequence:
                  - service: select.select_option
                    data:
                      entity_id: select.wled_playlist
                      option: Playlist 4
              - conditions:
                  - condition: state
                    entity_id: light.wled
                    state: 'on'
                sequence:
                  - service: light.turn_off
                    entity_id: 
                       - light.wled
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