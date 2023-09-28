### [Уроки Home Assistant - Телеметрия, часть 3. Мониторинг состояния системы в телеграмм](https://youtu.be/EGxy2jm5Sb8)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

### [Уроки Home Assistant - Телеметрия, часть 1. Отслеживание состояний в режиме онлайн](https://youtu.be/VuRrD-YYV70)    
### [Уроки Home Assistant - Телеметрия, часть 2. Аварийные уведомления - датчики протечки и дыма.](https://youtu.be/IKxOpfoptzg)         
### [Уроки Home Assistant - Телеметрия, часть 4. Доступность zigbee2mqtt устройств - Availability, Last seen](https://youtu.be/Wq7WyZcCSM8)     

:ballot_box_with_check: Пакадж из урока    

```yaml
telegram_telemetry:


    input_button:

      telemetry_reload:
        name: Обновление телеметрии
        icon: mdi:reload

    template:

      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor:
          - name: all_light_on
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.light if is_state(entity.entity_id, 'on')   
                  and not (entity.entity_id.endswith("_virtual"))  %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.light if is_state(entity.entity_id, 'on')   
                  and not (entity.entity_id.endswith("_virtual"))  %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}

      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor:
          - name: all_light_unavailable
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.light if is_state(entity.entity_id, 'unavailable')   %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.light if is_state(entity.entity_id, 'unavailable')   %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}

      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor:
          - name: all_switch_on_10
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.switch if is_state(entity.entity_id, 'on')   
                   and state_attr(entity.entity_id, 'power') |int(0) > 10 %}
                   {% set variable.value = dict(variable.value, **{entity.name: state_attr(entity.entity_id, 'power') }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.switch if is_state(entity.entity_id, 'on')   
                   and state_attr(entity.entity_id, 'power') |int(0) > 10 %}
                   {% set variable.value = dict(variable.value, **{entity.name: state_attr(entity.entity_id, 'power') }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}
                
      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor:                
          - name: all_switch_unavailable
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.switch if is_state(entity.entity_id, 'unavailable')   %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.switch if is_state(entity.entity_id, 'unavailable')   %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}


      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor: 
          - name: all_binary_sensor_unavailable
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if is_state(entity.entity_id, 'unavailable')   %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if is_state(entity.entity_id, 'unavailable')   %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}

      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor: 
          - name: all_sensor_unavailable
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.sensor if is_state(entity.entity_id, 'unavailable')   %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.sensor if is_state(entity.entity_id, 'unavailable')   %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}

      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor: 
          - name: motion_detected
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if is_state(entity.entity_id, 'on')   
                and is_state_attr(entity.entity_id, 'device_class', 'motion') %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if is_state(entity.entity_id, 'on')   
                  and is_state_attr(entity.entity_id, 'device_class', 'motion') %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}                

      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor: 
          - name: presence_detected
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if is_state(entity.entity_id, 'on')   
                and is_state_attr(entity.entity_id, 'device_class', 'presence') %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if is_state(entity.entity_id, 'on')   
                  and is_state_attr(entity.entity_id, 'device_class', 'presence') %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}

      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor:   
          - name: open_window
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if is_state(entity.entity_id, 'on')   
                and is_state_attr(entity.entity_id, 'device_class', 'window') %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if is_state(entity.entity_id, 'on')   
                  and is_state_attr(entity.entity_id, 'device_class', 'window') %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}            

      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor:             
          - name: open_door
            state: >
              {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if is_state(entity.entity_id, 'on')   
                and is_state_attr(entity.entity_id, 'device_class', 'door') %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if is_state(entity.entity_id, 'on')   
                  and is_state_attr(entity.entity_id, 'device_class', 'door') %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}

      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor: 
          - name: volt_medium
            state: >
                {% set variable = namespace(value = {}) %}
                {% set voltage = namespace(value = 0) %}
                {% for entity in states.sensor if is_state_attr(entity.entity_id, 'device_class', 'voltage')
                and states(entity.entity_id) not in ['unavailable','unknown','None']  %}
                {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% set voltage.value = voltage.value |int + entity.state |int %}
                {% endfor %}
                {{ (voltage.value / (variable.value | length) ) |round(2) }}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.sensor if is_state_attr(entity.entity_id, 'device_class', 'voltage')
                and states(entity.entity_id) not in ['unavailable','unknown','None']  %}
                {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }} 

      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor: 
          - name: battery_lower_30
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.sensor if is_state_attr(entity.entity_id, 'device_class', 'battery')
                  and states(entity.entity_id) |int(0) < 30 %}
                  {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.sensor if is_state_attr(entity.entity_id, 'device_class', 'battery')
                  and states(entity.entity_id) |int(0) < 30 %}
                  {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}

      - trigger:
          - platform: state
            entity_id: input_button.telemetry_reload
        sensor: 
          - name: plant_moisture
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.sensor if (entity.entity_id.endswith("moisture"))  
                   and (entity.name.find("plant")) 
                   and states(entity.entity_id) |int(0) <= 90 %}
                    {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {% if (variable.value | length) | int > 0 %}
                {{ variable.value | length }}
                {% else %}
                 0
                {% endif %}
            attributes:
              list_entities: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.sensor if (entity.entity_id.endswith("moisture"))  
                   and (entity.name.find("plant")) 
                   and states(entity.entity_id) |int(0) <= 90 %}
                    {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}  
                

    automation:

    ## Телеметрия
      - id: Телеметрия телеграм
        alias: telegram_telemetry
        initial_state: true
        trigger: 
          - platform: event
            event_type: telegram_callback
            event_data: {}
        action:
          - choose:
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/telemetry'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: &msg_tlmtr |
                        {{'\U00002328'}} *Телеметрия:*
                        * *
                        {{'\U0001F552'}} *Обновлено в {{ states('sensor.custom_time') }} {{ states('sensor.date') }}*
                        * *
                        {{'\U000026A0'}} *Аварийные сенсоры и сенсоры тревоги*
                        {{'\U00002620'}} *Тревога* - {% if is_state('binary_sensor.m_kiyiv_air', 'on') %} {{'\U0001F480'}} *Опасность воздушного удара* {% else %} Безопасно {% endif %}
                        {{'\U0001F6AD'}} *Дым* - {% if (states('sensor.smoke_detect') | int) > 0 %} {{'\U000026A0'}} *Обнаружено* {% else %} {{'\U0001F197'}} {% endif %}, {{'\U0001F4A7'}} *Протечка* - {% if (states('sensor.water_leak_detect') | int) > 0 %} {{'\U000026A0'}} *Обнаружено* {% else %} {{'\U0001F197'}} {% endif %}
                        * *
                        {{'\U0001F527'}} *Объекты*
                        {{'\U000026A1'}} *Напряжение в сети - {{ states('sensor.volt_medium') }} Вольт*
                        {{'\U0001F4A1'}} *Светильники* - {% if (states('sensor.all_light_on') | int) > 0 %} включено {{ states('sensor.all_light_on') }} {% else %} все выключены {% endif %}, {% if (states('sensor.all_light_unavailable') | int) > 0 %} Недоступно - {{ states('sensor.all_light_unavailable') }} {% else %} {{'\U0001F197'}} {% endif %}
                        {{'\U0001F50C'}} *Реле > 10 Ватт* - {% if (states('sensor.all_switch_on_10') | int) > 0 %} активно {{ states('sensor.all_switch_on_10') }} {% else %} нет активных {% endif %}, {% if (states('sensor.all_switch_unavailable') | int) > 0 %} Недоступно - {{ states('sensor.all_light_unavailable') }} {% else %} {{'\U0001F197'}} {% endif %}
                        {{'\U0001F51F'}} *Бинарные сенсоры* - {% if (states('sensor.all_binary_sensor_unavailable') | int) > 0 %}недоступно {{ states('sensor.all_binary_sensor_unavailable') }} {% else %} {{'\U0001F197'}} {% endif %}, {{'\U0001F520'}} *Сенсоры* - {% if (states('sensor.all_sensor_unavailable') | int) > 0 %}недоступно - {{ states('sensor.all_sensor_unavailable') }} {% else %} {{'\U0001F197'}} {% endif %}
                        {{'\U0001F3C3'}} *Движение* - {% if (states('sensor.motion_detected') | int) > 0 %} {{ states('sensor.motion_detected') }} датчиков {% else %} движения нет {% endif %}, {{'\U0001F3E0'}} *Присутствие* - {% if (states('sensor.presence_detected') | int) > 0 %} {{ states('sensor.presence_detected') }} датчиков {% else %} присутствия нет {% endif %}
                        {{'\U0001FA9F'}} *Окна* - {% if (states('sensor.open_window') | int) > 0 %}открыто {{ states('sensor.open_window') }} {% else %} все закрыты {% endif %}, {{'\U0001F6AA'}} *Двери* - {% if (states('sensor.open_door') | int) > 0 %}открыто {{ states('sensor.open_door') }} {% else %} все закрыты {% endif %}
                        {{'\U0001F50B'}} *Батарейки < 30%* - {% if (states('sensor.battery_lower_30') | int) > 0 %} - {{ states('sensor.battery_lower_30') }} {% else %} {{'\U00002705'}} {% endif %}, {{'\U0001FAB4'}} *Растения < 90%* - {% if (states('sensor.plant_moisture') | int) > 0 %} {{ states('sensor.plant_moisture') }} {% else %} {{'\U0001F197'}} {% endif %}
                      inline_keyboard: &keyb_tlmtr
                        - '{{''\U0001F4A1''}} Включенные :/list_light_on , {{''\U000026A0''}} Недоступные :/list_light_unavailable'
                        - '{{''\U000026A1''}} > 10 Ватт :/list_all_switch_on_10 , {{''\U0001F50C''}} Недоступные :/all_switch_unavailable'
                        - '{{''\U0001F51F''}} Бинарные сенсоры :/list_all_binary_sensor_unavailable , {{''\U0001F520''}} Сенсоры :/list_all_sensor_unavailable'
                        - '{{''\U0001F3C3''}} Движение :/list_motion_detected , {{''\U0001F3E0''}} Присутствие :/list_presence_detected' 
                        - '{{''\U0001FA9F''}} Открытые окна :/list_open_window , {{''\U0001F6AA''}} Открытые двери :/list_open_door'                        
                        - '{{''\U0001F50B''}} Батарейки ниже 30% :/list_battery_lower_30, {{''\U0001FAB4''}} Растения ниже 90% :/list_plant_moisture'   
                        - '{{''\U000021A9''}} Вернуться:/menu_back , {{''\U000021AA''}} Обновить:/telemetry' 

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/list_light_on'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      title: *msg_tlmtr
                      message: |
                         * *
                         {% if (states('sensor.all_light_on') | int) > 0 %} {{"\U0001F4A1"}} *Включенные светильники: * {% else %} *Все светильники выключены* {% endif %}
                         * *
                         *{% for entity_name, entity_state in state_attr('sensor.all_light_on', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}*
                      inline_keyboard: *keyb_tlmtr

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/list_light_unavailable'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      title: *msg_tlmtr
                      message: |
                         * *
                         {% if (states('sensor.all_light_unavailable') | int) > 0 %} {{"\U000026A0"}} *Недоступные светильники: * {% else %} *Все светильники доступны* {% endif %}
                         * *
                         *{% for entity_name, entity_state in state_attr('sensor.all_light_unavailable', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}*
                      inline_keyboard: *keyb_tlmtr

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/list_all_switch_on_10'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      title: *msg_tlmtr
                      message: |
                         * *
                         {% if (states('sensor.all_switch_on_10') | int) > 0 %} {{"\U000026A1"}} *Потребление более 10 Ватт:* {% else %} *Потребление на всех реле менее 10 Ватт* {% endif %}
                         * *
                         *{% for entity_name, entity_state in state_attr('sensor.all_switch_on_10', 'list_entities')-%} {{ entity_name }} {{ '-' }} {{ entity_state }} {{ 'Ватт' }} {{ '\n' -}} {% endfor %}*
                      inline_keyboard: *keyb_tlmtr

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/all_switch_unavailable'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      title: *msg_tlmtr
                      message: |
                         * *
                         {% if (states('sensor.all_switch_unavailable') | int) > 0 %} {{"\U0001F50C"}} *Недоступные реле: * {% else %} *Все реле доступны* {% endif %}
                         *{% for entity_name, entity_state in state_attr('sensor.all_switch_unavailable', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}*
                         * *
                      inline_keyboard: *keyb_tlmtr

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/list_all_binary_sensor_unavailable'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      title: *msg_tlmtr
                      message: |
                         * *
                         {% if (states('sensor.all_binary_sensor_unavailable') | int) > 0 %} {{"\U0001F50C"}} *Недоступные бинарные сенсоры: * {% else %} *Все бинарные сенсоры доступны* {% endif %}
                         *{% for entity_name, entity_state in state_attr('sensor.all_binary_sensor_unavailable', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}*
                         * *
                      inline_keyboard: *keyb_tlmtr

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/list_all_sensor_unavailable'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      title: *msg_tlmtr
                      message: |
                         * *
                         {% if (states('sensor.all_sensor_unavailable') | int) > 0 %} {{"\U0001F50C"}} *Недоступные сенсоры: * {% else %} *Все сенсоры доступны* {% endif %}
                         *{% for entity_name, entity_state in state_attr('sensor.all_sensor_unavailable', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}*
                         * *
                      inline_keyboard: *keyb_tlmtr

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/list_motion_detected'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      title: *msg_tlmtr
                      message: |
                         * *
                         {% if (states('sensor.motion_detected') | int) > 0 %} {{"\U0001F3C3"}} *Движение: * {% else %} *Движение не обнаружено* {% endif %}
                         * *
                         *{% for entity_name, entity_state in state_attr('sensor.motion_detected', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}*
                      inline_keyboard: *keyb_tlmtr

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/list_presence_detected'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      title: *msg_tlmtr
                      message: |
                         * *
                         {% if (states('sensor.presence_detected') | int) > 0 %} {{"\U0001F3E0"}} *Присутствие: * {% else %} *Присутствия не обнаружено* {% endif %}
                         * *
                         *{% for entity_name, entity_state in state_attr('sensor.presence_detected', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}*
                      inline_keyboard: *keyb_tlmtr

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/list_open_window'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      title: *msg_tlmtr
                      message: |
                         * *
                         {% if (states('sensor.open_window') | int) > 0 %} {{"\U0001FA9F"}} *Открытые окна: * {% else %} *Все окна закрыты* {% endif %}
                         * *
                         *{% for entity_name, entity_state in state_attr('sensor.open_window', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}*
                      inline_keyboard: *keyb_tlmtr

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/list_open_door'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      title: *msg_tlmtr
                      message: |
                         * *
                         {% if (states('sensor.open_door') | int) > 0 %} {{"\U0001F6AA"}} *Открытые двери: * {% else %} *Все двери закрыты* {% endif %}
                         * *
                         *{% for entity_name, entity_state in state_attr('sensor.open_door', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}*
                      inline_keyboard: *keyb_tlmtr

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/list_battery_lower_30'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      title: *msg_tlmtr
                      message: |
                         * *
                         {% if (states('sensor.battery_lower_30') | int) > 0 %} {{"\U0001F50B"}} *Разряжающиеся батарейки: * {% else %} *Все батарейки в порядке* {% endif %}
                         * *
                         *{% for entity_name, entity_state in state_attr('sensor.battery_lower_30', 'list_entities')-%} {{ entity_name }} {{ '-' }} {{ entity_state }} {{ '%' }} {{ '\n' -}} {% endfor %}*
                      inline_keyboard: *keyb_tlmtr


              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/list_plant_moisture'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.telemetry_reload
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      title: *msg_tlmtr
                      message: |
                         * *
                         {% if (states('sensor.plant_moisture') | int) > 0 %} {{"\U0001FAB4"}} *Нужно поливать: * {% else %} *Все растения в порядке* {% endif %}
                         * *
                         *{% for entity_name, entity_state in state_attr('sensor.plant_moisture', 'list_entities')-%} {{ entity_name }} {{ '-' }} {{ entity_state }} {{ '%' }} {{ '\n' -}} {% endfor %}*
                      inline_keyboard: *keyb_tlmtr

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