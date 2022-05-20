### Задача - автоматизация работы системы вентиляции

Для использования в качестве шаблонов для подобных кейсов     

#### Дано:    
:ballot_box_with_check: Физический сенсор СО2 - sensor.air_co2    
:ballot_box_with_check: 5 режимов работы клапана вентиляции:    
:one: Выключено - switch.clapan_off, режим Disable    
:two: 25% мощности - switch.clapan_mode_1, режим Silent    
:three: 50% мощности - switch.clapan_mode_2, режим Low    
:four: 75% мощности - switch.clapan_mode_3, режим Medium    
:five: 100% мощности - switch.clapan_mode_4, режим High    

Режимы работы зависит от времени суток, и концентрации СО2 в воздухе.    
Ночью - выключен    
Утром и вечером, выключен до концентрации 750 ppm CO2, если выше - включен на 25%    
Днем - менее 500 ppm CO2 выключен, 500-650 ppm CO2 - 25%, 650-750 ppm CO2 - 50%, 750-850 ppm CO2 - 75%, выше 850 ppm CO2 - 100%    

#### Решение:    
:ballot_box_with_check: Время суток    
Применено два сенсора `time of day` (tod), это бинарный сенсор, который имеет статус on в указанные диапазон времени и off - в остальное время.    
:crescent_moon: Ночь с 23:00 до 05:00    
:sunny: День с 09:00 до 21:00    
:city_sunrise: Утро и вечер - остальное время    

:ballot_box_with_check: Режимы работы    
Применен 1 сенсор на платформе template, который, в зависимости от условий - состояний tod сенсоров и показаний CO2 может принимать 5 вариантов состояний - Disable, Silent, Low, Medium, High.    

:ballot_box_with_check: Переключение режимов    
Одна автоматиазация, отслеживающая любое изменение состояния сенсора режимов и при помощи селектора условий - включающая нужный.    

#### Пакадж для использования в качестве шаблона -     

```yaml
co2_control:

    binary_sensor:

    # Ночное время 
      - platform: tod
        name: night
        after: '23:00'
        before: '05:00'

    # Дневное время 
      - platform: tod
        name: day
        after: '09:00'
        before: '21:00'
        
    template:

      - sensor:
    
        #Сенсор определяющий режим работы, в зависимости от времени суток и значения С02
          - name: co2_level
            state: >
              {% 
              if is_state('binary_sensor.night', 'on') 
              %}
              Disable
              {% 
              elif states('sensor.air_co2')|int < 750
              and is_state('binary_sensor.night', 'off')
              and is_state('binary_sensor.day', 'off') 
              %}
              Disable
              {% 
              elif states('sensor.air_co2')|int > 750
              and is_state('binary_sensor.night', 'off')
              and is_state('binary_sensor.day', 'off') 
              %}
              Silent
              {% 
              elif states('sensor.air_co2')|int < 500
              and is_state('binary_sensor.day', 'on') 
              %}
              Disable
              {% 
              elif states('sensor.air_co2')|int > 500
              and states('sensor.air_co2')|int < 650 
              and is_state('binary_sensor.day', 'on') 
              %}
              Silent
              {% 
              elif states('sensor.air_co2')|int > 650
              and states('sensor.air_co2')|int < 750 
              and is_state('binary_sensor.day', 'on') 
              %}
              Low
              {% 
              elif states('sensor.air_co2')|int > 750
              and states('sensor.air_co2')|int < 850 
              and is_state('binary_sensor.day', 'on') 
              %}
              Medium
              {% 
              elif states('sensor.air_co2')|int > 850 
              and is_state('binary_sensor.day', 'on') 
              %}
              High
              {% endif %}

    automation:
    
      - id: Управление клапаном
        alias: clapan_1_control
        initial_state: true
        trigger:
    # Ловим любое изменение состояния сенсора
        - platform: state
          entity_id: sensor.co2_level
        action:
            - choose:
    # Действие для первого статуса
              - conditions:
                  - condition: state
                    entity_id: sensor.co2_level
                    state: 'Disable'
                sequence:
                  - service: switch.turn_on
                    entity_id: switch.clapan_off
    # Действие для второго статуса
              - conditions:
                  - condition: state
                    entity_id: sensor.co2_level
                    state: 'Silent'
                sequence:
                  - service: switch.turn_on
                    entity_id: switch.clapan_mode_1
    # Действие для третьего статуса
              - conditions:
                  - condition: state
                    entity_id: sensor.co2_level
                    state: 'Low'
                sequence:
                  - service: switch.turn_on
                    entity_id: switch.clapan_mode_2
    # Действие для четвертого статуса
              - conditions:
                  - condition: state
                    entity_id: sensor.co2_level
                    state: 'Medium'
                sequence:
                  - service: switch.turn_on
                    entity_id: switch.clapan_mode_3
    # Действие для пятого статуса
              - conditions:
                  - condition: state
                    entity_id: sensor.co2_level
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