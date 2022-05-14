### [Блог. Home Assistant - контроль входных дверей, отправка уведомления и фото с камер в телеграм](https://youtu.be/YxzUqcTerSE)

#### Пакадж показанный в блоге - отправка уведомлений и фото в телеграм при открытии входной двери

```yaml

en_camera:

    template:
     
      - binary_sensor:

          - name: enter_camera_snapshot
            state: >
              {{ is_state('binary_sensor.0x00158d000119378d_contact', 'on')  
              }}
            delay_off: 00:03:00
            device_class: running
            icon: >
              {% if is_state("binary_sensor.enter_camera_snapshot", "on") %}
              mdi:camera-off
              {% else %}
              mdi:camera
              {% endif %}

    automation:

      - id: Открытие двери - фото и отправка в телеграмм
        alias: enter_photo
        initial_state: true
        trigger:
    ## Открытие двери
        - platform: state
          entity_id: binary_sensor.enter_camera_snapshot
          to: 'on'
        condition:
         - condition: state
           entity_id: switch.control_mode
           state: 'on'
        action:
         - service: telegram_bot.send_message
           data_template:
             target:
                 - !secret chat_id_group
             message: | 
                  {{"\U0001F6AA"}} Входная дверь открыта в {{ states.sensor.time_date.state }}
         - service: input_button.press
           target:
             entity_id: 
              - input_button.reolink_411_ws
              - input_button.reolink_410
              - input_button.xiaofang

      - id: Reolink 411 ws - фото и отправка в телеграмм
        alias: reolink411_photo
        initial_state: true
        trigger:
    ## Виртуальная кнопка
        - platform: state
          entity_id: input_button.reolink_411_ws
        condition:
         - condition: state
           entity_id: switch.control_mode
           state: 'on'
        action:
         - service: camera.snapshot
           data:
              entity_id: camera.reolink_411_ws
              filename: "/config/www/cam_captures/reolink411.jpg"
         - delay: 00:00:20
         - service: telegram_bot.send_photo
           data_template:
             target:
              - !secret chat_id_group
             file: "/config/www/cam_captures/reolink411.jpg" 
        
      - id: Reolink 410 - фото и отправка в телеграмм
        alias: reolink410_photo
        initial_state: true
        trigger:
    ## Виртуальная кнопка
        - platform: state
          entity_id: input_button.reolink_410
        condition:
         - condition: state
           entity_id: switch.control_mode
           state: 'on'
        action:
         - service: camera.snapshot
           data:
              entity_id: camera.reolink_410
              filename: "/config/www/cam_captures/reolink410.jpg"
         - delay: 00:00:20
         - service: telegram_bot.send_photo
           data_template:
             target:
              - !secret chat_id_group
             file: "/config/www/cam_captures/reolink410.jpg"         
        

      - id: Xiaofang - фото и отправка в телеграмм
        alias: xiaofang_photo
        initial_state: true
        trigger:
    ## Виртуальная кнопка
        - platform: state
          entity_id: input_button.xiaofang 
        condition:
         - condition: state
           entity_id: switch.control_mode
           state: 'on'
        action:
         - service: camera.snapshot
           data:
              entity_id: camera.xiaofang
              filename: "/config/www/cam_captures/xiaofang.jpg"
         - delay: 00:00:20
         - service: telegram_bot.send_photo
           data_template:
             target:
              - !secret chat_id_group
             file: "/config/www/cam_captures/xiaofang.jpg" 
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