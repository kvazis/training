### [Блог. Home Assistant. Template Light - объединяем несколько умных светильников в один виртуальный](https://youtu.be/hmimb2mvMMc)


:ballot_box_with_check: Lovelace карты из видео для цветных светильников - **Light Entity Card** есть в HACS. [Репозиторий](https://github.com/ljmerza/light-entity-card) 

:ballot_box_with_check: Пакадж синхронизации 3х цветных светильников    

```yaml
    light:
      - platform: template
        lights:
          virtual:
            friendly_name: "Виртуальный светильник"
            value_template: >-
              {{ is_state('light.lr_tv_bulb', 'on')  
                 and is_state('light.lr_ceiling_light_1_ambilight', 'on')
                 and is_state('light.lr_ceiling_light_2_ambilight', 'on')
              }}
            icon_template: >-
              {% if is_state("light.virtual", "on") %}
              mdi:string-lights
              {% else %}
              mdi:string-lights-off
              {% endif %}
            turn_on:
              service: light.turn_on
              entity_id:
              - light.lr_ceiling_light_1_ambilight
              - light.lr_ceiling_light_2_ambilight
              - light.lr_tv_bulb
              data_template:
                brightness_pct: 100
                kelvin: 4000
            turn_off:
              service: light.turn_off
              entity_id:
              - light.lr_ceiling_light_1_ambilight
              - light.lr_ceiling_light_2_ambilight
              - light.lr_tv_bulb
            level_template: >-
                {{ state_attr('light.lr_ceiling_light_1_ambilight', 'brightness') | int }}
            set_level:
              service: light.turn_on
              entity_id:
              - light.lr_ceiling_light_1_ambilight
              - light.lr_ceiling_light_2_ambilight
              - light.lr_tv_bulb
              data_template:
                brightness: "{{ brightness }}"
            temperature_template: >-
                {{ state_attr('light.lr_ceiling_light_1_ambilight', 'color_temp') | int }}
            set_temperature:
              service: light.turn_on
              entity_id:
              - light.lr_ceiling_light_1_ambilight
              - light.lr_ceiling_light_2_ambilight
              - light.lr_tv_bulb
              data_template:
                color_temp: "{{ color_temp }}"
            color_template: >-
                {{ state_attr('light.lr_ceiling_light_1_ambilight', 'hs_color') }}
            set_color:
              service: light.turn_on
              entity_id:
              - light.lr_ceiling_light_1_ambilight
              - light.lr_ceiling_light_2_ambilight
              - light.lr_tv_bulb
              data_template:
                hs_color: "[{{h}}, {{s}}]"
            effect_list_template: "{{ state_attr('light.lr_ceiling_light_1_ambilight', 'effect_list') }}"
            effect_template: Stop
            set_effect:
              service: light.turn_on
              entity_id:
              - light.lr_ceiling_light_1_ambilight
              - light.lr_ceiling_light_2_ambilight
              - light.lr_tv_bulb
              data_template:
                effect: "{{ effect }}"
```

:ballot_box_with_check: Применения выпадающего списка для эффектов    

```yaml
            effect_list_template: "{{ state_attr('input_select.effect_list', 'options') }}"
            effect_template: "{{ states('input_select.effect_list') }}"
            set_effect:
              service: light.turn_on
              entity_id:
              - light.lr_ceiling_light_1_ambilight
              - light.lr_ceiling_light_2_ambilight
              - light.lr_tv_bulb
              data_template:
                effect: "{{ effect }}"

    input_select:
      effect_list:
        options:
          - Strobe color
          - Police
          - Christmas
          - RGB
          - Stop
          - Alarm
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