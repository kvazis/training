### [HGledopto WLED Light Bar GL-LB-003, светильник на адресных диодах - обзор, интеграция в Home Assistant](https://youtu.be/7OUrXwsaVq4)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Ресурсы:    

:white_check_mark: **Прошивка SR-WLED** - [github](https://github.com/atuline/WLED/releases)    

#### Пакадж из урока:  

```yaml
wled_control:

    automation:
    
      - alias: wled_toggle
        id: wled_toggle
        description: Gledopto WLED Bar toggle
        initial_state: true          
        trigger:
    # Aqara Opple button 1, single click
        - platform: state
          entity_id: sensor.0x54ef4410004c1706_action
          to: 'button_1_single'
        action:
        - service: light.toggle
          entity_id: light.wled_soundreactive

      - alias: wled_control
        id: wled_control
        description: Gledopto WLED Bar
        initial_state: true          
        trigger:
    # Aqara Opple button 1, double click
        - platform: state
          entity_id: sensor.0x54ef4410004c1706_action
          to: 'button_1_double'
          id: opple_button_1_2
    # Aqara Opple button 1, triple click
        - platform: state
          entity_id: sensor.0x54ef4410004c1706_action
          to: 'button_1_triple'
          id: opple_button_1_3
    # Aqara Opple button 2, single click
        - platform: state
          entity_id: sensor.0x54ef4410004c1706_action
          to: 'button_2_single'
          id: opple_button_2_1
    # Aqara Opple button 2, double click
        - platform: state
          entity_id: sensor.0x54ef4410004c1706_action
          to: 'button_2_double'
          id: opple_button_2_2
        condition:
        - condition: state
          entity_id: light.wled_soundreactive
          state: 'on'
        action:
            - choose:
              - conditions:
                  - condition: trigger
                    id: opple_button_1_2
                sequence:
                  - service: light.turn_on
                    entity_id: light.wled_soundreactive
                    data:
                      effect: Saw
                      brightness_pct: 50
                  - service: select.select_option
                    data:
                      option: Orangery
                    target:
                      entity_id: select.wled_soundreactive_color_palette
                  - service: number.set_value
                    target:
                      entity_id: number.wled_soundreactive_speed
                    data:
                      value: 114
                  - service: number.set_value
                    target:
                      entity_id: number.wled_soundreactive_intensity
                    data:
                      value: 76
              - conditions:
                  - condition: trigger
                    id: opple_button_1_3
                sequence:
                  - service: light.turn_on
                    entity_id: light.wled_soundreactive
                    data:
                      effect: Popcorn
                      brightness_pct: 70
                  - service: select.select_option
                    data:
                      option: Atlantica
                    target:
                      entity_id: select.wled_soundreactive_color_palette
                  - service: number.set_value
                    target:
                      entity_id: number.wled_soundreactive_speed
                    data:
                      value: 157
                  - service: number.set_value
                    target:
                      entity_id: number.wled_soundreactive_intensity
                    data:
                      value: 221
              - conditions:
                  - condition: trigger
                    id: opple_button_2_1
                sequence:
                  - service: light.turn_on
                    entity_id: light.wled_soundreactive
                    data:
                      effect: Scanner
                      brightness_pct: 75
                  - service: select.select_option
                    data:
                      option: Rainbow
                    target:
                      entity_id: select.wled_soundreactive_color_palette
                  - service: number.set_value
                    target:
                      entity_id: number.wled_soundreactive_speed
                    data:
                      value: 180
                  - service: number.set_value
                    target:
                      entity_id: number.wled_soundreactive_intensity
                    data:
                      value: 200
              - conditions:
                  - condition: trigger
                    id: opple_button_2_2
                sequence:
                  - service: light.turn_on
                    entity_id: light.wled_soundreactive
                    data:
                      effect: Scanner Dual
                      brightness_pct: 100
                  - service: select.select_option
                    data:
                      option: Drywet
                    target:
                      entity_id: select.wled_soundreactive_color_palette
                  - service: number.set_value
                    target:
                      entity_id: number.wled_soundreactive_speed
                    data:
                      value: 100
                  - service: number.set_value
                    target:
                      entity_id: number.wled_soundreactive_intensity
                    data:
                      value: 40
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