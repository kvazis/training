### [Уроки Home Assistant - Телеметрия, часть 4. Доступность zigbee2mqtt устройств - Availability, Last seen](https://youtu.be/Wq7WyZcCSM8)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

### [Уроки Home Assistant - Телеметрия, часть 1. Отслеживание состояний в режиме онлайн](https://youtu.be/VuRrD-YYV70)    
### [Уроки Home Assistant - Телеметрия, часть 2. Аварийные уведомления - датчики протечки и дыма.](https://youtu.be/IKxOpfoptzg)         
### [Уроки Home Assistant - Телеметрия, часть 3. Мониторинг состояния системы в телеграмм](https://youtu.be/EGxy2jm5Sb8)    

:ballot_box_with_check: Пакадж для анализа отзыва сенсоров    

```yaml
test:

    recorder:
      include:
        entities:
           - sensor.0x00158d0001bb60c2_control
           - sensor.0x00158d0001d72fa2_control
           - sensor.0xec1bbdfffe8f1e42_control
           - sensor.0x00158d0002705b7b_control
           - sensor.0x00158d0001bbeba6_control
           - sensor.0x00158d000149d28b_control
           - sensor.0x842e14fffef6d9e5_control           
           
    homeassistant:

      customize:
        sensor.0x00158d0001bb60c2_control:
          friendly_name: Ванная протечка, душевая
        sensor.0x00158d0001d72fa2_control:
          friendly_name: Ванная протечка, раковина
        sensor.0xec1bbdfffe8f1e42_control:
          friendly_name: Кухня протечка
        sensor.0x00158d0002705b7b_control:
          friendly_name: Прачечная протечка
        sensor.0x00158d0001bbeba6_control:
          friendly_name: Туалет протечка
        sensor.0x00158d000149d28b_control:
          friendly_name: Прихожая дым
        sensor.0x842e14fffef6d9e5_control:
          friendly_name: Кухня дым

    template:
    
      - trigger:
        - platform: time_pattern
          minutes: '/1'
        sensor:
          - name: '0x00158d0001bb60c2_control'
            state: >
              {{(as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0x00158d0001bb60c2_water_leak', 'last_seen')))|int(0) }}
            attributes:
              time: >
                {% set s = (as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0x00158d0001bb60c2_water_leak', 'last_seen')))|int(0) %}
                {{ '{:d} дней {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}


      - trigger:
        - platform: time_pattern
          minutes: '/1'
        sensor:
          - name: '0x00158d0001d72fa2_control'
            state: >
              {{(as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0x00158d0001d72fa2_water_leak', 'last_seen')))|int(0) }}
            attributes:
              time: >
                {% set s = (as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0x00158d0001d72fa2_water_leak', 'last_seen')))|int(0) %}
                {{ '{:d} дней {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}
                
      - trigger:
        - platform: time_pattern
          minutes: '/1'
        sensor:
          - name: '0xec1bbdfffe8f1e42_control'
            state: >
              {{(as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0xec1bbdfffe8f1e42_water_leak', 'last_seen')))|int(0) }}
            attributes:
              time: >
                {% set s = (as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0xec1bbdfffe8f1e42_water_leak', 'last_seen')))|int(0) %}
                {{ '{:d} дней {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}
                
      - trigger:
        - platform: time_pattern
          minutes: '/1'
        sensor:
          - name: '0x00158d0002705b7b_control'
            state: >
              {{(as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0x00158d0002705b7b_water_leak', 'last_seen')))|int(0) }}
            attributes:
              time: >
                {% set s = (as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0x00158d0002705b7b_water_leak', 'last_seen')))|int(0) %}
                {{ '{:d} дней {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}                
                
      - trigger:
        - platform: time_pattern
          minutes: '/1'
        sensor:
          - name: '0x00158d0001bbeba6_control'
            state: >
              {{(as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0x00158d0001bbeba6_water_leak', 'last_seen')))|int(0) }}
            attributes:
              time: >
                {% set s = (as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0x00158d0001bbeba6_water_leak', 'last_seen')))|int(0) %}
                {{ '{:d} дней {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}                  
                
      - trigger:
        - platform: time_pattern
          minutes: '/1'
        sensor:
          - name: '0x00158d000149d28b_control'
            state: >
              {{(as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0x00158d000149d28b_smoke', 'last_seen')))|int(0) }}
            attributes:
              time: >
                {% set s = (as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0x00158d000149d28b_smoke', 'last_seen')))|int(0) %}
                {{ '{:d} дней {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}                  
                
      - trigger:
        - platform: time_pattern
          minutes: '/1'
        sensor:
          - name: '0x842e14fffef6d9e5_control'
            state: >
              {{(as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0x842e14fffef6d9e5_smoke', 'last_seen')))|int(0) }}
            attributes:
              time: >
                {% set s = (as_timestamp (now()) -as_timestamp(state_attr('binary_sensor.0x842e14fffef6d9e5_smoke', 'last_seen')))|int(0) %}
                {{ '{:d} дней {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}                  

```

