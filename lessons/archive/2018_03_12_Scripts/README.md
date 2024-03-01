### [Home Assistant - сценарии и скрипты для управления освещением](https://youtu.be/xIGePbhMQSk)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Код из урока:  

:ballot_box_with_check: Сценарии из мастер класса по освещению в Home Assistant

```yaml
# Включение подсветки  
- alias: 04_kn_led_toggle
  trigger:
## Круглая кнопка на стене
  - platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.switch_158d000154a353
      click_type: single
  - platform: event
## Переворот кубика на 90 градусов
    event_type: xiaomi_aqara.cube_action
    event_data:
      entity_id: binary_sensor.cube_158d000101bdc6
      action_type: flip90
## Выключатель на входе в кухню - левая кнопка
  - platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.wall_switch_left_158d000282a130
      click_type: single
  action:
    service: light.toggle
    entity_id: light.kn_work
```

```yaml
## Ручное включение света
- alias: enter_light_on
  trigger:
## Выключатель у входной двери
  - platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.wall_switch_right_158d0001718ca8
      click_type: single
## Квадратная кнопка кухня
  - platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.switch_158d0001a672ef
      click_type: single
  condition:
    - condition: state
      entity_id: light.yeelight_white_entr
      state: 'off'
  action:
    - service: light.turn_on
      entity_id:
        - light.yeelight_white_entr
      data_template:
        brightness_pct: 100
        kelvin: 4000
```
```yaml
## Ручное выключение света
- alias: enter_light_off
  trigger:
## Кнопка, коридор шкаф
  - platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.switch_158d0001f3fefe
      click_type: double
## Квадратная кнопка кухня
  - platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.switch_158d0001a672ef
      click_type: single
  condition:
    - condition: state
      entity_id: light.yeelight_white_entr
      state: 'on'
  action:
    - service: light.turn_off
      entity_id:
        - light.yeelight_white_entr
```
```yaml
## Автоматическое включение света при открытии двери
- alias: enter_light_auto
  trigger:
## Открытие входной двери
   platform: state
   entity_id: binary_sensor.door_window_sensor_158d000119378d
   from: 'off'
   to: 'on'
  condition:
## Лампочка выключена не менее 3х минут
    - condition: state
      entity_id: light.yeelight_white_entr
      state: 'off'
      for:
        minutes: 3
  action:
    - service: light.turn_on
      entity_id:
        - light.yeelight_white_entr
      data_template:
        brightness_pct: 100
        kelvin: 4000
```
```yaml
## Автоматическое выключение света
- alias: enter_light_auto_off
  trigger:
## Датчик движения выключен 5 минут
   platform: state
   entity_id: binary_sensor.motion_sensor_158d00013f7894
   to: 'off'
   for:
     minutes: 5
  condition:
    - condition: state
      entity_id: light.yeelight_white_entr
      state: 'on'
  action:
    - service: light.turn_off
      entity_id:
        - light.yeelight_white_entr
```
```yaml
## Контроль выключателя Aqara
- alias: autoswitch
  trigger:
  - platform: state
    entity_id: switch.wall_switch_left_158d00014dceb3
    from: 'on'
    to: 'off'
  action:
  - delay: 00:00:03
  - service: switch.turn_on
    entity_id:
      - switch.wall_switch_left_158d00014dceb3
```
```yaml
## Скрипт включения света
  05_gg_650_1_on:
    sequence:
      - service: light.turn_on
        entity_id:
          - light.yeelight_650_gg_1
        data_template:
          brightness_pct: 60
          kelvin: 4000
```
```yaml
## Скрипт выключения света          
  05_gg_650_1_off:
    sequence:
      - service: light.turn_off
        entity_id:
          - light.yeelight_650_gg_1
```
```yaml
## Люстра 1 гостиная
- alias: 05_gg_cell_1_light
  trigger:
## Обнаружение движения
    - platform: event
      event_type: xiaomi_aqara.motion
      event_data:
        entity_id:  binary_sensor.motion_sensor_158d0001e547a3
  action:    
    - service: script.turn_on
      data_template:
        entity_id: >-
          {%- if states.light.yeelight_650_gg_1.state == 'off' -%}
          script.05_gg_650_1_on
          {%- else -%}
          script.05_gg_650_1_off
          {%- endif -%}  
```
```yaml
## Включение дверного светильника
  03_enter_on:
    sequence:
      - service: light.turn_on
        entity_id:
          - light.yeelight_white_entr
        data_template:
          brightness_pct: 100
          kelvin: 4000
```
```yaml
## Выключение дверного светильника          
  03_enter_off:
    sequence:
      - service: light.turn_off
        entity_id:
          - light.yeelight_white_entr
```
```yaml
## Включение люстры в коридоре      
  03_corr_on:
    sequence:
      - service: light.turn_on
        entity_id:
          -  light.yeelight_650_corr
        data_template:
          brightness_pct: 80
          kelvin: 4000
```
```yaml
## Выключение люстры в коридоре          
  03_corr_off:
    sequence:
      - service: light.turn_off
        entity_id:
          -  light.yeelight_650_corr
```
```yaml
## Нажатие на две кнопки одновременно
- alias: 03_corr_entr_on
  trigger:
## Нажатие на две кнопки одновременно
  - platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.wall_switch_both_158d00013fc3bc
      click_type: both
  action: 
  - service: script.turn_on
    data_template:
     entity_id: >-
        {%- if states.light.yeelight_650_corr.state == 'off' and states.light.yeelight_white_entr.state  == 'off' -%}
        script.03_enter_on
        {%- elif states.light.yeelight_650_corr.state == 'off' and states.light.yeelight_white_entr.state  == 'on' and (as_timestamp (now()) -as_timestamp(states.light.yeelight_white_entr.last_changed) <= 15) -%}
        script.03_corr_on
        {%- elif states.light.yeelight_650_corr.state == 'on' and states.light.yeelight_white_entr.state  == 'on' -%}
        script.03_enter_off, script.03_corr_off
        {%- elif states.light.yeelight_650_corr.state == 'off' and states.light.yeelight_white_entr.state  == 'on' and (as_timestamp (now()) -as_timestamp(states.light.yeelight_white_entr.last_changed) > 15) -%}
        script.03_enter_off
        {%- elif states.light.yeelight_650_corr.state == 'on' and states.light.yeelight_white_entr.state  == 'off' -%}
        script.03_corr_off
        {%- endif -%}  
```
```yaml
  - platform: time_date
    display_options:
      - 'time'
      - 'date'
      - 'date_time'
      - 'time_date'
```
```yaml
## Яркость по часам
- alias: hour_light
  trigger:
  - platform: state
    entity_id: light.yeelight_toilet
    from: 'off'
    to: 'on'
  action:
  - service: light.turn_on
    entity_id:
      - light.yeelight_toilet
    data_template:
       brightness_pct: >
         {% set hour=states("sensor.time").split(':')[0] | int %}
         {%- if hour >= 0 and hour < 6  -%}
         25
         {%- elif hour >= 6 and hour < 8  -%}
         50
         {%- elif hour >= 8 and hour < 20  -%}
         75
         {%- elif hour >= 20 and hour < 23  -%}
         50
         {%- elif hour >= 23 and hour < 24  -%}
         25
         {% endif %}
       kelvin: 4000
```
```yaml
## Циклическое освещение 1
  da_light_circle_1:
    sequence:
        - service: script.turn_off
          entity_id: 
           - script.da_light_circle_2
        - service: light.turn_on
          entity_id: 
           - light.gateway_light_f0b429cc1f11
           - light.yeelight_da_strip
           - light.yeelight_da_bedside
          data_template:
            brightness_pct: 50
            rgb_color: [255, 107, 239]
        - delay: 00:00:10
        - service: light.turn_on
          entity_id: 
           - light.gateway_light_f0b429cc1f11
           - light.yeelight_da_strip
           - light.yeelight_da_bedside
          data_template:
            brightness_pct: 50
            rgb_color: [255, 251, 116]
        - delay: 00:00:10
        - service: script.turn_on
          entity_id: script.da_light_circle_2
```
```yaml
## Циклическое освещение 2
  da_light_circle_2:
    sequence:
        - service: script.turn_off
          entity_id: 
           - script.da_light_circle_1
        - service: light.turn_on
          entity_id: 
           - light.gateway_light_f0b429cc1f11
           - light.yeelight_da_strip
           - light.yeelight_da_bedside
          data_template:
            brightness_pct: 50
            rgb_color: [71, 255, 254]
        - delay: 00:00:10
        - service: light.turn_on
          entity_id: 
           - light.gateway_light_f0b429cc1f11
           - light.yeelight_da_strip
           - light.yeelight_da_bedside
          data_template:
            brightness_pct: 50
            rgb_color: [7, 0, 113]
        - delay: 00:00:10
        - service: script.turn_on
          entity_id: script.da_light_circle_1
```
```yaml
## Отключение циклического освещения
  da_nightlight_off:
    sequence:
        - service: script.turn_off
          entity_id: 
           - script.da_light_circle_1
           - script.da_light_circle_2
        - service: light.turn_off
          entity_id: 
           - light.gateway_light_f0b429cc1f11
           - light.yeelight_da_strip
           - light.yeelight_da_bedside
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