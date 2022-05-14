### [Home Assistant. Урок 10.5 Практические кейсы - энергомониторинг на данных от устройства](https://youtu.be/t-AhgPKRpAA)

#### Пакадж для энергомониторинга

```yaml
unit_10_5:
# Энергомониторинг

    automation:

        - id: Энергомониторинг начало нового дня
          alias: consumption_new_day
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:05'
          action: 
            - service: mqtt.publish
              data_template:                
                topic: "energymonitor/newday"
                payload: "{{states('sensor.0x04cf8cdf3c764e0a_energy') | float}}"
                retain: true

        - id: Энергомониторинг за вчерашний день
          alias: consumption_yesterday
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:00'
          action: 
            - service: mqtt.publish
              data_template:                
                topic: "energymonitor/yesterday"
                payload: "{{states('sensor.consumption_day') | float}}"
                retain: true

        - id: Энергомониторинг начало новой недели
          alias: consumption_new_week
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:05'
          condition:
          - condition: time
            weekday:
              - mon
          action: 
            - service: mqtt.publish
              data_template:                
                topic: "energymonitor/newweek"
                payload: "{{states('sensor.0x04cf8cdf3c764e0a_energy') | float}}"
                retain: true

        - id: Энергомониторинг прошлая неделя
          alias: consumption_previous_week
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:00'
          condition:
          - condition: time
            weekday:
              - mon
          action: 
            - service: mqtt.publish
              data_template:                
                topic: "energymonitor/previousweek"
                payload: "{{states('sensor.consumption_week') | float}}"
                retain: true

        - id: Энергомониторинг начало нового месяца
          alias: consumption_new_month
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:05'
          condition:
           - condition: template
             value_template: '{{ now().day == 1 }}'
          action: 
            - service: mqtt.publish
              data_template:                
                topic: "energymonitor/newmonth"
                payload: "{{states('sensor.0x04cf8cdf3c764e0a_energy') | float}}"
                retain: true

        - id: Энергомониторинг прошлый месяц
          alias: consumption_previous_month
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:00'
          condition:
           - condition: template
             value_template: '{{ now().day == 1 }}'
          action: 
            - service: mqtt.publish
              data_template:                
                topic: "energymonitor/previousmonth"
                payload: "{{states('sensor.consumption_month') | float}}"
                retain: true

    sensor:
    
      - platform: mqtt
        state_topic: "energymonitor/newday"
        name: consumption_new_day
        unit_of_measurement: 'кВт⋅ч'

      - platform: mqtt
        state_topic: "energymonitor/yesterday"
        name: consumption_yesterday
        unit_of_measurement: 'кВт⋅ч'

      - platform: mqtt
        state_topic: "energymonitor/newweek"
        name: consumption_new_week
        unit_of_measurement: 'кВт⋅ч'
        
      - platform: mqtt
        state_topic: "energymonitor/previousweek"
        name: consumption_previous_week
        unit_of_measurement: 'кВт⋅ч'
        
      - platform: mqtt
        state_topic: "energymonitor/newmonth"
        name: consumption_new_month
        unit_of_measurement: 'кВт⋅ч'        

      - platform: mqtt
        state_topic: "energymonitor/previousmonth"
        name: consumption_previous_month
        unit_of_measurement: 'кВт⋅ч'
        
      - platform: template
        sensors:

          consumption_day:
            friendly_name: "Потребление за текущий день"
            unit_of_measurement: 'кВт⋅ч'
            value_template: "{{ (states('sensor.0x04cf8cdf3c764e0a_energy') | float - (states('sensor.consumption_new_day') | float))|round(2) }}"
            icon_template: mdi:flash 
            
          consumption_week:
            friendly_name: "Потребление за текущую неделю"
            unit_of_measurement: 'кВт⋅ч'
            value_template: "{{ (states('sensor.0x04cf8cdf3c764e0a_energy') | float - (states('sensor.consumption_new_week') | float))|round(2) }}"
            icon_template: mdi:flash             
            
          consumption_month:
            friendly_name: "Потребление за текущий месяц"
            unit_of_measurement: 'кВт⋅ч'
            value_template: "{{ (states('sensor.0x04cf8cdf3c764e0a_energy') | float - (states('sensor.consumption_new_month') | float))|round(2) }}"
            icon_template: mdi:flash             
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