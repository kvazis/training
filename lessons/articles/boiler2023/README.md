### [Home Assistant - планировщик включения питания с настройкой времени и продолжительности работы](https://youtu.be/554WOsyl0-Y)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


:ballot_box_with_check: Запись в configuration.yaml для пакаджей    

```yaml
homeassistant:
  packages: !include_dir_merge_named includes/packages
```    

:ballot_box_with_check: Пакадж из обзора    

```yaml

boiler_2023:


    recorder:
      include:
        entities:
           - switch.0x60a423fffe7ff8c8
           - sensor.0x60a423fffe7ff8c8_power
           - sensor.0x60a423fffe7ff8c8_energy

    homeassistant:
      customize:
      
        switch.0x60a423fffe7ff8c8:
          friendly_name: Бойлер
          icon: mdi:water-boiler

        sensor.0x60a423fffe7ff8c8_power:
          friendly_name: Бойлер мощность
          unit_of_measurement: Вт
          device_class: power

        sensor.0x60a423fffe7ff8c8_energy:
          friendly_name: Бойлер энергия
          unit_of_measurement: kWh
          state_class: total_increasing
          device_class: energy
          
    input_datetime:
      0x60a423fffe7ff8c8_timer:
        name: Бойлер таймер
        has_date: false
        has_time: true
        
      0x60a423fffe7ff8c8_period:
        name: Бойлер период
        has_date: false
        has_time: true

    input_button:

      0x60a423fffe7ff8c8_timer_1:
        name: Бойлер - установка таймера 1
        
      0x60a423fffe7ff8c8_timer_2:
        name: Бойлер - установка таймера 2
        
      0x60a423fffe7ff8c8_timer_3:
        name: Бойлер - установка таймера 3
        
      0x60a423fffe7ff8c8_timer_4:
        name: Бойлер - установка таймера 4
        
      0x60a423fffe7ff8c8_timer_5:
        name: Бойлер - установка таймера 5
        
      0x60a423fffe7ff8c8_timer_manual:
        name: Бойлер - установка ручного таймера
        
      0x60a423fffe7ff8c8_period_1:
        name: Бойлер - установка периода 1

      0x60a423fffe7ff8c8_period_2:
        name: Бойлер - установка периода 2

      0x60a423fffe7ff8c8_period_3:
        name: Бойлер - установка периода 3

      0x60a423fffe7ff8c8_period_4:
        name: Бойлер - установка периода 4
        
      0x60a423fffe7ff8c8_period_5:
        name: Бойлер - установка периода 5

    timer:

        '0x60a423fffe7ff8c8':
          name: Бойлер - 
          restore: true
          
    template:
    
      - trigger:
          - platform: time_pattern
            seconds: "/10"
        sensor:
          - name: time_10_sec
            state: '{{ as_timestamp(now()) | round(default=0)}}'
            
      - binary_sensor:
      
    # Сенсор активности с устранением паразитных срабатываний
          - name: '0x60a423fffe7ff8c8_switch'
            unique_id: '0x60a423fffe7ff8c8_switch'
            state: >
              {{ is_state('switch.0x60a423fffe7ff8c8', 'on')  
              }}
            delay_on: 00:00:01
            delay_off: 00:00:01
            device_class: power

    # Сенсор сработки 1 периода
          - name: '0x60a423fffe7ff8c8_period_1_on'
            unique_id: '0x60a423fffe7ff8c8_period_1_on'
            state: >
                {{ is_state('switch.0x60a423fffe7ff8c8_mode', 'on')  and
                   is_state('switch.0x60a423fffe7ff8c8_period_1_mode', 'on')  and
                   states("sensor.custom_time") == states("sensor.0x60a423fffe7ff8c8_period_1")}}
            device_class: running

    # Сенсор сработки 2 периода
          - name: '0x60a423fffe7ff8c8_period_2_on'
            unique_id: '0x60a423fffe7ff8c8_period_2_on'
            state: >
                {{ is_state('switch.0x60a423fffe7ff8c8_mode', 'on')  and
                   is_state('switch.0x60a423fffe7ff8c8_period_2_mode', 'on')  and
                   states("sensor.custom_time") == states("sensor.0x60a423fffe7ff8c8_period_2")}}
            device_class: running
            
    # Сенсор сработки 3 периода
          - name: '0x60a423fffe7ff8c8_period_3_on'
            unique_id: '0x60a423fffe7ff8c8_period_3_on'
            state: >
                {{ is_state('switch.0x60a423fffe7ff8c8_mode', 'on')  and
                   is_state('switch.0x60a423fffe7ff8c8_period_3_mode', 'on')  and
                   states("sensor.custom_time") == states("sensor.0x60a423fffe7ff8c8_period_3")}}
            device_class: running
            
    # Сенсор сработки 4 периода
          - name: '0x60a423fffe7ff8c8_period_4_on'
            unique_id: '0x60a423fffe7ff8c8_period_4_on'
            state: >
                {{ is_state('switch.0x60a423fffe7ff8c8_mode', 'on')  and
                   is_state('switch.0x60a423fffe7ff8c8_period_4_mode', 'on')  and
                   states("sensor.custom_time") == states("sensor.0x60a423fffe7ff8c8_period_4")}}
            device_class: running
            
    # Сенсор сработки 5 периода
          - name: '0x60a423fffe7ff8c8_period_5_on'
            unique_id: '0x60a423fffe7ff8c8_period_5_on'
            state: >
                {{ is_state('switch.0x60a423fffe7ff8c8_mode', 'on')  and
                   is_state('switch.0x60a423fffe7ff8c8_period_5_mode', 'on')  and
                   states("sensor.custom_time") == states("sensor.0x60a423fffe7ff8c8_period_5")}}
            device_class: running

    # Сенсор определения автоматического включения
          - name: '0x60a423fffe7ff8c8_manual'
            unique_id: '0x60a423fffe7ff8c8_manual'
            state: >
                {{ is_state('binary_sensor.0x60a423fffe7ff8c8_period_1_on', 'on')  or
                   is_state('binary_sensor.0x60a423fffe7ff8c8_period_2_on', 'on')  or
                   is_state('binary_sensor.0x60a423fffe7ff8c8_period_3_on', 'on')  or
                   is_state('binary_sensor.0x60a423fffe7ff8c8_period_4_on', 'on')  or
                   is_state('binary_sensor.0x60a423fffe7ff8c8_period_5_on', 'on')    
                }}
            device_class: running
            
        sensor:

          - name: custom_time
            state: >
              {{states("sensor.time_10_sec") | int | timestamp_custom("%H:%M:%S") }}

    mqtt:

      binary_sensor:
        - name: '0x60a423fffe7ff8c8_mode'
          unique_id: '0x60a423fffe7ff8c8_mode'
          state_topic: "states/0x60a423fffe7ff8c8/mode"
          
        - name: '0x60a423fffe7ff8c8_period_1_mode'
          unique_id: '0x60a423fffe7ff8c8_period_1_mode'
          state_topic: "states/0x60a423fffe7ff8c8/period_1_mode"
          
        - name: '0x60a423fffe7ff8c8_period_2_mode'
          unique_id: '0x60a423fffe7ff8c8_period_2_mode'
          state_topic: "states/0x60a423fffe7ff8c8/period_2_mode"
          
        - name: '0x60a423fffe7ff8c8_period_3_mode'
          unique_id: '0x60a423fffe7ff8c8_period_3_mode'
          state_topic: "states/0x60a423fffe7ff8c8/period_3_mode"
          
        - name: '0x60a423fffe7ff8c8_period_4_mode'
          unique_id: '0x60a423fffe7ff8c8_period_4_mode'
          state_topic: "states/0x60a423fffe7ff8c8/period_4_mode"
          
        - name: '0x60a423fffe7ff8c8_period_5_mode'
          unique_id: '0x60a423fffe7ff8c8_period_5_mode'
          state_topic: "states/0x60a423fffe7ff8c8/period_5_mode"
          
      sensor:
        - name: '0x60a423fffe7ff8c8_timer_1'
          unique_id: '0x60a423fffe7ff8c8_timer_1'          
          state_topic: "states/0x60a423fffe7ff8c8/timer_1"

        - name: '0x60a423fffe7ff8c8_timer_2'
          unique_id: '0x60a423fffe7ff8c8_timer_2' 
          state_topic: "states/0x60a423fffe7ff8c8/timer_2"
          
        - name: '0x60a423fffe7ff8c8_timer_3'
          unique_id: '0x60a423fffe7ff8c8_timer_3' 
          state_topic: "states/0x60a423fffe7ff8c8/timer_3"
          
        - name: '0x60a423fffe7ff8c8_timer_4'
          unique_id: '0x60a423fffe7ff8c8_timer_4' 
          state_topic: "states/0x60a423fffe7ff8c8/timer_4"
          
        - name: '0x60a423fffe7ff8c8_timer_5'
          unique_id: '0x60a423fffe7ff8c8_timer_5' 
          state_topic: "states/0x60a423fffe7ff8c8/timer_5"
          
        - name: '0x60a423fffe7ff8c8_timer_manual'
          unique_id: '0x60a423fffe7ff8c8_timer_manual' 
          state_topic: "states/0x60a423fffe7ff8c8/timer_manual"
          
        - name: '0x60a423fffe7ff8c8_period_1'
          unique_id: '0x60a423fffe7ff8c8_period_1'          
          state_topic: "states/0x60a423fffe7ff8c8/period_1"
          
        - name: '0x60a423fffe7ff8c8_period_2'
          unique_id: '0x60a423fffe7ff8c8_period_2'          
          state_topic: "states/0x60a423fffe7ff8c8/period_2"
          
        - name: '0x60a423fffe7ff8c8_period_3'
          unique_id: '0x60a423fffe7ff8c8_period_3'          
          state_topic: "states/0x60a423fffe7ff8c8/period_3"
          
        - name: '0x60a423fffe7ff8c8_period_4'
          unique_id: '0x60a423fffe7ff8c8_period_4'          
          state_topic: "states/0x60a423fffe7ff8c8/period_4"          
          
        - name: '0x60a423fffe7ff8c8_period_5'
          unique_id: '0x60a423fffe7ff8c8_period_5'          
          state_topic: "states/0x60a423fffe7ff8c8/period_5"
          
    switch:
    
      - platform: template
        switches:

          0x60a423fffe7ff8c8_mode:
            friendly_name: "Режим работы Бойлер"
            unique_id: '0x60a423fffe7ff8c8_mode_switch'
            value_template: "{{ is_state('binary_sensor.0x60a423fffe7ff8c8_mode', 'on') }}"
            turn_on:
              service: mqtt.publish
              data_template:
                topic: "states/0x60a423fffe7ff8c8/mode"
                payload_template: 'ON'
                retain: true 
            turn_off:
              service: mqtt.publish
              data_template:
                topic: "states/0x60a423fffe7ff8c8/mode"
                payload_template: 'OFF'
                retain: true 
            icon_template: >-
              {% if is_state('switch.0x60a423fffe7ff8c8_mode', 'on') %}
                mdi:water-boiler
              {% else %}
                mdi:water-boiler-off
              {% endif %}          
          
          0x60a423fffe7ff8c8_period_1_mode:
            friendly_name: "Бойлер - период 1"
            unique_id: '0x60a423fffe7ff8c8_period_1_mode_switch'
            value_template: "{{ is_state('binary_sensor.0x60a423fffe7ff8c8_period_1_mode', 'on') }}"
            turn_on:
              service: mqtt.publish
              data_template:
                topic: "states/0x60a423fffe7ff8c8/period_1_mode"
                payload_template: 'ON'
                retain: true 
            turn_off:
              service: mqtt.publish
              data_template:
                topic: "states/0x60a423fffe7ff8c8/period_1_mode"
                payload_template: 'OFF'
                retain: true 
            icon_template: >-
              {% if is_state('switch.0x60a423fffe7ff8c8_period_1_mode', 'on') %}
                mdi:numeric-1-box
              {% else %}
                mdi:numeric-1-box-outline
              {% endif %}            
          
          0x60a423fffe7ff8c8_period_2_mode:
            friendly_name: "Бойлер - период 2"
            unique_id: '0x60a423fffe7ff8c8_period_2_mode_switch'
            value_template: "{{ is_state('binary_sensor.0x60a423fffe7ff8c8_period_2_mode', 'on') }}"
            turn_on:
              service: mqtt.publish
              data_template:
                topic: "states/0x60a423fffe7ff8c8/period_2_mode"
                payload_template: 'ON'
                retain: true 
            turn_off:
              service: mqtt.publish
              data_template:
                topic: "states/0x60a423fffe7ff8c8/period_2_mode"
                payload_template: 'OFF'
                retain: true 
            icon_template: >-
              {% if is_state('switch.0x60a423fffe7ff8c8_period_2_mode', 'on') %}
                mdi:numeric-2-box
              {% else %}
                mdi:numeric-2-box-outline
              {% endif %}
              
          0x60a423fffe7ff8c8_period_3_mode:
            friendly_name: "Бойлер - период 3"
            unique_id: '0x60a423fffe7ff8c8_period_3_mode_switch'
            value_template: "{{ is_state('binary_sensor.0x60a423fffe7ff8c8_period_3_mode', 'on') }}"
            turn_on:
              service: mqtt.publish
              data_template:
                topic: "states/0x60a423fffe7ff8c8/period_3_mode"
                payload_template: 'ON'
                retain: true 
            turn_off:
              service: mqtt.publish
              data_template:
                topic: "states/0x60a423fffe7ff8c8/period_3_mode"
                payload_template: 'OFF'
                retain: true 
            icon_template: >-
              {% if is_state('switch.0x60a423fffe7ff8c8_period_3_mode', 'on') %}
                mdi:numeric-3-box
              {% else %}
                mdi:numeric-3-box-outline
              {% endif %}
              
          0x60a423fffe7ff8c8_period_4_mode:
            friendly_name: "Бойлер - период 4"
            unique_id: '0x60a423fffe7ff8c8_period_4_mode_switch'
            value_template: "{{ is_state('binary_sensor.0x60a423fffe7ff8c8_period_4_mode', 'on') }}"
            turn_on:
              service: mqtt.publish
              data_template:
                topic: "states/0x60a423fffe7ff8c8/period_4_mode"
                payload_template: 'ON'
                retain: true 
            turn_off:
              service: mqtt.publish
              data_template:
                topic: "states/0x60a423fffe7ff8c8/period_4_mode"
                payload_template: 'OFF'
                retain: true 
            icon_template: >-
              {% if is_state('switch.0x60a423fffe7ff8c8_period_4_mode', 'on') %}
                mdi:numeric-4-box
              {% else %}
                mdi:numeric-4-box-outline
              {% endif %}
              
          0x60a423fffe7ff8c8_period_5_mode:
            friendly_name: "Бойлер - период 5"
            unique_id: '0x60a423fffe7ff8c8_period_5_mode_switch'
            value_template: "{{ is_state('binary_sensor.0x60a423fffe7ff8c8_period_5_mode', 'on') }}"
            turn_on:
              service: mqtt.publish
              data_template:
                topic: "states/0x60a423fffe7ff8c8/period_5_mode"
                payload_template: 'ON'
                retain: true 
            turn_off:
              service: mqtt.publish
              data_template:
                topic: "states/0x60a423fffe7ff8c8/period_5_mode"
                payload_template: 'OFF'
                retain: true 
            icon_template: >-
              {% if is_state('switch.0x60a423fffe7ff8c8_period_5_mode', 'on') %}
                mdi:numeric-5-box
              {% else %}
                mdi:numeric-5-box-outline
              {% endif %}


    automation:

      - alias: 0x60a423fffe7ff8c8_period
        id: 0x60a423fffe7ff8c8_period
        description: Бойлер установка периода
        initial_state: true
        trigger:
    ## Виртуальная кнопка 1
        - platform: state
          entity_id: input_button.0x60a423fffe7ff8c8_period_1
          id: period_1
    ## Виртуальная кнопка 2
        - platform: state
          entity_id: input_button.0x60a423fffe7ff8c8_period_2
          id: period_2
    ## Виртуальная кнопка 3
        - platform: state
          entity_id: input_button.0x60a423fffe7ff8c8_period_3
          id: period_3
    ## Виртуальная кнопка 4
        - platform: state
          entity_id: input_button.0x60a423fffe7ff8c8_period_4
          id: period_4
    ## Виртуальная кнопка 5
        - platform: state
          entity_id: input_button.0x60a423fffe7ff8c8_period_5
          id: period_5
        action:
            - choose:
              - conditions:
                  - condition: trigger
                    id: period_1
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/0x60a423fffe7ff8c8/period_1"
                      payload_template: "{{states('input_datetime.0x60a423fffe7ff8c8_period')}}"
                      retain: true
              - conditions:
                  - condition: trigger
                    id: period_2
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/0x60a423fffe7ff8c8/period_2"
                      payload_template: "{{states('input_datetime.0x60a423fffe7ff8c8_period')}}"
                      retain: true
              - conditions:
                  - condition: trigger
                    id: period_3
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/0x60a423fffe7ff8c8/period_3"
                      payload_template: "{{states('input_datetime.0x60a423fffe7ff8c8_period')}}"
                      retain: true
              - conditions:
                  - condition: trigger
                    id: period_4
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/0x60a423fffe7ff8c8/period_4"
                      payload_template: "{{states('input_datetime.0x60a423fffe7ff8c8_period')}}"
                      retain: true
              - conditions:
                  - condition: trigger
                    id: period_5
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/0x60a423fffe7ff8c8/period_5"
                      payload_template: "{{states('input_datetime.0x60a423fffe7ff8c8_period')}}"
                      retain: true 
                      
      - alias: 0x60a423fffe7ff8c8_timer
        id: 0x60a423fffe7ff8c8_timer
        description: Бойлер установка таймера
        initial_state: true
        trigger:
    ## Виртуальная кнопка 1
        - platform: state
          entity_id: input_button.0x60a423fffe7ff8c8_timer_1
          id: timer_1
    ## Виртуальная кнопка 2
        - platform: state
          entity_id: input_button.0x60a423fffe7ff8c8_timer_2
          id: timer_2
    ## Виртуальная кнопка 3
        - platform: state
          entity_id: input_button.0x60a423fffe7ff8c8_timer_3
          id: timer_3
    ## Виртуальная кнопка 4
        - platform: state
          entity_id: input_button.0x60a423fffe7ff8c8_timer_4
          id: timer_4
    ## Виртуальная кнопка 5
        - platform: state
          entity_id: input_button.0x60a423fffe7ff8c8_timer_5
          id: timer_5
    ## Виртуальная кнопка 6
        - platform: state
          entity_id: input_button.0x60a423fffe7ff8c8_timer_manual
          id: timer_manual
        action:
            - choose:
              - conditions:
                  - condition: trigger
                    id: timer_1
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/0x60a423fffe7ff8c8/timer_1"
                      payload_template: "{{states('input_datetime.0x60a423fffe7ff8c8_timer')}}"
                      retain: true
              - conditions:
                  - condition: trigger
                    id: timer_2
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/0x60a423fffe7ff8c8/timer_2"
                      payload_template: "{{states('input_datetime.0x60a423fffe7ff8c8_timer')}}"
                      retain: true
              - conditions:
                  - condition: trigger
                    id: timer_3
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/0x60a423fffe7ff8c8/timer_3"
                      payload_template: "{{states('input_datetime.0x60a423fffe7ff8c8_timer')}}"
                      retain: true
              - conditions:
                  - condition: trigger
                    id: timer_4
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/0x60a423fffe7ff8c8/timer_4"
                      payload_template: "{{states('input_datetime.0x60a423fffe7ff8c8_timer')}}"
                      retain: true
              - conditions:
                  - condition: trigger
                    id: timer_5
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/0x60a423fffe7ff8c8/timer_5"
                      payload_template: "{{states('input_datetime.0x60a423fffe7ff8c8_timer')}}"
                      retain: true 
              - conditions:
                  - condition: trigger
                    id: timer_manual
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "states/0x60a423fffe7ff8c8/timer_manual"
                      payload_template: "{{states('input_datetime.0x60a423fffe7ff8c8_timer')}}"
                      retain: true 


      - alias: 0x60a423fffe7ff8c8_period_on
        id: 0x60a423fffe7ff8c8_period_on
        description: Бойлер - включение по периодам
        initial_state: true
        trigger:    
    ## Сенсор перирода 1
        - platform: state
          entity_id: binary_sensor.0x60a423fffe7ff8c8_period_1_on
          from: 'off'
          to: 'on'
          id: period_1
    ## Сенсор перирода 2
        - platform: state
          entity_id: binary_sensor.0x60a423fffe7ff8c8_period_2_on
          from: 'off'
          to: 'on'
          id: period_2
    ## Сенсор перирода 3
        - platform: state
          entity_id: binary_sensor.0x60a423fffe7ff8c8_period_3_on
          from: 'off'
          to: 'on'
          id: period_3
    ## Сенсор перирода 4
        - platform: state
          entity_id: binary_sensor.0x60a423fffe7ff8c8_period_4_on
          from: 'off'
          to: 'on'
          id: period_4
    ## Сенсор перирода 5
        - platform: state
          entity_id: binary_sensor.0x60a423fffe7ff8c8_period_5_on
          from: 'off'
          to: 'on'
          id: period_5
        condition:
         - condition: state
           entity_id: switch.0x60a423fffe7ff8c8
           state: 'off'
        action:
            - choose:
              - conditions:
                  - condition: trigger
                    id: period_1
                sequence:
                   - service: switch.turn_on
                     entity_id: switch.0x60a423fffe7ff8c8
                   - service: timer.start
                     entity_id: timer.0x60a423fffe7ff8c8
                     data_template: 
                         duration: >
                               {{strptime(states("sensor.0x60a423fffe7ff8c8_timer_1"), "%H:%M:%S").time()}}
                   - service: telegram_bot.send_message
                     data_template:
                       target:
                          - !secret telegram_id_1
                       message: | 
                           {{"\U0001F916"}} Бойлер - включение период 1 {{ states('sensor.time_date') }} 
              - conditions:
                  - condition: trigger
                    id: period_2
                sequence:
                   - service: switch.turn_on
                     entity_id: switch.0x60a423fffe7ff8c8
                   - service: timer.start
                     entity_id: timer.0x60a423fffe7ff8c8
                     data_template: 
                         duration: >
                               {{strptime(states("sensor.0x60a423fffe7ff8c8_timer_2"), "%H:%M:%S").time()}}
                   - service: telegram_bot.send_message
                     data_template:
                       target:
                           - !secret telegram_id_1
                       message: | 
                            {{"\U0001F916"}} Бойлер - включение период 2 {{ states('sensor.time_date') }} 
              - conditions:
                  - condition: trigger
                    id: period_3
                sequence:
                   - service: switch.turn_on
                     entity_id: switch.0x60a423fffe7ff8c8
                   - service: timer.start
                     entity_id: timer.0x60a423fffe7ff8c8
                     data_template: 
                         duration: >
                               {{strptime(states("sensor.0x60a423fffe7ff8c8_timer_3"), "%H:%M:%S").time()}}
                   - service: telegram_bot.send_message
                     data_template:
                       target:
                           - !secret telegram_id_1
                       message: | 
                            {{"\U0001F916"}} Бойлер - включение период 3 {{ states('sensor.time_date') }} 
              - conditions:
                  - condition: trigger
                    id: period_4
                sequence:
                   - service: switch.turn_on
                     entity_id: switch.0x60a423fffe7ff8c8
                   - service: timer.start
                     entity_id: timer.0x60a423fffe7ff8c8
                     data_template: 
                         duration: >
                               {{strptime(states("sensor.0x60a423fffe7ff8c8_timer_4"), "%H:%M:%S").time()}}
                   - service: telegram_bot.send_message
                     data_template:
                       target:
                           - !secret telegram_id_1
                       message: | 
                            {{"\U0001F916"}} Бойлер - включение период 4 {{ states('sensor.time_date') }} 
              - conditions:
                  - condition: trigger
                    id: period_5
                sequence:
                   - service: switch.turn_on
                     entity_id: switch.0x60a423fffe7ff8c8
                   - service: timer.start
                     entity_id: timer.0x60a423fffe7ff8c8
                     data_template: 
                         duration: >
                               {{strptime(states("sensor.0x60a423fffe7ff8c8_timer_5"), "%H:%M:%S").time()}}
                   - service: telegram_bot.send_message
                     data_template:
                       target:
                           - !secret telegram_id_1
                       message: | 
                            {{"\U0001F916"}} Бойлер - включение период 5 {{ states('sensor.time_date') }} 

      - alias: 0x60a423fffe7ff8c8_manual
        id: 0x60a423fffe7ff8c8_manual
        description: Бойлер - ручное включение
        initial_state: true
        trigger:    
         - platform: state
           entity_id: binary_sensor.0x60a423fffe7ff8c8_switch
           from: 'off'
           to: 'on'
        condition:
         - condition: state
           entity_id: binary_sensor.0x60a423fffe7ff8c8_manual
           state: 'off'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: switch.0x60a423fffe7ff8c8_mode
                    state: 'off'
                sequence:
                  - service: switch.turn_off
                    entity_id: switch.0x60a423fffe7ff8c8
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                          - !secret telegram_id_1
                      message: | 
                           {{"\U0001F916"}} Бойлер - Включение запрещено {{ states('sensor.time_date') }} 
              - conditions:
                  - condition: state
                    entity_id: switch.0x60a423fffe7ff8c8_mode
                    state: 'on'
                sequence:
                   - service: timer.start
                     entity_id: timer.0x60a423fffe7ff8c8
                     data_template: 
                         duration: >
                               {{strptime(states("sensor.0x60a423fffe7ff8c8_timer_manual"), "%H:%M:%S").time()}}
                   - service: telegram_bot.send_message
                     data_template:
                       target:
                           - !secret telegram_id_1
                       message: | 
                            {{"\U0001F916"}} Бойлер - ручное включение {{ states('sensor.time_date') }} 
                           
      - alias: 0x60a423fffe7ff8c8_off
        id: 0x60a423fffe7ff8c8_off
        description: Бойлер - выключение
        initial_state: true
        trigger:    
         - platform: state
           entity_id: switch.0x60a423fffe7ff8c8_mode
           from: 'on'
           to: 'off'
         - platform: event
           event_type: timer.finished
           event_data:
             entity_id: timer.0x60a423fffe7ff8c8
        action:
         - service: switch.turn_off
           entity_id: switch.0x60a423fffe7ff8c8
           
      - alias: 0x60a423fffe7ff8c8_off_message
        id: 0x60a423fffe7ff8c8_off_message
        description: Бойлер - выключение уведомление
        initial_state: true
        trigger:    
         - platform: state
           entity_id: binary_sensor.0x60a423fffe7ff8c8_switch
           from: 'on'
           to: 'off'
        action:
         - service: timer.cancel
           entity_id: timer.0x60a423fffe7ff8c8
         - service: telegram_bot.send_message
           data_template:
             target:
                 - !secret telegram_id_1
             message: | 
                  {{"\U0001F916"}} Бойлер - выключение {{ states('sensor.time_date') }} 

```    


