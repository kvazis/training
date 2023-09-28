### [Terneo srz и terneo rzx - термостаты для инфракрасных нагревательных панелей и конвекторов](https://youtu.be/349FxFUBr74)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

:white_check_mark: [Сайт производителя](https://www.terneo.ua/)    
:white_check_mark: [Инструкция для rzx](https://ds-electronics.com.ua/files/manual_terneo_rzx_v24_220728_u.pdf)    


:ballot_box_with_check: Пакадж показанный в видео:    

```yaml
terneo:

    homeassistant:

      customize:

        climate.terneo_rzx_mqtt:
          friendly_name: Термостат Terneo RZS

        binary_sensor.terneo_rzx_mqtt_state:
          friendly_name: Термостат Terneo RZS режим

        automation.set_terneo_state:
          friendly_name: Установка режима Terneo
          icon: mdi:thermostat

    mqtt:
      climate:
        - name: terneo_rzx_mqtt
          modes: 
           - "heat"
          current_temperature_topic: "terneo/terneo_rzx_0A0025/airTemp"
          temperature_command_topic: "terneo/terneo_rzx_0A0025/setTemp"
          temperature_state_topic: "terneo/terneo_rzx_0A0025/setTemp"
          
          
      binary_sensor:
        - name: terneo_rzx_mqtt_state
          state_topic: "terneo/terneo_rzx_0A0025/load"
          payload_on: "1"
          payload_off: "0"
          device_class: heat
        
    automation:
    
      - alias: set_terneo_state
        initial_state: true
        trigger:
          - platform: state
            entity_id: binary_sensor.terneo_rzx_mqtt_state
        action:  
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.terneo_rzx_mqtt_state
                    state: 'on'
                sequence:
                  - service: climate.set_hvac_mode
                    data:
                      hvac_mode: heat
                    target:
                      entity_id: climate.terneo_rzx_mqtt

              - conditions:
                  - condition: state
                    entity_id: binary_sensor.terneo_rzx_mqtt_state
                    state: 'off'
                sequence:
                  - service: climate.set_hvac_mode
                    data:
                      hvac_mode: "off"
                    target:
                      entity_id: climate.terneo_rzx_mqtt

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