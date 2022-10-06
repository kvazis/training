### [Fairy Lights - wi-fi гирлянда с адресными диодами для Tuya Smart, интеграция в Home Assistant](https://youtu.be/WGPL-l1oZIs)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Пакадж из видео    

```yaml

da_fairy_lights:


    input_select:  
    
      da_fairy_lights_effects:
        name: Список эффектов
        options:
          - 0103e8
          - 0203e8
          - 0303e8
          - 0403e8
          - 0503e8
          - 0603e8
          - 0703e8
          - 0803e8
          - 0903e8
          - 1003e8
          - 1103e8
          - 1203e8
          - 1303e8
          - 1403e8
          - 1503e8
          - 1603e8
          - 1703e8
          - 1803e8
          - 1903e8
          - 2003e8

         
          
    automation:

      - alias: da_fairy_lights_effects
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_select.da_fairy_lights_effects
        condition:
        - condition: state
          entity_id: light.fairy_light
          state: 'on'
        action:
        - choose:
          - conditions:
              - condition: state
                entity_id: sensor.fairy_light_mode
                state: 'scene'
            sequence: 
            - service: localtuya.set_dp
              data_template:
                device_id: bf711554ea4678bf7fccqq
                dp: 25
                value: >
                    {{states('input_select.da_fairy_lights_effects')}}
          - conditions:
             not:
              - condition: state
                entity_id: sensor.fairy_light_mode
                state: 'scene'
            sequence:
            - service: localtuya.set_dp
              data:
                device_id: bf711554ea4678bf7fccqq
                dp: 21
                value: "scene"
            - service: localtuya.set_dp
              data_template:
                device_id: bf711554ea4678bf7fccqq
                dp: 25
                value: >
                    {{states('input_select.da_fairy_lights_effects')}}
                    
      - alias: da_fairy_lights_effect_change
        initial_state: false
        trigger:
        - platform: time_pattern
          minutes: '/5'
        condition:
        - condition: state
          entity_id: light.fairy_light
          state: 'on'
        action:
        - service: input_select.select_next
          target:
            entity_id: input_select.da_fairy_lights_effects 
                    

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