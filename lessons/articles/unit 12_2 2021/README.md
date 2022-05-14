### [Home Assistant. Урок 12.2 Интерфейс - Lovelace, карта Multiple Entity Row](https://youtu.be/m8WkJv7M9CY)

####  Код из урока в текстовом виде - 

:white_check_mark: **Multiple Entity Row**    

:ballot_box_with_check: Ручной режим `lovelace` и кастомные карты `auto-entities` и `multiple-entity-row` в ресурсах - `configuration.yaml`

```yaml
lovelace:
  mode: yaml
  resources:
   - url: /hacsfiles/lovelace-auto-entities/auto-entities.js
     type: module  
   - url: /hacsfiles/lovelace-multiple-entity-row/multiple-entity-row.js
     type: module 
```

:ballot_box_with_check: Страница из урока с картами - 

```yaml
  - title: Устройства
    icon: mdi:gauge

    cards:

    - type: vertical-stack
      cards: 

        - type: entities
          show_header_toggle: false
          entities:
            - entity: sensor.0x00158d0001dcd47e_temperature
              name: Температура   
            - entity: sensor.0x00158d0001dcd47e_humidity
              name: Влажность
            - entity: sensor.0x00158d0001dcd47e_battery
              name: Уровень заряда             

        - type: entities
          show_header_toggle: false
          entities:
          - entity: sensor.0x00158d0001dcd47e_battery
            type: custom:multiple-entity-row
            icon: mdi:home-thermometer
            name: Климат
            state_header: Уровень заряда
            entities:
              - entity: sensor.0x00158d0001dcd47e_temperature
                name: Температура            
              - entity: sensor.0x00158d0001dcd47e_humidity
                name: Влажность            
            
        - type: entities
          show_header_toggle: false
          entities:
          - entity: sensor.0x00158d0001dcd47e_battery
            type: custom:multiple-entity-row
            icon: mdi:home-thermometer
            name: Климат
            # state_header: Уровень заряда
            show_state: false
            entities:
              - attribute: last_seen
                format: relative
                name: Отклик            
              - attribute: voltage
                name: Напряжение             
            
          - entity: switch.0x04cf8cdf3c764e0a
            type: custom:multiple-entity-row
            icon: mdi:power-socket-eu
            toggle: true
            state_color: true
            name: Розетка Xiaomi
            secondary_info: last-changed
            state_header: Состояние          
            entities:
              - entity: sensor.0x04cf8cdf3c764e0a_power
                name: Мощность           
              - entity: sensor.0x04cf8cdf3c764e0a_voltage
                name: Напряжение             
            
        - type: entities
          show_header_toggle: false
          entities:
          - entity: switch.0x00158d0003f46bb6_l2
            type: custom:multiple-entity-row
            icon: mdi:dip-switch
            toggle: true
            state_color: true
            name: Реле Aqara
            state_header: 2 линия
            entities:
              - entity: sensor.0x00158d0003f46bb6_voltage
                name: Напряжение
              - entity: sensor.0x00158d0003f46bb6_power
                name: Мощность
              - entity: switch.0x00158d0003f46bb6_l1
                name: 1 линия
                toggle: true            
          - type: divider 
          - entity: switch.0x04cf8cdf3c764e0a
            type: custom:multiple-entity-row
            icon: mdi:power-socket-eu
            toggle: true
            state_color: true
            name: Розетка Xiaomi
            entities:
              - entity: sensor.0x04cf8cdf3c764e0a_power
                name: false           
              - entity: sensor.0x04cf8cdf3c764e0a_voltage
                name: false            

    - type: vertical-stack
      cards: 

        - type: entities
          show_header_toggle: false
          entities:
          
          - entity: switch.0x60a423fffe7ff8c8_switch
            type: custom:multiple-entity-row
            icon: mdi:power-socket-eu
            name: Важная розетка
            state_color: true
            secondary_info: last-changed
            entities:
              
              - icon: mdi:power-plug
                state_color: true
                name: Вкл
                tap_action:
                  action: call-service
                  service: switch.turn_on
                  service_data:
                    entity_id: switch.0x60a423fffe7ff8c8_switch
              
              - icon: mdi:power-plug-off
                name: Выкл
                tap_action:
                  action: call-service
                  service: switch.turn_off
                  service_data:
                    entity_id: switch.0x60a423fffe7ff8c8_switch
                  confirmation:
                     text: 'Точно?'

        - type: entities
          show_header_toggle: false
          entities:
          - entity: sensor.en_smoke_sensor_battery
            type: custom:multiple-entity-row
            icon: mdi:fire
            name: Датчик дыма
            state_header: Заряд
            entities:
              - attribute: last_seen
                format: relative
                name: Отклик
              - entity: sensor.en_smoke_sensor_linkquality
                name: Сигнал

          - type: section
          - entity: sensor.en_door_battery
            type: custom:multiple-entity-row
            icon: mdi:door
            name: Входная дверь
            state_header: Заряд
            entities:
              - attribute: last_seen
                format: relative
                name: Отклик
              - entity: sensor.en_door_linkquality
                name: Сигнал

          - type: section
          - entity: sensor.en_moving_battery
            type: custom:multiple-entity-row
            icon: mdi:run
            name: Сенсор движения
            state_header: Заряд
            entities:
              - attribute: last_seen
                format: relative
                name: Отклик
              - entity: sensor.en_moving_linkquality
                name: Сигнал

          - type: section
          - entity: sensor.en_cupboard_round_battery
            type: custom:multiple-entity-row
            icon: mdi:gesture-double-tap
            name: Кнопка
            state_header: Заряд
            entities:
              - attribute: last_seen
                format: relative
                name: Отклик
              - entity: sensor.en_cupboard_round_linkquality
                name: Сигнал
                   
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