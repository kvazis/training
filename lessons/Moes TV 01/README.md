# Управление Zigbee термоголовкой Moes TV 01

```yaml
living_heat_1:
## Гостиная термоголовка 1

    homeassistant:
      customize:
        
        climate.0x2c1165fffec61c89:
          friendly_name: Гостиная, TRV 1
        lock.0x2c1165fffec61c89_child_lock:
          friendly_name: Гостиная, TRV 1 замок
        sensor.0x2c1165fffec61c89_boost_heating_countdown:
          friendly_name: Гостиная, TRV 1 boost таймер
        sensor.0x2c1165fffec61c89_battery:
          friendly_name: Гостиная, TRV 1
        switch.0x2c1165fffec61c89_frost_detection:
          friendly_name: Гостиная, TRV 1 антизамерзание
        switch.0x2c1165fffec61c89_heating_stop:
          friendly_name: Гостиная, TRV 1 стоп нагрев
        switch.0x2c1165fffec61c89_window_detection:
          friendly_name: Гостиная, TRV 1 окно
        number.0x2c1165fffec61c89_local_temperature_calibration:
          friendly_name: Гостиная, TRV 1 t калибровка
          unit_of_measurement: '°C'
        number.0x2c1165fffec61c89_comfort_temperature:
          friendly_name: Гостиная, TRV 1 t комфорт
          unit_of_measurement: '°C'
        number.0x2c1165fffec61c89_open_window_temperature:
          friendly_name: Гостиная, TRV 1 t окно
          unit_of_measurement: '°C'
        number.0x2c1165fffec61c89_holiday_temperature:
          friendly_name: Гостиная, TRV 1 t выходные
          unit_of_measurement: '°C'
        number.0x2c1165fffec61c89_eco_temperature:
          friendly_name: Гостиная, TRV 1 t эко
          unit_of_measurement: '°C'

    binary_sensor:
      - platform: template
        sensors:
          lr_aeration:
            friendly_name: "Проветривание"
            value_template: >-
              {{ is_state('binary_sensor.0x00158d000445206b_contact', 'on')  
                 or is_state('binary_sensor.0xec1bbdfffedf6a6a_contact', 'on')
                 or is_state('binary_sensor.0x00158d00013ed373_contact', 'on')
              }}
            delay_on: 
                seconds: 30
            delay_off: 
                seconds: 30
            device_class: window
            icon_template: >-
              {% if is_state("binary_sensor.lr_aeration", "on") %}
              mdi:window-open-variant
              {% else %}
              mdi:window-closed-variant
              {% endif %}


    automation:

      - id: Гостиная, TRV 1, режим
        alias: lr1_heating_initial
        initial_state: true
        trigger:
        - platform: homeassistant
          event: start
        - platform: state
          entity_id:
            - binary_sensor.radiator
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.radiator
                    state: 'on'
                  - condition: state
                    entity_id: climate.0x2c1165fffec61c89
                    state: 'off'
                sequence:
                  - service: climate.set_hvac_mode
                    target:
                      entity_id: climate.0x2c1165fffec61c89
                    data:
                      hvac_mode: heat
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.radiator
                    state: 'off'
                  - condition: state
                    entity_id: climate.0x2c1165fffec61c89
                    state: 'heat'
                sequence:
                  - service: climate.set_hvac_mode
                    target:
                      entity_id: climate.0x2c1165fffec61c89
                    data:
                      hvac_mode: 'off'

      - id: Гостиная, TRV 1, переключение температуры
        alias: lr1_heating_initial_temp
        initial_state: true
        trigger:
        - platform: state
          entity_id: binary_sensor.radiator
          from: 'off'
          to: 'on'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.lr_aeration
                    state: 'on'
                sequence:
                  - delay: 00:00:10
                  - service: climate.set_temperature
                    data:
                      entity_id: climate.0x2c1165fffec61c89
                      temperature: "{{ states('number.0x2c1165fffec61c89_open_window_temperature')}}"
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.lr_aeration
                    state: 'off'
                sequence:
                  - delay: 00:00:10
                  - service: climate.set_temperature
                    data:
                      entity_id: climate.0x2c1165fffec61c89
                      temperature: "{{ states('number.0x2c1165fffec61c89_comfort_temperature')}}"                      
                      
      - id: Гостиная, TRV 1, калибровка
        alias: lr1_temperature_calibration
        initial_state: true
        trigger:
          - platform: time_pattern
            minutes: "/30"
        condition:
          - condition: state
            entity_id: binary_sensor.radiator
            state: 'on' 
        action:
          - service: mqtt.publish
            data_template:   
               topic: zigstar/LR thermostat 1/set/local_temperature_calibration
               payload_template: "0.0"
          - delay: 00:00:10
          - service: mqtt.publish
            data_template:
               topic: zigstar/LR thermostat 1/set/local_temperature_calibration
               payload_template: "{{((states('sensor.0x00158d00015aebb6_temperature') | float - state_attr('climate.0x2c1165fffec61c89', 'local_temperature') | float))|round(1) }}"


      - id: Гостиная, TRV 1, температура
        alias: lr1_heating_set_temp
        initial_state: true
        trigger:
        - platform: homeassistant
          event: start
        - platform: state
          entity_id:
            - binary_sensor.lr_aeration
        condition:
          - condition: state
            entity_id: binary_sensor.radiator
            state: 'on' 
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.lr_aeration
                    state: 'on'
                sequence:
                  - service: climate.set_temperature
                    data:
                      entity_id: climate.0x2c1165fffec61c89
                      temperature: "{{ states('number.0x2c1165fffec61c89_open_window_temperature')}}"
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.lr_aeration
                    state: 'off'
                sequence:
                  - service: climate.set_temperature
                    data:
                      entity_id: climate.0x2c1165fffec61c89
                      temperature: "{{ states('number.0x2c1165fffec61c89_comfort_temperature')}}"
```