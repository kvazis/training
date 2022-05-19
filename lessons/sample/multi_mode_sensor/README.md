#### Задача - автоматизация работы системы вентиляции

Необходимо, в зависимости от показаний сенсора CO2, которые разделены на 5 диапазонов, активировать различные режимы работы системы вентиляции, посредством управления клапанами.    
Для решения применен шаблонный сенсор, который принимает различные значения в зависимости от диапазона и автоматизация с селектором условий.    
Пакадж для использования в качестве шаблона -     

```yaml
co2_control:

    template:

      - sensor:
    
        #Сенсор определяющий значение С02
          - name: co2_level_1
            state: >
              {% if states('sensor.cleargrass_air_co2')|int < 500 %}
              Disable
              {% elif states('sensor.cleargrass_air_co2')|int > 500
                 and states('sensor.cleargrass_air_co2')|int < 650 %}
              Silent
              {% elif states('sensor.cleargrass_air_co2')|int > 650
                 and states('sensor.cleargrass_air_co2')|int < 750 %}
              Low
              {% elif states('sensor.cleargrass_air_co2')|int > 750
                 and states('sensor.cleargrass_air_co2')|int < 850 %}
              Medium
              {% elif states('sensor.cleargrass_air_co2')|int > 850 %}
              High
              {% endif %}

    automation:
    
      - id: Управление клапаном 1
        alias: clapan_1_control
        initial_state: true
        trigger:
    # Ловим любое изменение состояния сенсора
        - platform: state
          entity_id: sensor.co2_level_1
        action:
            - choose:
    # Действие для первого статуса
              - conditions:
                  - condition: state
                    entity_id: sensor.co2_level_1
                    state: 'Disable'
                sequence:
                  - service: switch.turn_on
                    entity_id: switch.clapan_off
    # Действие для второго статуса
              - conditions:
                  - condition: state
                    entity_id: sensor.co2_level_1
                    state: 'Silent'
                sequence:
                  - service: switch.turn_on
                    entity_id: switch.clapan_mode_1
    # Действие для третьего статуса
              - conditions:
                  - condition: state
                    entity_id: sensor.co2_level_1
                    state: 'Low'
                sequence:
                  - service: switch.turn_on
                    entity_id: switch.clapan_mode_2
    # Действие для четвертого статуса
              - conditions:
                  - condition: state
                    entity_id: sensor.co2_level_1
                    state: 'Medium'
                sequence:
                  - service: switch.turn_on
                    entity_id: switch.clapan_mode_3
    # Действие для пятого статуса
              - conditions:
                  - condition: state
                    entity_id: sensor.co2_level_1
                    state: 'High'
                sequence:
                  - service: switch.turn_on
                    entity_id: switch.clapan_mode_4

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