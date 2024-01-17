### [Светодиодная лампочка RGB+CCT под E27, с управлением по zigbee - обзор, интеграция в Home Assistant](https://youtu.be/4XQbGesJ-mQ)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Пакадж из урока:  


```yaml
zigbee_light:

    automation:
    
        - id: zigbee_light_control
          alias: Управление Zigbee лампочкой
          initial_state: true
          trigger:       
           - platform: state
             entity_id: sensor.0x00158d0001718ca8_action
             to: 'single_left'
          action: 
          - service: script.turn_on
            data_template:
             entity_id: >-
                {%- if states('light.0xa4c138d0666eb1aa')  == 'off' -%}
                script.zigbee_light_on
                {%- elif states('light.0xa4c138d0666eb1aa')  == 'on' -%}
                script.zigbee_light_off
                {%- endif -%}
                
    script:
    
        zigbee_light_on:
          alias: Включение лампочки
          sequence:
            - service: light.turn_on
              entity_id: 
                 - light.0xa4c138d0666eb1aa
              data_template:
                brightness_pct: 100
                kelvin: 4000
                
        zigbee_light_off:
          alias: Выключение лампочки
          sequence:
            - service: light.turn_on
              entity_id: 
                 - light.0xa4c138d0666eb1aa
              data_template:
                brightness_pct: 1
                rgb_color: [0, 0, 255]
            - delay: 00:00:01
            - service: light.turn_off
              entity_id: 
                 - light.0xa4c138d0666eb1aa
```

____
#### Поддержать развитие проекта *Умный дом с Alex Kvazis*    
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg/join" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/youtube.png" alt="Youtube Sponsorship" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.patreon.com/alex_kvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/patreon-button.png" alt="Patreon Support" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.buymeacoffee.com/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/buymeacoffee.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.paypal.com/paypalme/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/paypal.png" alt="PayPal Me" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Или перевод любой суммы на -     
* Webmoney - Z243592584952
* BTC - 1PAjXcNbLtUKLY8d5HDnfxRqc5Zchj1fU3    
* TON - UQBEShkfKCFhvqlTs_oIpa6kFIQJguJR30hDXany1cCAbCfe    
* USDT (TRON (TRC20)) - TEpnJcLDRbkwq5oQpjVET9NbPpHKB7QMrD    