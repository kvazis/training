### [Энергомонитор постоянного тока на 10 А MSH, интеграция DC UPS в Home Assistant](https://youtu.be/aN7lhvkJzIM)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


:ballot_box_with_check: Пакадж из обзора    

```yaml
msh_dc_power:

    homeassistant:
      customize:

        sensor.battery_voltage:
          friendly_name: DC UPS, напряжение
          device_class: voltage
          unit_of_measurement: V
          
        sensor.battery_current:
          friendly_name: DC UPS, ток
          device_class: current
          unit_of_measurement: A

        sensor.battery_power:
          friendly_name: DC UPS, мощность
          device_class: power
          unit_of_measurement: W
          
        sensor.battery_energy:
          friendly_name: DC UPS, энергия
          device_class: energy
          unit_of_measurement: Wh
          
        sensor.battery_level:
          friendly_name: DC UPS, заряд
          device_class: battery
          unit_of_measurement: "%"
          
        sensor.battery_state:
          friendly_name: DC UPS, состояние

    input_number:
      batt_volt_max:
        name: Напряжение заряда
        min: 10
        max: 20
        step: 0.1
      batt_volt_min:
        name: Напряжение отключения
        min: 10
        max: 20
        step: 0.1

    input_datetime:
      ups_start:
        name: Старт
        has_date: true
        has_time: true
        
      ups_stop:
        name: Стоп
        has_date: true
        has_time: true

    template:
      - sensor:

          - name: battery_voltage
            state: >
                {{ ((states('sensor.0x00124b00199e40bf_val1_l2')|float)/100) |round(2) }}

          - name: battery_current
            state: >
                {{ ((states('sensor.0x00124b00199e40bf_val2_l2')|float)/100) |round(2) }}
            
          - name: battery_power
            state: >
                {{ ((states('sensor.0x00124b00199e40bf_val3_l2')|float)/10) |round(2) }}
            
          - name: battery_energy
            state: >
                {{ ((states('sensor.0x00124b00199e40bf_val5_l2')|float)) |round(2) }}
                
          - name: battery_level
            state: >
                {% set vmax = states('input_number.batt_volt_max') | float %}
                {% set vrange = (states('input_number.batt_volt_max') | float - states('input_number.batt_volt_min') | float) %}
                {% if states('sensor.battery_current') | float  <= 0.05 | float %}
                100
                {% elif states('sensor.battery_voltage') | float  >= vmax | float 
                   and states('sensor.battery_current') | float  > 0.05 | float %}
                99                
                {% else %}
                {{ (100 - (vmax - states('sensor.battery_voltage')|float)*100/vrange)|round(2) }}
                {% endif %}

          - name: battery_state
            state: >
                {% if is_state('binary_sensor.electricity', 'off')
                  and states('sensor.battery_current') | float  <= 0.05 %}
                Батарея заряжена
                {% elif is_state('binary_sensor.electricity', 'off')
                   and states('sensor.battery_current') | float  > 0.05 %}
                Батарея заряжается               
                {% elif is_state('binary_sensor.electricity', 'on')
                   and states('sensor.battery_level') | float > 10 %}
                Работа от аккумулятора
                {% elif is_state('binary_sensor.electricity', 'on')
                   and states('sensor.battery_level') | float <= 10 %}
                Низкий уровень заряда
                {% endif %}
            icon: >
              {% if is_state("sensor.battery_state", "Батарея заряжена") %}
              mdi:power-plug-battery
              {% elif is_state("sensor.battery_state", "Батарея заряжается") %}
              mdi:battery-charging-high
              {% elif is_state("sensor.battery_state", "Работа от аккумулятора") %}
              mdi:battery-medium
              {% elif is_state("sensor.battery_state", "Низкий уровень заряда") %}
              mdi:battery-low
              {% endif %}


    automation:        
        
      - alias: ups_log_work
        id: ups_log_work
        description: Логирование работы UPS
        initial_state: true
        trigger:
    # Изменение сенсора состояния
        - platform: state
          entity_id: sensor.battery_state
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: sensor.battery_state
                    state: "Работа от аккумулятора"
                sequence:
                  - service: mqtt.publish
                    data:
                      topic: zigbee2mqtt/0x00124b00199e40bf/set
                      payload: "{\"action\": [4,1,66,128,17]}"                
                  - service: input_datetime.set_datetime
                    target:
                      entity_id: input_datetime.ups_start
                    data:
                      datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
                  - service: persistent_notification.create
                    data:
                      message: "Отключено внешнее питание в {{ states('sensor.time_date') }}, UPS работает от аккумулятора"
                      title: "Внимание" 
              - conditions:
                  - condition: state
                    entity_id: sensor.battery_state
                    state: "Батарея заряжается"
                sequence:        
                  - service: input_datetime.set_datetime
                    target:
                      entity_id: input_datetime.ups_stop
                    data:
                      datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
                  - service: persistent_notification.create
                    data:
                      message: | 
                           {% set s = (strptime(states("input_datetime.ups_stop"), "%Y-%m-%d %H:%M:%S").timestamp() | int - strptime(states("input_datetime.ups_start"), "%Y-%m-%d %H:%M:%S").timestamp() | int) %}
                           {{ 'UPS продержал - {:02d}:{:02d}:{:02d}'.format ( s % 86400 // 3600, s % 3600 // 60, s % 60) }}
                           "Отдано энергии {{ states('sensor.battery_energy') }} Ватт часов"
                      title: "Питание восстановлено"        
                  - delay: 00:00:02
                  - service: mqtt.publish
                    data:
                      topic: zigbee2mqtt/0x00124b00199e40bf/set
                      payload: "{\"action\": [4,1,66,128,17]}"                
                  - service: input_datetime.set_datetime
                    target:
                      entity_id: input_datetime.ups_start
                    data:
                      datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
              - conditions:
                  - condition: state
                    entity_id: sensor.battery_state
                    state: "Батарея заряжена"
                sequence:  
                  - service: input_datetime.set_datetime
                    target:
                      entity_id: input_datetime.ups_stop
                    data:
                      datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
                  - service: persistent_notification.create
                    data:
                      message: | 
                           {% set s = (strptime(states("input_datetime.ups_stop"), "%Y-%m-%d %H:%M:%S").timestamp() | int - strptime(states("input_datetime.ups_start"), "%Y-%m-%d %H:%M:%S").timestamp() | int) %}
                           {{ 'Аккумулятор заряжался - {:02d}:{:02d}:{:02d}'.format ( s % 86400 // 3600, s % 3600 // 60, s % 60) }}
                           "Получено энергии {{ states('sensor.battery_energy') }} Ватт часов"
                      title: "Батарея заряжена" 
              - conditions:
                  - condition: state
                    entity_id: sensor.battery_state
                    state: "Низкий уровень заряда"
                sequence:  
                  - service: persistent_notification.create
                    data:
                      message: | 
                           "Низкий уровень заряда - {{ states('sensor.battery_level') }} % , время события {{ states('sensor.time_date') }} "
                           "На данный момент отдано энергии {{ states('sensor.battery_energy') }} Ватт часов"
                      title: "Внимание" 

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