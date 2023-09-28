### [Уроки Home Assistant - Телеметрия, часть 2. Аварийные уведомления - датчики протечки и дыма.](https://youtu.be/IKxOpfoptzg)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

### [Уроки Home Assistant - Телеметрия, часть 1. Отслеживание состояний в режиме онлайн](https://youtu.be/VuRrD-YYV70)    
### [Уроки Home Assistant - Телеметрия, часть 3. Мониторинг состояния системы в телеграмм](https://youtu.be/EGxy2jm5Sb8)    
### [Уроки Home Assistant - Телеметрия, часть 4. Доступность zigbee2mqtt устройств - Availability, Last seen](https://youtu.be/Wq7WyZcCSM8)     

:ballot_box_with_check: Тестовые сенсоры    

```yaml

test_sensor:

    homeassistant:

      customize:
        binary_sensor.test_sensor:
          friendly_name: Датчик протечки на кухне
        binary_sensor.test_sensor_2:
          friendly_name: Датчик протечки в санузле

    template:


      - trigger:
    # кнопка на столе
        - platform: state
          entity_id: sensor.0x00158d0001531698_action
          to: 'single'    
        binary_sensor:
          - name: test_sensor
            state: True
            auto_off: 10
            device_class: moisture
            
      - trigger:
    # кнопка на столе
        - platform: state
          entity_id: sensor.0x00158d0001531698_action
          to: 'single'    
        binary_sensor:
          - name: test_sensor_2
            state: True
            auto_off: 20
            device_class: moisture
```


:ballot_box_with_check: Пакадж для уведомлений    

```yaml	
telegram_alarm:

    template:
    
      - sensor:

################# Датчики дыма #################    
          - name: smoke_detect
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if is_state(entity.entity_id, 'on')   
                and is_state_attr(entity.entity_id, 'device_class', 'smoke') %}
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
                  and is_state_attr(entity.entity_id, 'device_class', 'smoke') %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}
                
################# Датчики протечки #################    
          - name: water_leak_detect
            state: >
                {% set variable = namespace(value = {}) %}
                {% for entity in states.binary_sensor if is_state(entity.entity_id, 'on')   
                and is_state_attr(entity.entity_id, 'device_class', 'moisture') %}
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
                  and is_state_attr(entity.entity_id, 'device_class', 'moisture') %}
                 {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% endfor %}
                {{ variable.value |dictsort(false, 'value') }}

    automation: 
    

################# Датчики дыма #################
      - id: Список сработавших датчиков дыма
        alias: send_list_smoke_detect
        initial_state: true
        trigger:
         - platform: template
           value_template: "{{ (states('sensor.smoke_detect')|int) > 0 }}"
         - platform: template
           value_template: "{{ (states('sensor.smoke_detect')|int) == 0 }}"
        action:
            - choose:

              - conditions:
                  - condition: template
                    value_template: "{{ (states('sensor.smoke_detect')|int) > 0 }}"
                sequence:
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                        - !secret chat_id_group_tech
                      message: |
                         {{'\U000026A0'}} *Обнаружен дым, время события {{ states('sensor.time_date') }} * 
                         *{% for entity_name, entity_state in state_attr('sensor.smoke_detect', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}*
                  - service: light.turn_on
                    entity_id: 
                      - light.lr_ceiling_light_1_ambilight
                      - light.lr_ceiling_light_2_ambilight
                      - light.cr_ceiling_light_ambilight
                    data_template:
                      brightness_pct: 100
                      rgb_color: [255, 0, 0]
                  - service: tts.reversotts_say
                    entity_id: 
                      - media_player.lr_mi_speaker
                      - media_player.mi_smart_clock
                    data:
                      message: "Обнаружен дым {% for entity_name, entity_state in state_attr('sensor.smoke_detect', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}"
                

              - conditions:
                  - condition: template
                    value_template: "{{ (states('sensor.smoke_detect')|int) == 0 }}"
                sequence:
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                        - !secret chat_id_group_tech
                      message: | 
                           {{"\U0001F44C"}} Задымления нет
                  - service: light.turn_on
                    entity_id: 
                      - light.lr_ceiling_light_1_ambilight
                      - light.lr_ceiling_light_2_ambilight
                      - light.cr_ceiling_light_ambilight
                    data_template:
                      brightness_pct: 100
                      rgb_color: [0, 255, 0]
                  - delay: 00:00:10
                  - service: light.turn_off
                    entity_id: 
                      - light.lr_ceiling_light_1_ambilight
                      - light.lr_ceiling_light_2_ambilight
                      - light.cr_ceiling_light_ambilight
                  - service: tts.reversotts_say
                    entity_id: 
                      - media_player.lr_mi_speaker
                      - media_player.mi_smart_clock
                    data:
                      message: "Все в порядке, дыма нет"
   

################# Датчики воды #################
      - id: Список сработавших датчиков протечки
        alias: send_list_water_leak_detect
        initial_state: true
        trigger:
         - platform: template
           value_template: "{{ (states('sensor.water_leak_detect')|int) > 0 }}"
         - platform: template
           value_template: "{{ (states('sensor.water_leak_detect')|int) == 0 }}"
        action:
            - choose:

              - conditions:
                  - condition: template
                    value_template: "{{ (states('sensor.water_leak_detect')|int) > 0 }}"
                sequence:
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                        - !secret chat_id_group_tech
                      message: |
                         {{'\U000026A0'}} *Обнаружена протечка, время события {{ states('sensor.time_date') }} * 
                         *{% for entity_name, entity_state in state_attr('sensor.water_leak_detect', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}*
                  - service: light.turn_on
                    entity_id: 
                      - light.lr_ceiling_light_1_ambilight
                      - light.lr_ceiling_light_2_ambilight
                      - light.cr_ceiling_light_ambilight
                    data_template:
                      brightness_pct: 100
                      rgb_color: [255, 0, 0]
                  - service: tts.reversotts_say
                    entity_id: 
                      - media_player.lr_mi_speaker
                      - media_player.mi_smart_clock
                    data:
                      message: "Обнаружена протечка {% for entity_name, entity_state in state_attr('sensor.water_leak_detect', 'list_entities')-%} {{ entity_name }} {{ '\n' -}} {% endfor %}"

              - conditions:
                  - condition: template
                    value_template: "{{ (states('sensor.water_leak_detect')|int) == 0 }}"
                sequence:
                  - service: telegram_bot.send_message
                    data_template:
                      target:
                        - !secret chat_id_group_tech
                      message: | 
                           {{"\U0001F44C"}} Протечка устранена
                  - service: light.turn_on
                    entity_id: 
                      - light.lr_ceiling_light_1_ambilight
                      - light.lr_ceiling_light_2_ambilight
                      - light.cr_ceiling_light_ambilight
                    data_template:
                      brightness_pct: 100
                      rgb_color: [0, 255, 0]
                  - delay: 00:00:10
                  - service: light.turn_off
                    entity_id: 
                      - light.lr_ceiling_light_1_ambilight
                      - light.lr_ceiling_light_2_ambilight
                      - light.cr_ceiling_light_ambilight
                  - service: tts.reversotts_say
                    entity_id: 
                      - media_player.lr_mi_speaker
                      - media_player.mi_smart_clock
                    data:
                      message: "Все в порядке, протечка устранена"



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