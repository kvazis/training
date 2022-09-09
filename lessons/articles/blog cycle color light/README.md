### [Блог. Home Assistant. Как сделать циклическую смену цветов на светильниках](https://youtu.be/hbcV3fN0Rf4)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

:white_check_mark: **CSS3 color names** - [Список](https://www.w3.org/TR/css-color-3/#svg-color)    


:ballot_box_with_check: Пакадж показанный в видео:    

```yaml
circle_light:


    homeassistant:

      customize:

        automation.cicle_light_color_sync:
          friendly_name: Синхронизация цвета списка и светильника
          
        automation.cicle_light_color_change:
          friendly_name: Переключение элементов списка циклической подсветки
          
        automation.cicle_light_color:
          friendly_name: Cтарт стоп режима циклической подсветки ленты

    input_select:  
    
      cicle_light_color:
        name: Список цветов
        options:
          - crimson
          - deeppink
          - hotpink
          - lightpink
          - red
          - orangered
          - orange
          - lightsalmon
          - darksalmon
          - coral
          - goldenrod
          - gold
          - yellow
          - yellowgreen
          - greenyellow
          - limegreen
          - lime
          - lawngreen
          - green
          - aquamarine
          - mediumturquoise
          - turquoise
          - darkturquoise
          - deepskyblue
          - dodgerblue
          - royalblue
          - blue
          - darkblue
          - darkslateblue
          - darkmagenta
          - darkorchid
          - blueviolet
          - mediumpurple
          - purple
          - mediumorchid
          - orchid
          - plum
          - violet
          - fuchsia
          - magenta
          - darkviolet
          - mediumvioletred
          
    automation:

      - alias: cicle_light_color_sync
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_select.cicle_light_color
        action:
        - service: light.turn_on
          entity_id: light.yeelight_0x531e4b4
          data_template:
            color_name: >
              {{trigger.to_state.state}}
            transition: 2

      - alias: cicle_light_color_change
        initial_state: false
        trigger:
        - platform: time_pattern
          seconds: '/5'
        action:
        - service: input_select.select_next
          target:
            entity_id: input_select.cicle_light_color
    
      - alias: cicle_light_color
        initial_state: true
        trigger:
        - platform: state
          entity_id: sensor.0x00158d000154a353_action
          to: 'single'
        action:
        - choose:
            - conditions:
              - condition: state
                entity_id: light.yeelight_0x531e4b4
                state: 'off'  
              sequence:
              - service: light.turn_on
                entity_id: light.yeelight_0x531e4b4
                data_template:
                  color_name: >
                    {{states('input_select.cicle_light_color')}}
                  transition: 2
              - service: automation.turn_on
                target:
                  entity_id: automation.cicle_light_color_change

            - conditions:
              - condition: state
                entity_id: light.yeelight_0x531e4b4
                state: 'on'  
              sequence:
              - service: light.turn_off
                entity_id: light.yeelight_0x531e4b4
              - service: automation.turn_off
                target:
                  entity_id: automation.cicle_light_color_change

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