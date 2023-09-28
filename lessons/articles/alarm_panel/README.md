### [Home Assistant - Manual Alarm Control Panel, принцип работы, практическое применение](https://youtu.be/JOXdfV8KfDI)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


:ballot_box_with_check: Пакадж из обзора    

```yaml
code_alarm:

    alarm_control_panel:
    
      - platform: manual
        name: Home Alarm
        code: "1234"
        arming_time: 15
        delay_time: 10
        code_arm_required: false
        trigger_time: 5
        disarmed:
          trigger_time: 0

    input_boolean:
    
      first:
        name: Первый ключ
        icon: mdi:numeric-1-box
        
      second:
        name: Второй ключ
        icon: mdi:numeric-2-box
        
      third:
        name: Третий ключ
        icon: mdi:numeric-3-box
        
      fourth:
        name: Четвертый ключ
        icon: mdi:numeric-4-box

    timer:
    
        alarm_code:
          name: Сброс кода
          duration: '00:00:10'

        
    template:
    
      - binary_sensor:

          - name: zero
            state: >
              {{ is_state('input_boolean.first', 'off')  
                 and is_state('input_boolean.second', 'off')
                 and is_state('input_boolean.third', 'off')
                 and is_state('input_boolean.fourth', 'off')
              }}
            device_class: lock

          - name: first
            state: >
              {{ is_state('input_boolean.first', 'on')  
                 and is_state('input_boolean.second', 'off')
                 and is_state('input_boolean.third', 'off')
                 and is_state('input_boolean.fourth', 'off')
              }}
            device_class: lock
            
          - name: second
            state: >
              {{ is_state('input_boolean.first', 'on')  
                 and is_state('input_boolean.second', 'on')
                 and is_state('input_boolean.third', 'off')
                 and is_state('input_boolean.fourth', 'off')
              }}
            device_class: lock
            
          - name: third
            state: >
              {{ is_state('input_boolean.first', 'on')  
                 and is_state('input_boolean.second', 'on')
                 and is_state('input_boolean.third', 'on')
                 and is_state('input_boolean.fourth', 'off')
              }}
            device_class: lock
            
          - name: fourth
            state: >
              {{ is_state('input_boolean.first', 'on')  
                 and is_state('input_boolean.second', 'on')
                 and is_state('input_boolean.third', 'on')
                 and is_state('input_boolean.fourth', 'on')
              }}
            device_class: lock
            
    automation:

      - alias: alarm_light
        id: alarm_light
        description: Лампочка и звук сигнализации
        initial_state: true
        trigger:
        - platform: state
          entity_id: alarm_control_panel.home_alarm
          to: 'arming'
          id: arming
        - platform: state
          entity_id: alarm_control_panel.home_alarm
          to: 'armed_away'
          id: armed_away
        - platform: state
          entity_id: alarm_control_panel.home_alarm
          to: 'pending'
          id: pending
        - platform: state
          entity_id: alarm_control_panel.home_alarm
          to: 'disarmed'
          id: disarmed
        - platform: state
          entity_id: alarm_control_panel.home_alarm
          to: 'triggered'
          id: triggered
        action:
            - choose:
              - conditions:
                  - condition: trigger
                    id: arming
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.0x00124b00231ff227
                    data_template:
                      brightness_pct: 30
                      rgb_color: [255,251,104]
              - conditions:
                  - condition: trigger
                    id: armed_away
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.0x00124b00231ff227
                    data_template:
                      brightness_pct: 30
                      rgb_color: [255,69,89]
                  - delay: 00:00:10
                  - service: light.turn_off
                    entity_id:
                      - light.0x00124b00231ff227
              - conditions:
                  - condition: trigger
                    id: pending
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.0x00124b00231ff227
                    data_template:
                      brightness_pct: 30
                      rgb_color: [255,173,255]
              - conditions:
                  - condition: trigger
                    id: disarmed
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.0x00124b00231ff227
                    data_template:
                      brightness_pct: 50
                      rgb_color: [0,255,0]
                  - delay: 00:00:10
                  - service: light.turn_off
                    entity_id:
                      - light.0x00124b00231ff227
              - conditions:
                  - condition: trigger
                    id: triggered
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.0x00124b00231ff227
                    data_template:
                      brightness_pct: 100
                      rgb_color: [255,0,0]
                  - service: xiaomi_aqara.play_ringtone
                    data:
                      gw_mac: 34:CE:00:88:B0:39
                      ringtone_id: "0"
                      ringtone_vol: 1
                  - delay: 00:00:15
                  - service: light.turn_off
                    entity_id:
                      - light.0x00124b00231ff227

      - alias: alarm_control
        id: alarm_control
        description: Управление сигнализацией
        initial_state: true
        trigger:
        - platform: state
          entity_id: sensor.0x54ef4410004c1706_action
          to: 'button_6_single'
          id: away
        - platform: state
          entity_id: binary_sensor.0xa4c138744bf2fbf0_contact
          to: 'on'
          id: door_open
        - platform: state
          entity_id: binary_sensor.fourth
          to: 'on'
          id: disarm
        action:
            - choose:
              - conditions:
                  - condition: trigger
                    id: away
                  - condition: state
                    entity_id: alarm_control_panel.home_alarm
                    state: disarmed
                sequence:
                  - service: alarm_control_panel.alarm_arm_away
                    target:
                      entity_id: alarm_control_panel.home_alarm
              - conditions:
                  - condition: trigger
                    id: door_open
                  - condition: state
                    entity_id: alarm_control_panel.home_alarm
                    state: armed_away
                sequence:
                  - service: alarm_control_panel.alarm_trigger
                    target:
                      entity_id: alarm_control_panel.home_alarm
              - conditions:
                  - condition: trigger
                    id: disarm
                sequence:
                  - service: alarm_control_panel.alarm_disarm
                    data:
                      code: "1234"
                    target:
                      entity_id: alarm_control_panel.home_alarm

      - alias: alarm_code
        id: alarm_code
        description: Сигнализация
        initial_state: true
        trigger:
        - platform: state
          entity_id: sensor.0x54ef4410004c1706_action
          to: 'button_1_single'
          id: first
        - platform: state
          entity_id: sensor.0x54ef4410004c1706_action
          to: 'button_1_double'
          id: second
        - platform: state
          entity_id: sensor.0x54ef4410004c1706_action
          to: 'button_2_single'
          id: third
        - platform: state
          entity_id: sensor.0x54ef4410004c1706_action
          to: 'button_2_double'
          id: fourth
        action:
            - choose:

              - conditions:
                  - condition: trigger
                    id: first
                  - condition: state
                    entity_id: binary_sensor.zero
                    state: 'on'
                sequence:
                  - service: input_boolean.turn_on
                    entity_id:
                      - input_boolean.first
              - conditions:
                  - condition: trigger
                    id: second
                  - condition: state
                    entity_id: binary_sensor.first
                    state: 'on'
                sequence:
                  - service: input_boolean.turn_on
                    entity_id:
                      - input_boolean.second
              - conditions:
                  - condition: trigger
                    id: third
                  - condition: state
                    entity_id: binary_sensor.second
                    state: 'on'
                sequence:
                  - service: input_boolean.turn_on
                    entity_id:
                      - input_boolean.third
              - conditions:
                  - condition: trigger
                    id: third
                  - condition: state
                    entity_id: binary_sensor.second
                    state: 'on'
                sequence:
                  - service: input_boolean.turn_on
                    entity_id:
                      - input_boolean.third
              - conditions:
                  - condition: trigger
                    id: fourth 
                  - condition: state
                    entity_id: binary_sensor.third
                    state: 'on'
                sequence:
                  - service: input_boolean.turn_on
                    entity_id:
                      - input_boolean.fourth

      - alias: alarm_timer
        id: alarm_timer
        description: Таймер сигнализации
        initial_state: true
        trigger:

        - platform: state
          entity_id: sensor.0x54ef4410004c1706_action
          id: start
        - platform: event
          event_type: timer.finished
          event_data:
            entity_id: timer.alarm_code     
          id: stop
        action:
            - choose:

              - conditions:
                  - condition: trigger
                    id: start
                  - condition: state
                    entity_id: timer.alarm_code
                    state: 'idle'
                sequence:
                  - service: timer.start
                    entity_id: timer.alarm_code

              - conditions:
                  - condition: trigger
                    id: stop 
                sequence:
                  - service: input_boolean.turn_off
                    entity_id:
                      - input_boolean.first
                      - input_boolean.second
                      - input_boolean.third
                      - input_boolean.fourth

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