:ballot_box_with_check: Пакадж для уведомления о длительном отсутствии отклика    

```yaml

sensor_telemetry:

    template:
    
      - trigger:
        - platform: time_pattern
          minutes: '/1'
        sensor:
          - name: smoke_control
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if state_attr(entity.entity_id, 'last_seen')
                  and is_state_attr(entity.entity_id, 'device_class', 'smoke')
                  and (as_timestamp (now()) -as_timestamp(state_attr(entity.entity_id, 'last_seen')))|round(0) > 11000 %}
                   {% set variable.value = dict(variable.value, **{entity.name: (as_timestamp (now()) -as_timestamp(state_attr(entity.entity_id, 'last_seen')))|round(0) }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if state_attr(entity.entity_id, 'last_seen')
                  and is_state_attr(entity.entity_id, 'device_class', 'smoke')
                  and (as_timestamp (now()) -as_timestamp(state_attr(entity.entity_id, 'last_seen')))|round(0) > 11000 %}
                    {% set s = (as_timestamp (now()) -as_timestamp(state_attr(entity.entity_id, 'last_seen')))|round(0) %}
                    {% set variable.value = dict(variable.value, **{entity.name: ('{:d} дн. {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60)) }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}
                
      - trigger:
        - platform: time_pattern
          minutes: '/1'
        sensor:
          - name: moisture_control
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if state_attr(entity.entity_id, 'last_seen')
                  and is_state_attr(entity.entity_id, 'device_class', 'moisture')
                  and (as_timestamp (now()) -as_timestamp(state_attr(entity.entity_id, 'last_seen')))|round(0) > 15000 %}
                   {% set variable.value = dict(variable.value, **{entity.name: (as_timestamp (now()) -as_timestamp(state_attr(entity.entity_id, 'last_seen')))|round(0) }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if state_attr(entity.entity_id, 'last_seen')
                  and is_state_attr(entity.entity_id, 'device_class', 'moisture')
                  and (as_timestamp (now()) -as_timestamp(state_attr(entity.entity_id, 'last_seen')))|round(0) > 15000 %}
                    {% set s = (as_timestamp (now()) -as_timestamp(state_attr(entity.entity_id, 'last_seen')))|round(0) %}
                    {% set variable.value = dict(variable.value, **{entity.name: ('{:d} дн. {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60)) }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}
                
    automation: 
    
      - id: Список отвалившихся датчиков дыма
        alias: send_list_smoke_unav
        initial_state: true
        trigger:
         - platform: template
           value_template: "{{ (states('sensor.smoke_control')|int) > 0 }}"
        condition:
          - condition: state
            entity_id: switch.control_mode
            state: 'on'
        action:
          - service: telegram_bot.send_message
            data_template:
              target:
                - !secret chat_id_group_tech
              message: |
                 {{"\U0001F550"}} Время события - {{ states.sensor.time_date.state }}
                 * *
                 {{"\U0001F321"}} *Долгий отклик от датчиков дыма:*
                 * *
                 *{% for entity_name, entity_state in state_attr('sensor.smoke_control', 'list_entities')-%} {{ entity_name }} {{ ' недоступно ' }} {{ entity_state }} {{ '\n' -}} {% endfor %}*


      - id: Список отвалившихся датчиков протечки
        alias: send_list_moisture_unav
        initial_state: true
        trigger:
         - platform: template
           value_template: "{{ (states('sensor.moisture_control')|int) > 0 }}"
        condition:
          - condition: state
            entity_id: switch.control_mode
            state: 'on'
        action:
          - service: telegram_bot.send_message
            data_template:
              target:
                - !secret chat_id_group_tech
              message: |
                 {{"\U0001F550"}} Время события - {{ states.sensor.time_date.state }}
                 * *
                 {{"\U0001F321"}} *Долгий отклик от датчиков протечки:*
                 * *
                 *{% for entity_name, entity_state in state_attr('sensor.moisture_control', 'list_entities')-%} {{ entity_name }} {{ ' недоступно ' }} {{ entity_state }} {{ '\n' -}} {% endfor %}*



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