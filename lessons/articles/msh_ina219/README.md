### [Zigbee двусторонний энергомонитор постоянного тока MSH - интеграция DC UPS в Home Assistant](https://youtu.be/d92pZxWYU9w)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


:ballot_box_with_check: Пакадж из обзора    

```yaml
msh_dc_meter:

    template:

      - binary_sensor:

          - name: power_on_ups
            state: >
              {{ states('sensor.0x00124b00272506b9_current_l2')|float > -0.03 }}
            device_class: power

          - name: ups_low_level
            state: >
              {{ is_state('binary_sensor.power_on_ups', 'off')
                 and states('sensor.battery_ups')|float < 10 }}
            device_class: battery
     
      - sensor:

          - name: battery_power
            state: >
                {{ ((states('sensor.0x00124b00272506b9_voltage_l2')|float)*states('sensor.0x00124b00272506b9_current_l2')|float) |round(2) }}
            device_class: power

          - name: battery_ups
            state: >
                {% set vmax = states('input_number.batt_volt_max') | float %}
                {% set vrange = (states('input_number.batt_volt_max') | float - states('input_number.batt_volt_min') | float) %}
                {% if states('sensor.0x00124b00272506b9_voltage_l2') | float  >= vmax | float %}
                100
                {% else %}
                {{ (100 - (vmax - states('sensor.0x00124b00272506b9_voltage_l2')|float)*100/vrange)|round(2) }}
                {% endif %}
            device_class: battery


    input_number:
      batt_volt_max:
        name: Напряжение заряда
        min: 10
        max: 24
        step: 0.1
      batt_volt_min:
        name: Напряжение отключения
        min: 10
        max: 24
        step: 0.1
        
        
    input_datetime:
      ups_start:
        name: Начало работы от аккумуляторов
        has_date: true
        has_time: true
        
      ups_stop:
        name: Завершение работы от аккумуляторов
        has_date: true
        has_time: true        


    mqtt:

      sensor:
        - name: ups_energy
          state_topic: "states/ups_energy"        
        
    automation:        
        
      - alias: ups_log_work
        id: ups_log_work
        description: Запись времени работы UPS
        initial_state: true
        trigger:
    # Выключение внешнего питания
        - platform: state
          entity_id: binary_sensor.power_on_ups
          from: 'on'
          to: 'off'
          id: start_work
    # Включение внешнего питания
        - platform: state
          entity_id: binary_sensor.power_on_ups
          from: 'off'
          to: 'on'
          id: stop_work        
        action:
            - choose:
              - conditions:
                  - condition: trigger
                    id: start_work      
                sequence:        
                  - service: input_datetime.set_datetime
                    target:
                      entity_id: input_datetime.ups_start
                    data:
                      datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
                  - service: mqtt.publish
                    data_template:
                      topic: "states/ups_energy"
                      payload_template: "{{ 0.0 }}"
                      retain: true 
                  - service: persistent_notification.create
                    data:
                      message: "Отключено внешнее питание в {{ states('sensor.time_date') }}, UPS работает от аккумулятора"
                      title: "Внимание"         
              - conditions:
                  - condition: trigger
                    id: stop_work      
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
                           "Отдано энергии {{ states('sensor.ups_energy') }} Ватт часов"
                      title: "Питание восстановлено"        
        
        
      - alias: ups_power_work
        id: ups_power_work
        description: Запись отданной энергии UPS
        initial_state: true
        trigger:
        - platform: time_pattern
          seconds: '/30'
        condition:
    # Сенсор внешнего питания
        - condition: state
          entity_id: binary_sensor.power_on_ups
          state: 'off'
        action:
        - service: mqtt.publish
          data_template:
            topic: "states/ups_energy"
            payload_template: "{{(states('sensor.ups_energy') | float + ((states('sensor.battery_power') | float )/-120))|round(5) }}"
            retain: true         

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