### [Уроки Home Assistant - Телеметрия, часть 1. Отслеживание состояний в режиме онлайн](https://youtu.be/VuRrD-YYV70)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

### [Уроки Home Assistant - Телеметрия, часть 2. Аварийные уведомления - датчики протечки и дыма.](https://youtu.be/IKxOpfoptzg)     

#### Команды и ссылки из урока:    
:white_check_mark:  Ccылки на репозитории используемых карточек lovelace    
:ballot_box_with_check: [Stack In Card](https://github.com/custom-cards/stack-in-card)    
:ballot_box_with_check: [card-mod](https://github.com/thomasloven/lovelace-card-mod)    
:ballot_box_with_check: [Multiple Entity Row](https://github.com/benct/lovelace-multiple-entity-row)    
:ballot_box_with_check: [auto-entities](https://github.com/thomasloven/lovelace-auto-entities)    
:ballot_box_with_check: [Battery State Card / Entity Row](https://github.com/maxwroc/battery-state-card)    

:ballot_box_with_check: Страница телеметрии в lovelace 

```yaml
############################ Телеметрия ############################
title: Телеметрия
icon: mdi:keyboard
cards:


############################ Колонка 1 ############################
    - type: vertical-stack
      cards:

        - type: custom:stack-in-card
          mode: vertical
          cards:
      
            - type: markdown
              style: |
                   ha-card {
                     color: #00BFFF;
                     font-weight: bold;
                     font-size: 16px;
                   }          
              content: >
                 **Автоматизации и скрипты**

################# Автоматизации #################

            - type: entities
              style: |
                   ha-card {
                     color: #00BFFF;
                     --paper-item-icon-color: #00BFFF;
                     --iron-icon-stroke-color: #FFFFE0;
                     font-weight: bold;
                     font-size: 14px;
                   }                 
              show_header_toggle: false
              entities:
              - entity: sensor.count_automation
                type: custom:multiple-entity-row
                name: Автоматизации
                state_header: Всего
                entities:
                  - entity: sensor.count_automation_on
                    name: Активно
                  - entity: sensor.count_automation_off
                    name: Отключено
                  - entity: sensor.count_automation_unavailable
                    name: Недоступно

            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
                style: |
                  ha-card {
                    color: #00BFFF;
                    --paper-item-icon-color: #E6E6FA;
                    font-weight: bold;
                    font-size: 14px;
                  }
              filter:
                include:
                 - domain: automation
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed
                      
################# Скрипты #################

            - type: entities
              style: |
                   ha-card {
                     color: #00BFFF;
                     --paper-item-icon-color: #00BFFF;
                     --iron-icon-stroke-color: #FFFFE0;
                     font-weight: bold;
                     font-size: 14px;
                   }                 
              show_header_toggle: false
              entities:
              - entity: sensor.count_script
                type: custom:multiple-entity-row
                name: Скрипты
                state_header: Всего
                entities:
                  - entity: sensor.count_script_on
                    name: Активно
                  - entity: sensor.count_script_off
                    name: Отключено
                  - entity: sensor.count_script_unavailable
                    name: Недоступно

            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
                style: |
                  ha-card {
                    color: #00BFFF;
                    --paper-item-icon-color: #E6E6FA;
                    font-weight: bold;
                    font-size: 14px;
                  }
              filter:
                include:
                 - domain: script
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed 

################# Обновления #################  
        - type: custom:stack-in-card
          mode: vertical
          cards:

            - type: markdown
              style: |
                   ha-card {
                     color: #00BFFF;
                     font-weight: bold;
                     font-size: 16px;
                   }          
              content: >
                 **Обновления**
          
            - type: entities
              style: |
                   ha-card {
                     color: #00BFFF;
                     --paper-item-icon-color: #00BFFF;
                     --iron-icon-stroke-color: #FFFFE0;
                     font-weight: bold;
                     font-size: 14px;
                   }                 
              show_header_toggle: false
              entities:
              - entity: sensor.count_update
                type: custom:multiple-entity-row
                name: Аддоны
                state_header: Всего
                entities:
                  - entity: sensor.count_update_on
                    name: Доступно обновлений
                      

            - type: custom:auto-entities
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                - domain: update
                  state: 'on'
                  options:
                     type: custom:multiple-entity-row
                     show_state: false
                     secondary_info: last-changed
                     entities:
                      - attribute: installed_version
                        name: Установлено
                      - attribute: latest_version
                        name: Последняя
                        
            - type: markdown
              style: |
                   ha-card {
                     color: #00BFFF;
                     font-weight: bold;
                     font-size: 16px;
                   }   
              content: |
                <ha-icon icon="hacs:hacs"></ha-icon>&nbsp;&nbsp;&nbsp;Обновлений для HACS - {{ states('sensor.hacs') | default }}
                > {% for repo in state_attr('sensor.hacs', 'repositories') %}
                > {{ repo.display_name }} {{ repo["installed_version"] }} -> {{ repo["available_version"] }}
                > {% endfor %}
                      
############################ Колонка 2 ############################
    - type: vertical-stack
      cards:

################# Светильники #################

        - type: custom:stack-in-card
          mode: vertical
          cards:
      
            - type: markdown
              style: |
                  ha-card {
                    color: #FA8072;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Cветильники**
                  
            - type: entities
              style: |
                    ha-card {
                      color: #FA8072;
                      --paper-item-icon-color: #E6E6FA;
                      --iron-icon-stroke-color: #E6E6FA;
                      font-weight: bold;
                      font-size: 14px;
                    }               
              show_header_toggle: false
              entities:
              - entity: sensor.count_light
                type: custom:multiple-entity-row
                name: Светильники
                state_header: Всего
                entities:
                  - entity: sensor.count_light_on
                    name: Активно
                  - entity: sensor.count_light_off
                    name: Отключено
                  - entity: sensor.count_light_unavailable
                    name: Недоступно
                    
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
                style: |
                    ha-card {
                      color: #FA8072;
                      --paper-item-icon-color: #E6E6FA;
                      --iron-icon-stroke-color: #E6E6FA;
                      font-weight: bold;
                      font-size: 14px;
                    }  
              filter:
                include:
                 - domain: light
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed

################# Реле #################

        - type: custom:stack-in-card
          mode: vertical
          cards: 
      
            - type: markdown
              style: |
                  ha-card {
                    color: #FA8072;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Реле**
                  
            - type: entities
              style: |
                    ha-card {
                      color: #FA8072;
                      --paper-item-icon-color: #E6E6FA;
                      --iron-icon-stroke-color: #E6E6FA;
                      font-weight: bold;
                      font-size: 14px;
                    }               
              show_header_toggle: false
              entities:
              - entity: sensor.count_switch
                type: custom:multiple-entity-row
                name: Реле
                state_header: Всего
                entities:
                  - entity: sensor.count_switch_on
                    name: Активно
                  - entity: sensor.count_switch_off
                    name: Отключено
                  - entity: sensor.count_switch_unavailable
                    name: Недоступно
                    
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
                style: |
                    ha-card {
                      color: #FA8072;
                      --paper-item-icon-color: #E6E6FA;
                      --iron-icon-stroke-color: #E6E6FA;
                      font-weight: bold;
                      font-size: 14px;
                    }  
              filter:
                include:
                 - domain: switch
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed 

################# Термоголовки #################

        - type: custom:stack-in-card
          mode: vertical
          cards: 
          
            - type: markdown
              style: |
                  ha-card {
                    color: #FA8072;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Термоголовки**
                  
            - type: entities
              style: |
                    ha-card {
                      color: #FA8072;
                      --paper-item-icon-color: #E6E6FA;
                      --iron-icon-stroke-color: #E6E6FA;
                      font-weight: bold;
                      font-size: 14px;
                    }               
              show_header_toggle: false
              entities:
              - entity: sensor.count_climate
                type: custom:multiple-entity-row
                name: Термоголовки
                state_header: Всего
                entities:
                  - entity: sensor.count_climate_heat
                    name: Активно
                  - entity: sensor.count_climate_off
                    name: Отключено
                  - entity: sensor.count_climate_unavailable
                    name: Недоступно
                    
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
                style: |
                    ha-card {
                      color: #FA8072;
                      --paper-item-icon-color: #E6E6FA;
                      --iron-icon-stroke-color: #E6E6FA;
                      font-weight: bold;
                      font-size: 14px;
                    }  
              filter:
                include:
                 - domain: climate
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed 
                      
################# Сенсоры #################

        - type: custom:stack-in-card
          mode: vertical
          cards: 
            - type: markdown
              style: |
                  ha-card {
                    color: #FA8072;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Сенсоры**
                  
            - type: entities
              style: |
                    ha-card {
                      color: #FA8072;
                      --paper-item-icon-color: #E6E6FA;
                      --iron-icon-stroke-color: #E6E6FA;
                      font-weight: bold;
                      font-size: 14px;
                    }               
              show_header_toggle: false
              entities:
              - entity: sensor.count_sensor
                type: custom:multiple-entity-row
                name: Сенсоры
                state_header: Всего
                entities:
                  - entity: sensor.count_sensor_unavailable
                    name: Недоступно
                    
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
                style: |
                    ha-card {
                      color: #FA8072;
                      --paper-item-icon-color: #E6E6FA;
                      --iron-icon-stroke-color: #E6E6FA;
                      font-weight: bold;
                      font-size: 14px;
                    }  
              filter:
                include:
                 - domain: sensor
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed 
                      
################# Бинарные сенсоры #################
        - type: custom:stack-in-card
          mode: vertical
          cards: 
          
            - type: markdown
              style: |
                  ha-card {
                    color: #FA8072;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Бинарные сенсоры**
                  
            - type: entities
              style: |
                    ha-card {
                      color: #FA8072;
                      --paper-item-icon-color: #E6E6FA;
                      --iron-icon-stroke-color: #E6E6FA;
                      font-weight: bold;
                      font-size: 14px;
                    }               
              show_header_toggle: false
              entities:
              - entity: sensor.count_binary_sensor
                type: custom:multiple-entity-row
                name: Бинарные сенсоры
                state_header: Всего
                entities:
                  - entity: sensor.count_binary_sensor_unavailable
                    name: Недоступно
                    
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
                style: |
                    ha-card {
                      color: #FA8072;
                      --paper-item-icon-color: #E6E6FA;
                      --iron-icon-stroke-color: #E6E6FA;
                      font-weight: bold;
                      font-size: 14px;
                    }  
              filter:
                include:
                 - domain: binary_sensor
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed 

################# Камеры #################
        - type: custom:stack-in-card
          mode: vertical
          cards: 
          
            - type: markdown
              style: |
                  ha-card {
                    color: #FA8072;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **IP Камеры**
                  
            - type: entities
              style: |
                    ha-card {
                      color: #FA8072;
                      --paper-item-icon-color: #E6E6FA;
                      --iron-icon-stroke-color: #E6E6FA;
                      font-weight: bold;
                      font-size: 14px;
                    }               
              show_header_toggle: false
              entities:
              - entity: sensor.count_camera
                type: custom:multiple-entity-row
                name: IP камеры
                state_header: Всего
                entities:
                  - entity: sensor.count_camera_unavailable
                    name: Недоступно
                    
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
                style: |
                    ha-card {
                      color: #FA8072;
                      --paper-item-icon-color: #E6E6FA;
                      --iron-icon-stroke-color: #E6E6FA;
                      font-weight: bold;
                      font-size: 14px;
                    }  
              filter:
                include:
                 - domain: camera
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed 

################# Уровень заряда #################
        - type: custom:stack-in-card
          mode: vertical
          cards:
           
            - type: markdown
              style: |
                  ha-card {
                    color: #FA8072;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Сенсоры < 30% заряда**
            - type: custom:auto-entities
              show_empty: false
              card:
                type: custom:battery-state-card
                show_header_toggle: false
                style: |
                    ha-card {
                      color: #FA8072;
                      font-weight: bold;
                      font-size: 14px;
                    } 
              filter:
                include:
                 - entity_id: sensor.*battery*
                exclude:
                 - state: '> 30.0'
                 - state: 'unknown'
                 - state: 'unavailable'
        
############################ Колонка 3 ############################
    - type: vertical-stack
      cards:
      
################# Потребление более 10 Ватт #################
 
        - type: custom:stack-in-card
          mode: vertical
          cards:

            - type: markdown
              style: |
                  ha-card {
                    color: #FFA500;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Активные розетки > 10 Ватт**

            - type: custom:auto-entities
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                - domain: switch
                  state: 'on'
                  attributes:
                    power: '! none'
                  options:
                     type: custom:multiple-entity-row
                     toggle: true
                    #  show_state: false
                     secondary_info: last-changed
                     entities:
                      - attribute: power
                        name: Потребление
                        unit: 'Ватт'
                exclude:
                - domain: switch
                  state: 'on'
                  attributes:
                    power: '< 10'
                - entity_id: switch.*power_outage*

################# Включенные светильники #################
                
        - type: custom:stack-in-card
          mode: vertical
          cards:

            - type: markdown
              style: |
                  ha-card {
                    color: #FFA500;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Активные светильники**

            - type: custom:auto-entities
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                - domain: light
                  state: 'on'
                  options:
                     type: custom:multiple-entity-row
                     toggle: true
                    #  show_state: false
                     secondary_info: last-changed
                     entities:
                      - attribute: brightness
                        name: Яркость
                      - attribute: color_temp
                        name: Температура


################# Активные термоголовки #################
 
        - type: custom:stack-in-card
          mode: vertical
          cards:

            - type: markdown
              style: |
                  ha-card {
                    color: #FFA500;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Активные термоголовки**

            - type: custom:auto-entities
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                - domain: climate
                  state: 'heat'
                  options:
                      secondary_info: last-changed

################# Таймеры #################
                      
        - type: custom:stack-in-card
          mode: vertical
          cards:

            - type: markdown
              style: |
                  ha-card {
                    color: #FFA500;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Активные таймеры**

            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: timer
                   state: 'active'
                   options:
                      secondary_info: last-changed

############################ Колонка 4 ############################

    - type: vertical-stack
      cards:

################# Аварийные датчики #################
      
        - type: custom:stack-in-card
          mode: vertical
          cards:
                                   
            - type: markdown
              style: |
                  ha-card {
                    color: #00FA9A;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Аварийные датчики**
                      
            - type: custom:auto-entities
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                - domain: binary_sensor
                  state: 'on'
                  attributes:
                    device_class: 'moisture'
                  options:
                      secondary_info: last-changed
                - domain: binary_sensor
                  state: 'on'
                  attributes:
                    device_class: 'smoke'
                  options:
                      secondary_info: last-changed
                      
################# Присутствие и движение #################

        - type: custom:stack-in-card
          mode: vertical
          cards:

            - type: markdown
              style: |
                  ha-card {
                    color: #00FA9A;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Активные датчики движения и присутствия**

            - type: custom:auto-entities
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                - domain: binary_sensor
                  state: 'on'
                  attributes:
                    device_class: 'motion'
                  options:
                      secondary_info: last-changed
                - domain: binary_sensor
                  state: 'on'
                  attributes:
                    device_class: 'presence'
                  options:
                      secondary_info: last-changed

################# Окна и двери #################

        - type: custom:stack-in-card
          mode: vertical
          cards:
                                   
            - type: markdown
              style: |
                  ha-card {
                    color: #00FA9A;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Открытые окна**
                      
            - type: custom:auto-entities
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                - domain: binary_sensor
                  state: 'on'
                  attributes:
                    device_class: 'window'
                  options:
                      secondary_info: last-changed
                exclude:
                - entity_id: binary_sensor.*aeration*
                                   
            - type: markdown
              style: |
                  ha-card {
                    color: #00FA9A;
                    font-weight: bold;
                    font-size: 16px;
                  } 
              content: >
                  **Открытые двери**
                      
            - type: custom:auto-entities
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                - domain: binary_sensor
                  state: 'on'
                  attributes:
                    device_class: 'door'
                  options:
                      secondary_info: last-changed

```

:ballot_box_with_check: Пакадж с сенсорами

```yaml
telemetry:

    homeassistant:

      customize:
        sensor.count_automation:
          friendly_name: Автоматизаций в системе -
        sensor.count_automation_on:
          friendly_name: Активных автоматизаций -
        sensor.count_automation_off:
          friendly_name: Отключенных автоматизаций -
        sensor.count_automation_unavailable:
          friendly_name: Недоступных автоматизаций -
        sensor.count_script:
          friendly_name: Скриптов в системе -
        sensor.count_script_on:
          friendly_name: Активных скриптов -
        sensor.count_script_off:
          friendly_name: Отключенных скриптов -
        sensor.count_script_unavailable:
          friendly_name: Недоступных скриптов -
        sensor.count_update:
           friendly_name: Аддонов в системе -
        sensor.count_update_on:
           friendly_name: Доступно обновлений -
        sensor.count_light:
          friendly_name: Светильников в системе -
        sensor.count_light_on:
          friendly_name: Активных светильников -
        sensor.count_light_off:
          friendly_name: Отключенных светильников -
        sensor.count_light_unavailable:
          friendly_name: Недоступных светильников - 
        sensor.count_switch:
          friendly_name: Реле в системе -
        sensor.count_switch_on:
          friendly_name: Активных реле -
        sensor.count_switch_off:
          friendly_name: Отключенных реле -
        sensor.count_switch_unavailable:
          friendly_name: Недоступных реле -
        sensor.count_climate:
          friendly_name: Термоголовок в системе -
        sensor.climate_switch_heat:
          friendly_name: Активных термоголовок -
        sensor.climate_switch_off:
          friendly_name: Отключенных термоголовок -
        sensor.count_climate_unavailable:
          friendly_name: Недоступных термоголовок -
        sensor.count_sensor:
          friendly_name: Сенсоров в системе -
        sensor.count_sensor_unavailable:
          friendly_name: Недоступных сенсоров -
        sensor.count_binary_sensor:
          friendly_name: Бинарных сенсоров в системе -
        sensor.count_binary_sensor_unavailable:
          friendly_name: Недоступных бинарных сенсоров -

          
    template:
     
      - sensor:

################# Автоматизации #################

          - name: count_automation
            state: >
                  {%- set domains = ['automation'] -%}
                  {%- for domain in domains -%}
                    {%- for item in states[domain] -%}
                      {% if loop.first %}
                        {{loop.length}}
                      {% endif %}
                    {%- endfor -%}
                  {%- endfor -%}
            icon: mdi:head
            
          - name: count_automation_on
            state: "{{states.automation | selectattr ('state', 'equalto', 'on') | list | length}}"
            icon: mdi:head-check

          - name: count_automation_off
            state: "{{states.automation | selectattr ('state', 'equalto', 'off') | list | length}}"
            icon: mdi:head-remove            

          - name: count_automation_unavailable
            state: "{{states.automation | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon: mdi:head-question
            
################# Скрипты #################

          - name: count_script
            state: >
                  {%- set domains = ['script'] -%}
                  {%- for domain in domains -%}
                    {%- for item in states[domain] -%}
                      {% if loop.first %}
                        {{loop.length}}
                      {% endif %}
                    {%- endfor -%}
                  {%- endfor -%}
            icon: mdi:file
            
          - name: count_script_on
            state: "{{states.script | selectattr ('state', 'equalto', 'on') | list | length}}"
            icon: mdi:file-check

          - name: count_script_off
            state: "{{states.script | selectattr ('state', 'equalto', 'off') | list | length}}"
            icon: mdi:file-remove            

          - name: count_script_unavailable
            state: "{{states.script | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon: mdi:file-question

################# Обновления #################

          - name: count_update
            state: >
                  {%- set domains = ['update'] -%}
                  {%- for domain in domains -%}
                    {%- for item in states[domain] -%}
                      {% if loop.first %}
                        {{loop.length}}
                      {% endif %}
                    {%- endfor -%}
                  {%- endfor -%}
            icon: mdi:monitor-dashboard
            
          - name: count_update_on
            state: "{{states.update | selectattr ('state', 'equalto', 'on') | list | length}}"
            icon: mdi:monitor-arrow-down-variant
            
################# Светильники #################

          - name: count_light
            state: >
                  {%- set domains = ['light'] -%}
                  {%- for domain in domains -%}
                    {%- for item in states[domain] -%}
                      {% if loop.first %}
                        {{loop.length}}
                      {% endif %}
                    {%- endfor -%}
                  {%- endfor -%}
            icon: mdi:lightbulb-group
            
          - name: count_light_on
            state: "{{states.light | selectattr ('state', 'equalto', 'on') | list | length}}"
            icon: mdi:lightbulb-on

          - name: count_light_off
            state: "{{states.light | selectattr ('state', 'equalto', 'off') | list | length}}"
            icon: mdi:lightbulb

          - name: count_light_unavailable
            state: "{{states.light | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon: mdi:lightbulb-question
            
################# Реле #################

          - name: count_switch
            state: >
                  {%- set domains = ['switch'] -%}
                  {%- for domain in domains -%}
                    {%- for item in states[domain] -%}
                      {% if loop.first %}
                        {{loop.length}}
                      {% endif %}
                    {%- endfor -%}
                  {%- endfor -%}
            icon: mdi:power
            
          - name: count_switch_on
            state: "{{states.switch | selectattr ('state', 'equalto', 'on') | list | length}}"
            icon: mdi:power-plug

          - name: count_switch_off
            state: "{{states.switch | selectattr ('state', 'equalto', 'off') | list | length}}"
            icon: mdi:power-plug-off

          - name: count_switch_unavailable
            state: "{{states.switch | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon: mdi:power-plug-outline
            
################# Термоголовки #################

          - name: count_climate
            state: >
                  {%- set domains = ['climate'] -%}
                  {%- for domain in domains -%}
                    {%- for item in states[domain] -%}
                      {% if loop.first %}
                        {{loop.length}}
                      {% endif %}
                    {%- endfor -%}
                  {%- endfor -%}
            icon: mdi:thermostat
            
          - name: count_climate_heat
            state: "{{states.climate | selectattr ('state', 'equalto', 'heat') | list | length}}"
            icon: mdi:thermometer-plus

          - name: count_climate_off
            state: "{{states.climate | selectattr ('state', 'equalto', 'off') | list | length}}"
            icon: mdi:thermometer-minus

          - name: count_climate_unavailable
            state: "{{states.climate | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon: mdi:thermometer-alert
            
################# Сенсоры #################

          - name: count_sensor
            state: >
                  {%- set domains = ['sensor'] -%}
                  {%- for domain in domains -%}
                    {%- for item in states[domain] -%}
                      {% if loop.first %}
                        {{loop.length}}
                      {% endif %}
                    {%- endfor -%}
                  {%- endfor -%}
            icon: mdi:eye
            
          - name: count_sensor_unavailable
            state: "{{states.sensor | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon: mdi:eye-off
            
################# Бинарные сенсоры #################

          - name: count_binary_sensor
            state: >
                  {%- set domains = ['binary_sensor'] -%}
                  {%- for domain in domains -%}
                    {%- for item in states[domain] -%}
                      {% if loop.first %}
                        {{loop.length}}
                      {% endif %}
                    {%- endfor -%}
                  {%- endfor -%}
            icon: mdi:numeric-10-circle
            
          - name: count_binary_sensor_unavailable
            state: "{{states.binary_sensor | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon: mdi:alert-circle

################# Камеры #################

          - name: count_camera
            state: >
                  {%- set domains = ['camera'] -%}
                  {%- for domain in domains -%}
                    {%- for item in states[domain] -%}
                      {% if loop.first %}
                        {{loop.length}}
                      {% endif %}
                    {%- endfor -%}
                  {%- endfor -%}
            icon: mdi:cctv
            
          - name: count_camera_unavailable
            state: "{{states.camera | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon: mdi:alert-circle

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