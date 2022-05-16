### [Блог. Home Assistant. Светильники - уведомления, сохранение и восстановление состояния]( )

#### Ccылки и код из видео:    

:white_check_mark: [Таблица цветов](https://allcalc.ru/node/402)

:ballot_box_with_check: Автоматизация - включение светильника с заданным эффектом    

```yaml
      - id: Световое уведомление
        alias: light_notification
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_button.light_test
        action:
          - service: light.turn_on
            entity_id: 
              - light.lr_ceiling_light_1_ambilight
            data:
              brightness_pct: 100
              rgb_color: [255, 0, 0]
              effect: Alarm
          - delay: 00:00:05
          - service: light.turn_off
            entity_id: 
              - light.lr_ceiling_light_1_ambilight
```

:ballot_box_with_check: Автоматизация - запуск скрипта

```yaml
      - id: Световое уведомление
        alias: light_notification
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_button.light_test
        action:
         - service: script.turn_on
           entity_id: script.alarm_light_lr_bedside
```

:ballot_box_with_check: Скрипт - повтор 5 раз, трехкратное изменение цвета светильника    

```yaml
      alarm_light_lr_bedside:
        alias: Мерцание прикроватника в гостиной
        sequence:
            repeat:
              count: 5
              sequence:
              - service: light.turn_on
                entity_id: 
                   - light.lr_bedside
                data:
                  brightness_pct: 100
                  rgb_color: [255, 0, 0]
                  transition: 1
              - delay: 1
              
              - service: light.turn_on
                entity_id: 
                   - light.lr_bedside
                data:
                  brightness_pct: 100
                  rgb_color: [0, 255, 0]
                  transition: 1
              - delay: 1
              
              - service: light.turn_on
                entity_id: 
                   - light.lr_bedside
                data:
                  brightness_pct: 100
                  rgb_color: [0, 0, 255]
                  transition: 1
              - delay: 1
              
              - service: light.turn_off
                entity_id: 
                  - light.lr_bedside
                data:
                  transition: 1
              - delay: 1

```

:ballot_box_with_check: Скрипт - повтор 3 раза, изменение цветовой температуры от 6500 до 2700 с последующим отключением    

```yaml
      alarm_light_lr_ceiling_light:
        alias: Мерцание люстры в гостиной
        sequence:
          - alias: "Мерцаем три раза"
            repeat:
              count: 3 
              sequence:
              - service: light.turn_on
                entity_id: 
                   - light.lr_ceiling_light_1
                data:
                  brightness_pct: 100
                  kelvin: 6500
                  transition: 2
              - delay: 2
              - service: light.turn_on
                entity_id: 
                   - light.lr_ceiling_light_1
                data:
                  brightness_pct: 100
                  kelvin: 2700
                  transition: 2
              - delay: 2
          - service: light.turn_off
            entity_id: 
               - light.lr_ceiling_light_1
            data:
              transition: 2

```

:ballot_box_with_check: Автоматизация - сохранение параметров в сцену, запуск скрипта, восстановление    

```yaml
      - id: Световое уведомление
        alias: light_notification
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_button.light_test
        action:
         - service: scene.create
           data:
            scene_id: light_before
            snapshot_entities:
             - light.lr_ceiling_light_1
         - service: light.turn_off
           entity_id: light.lr_ceiling_light_1
         - service: script.turn_on
           entity_id: script.flash_light
         - delay: 00:00:13
         - service: scene.turn_on
           target:
             entity_id: scene.light_before

```

:ballot_box_with_check: Автоматизация - сохранение параметров в сцену, включение светильника с заданным эффектом, восстановление    

```yaml
      - id: Световое уведомление
        alias: light_notification
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_button.light_test
        action:
         - service: scene.create
           data:
            scene_id: light_before
            snapshot_entities:
             - light.lr_ceiling_light_1
         - service: light.turn_off
           entity_id: 
             - light.lr_ceiling_light_1
         - service: light.turn_on
           entity_id: 
             - light.lr_ceiling_light_1_ambilight
           data:
               brightness_pct: 100
               rgb_color: [255, 0, 0]
               effect: Alarm
         - delay: 00:00:10
         - service: scene.turn_on
           target:
             entity_id: scene.light_before

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