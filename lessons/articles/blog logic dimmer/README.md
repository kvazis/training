### [Блог. Home Assistant - используем проводной zigbee диммер для управления умным светильником](https://youtu.be/tniWxwntQbM)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Сенсоры и автоматизации показанные в видео

```yaml
dimm_light:

    template:
     
      - sensor:
      
    # Диммер яркость
          - name: 0x60a423fffe3e4a02_brightness
            state: >
              {% if is_state('light.0x60a423fffe3e4a02', 'on')  %}
                {{ (state_attr('light.0x60a423fffe3e4a02', 'brightness') / 2.55 ) | float |round(0)}}
              {% else %}
                0
              {% endif %}
            
    # Лампочка яркость            
          - name: 0x54ef44100035a3eb_brightness
            state: >
              {% if is_state('light.0x54ef44100035a3eb', 'on')  %}
                {{ (state_attr('light.0x54ef44100035a3eb', 'brightness') / 2.55 ) | float |round(0)}}
              {% else %}
                0
              {% endif %}
              
      - binary_sensor:

          - name: both_light_brightness
            state: >
              {{ states('sensor.0x60a423fffe3e4a02_brightness') | int == states('sensor.0x54ef44100035a3eb_brightness') | int
                 and is_state('light.0x54ef44100035a3eb', 'on')
                 and is_state('light.0x60a423fffe3e4a02', 'on')
              }}

    automation:
    
      - id: Синхронизация включения
        alias: both_light_state_on
        initial_state: enable
        trigger:
    # Диммер
        - platform: state
          entity_id: light.0x60a423fffe3e4a02
          to: 'on'
    # Светильник
        - platform: state
          entity_id: light.0x54ef44100035a3eb
          to: 'on'
        action:
            - choose:
    # Включение диммером
              - conditions:
                  - condition: state
                    entity_id: light.0x60a423fffe3e4a02
                    state: 'on'
                  - condition: state
                    entity_id: light.0x54ef44100035a3eb
                    state: 'off'
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.0x54ef44100035a3eb
    # Синхронизация состояния с диммером
              - conditions:
                  - condition: state
                    entity_id: light.0x54ef44100035a3eb
                    state: 'on'
                  - condition: state
                    entity_id: light.0x60a423fffe3e4a02
                    state: 'off'
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.0x60a423fffe3e4a02

      - id: Синхронизация выключения
        alias: both_light_state_off
        initial_state: enable
        trigger:
    # Диммер
        - platform: state
          entity_id: light.0x60a423fffe3e4a02
          to: 'off'
    # Светильник
        - platform: state
          entity_id: light.0x54ef44100035a3eb
          to: 'off'
        action:
            - choose:
    # Выключение диммером
              - conditions:
                  - condition: state
                    entity_id: light.0x60a423fffe3e4a02
                    state: 'off'
                  - condition: state
                    entity_id: light.0x54ef44100035a3eb
                    state: 'on'
                sequence:
                  - service: light.turn_off
                    entity_id:
                      - light.0x54ef44100035a3eb
    # Синхронизация состояния с диммером
              - conditions:
                  - condition: state
                    entity_id: light.0x54ef44100035a3eb
                    state: 'off'
                  - condition: state
                    entity_id: light.0x60a423fffe3e4a02
                    state: 'on'
                sequence:
                  - service: light.turn_off
                    entity_id:
                      - light.0x60a423fffe3e4a02

      - id: Управление яркостью с диммера
        alias: both_light_brightness_dimmer
        initial_state: enable
        trigger:
    # Диммер
        - platform: state
          entity_id: sensor.0x60a423fffe3e4a02_brightness
        condition:
        - condition: state
          entity_id: binary_sensor.both_light_brightness
          state: 'off'
        action:
        - service: light.turn_on
          entity_id:
            - light.0x54ef44100035a3eb
          data_template:
            brightness_pct: > 
              {{ states('sensor.0x60a423fffe3e4a02_brightness') }} 

      - id: Синхронизация яркости c лампочки на диммер
        alias: both_light_brightness_timer
        initial_state: enable
        trigger:
    # Светильник
        - platform: state
          entity_id: sensor.0x54ef44100035a3eb_brightness
        condition:
        - condition: state
          entity_id: light.0x54ef44100035a3eb
          state: 'on'
        - condition: state
          entity_id: binary_sensor.both_light_brightness
          state: 'off'
        action:
        - service: light.turn_on
          entity_id:
            - light.0x60a423fffe3e4a02
          data_template:
            brightness_pct: > 
              {{ states('sensor.0x54ef44100035a3eb_brightness') }} 

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