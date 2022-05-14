### [Блог. Home Assistant - пример управления двумя светильниками одним действием](https://youtu.be/FpKBj1hDmRA)

#### Пакадж из обзора

```yaml

    template:
     
      - binary_sensor:

    # Отслеживание включения лампочки в течении 10 сек
          - name: 0x00158d0003e74c31_on
            state: >
              {{ is_state('light.0x00158d0003e74c31', 'on')  
              }}
            delay_on: 00:00:10
            icon: >
              {% if is_state("binary_sensor.0x00158d0003e74c31_on", "on") %}
              mdi:radiobox-marked
              {% else %}
              mdi:radiobox-blank
              {% endif %}
            
    automation:

      - id: Коридор и прихожая, управление освещением
        alias: cr_en_light_control
        initial_state: true
        trigger:
    # Выключатель на стене у входа в гостиную
        - platform: state
          entity_id: sensor.0x00158d00013fc3bc_action
          to: 'single_both'
        action:
            - choose:
            # Оба светильника выключены - включается лампочка в прихожей
              - conditions:
                  - condition: state
                    entity_id: light.0x00158d0003e74c31
                    state: 'off'
                  - condition: state
                    entity_id: light.cr_ceiling_light
                    state: 'off'
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.0x00158d0003e74c31
                    data_template:
                      brightness_pct: 100
                      kelvin: 4000
            # Лампочка включена менее 10 сек, люстра выключена - включается люстра в коридоре
              - conditions:
                  - condition: state
                    entity_id: light.0x00158d0003e74c31
                    state: 'on'
                  - condition: state
                    entity_id: binary_sensor.0x00158d0003e74c31_on
                    state: 'off'
                  - condition: state
                    entity_id: light.cr_ceiling_light
                    state: 'off'
                sequence:
                  - service: light.turn_on
                    entity_id:
                      - light.cr_ceiling_light
                    data_template:
                      brightness_pct: 75
                      kelvin: 4000
            # Оба светильника включены - оба выключается
              - conditions:
                  - condition: state
                    entity_id: light.0x00158d0003e74c31
                    state: 'on'
                  - condition: state
                    entity_id: light.cr_ceiling_light
                    state: 'on'
                sequence:
                  - service: light.turn_off
                    entity_id:
                      - light.0x00158d0003e74c31
                      - light.cr_ceiling_light
            # Лампочка включена более 10 сек, люстра выключена - выключается лампочка в прихожей
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.0x00158d0003e74c31_on
                    state: 'on'
                  - condition: state
                    entity_id: light.cr_ceiling_light
                    state: 'off'
                sequence:
                  - service: light.turn_off
                    entity_id:
                      - light.0x00158d0003e74c31
            # Лампочка выключена, люстра включена - выключается люстра в коридоре
              - conditions:
                  - condition: state
                    entity_id: light.0x00158d0003e74c31
                    state: 'off'
                  - condition: state
                    entity_id: light.cr_ceiling_light
                    state: 'on'
                sequence:
                  - service: light.turn_off
                    entity_id:
                      - light.cr_ceiling_light
                      
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