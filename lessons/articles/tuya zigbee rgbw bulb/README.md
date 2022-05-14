### [Светодиодная лампочка RGB+CCT под E27, с управлением по zigbee - обзор, интеграция в Home Assistant](https://youtu.be/4XQbGesJ-mQ)

####  Пакадж для управления лампочкой, с переводом режима свечения в щадящий режим перед выключением


```yaml
zigbee_light:

    automation:
    
        - id: zigbee_light_control
          alias: Управление Zigbee лампочкой
          initial_state: true
          trigger:       
           - platform: state
             entity_id: sensor.0x00158d0001718ca8_action
             to: 'single_left'
          action: 
          - service: script.turn_on
            data_template:
             entity_id: >-
                {%- if states('light.0xa4c138d0666eb1aa')  == 'off' -%}
                script.zigbee_light_on
                {%- elif states('light.0xa4c138d0666eb1aa')  == 'on' -%}
                script.zigbee_light_off
                {%- endif -%}
                
    script:
    
        zigbee_light_on:
          alias: Включение лампочки
          sequence:
            - service: light.turn_on
              entity_id: 
                 - light.0xa4c138d0666eb1aa
              data_template:
                brightness_pct: 100
                kelvin: 4000
                
        zigbee_light_off:
          alias: Выключение лампочки
          sequence:
            - service: light.turn_on
              entity_id: 
                 - light.0xa4c138d0666eb1aa
              data_template:
                brightness_pct: 1
                rgb_color: [0, 0, 255]
            - delay: 00:00:01
            - service: light.turn_off
              entity_id: 
                 - light.0xa4c138d0666eb1aa
```

____
### Как поддержать развитие проекта?
* [Стать спонсором моего Youtube](http://kvazis.link/sponsorship)
* [Подписаться на Patreon](http://kvazis.link/patreon)
* [Перевод через Paypal](http://kvazis.link/paypal)
* Webmoney - Z243592584952
* BTC - 1Gzr7WQugfnPuWVawu47EiCMTDUBqCAshj
* ETH - 0xa0ce3E29Cf537013649Ae9cdbc08C4853fF91FAc
* LTC - ltc1qs493yk2wk9ywx5h6aruk4p9zm75hx42ekv4ym2
* TRX - TFTCLqvS1tMBwokRHBwz1TCDJ4oD1Z5zPk