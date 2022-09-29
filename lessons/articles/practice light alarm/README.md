### [Home Assistant практика - Световой будильник, рассвет и закат, сработка по времени и дням недели](https://youtu.be/X1po7Cvs3Ps)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

:ballot_box_with_check: Пакадж из урока    

```yaml
light_alarm:


    homeassistant:
      customize:

        sensor.day_of_week:
          friendly_name: День недели
          icon: mdi:calendar-month

        automation.light_alarm:
          friendly_name: Световой будильник
          icon: mdi:alarm
          
        automation.light_alarm_toggle:
          friendly_name: Световой будильник управление
          icon: mdi:alarm-check
          
        automation.light_alarm_time_sync:
          friendly_name: Световой будильник синхронизация
          icon: mdi:timer-sync

        automation.light_alarm_trigger:
          friendly_name: Световой будильник запуск
          icon: mdi:timer-play

        automation.light_sunset:
          friendly_name: Световой закат
          icon: mdi:sun-clock
          
        automation.light_sunset_toggle:
          friendly_name: Световой закат управление
          icon: mdi:weather-sunset

    template:
     
      - sensor:

          - name: day_of_week
            state: >
              {{now().strftime("%A")}}

    timer:

        light_alarm:
          name: Отключение светового будильника
          restore: true

    input_button:

      light_alarm_toggle:
        name: Световой будильник
        icon: mdi:alarm-check
        
      light_sunset_toggle:
        name: Световой закат
        icon: mdi:weather-sunset
        
      light_alarm_sync:
        name: Световой будильник синхронизация времени
        icon: mdi:timer-sync

    input_boolean:
    
        light_alarm_on_monday:    
            name: Monday
            icon: mdi:check-bold   
        light_alarm_on_tuesday:    
            name: Tuesday
            icon: mdi:check-bold  
        light_alarm_on_wednesday:    
            name: Wednesday
            icon: mdi:check-bold
        light_alarm_on_thursday:    
            name: Thursday
            icon: mdi:check-bold
        light_alarm_on_friday:    
            name: Friday
            icon: mdi:check-bold
        light_alarm_on_saturday:    
            name: Saturday
            icon: mdi:check-bold
        light_alarm_on_sunday:    
            name: Sunday
            icon: mdi:check-bold

    input_datetime: 

        light_alarm_timer:    
            name: Timer
            has_date: false
            has_time: true
            icon: mdi:timer
        light_alarm_time_monday:    
            name: Monday
            has_date: false
            has_time: true
            icon: mdi:timer-edit   
        light_alarm_time_tuesday:    
            name: Tuesday
            has_date: false
            has_time: true
            icon: mdi:timer-edit  
        light_alarm_time_wednesday:    
            name: Wednesday
            has_date: false
            has_time: true
            icon: mdi:timer-edit  
        light_alarm_time_thursday:    
            name: Thursday
            has_date: false
            has_time: true
            icon: mdi:timer-edit  
        light_alarm_time_friday:    
            name: Friday
            has_date: false
            has_time: true
            icon: mdi:timer-edit  
        light_alarm_time_saturday:    
            name: Saturday
            has_date: false
            has_time: true
            icon: mdi:timer-edit  
        light_alarm_time_sunday:    
            name: Sunday
            has_date: false
            has_time: true
            icon: mdi:timer-edit  
            
            
    automation:
    
      - alias: light_alarm
        description: Световой будильник
        initial_state: false
        trigger:
        - platform: time_pattern
          seconds: '/5'
        action:
          - choose:

              - conditions:
                - condition: template
                  value_template: "{{(state_attr('light.0x54ef44100035a3eb', 'brightness')|int) < 255 }}"
                sequence:
                - service: light.turn_on
                  data:
                    brightness_step_pct: 10
                    transition: 5
                  target:
                    entity_id: light.0x54ef44100035a3eb

              - conditions:
                - condition: template
                  value_template: "{{(state_attr('light.0x54ef44100035a3eb', 'brightness')|int) == 255 }}"
                sequence:
                - service: input_button.press
                  target:
                    entity_id: input_button.light_alarm_toggle 

      - alias: light_alarm_toggle
        description: Световой будильник управление
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_button.light_alarm_toggle
        - platform: event
          event_type: timer.finished
          event_data:
            entity_id: timer.light_alarm
        action:
          - choose:
              - conditions:
                - "{{ trigger.platform == 'state' }}"
                - condition: state
                  entity_id: automation.light_alarm
                  state: 'off'      
                sequence:
                - service: light.turn_on
                  data:
                    brightness_step_pct: 10
                    kelvin: 3000
                  target:
                    entity_id: light.0x54ef44100035a3eb          
                - service: automation.turn_on
                  data: {}
                  target:
                    entity_id: automation.light_alarm        

              - conditions:
                - "{{ trigger.platform == 'state' }}"
                - condition: state
                  entity_id: automation.light_alarm
                  state: 'on'      
                sequence:
                - service: automation.turn_off
                  data: {}
                  target:
                    entity_id: automation.light_alarm
                - service: timer.start
                  entity_id: timer.light_alarm
                  data_template: 
                      duration: >
                            {{strptime(states("input_datetime.light_alarm_timer"), "%H:%M:%S").time()}}                    

              - conditions:
                  - "{{ trigger.platform == 'event' }}"                    
                sequence:                    
                - service: light.turn_off
                  entity_id: light.0x54ef44100035a3eb 
                  
    
      - alias: light_alarm_time_sync
        description: Световой будильник синхронизация
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_button.light_alarm_sync
        action:
        - service: input_datetime.set_datetime
          data:
            time: "{{states('input_datetime.light_alarm_time_monday')}}"
          target:
           entity_id: 
             - input_datetime.light_alarm_time_tuesday
             - input_datetime.light_alarm_time_wednesday
             - input_datetime.light_alarm_time_thursday
             - input_datetime.light_alarm_time_friday
             - input_datetime.light_alarm_time_saturday
             - input_datetime.light_alarm_time_sunday

    
      - alias: light_alarm_trigger
        description: Световой будильник запуск
        initial_state: true    
        trigger:
        - platform: template
          value_template: '{{(state_attr("input_datetime.light_alarm_time_"+now().strftime("%A"), "timestamp") | timestamp_custom("%H:%M", False)) == (as_timestamp(now()) | timestamp_custom("%H:%M")) }}'
        condition:
        - condition: template
          value_template: '{{ states("input_boolean.light_alarm_on_"+now().strftime("%A"))== "on"}}'
        action:
        - service: input_button.press
          target:
            entity_id: input_button.light_alarm_toggle    
    
    
      - alias: light_sunset
        description: Световой закат
        initial_state: false
        trigger:
        - platform: time_pattern
          seconds: '/5'
        action:
          - choose:
              - conditions:
                - condition: state
                  entity_id: light.0x54ef44100035a3eb
                  state: 'on'
                sequence:
                - service: light.turn_on
                  data:
                    brightness_step_pct: -10
                    transition: 5
                  target:
                    entity_id: light.0x54ef44100035a3eb

              - conditions:
                - condition: state
                  entity_id: light.0x54ef44100035a3eb
                  state: 'off'
                sequence:
                - service: input_button.press
                  target:
                    entity_id: input_button.light_sunset_toggle
    
      - alias: light_sunset_toggle
        description: Световой закат управление
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_button.light_sunset_toggle
        action:
        - service: automation.toggle
          data: {}
          target:
            entity_id: automation.light_sunset

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