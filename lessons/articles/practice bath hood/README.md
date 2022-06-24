### [Home Assistant, практика - автоматизация работы вытяжки в ванной](https://youtu.be/skGHsmi8Pus)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

:ballot_box_with_check: Пакадж только автоматического управления

```yaml
bathroom_ventilation:

    input_number:
      hum_high_on:
        name: Влажность для включения вытяжки
        min: 60
        max: 90
        step: 1
        
      hum_low_off:
        name: Влажность для выключения вытяжки
        min: 50
        max: 80
        step: 1
        
    template:   
    
      - binary_sensor:

          - name: hum_high_on
            state: >
              {{ is_state('switch.0x00158d0002d7bb2b_l1', 'off')
                 and (states('sensor.bathroom_humidity') | int >= (states('input_number.hum_high_on') | int))
              }}
            icon: >
              {% if is_state("binary_sensor.hum_high_on", "on") %}
              mdi:water-plus
              {% else %}
              mdi:water-plus-outline
              {% endif %}
              
          - name: hum_low_off
            state: >
              {{ is_state('switch.0x00158d0002d7bb2b_l1', 'on')
                 and (states('sensor.bathroom_humidity') | int <= (states('input_number.hum_low_off') | int))
              }}
            icon: >
              {% if is_state("binary_sensor.hum_low_off", "on") %}
              mdi:water-minus
              {% else %}
              mdi:water-minus-outline
              {% endif %}
              
    automation:
    
      - id: Автоматическое управление вытяжкой
        alias: auto_bathroom_ventilation
        initial_state: true
        trigger:
          - platform: state
            entity_id: binary_sensor.hum_high_on
            to: 'on'
          - platform: state
            entity_id: binary_sensor.hum_low_off
            to: 'on'
        action:
          - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.hum_high_on
                    state: 'on'
                sequence:
                  - service: switch.turn_on
                    data:
                      entity_id: switch.0x00158d0002d7bb2b_l1
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.hum_low_off
                    state: 'on'
                sequence:
                  - service: switch.turn_off
                    data:
                      entity_id: switch.0x00158d0002d7bb2b_l1
```


:ballot_box_with_check: Пакадж - с добавлением ручного управления

```yaml	
bathroom_ventilation:

    input_number:
      hum_high_on:
        name: Влажность для включения вытяжки
        min: 60
        max: 90
        step: 1
        
      hum_low_off:
        name: Влажность для выключения вытяжки
        min: 50
        max: 80
        step: 1
 
    input_boolean:
      manual_vent:
        name: Ручное включение вентиляции
        icon: mdi:fan
        
    input_button:
      manual_vent:
        name: Ручное включение вентиляции
        icon: mdi:fan
        
    timer:
    
        vent_off:
          name: Вытяжка будет выключена через - 
          duration: '00:15:00'
          restore: true
 
    template:   
    
      - binary_sensor:

          - name: hum_high_on
            state: >
              {{ is_state('switch.0x00158d0002d7bb2b_l1', 'off')
                 and (states('sensor.bathroom_humidity') | int >= (states('input_number.hum_high_on') | int))
                 and is_state('input_boolean.manual_vent', 'off')
              }}
            icon: >
              {% if is_state("binary_sensor.hum_high_on", "on") %}
              mdi:water-plus
              {% else %}
              mdi:water-plus-outline
              {% endif %}
              
          - name: hum_low_off
            state: >
              {{ is_state('switch.0x00158d0002d7bb2b_l1', 'on')
                 and (states('sensor.bathroom_humidity') | int <= (states('input_number.hum_low_off') | int))
                 and is_state('input_boolean.manual_vent', 'off')
              }}
            icon: >
              {% if is_state("binary_sensor.hum_low_off", "on") %}
              mdi:water-minus
              {% else %}
              mdi:water-minus-outline
              {% endif %}
              
    automation:
    
      - id: Автоматическое управление вытяжкой
        alias: auto_bathroom_ventilation
        initial_state: true
        trigger:
          - platform: state
            entity_id: binary_sensor.hum_high_on
            to: 'on'
          - platform: state
            entity_id: binary_sensor.hum_low_off
            to: 'on'
        action:
          - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.hum_high_on
                    state: 'on'
                sequence:
                  - service: switch.turn_on
                    data:
                      entity_id: switch.0x00158d0002d7bb2b_l1
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.hum_low_off
                    state: 'on'
                sequence:
                  - service: switch.turn_off
                    data:
                      entity_id: switch.0x00158d0002d7bb2b_l1
                      
      - id: Ручное управление вытяжкой
        alias: manual_bathroom_ventilation
        initial_state: true
        trigger:
  # Платформа состояний
          - platform: state
            entity_id: input_button.manual_vent
  # Платформа событий
          - platform: event
            event_type: timer.finished
            event_data:
              entity_id: timer.vent_off
        action:
          - choose:
              - conditions:
                  - "{{ trigger.platform == 'state' }}"
                  - condition: state
                    entity_id: switch.0x00158d0002d7bb2b_l1
                    state: 'off'
                sequence:
                  - service: timer.start
                    entity_id: timer.vent_off
                  - service: input_boolean.turn_on
                    target:
                      entity_id: input_boolean.manual_vent
                  - service: switch.turn_on
                    entity_id: switch.0x00158d0002d7bb2b_l1
              - conditions:
                  - "{{ trigger.platform == 'state' }}"
                  - condition: state
                    entity_id: switch.0x00158d0002d7bb2b_l1
                    state: 'on'
                sequence:
                  - service: timer.cancel
                    entity_id: timer.vent_off
                  - service: input_boolean.turn_off
                    target:
                      entity_id: input_boolean.manual_vent
                  - service: switch.turn_off
                    entity_id: switch.0x00158d0002d7bb2b_l1
              - conditions:
                  - "{{ trigger.platform == 'event' }}"
                sequence:
                  - service: input_boolean.turn_off
                    target:
                      entity_id: input_boolean.manual_vent
                  - service: switch.turn_off
                    entity_id: switch.0x00158d0002d7bb2b_l1

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