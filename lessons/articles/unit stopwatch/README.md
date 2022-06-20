### [Уроки Home Assistant. Как сделать сенсор-секундомер и history stats на любой интервал времени](https://youtu.be/R5QPxvpPEh4)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

:ballot_box_with_check: Пакадж - секундомер

```yaml
stopwatch:

    template:

      - trigger:
          - platform: time_pattern
            seconds: "/1"
        sensor:
          - name: time_1_sec
            state: '{{ as_timestamp(now()) | round(default=0)}}'
            
      - sensor:
      
          - name: custom_time
            state: >
              {{states("sensor.time_1_sec") | int | timestamp_custom("%H:%M:%S") }}
              
          - name: stopwatch
            state: >
             {% if is_state('input_boolean.stopwatch', 'on') %}
               {% set s = (states("sensor.time_1_sec") | int - strptime(states("input_datetime.stopwatch_start"), "%Y-%m-%d %H:%M:%S").timestamp() | int ) %}
               {{ '{:d} дней {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}
             {% else %}
              Выключено
             {% endif %}
              
              
    input_datetime:
      stopwatch_start:
        name: Начало отсчета
        has_date: true
        has_time: true
        
    input_boolean:
      stopwatch:
        name: Секундомер
        
    automation:
    
      - id: Старт секундомера
        alias: stopwatch_start
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_boolean.stopwatch
          to: 'on'
        action:
        - service: input_datetime.set_datetime
          target:
            entity_id: input_datetime.stopwatch_start
          data:
            datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
```


:ballot_box_with_check: Пакадж - сенсор статистики    

```yaml	
stopwatch:

    template:

      - trigger:
          - platform: time_pattern
            seconds: "/1"
        sensor:
          - name: time_1_sec
            state: '{{ as_timestamp(now()) | round(default=0)}}'
            
      - sensor:
      
          - name: custom_time
            state: >
              {{states("sensor.time_1_sec") | int | timestamp_custom("%H:%M:%S") }}
              
          - name: stopwatch
            state: >
             {% if is_state('input_boolean.stopwatch', 'on') %}
               {% set s = (states("sensor.time_1_sec") | int + states("sensor.stopwatch_mqtt") | int - strptime(states("input_datetime.stopwatch_start"), "%Y-%m-%d %H:%M:%S").timestamp() | int ) %}
               {{ '{:d} дней {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}
             {% else %}
               {% set s = (states("sensor.stopwatch_mqtt")) | int %}
               {{ '{:d} дней {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}
             {% endif %}
 
    sensor:

      - platform: mqtt
        state_topic: "history/stopwatch_time"
        name: 'stopwatch_mqtt'
        unit_of_measurement: 'сек'
 
              
    input_datetime:
      stopwatch_start:
        name: Начало отсчета
        has_date: true
        has_time: true
        
    input_boolean:
      stopwatch:
        name: Секундомер

    input_button:
      stopwatch_reset:
        name: Сброс статистики
        icon: mdi:reload
        
    automation:
    
      - id: Старт секундомера
        alias: stopwatch_start
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_boolean.stopwatch
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: input_boolean.stopwatch
                    state: 'on'  
                sequence:
                  - service: input_datetime.set_datetime
                    target:
                      entity_id: input_datetime.stopwatch_start
                    data:
                      datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}" 
              - conditions:
                  - condition: state
                    entity_id: input_boolean.stopwatch
                    state: 'off'
                sequence:
                  - service: mqtt.publish
                    data_template:
                      topic: "history/stopwatch_time"
                      payload: '{{ (states("sensor.time_1_sec") | int + states("sensor.stopwatch_mqtt") | int - strptime(states("input_datetime.stopwatch_start"), "%Y-%m-%d %H:%M:%S").timestamp() | int ) }}'
                      retain: true
            
      - id: Сброс секундомера
        alias: reload_start
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_button.stopwatch_reset
        action:
        - service: mqtt.publish
          data_template:
            topic: "history/stopwatch_time"
            payload: "{{ 0 }}"
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