### [Aqara H1 ZNXNKG02LM - беспроводный zigbee диммер, обзор и тестирование](https://youtu.be/COXf9u72vdU)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


:ballot_box_with_check: Пакадж из обзора    

```yaml

aqara_h1:

    automation:
    
    - id: 'aqara_h1_light_toggle'
      alias: Aqara H1 light toggle
      description: Single click for on/off light
      trigger:
      - platform: state
        entity_id:
        - sensor.0x54ef4410007bb24e_action
        to: single
      condition: []
      action:
        - choose:
          - conditions:
              - condition: state
                entity_id: light.0x00158d0004282c21
                state: 'off'
            sequence:
              - service: light.turn_on
                entity_id:
                  - light.0x00158d0004282c21
                data_template:
                  brightness_pct: 60
                  kelvin: 4000
          - conditions:
              - condition: state
                entity_id: light.0x00158d0004282c21
                state: 'on'
            sequence:
              - service: light.turn_off
                entity_id:
                  - light.0x00158d0004282c21


    - id: 'aqara_h1_brightness_change_1'
      alias: Aqara H1 brightness change_1
      description: Change brightness no adjustments
      trigger:
      - platform: state
        entity_id:
          - sensor.0x54ef4410007bb24e_action_rotation_percent
        from: unknown
      condition: 
      - condition: state
        entity_id: light.0x00158d0004282c21
        state: 'on'
      action:
        - service: light.turn_on
          data_template:
            brightness: >-
              {{((state_attr('light.0x00158d0004282c21','brightness')|int(1))+(trigger.to_state.state|int(1)))}}
          target:
            entity_id: light.0x00158d0004282c21
          enabled: true


    - id: 'aqara_h1_brightness_change_2'
      alias: Aqara H1 brightness change_2
      description: Change brightness with adjustments - [2.55
      trigger:
      - platform: state
        entity_id:
          - sensor.0x54ef4410007bb24e_action_rotation_percent
        from: unknown
      condition: 
      - condition: state
        entity_id: light.0x00158d0004282c21
        state: 'on'
      action:
        - service: light.turn_on
          data_template:
            brightness: >-
              {{((state_attr('light.0x00158d0004282c21','brightness')|int(1))+(trigger.to_state.state|float(1))*2.55)|int(1)}}
          target:
            entity_id: light.0x00158d0004282c21
          enabled: true

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