:ballot_box_with_check: Оформление в интерфейсе    

```yaml
    - type: vertical-stack
      cards:

        - type: custom:stack-in-card
          mode: vertical
          cards:

            - type: entities
              show_header_toggle: false
              entities:
                - entity: sensor.custom_time
                  name: Текущее время
                - entity: switch.0x60a423fffe7ff8c8_mode

                - entity: switch.0x60a423fffe7ff8c8
                  type: custom:multiple-entity-row
                  toggle: true
                  state_color: true
                  name: Бойлер
                  secondary_info: last-changed
                  state_header: Питание
                  entities:
                  - entity: sensor.0x60a423fffe7ff8c8_timer_manual
                    name: Таймер M
                  - entity: sensor.0x60a423fffe7ff8c8_power
                    name: Мощность
                    unit: 'Ватт'


            - type: conditional
              conditions:
                - entity: switch.0x60a423fffe7ff8c8
                  state: "on"
              card:
                  type: custom:timer-bar-card
                  entities:
                  - entity: timer.0x60a423fffe7ff8c8
                    name: Осталось - 
                  modifications:
                  - elapsed: 30%
                    bar_foreground: yellow
                  - elapsed: 60%
                    bar_foreground: orange
                  - elapsed: 90%
                    bar_foreground: red
                  bar_height: 20px
                  sync_issues: ignore
                  invert: true

        - type: custom:stack-in-card
          mode: vertical
          cards:

            - type: entities
              show_header_toggle: false
              entities:
                - entity: input_datetime.0x60a423fffe7ff8c8_period

            - type: horizontal-stack
        
              cards:

                - type: custom:mushroom-template-card
                  layout: horizontal
                  entity: input_button.0x60a423fffe7ff8c8_period_1
                  icon: mdi:numeric-1-circle
                  multiline_secondary: true
                  icon_color: grey
                  tap_action:
                    action: call-service
                    service: input_button.press
                    target:
                      entity_id: input_button.0x60a423fffe7ff8c8_period_1

                - type: custom:mushroom-template-card
                  layout: horizontal
                  entity: input_button.0x60a423fffe7ff8c8_period_2
                  icon: mdi:numeric-2-circle
                  multiline_secondary: true
                  icon_color: grey
                  tap_action:
                    action: call-service
                    service: input_button.press
                    target:
                      entity_id: input_button.0x60a423fffe7ff8c8_period_2

                - type: custom:mushroom-template-card
                  layout: horizontal
                  entity: input_button.0x60a423fffe7ff8c8_period_3
                  icon: mdi:numeric-3-circle
                  multiline_secondary: true
                  icon_color: grey
                  tap_action:
                    action: call-service
                    service: input_button.press
                    target:
                      entity_id: input_button.0x60a423fffe7ff8c8_period_3
                      
                - type: custom:mushroom-template-card
                  layout: horizontal
                  entity: input_button.0x60a423fffe7ff8c8_period_4
                  icon: mdi:numeric-4-circle
                  multiline_secondary: true
                  icon_color: grey
                  tap_action:
                    action: call-service
                    service: input_button.press
                    target:
                      entity_id: input_button.0x60a423fffe7ff8c8_period_4

                - type: custom:mushroom-template-card
                  layout: horizontal
                  entity: input_button.0x60a423fffe7ff8c8_period_5
                  icon: mdi:numeric-5-circle
                  multiline_secondary: true
                  icon_color: grey
                  tap_action:
                    action: call-service
                    service: input_button.press
                    target:
                      entity_id: input_button.0x60a423fffe7ff8c8_period_5

            - type: entities
              show_header_toggle: false
              entities:
                - entity: input_datetime.0x60a423fffe7ff8c8_timer

            - type: horizontal-stack
        
              cards:

                - type: custom:mushroom-template-card
                  layout: horizontal
                  entity: input_button.0x60a423fffe7ff8c8_timer_1
                  icon: mdi:numeric-1-circle
                  multiline_secondary: true
                  icon_color: grey
                  tap_action:
                    action: call-service
                    service: input_button.press
                    target:
                      entity_id: input_button.0x60a423fffe7ff8c8_timer_1

                - type: custom:mushroom-template-card
                  layout: horizontal
                  entity: input_button.0x60a423fffe7ff8c8_timer_2
                  icon: mdi:numeric-2-circle
                  multiline_secondary: true
                  icon_color: grey
                  tap_action:
                    action: call-service
                    service: input_button.press
                    target:
                      entity_id: input_button.0x60a423fffe7ff8c8_timer_2

                - type: custom:mushroom-template-card
                  layout: horizontal
                  entity: input_button.0x60a423fffe7ff8c8_timer_3
                  icon: mdi:numeric-3-circle
                  multiline_secondary: true
                  icon_color: grey
                  tap_action:
                    action: call-service
                    service: input_button.press
                    target:
                      entity_id: input_button.0x60a423fffe7ff8c8_timer_3
                      
                - type: custom:mushroom-template-card
                  layout: horizontal
                  entity: input_button.0x60a423fffe7ff8c8_timer_4
                  icon: mdi:numeric-4-circle
                  multiline_secondary: true
                  icon_color: grey
                  tap_action:
                    action: call-service
                    service: input_button.press
                    target:
                      entity_id: input_button.0x60a423fffe7ff8c8_timer_4

                - type: custom:mushroom-template-card
                  layout: horizontal
                  entity: input_button.0x60a423fffe7ff8c8_timer_5
                  icon: mdi:numeric-5-circle
                  multiline_secondary: true
                  icon_color: grey
                  tap_action:
                    action: call-service
                    service: input_button.press
                    target:
                      entity_id: input_button.0x60a423fffe7ff8c8_timer_5
                      
                - type: custom:mushroom-template-card
                  layout: horizontal
                  entity: input_button.0x60a423fffe7ff8c8_timer_manual
                  icon: mdi:alpha-m-circle-outline
                  multiline_secondary: true
                  icon_color: grey
                  tap_action:
                    action: call-service
                    service: input_button.press
                    target:
                      entity_id: input_button.0x60a423fffe7ff8c8_timer_manual

    - type: vertical-stack
      cards:

        - type: custom:stack-in-card
          mode: vertical
          cards:



            - type: entities
              show_header_toggle: false
              entities:

                - entity: switch.0x60a423fffe7ff8c8_period_1_mode
                  type: custom:multiple-entity-row
                  toggle: true
                  state_color: true
                  name: Период 1
                  secondary_info: last-changed
                  state_header: Активность
                  entities:
                  - entity: sensor.0x60a423fffe7ff8c8_timer_1
                    name: Таймер
                  - entity: sensor.0x60a423fffe7ff8c8_period_1
                    name: Старт
                    
                - entity: switch.0x60a423fffe7ff8c8_period_2_mode
                  type: custom:multiple-entity-row
                  toggle: true
                  state_color: true
                  name: Период 2
                  secondary_info: last-changed
                  state_header: Активность
                  entities:
                  - entity: sensor.0x60a423fffe7ff8c8_timer_2
                    name: Таймер
                  - entity: sensor.0x60a423fffe7ff8c8_period_2
                    name: Старт
                    
                - entity: switch.0x60a423fffe7ff8c8_period_3_mode
                  type: custom:multiple-entity-row
                  toggle: true
                  state_color: true
                  name: Период 3
                  secondary_info: last-changed
                  state_header: Активность
                  entities:
                  - entity: sensor.0x60a423fffe7ff8c8_timer_3
                    name: Таймер
                  - entity: sensor.0x60a423fffe7ff8c8_period_3
                    name: Старт
                    
                - entity: switch.0x60a423fffe7ff8c8_period_4_mode
                  type: custom:multiple-entity-row
                  toggle: true
                  state_color: true
                  name: Период 4
                  secondary_info: last-changed
                  state_header: Активность
                  entities:
                  - entity: sensor.0x60a423fffe7ff8c8_timer_4
                    name: Таймер
                  - entity: sensor.0x60a423fffe7ff8c8_period_4
                    name: Старт
                    
                - entity: switch.0x60a423fffe7ff8c8_period_5_mode
                  type: custom:multiple-entity-row
                  toggle: true
                  state_color: true
                  name: Период 5
                  secondary_info: last-changed
                  state_header: Активность
                  entities:
                  - entity: sensor.0x60a423fffe7ff8c8_timer_5
                    name: Таймер
                  - entity: sensor.0x60a423fffe7ff8c8_period_5
                    name: Старт
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