### [Энергомониторинг в Home Assistant](https://youtu.be/-0HrYFCRH0M)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Команды:    

:ballot_box_with_check: Установка Mosquitto - `sudo apt-get install mosquitto`    
:ballot_box_with_check: Остановка Mosquitto - `sudo /etc/init.d/mosquitto stop`    
:ballot_box_with_check: Меняем содержимое конфига - `sudo nano /etc/mosquitto/mosquitto.conf`    

```yaml
##Начало

pid_file /var/run/mosquitto.pid

persistence true
persistence_location /var/lib/mosquitto/

log_dest topic

log_type error
log_type warning
log_type notice
log_type information

connection_messages true
log_timestamp true

include_dir /etc/mosquitto/conf.d
##Конец

```

:ballot_box_with_check: Старт Mosquitto - `sudo /etc/init.d/mosquitto start`    

:ballot_box_with_check: Прописываем в `/config/configuration.yaml`     
```yaml
mqtt:
  broker: IP адрес сервера
```

:ballot_box_with_check: Сенсоры    

```yaml
# Мгновенное потребление
  - platform: template
    sensors:
      load_158d0001291d12:
        friendly_name: 'Название сенсора'
        value_template: "{{ state_attr('switch.plug_158d0001291d12', 'load_power') }}"
        icon_template: mdi:power-plug
        unit_of_measurement: 'Вт'
        entity_id: switch.plug_158d0001291d12

#mqtt потребление за вчера
  - platform: mqtt
    state_topic: "power/158d0001291d12/yesterday"
    name: 'mqtt_power_yesterday_158d0001291d12'
    unit_of_measurement: 'кВт⋅ч'
  
#mqtt потребление за вчера      
  - platform: mqtt
    state_topic: "power/158d0001291d12/today"
    name: 'mqtt_power_today_158d0001291d12'
    unit_of_measurement: 'кВт⋅ч'

#mqtt потребление за месяц
  - platform: mqtt
    state_topic: "power/158d0001291d12/month"
    name: 'mqtt_power_month_158d0001291d12'
    unit_of_measurement: 'кВт⋅ч'
 
#mqtt потребление за прошлый месяц
  - platform: mqtt
    state_topic: "power/158d0001291d12/lastmonth"
    name: 'mqtt_power_lastmonth_158d0001291d12'
    unit_of_measurement: 'кВт⋅ч'

# Стоимость за месяц
  - platform: template
    sensors:
      money_month_158d0001291d12:
        friendly_name: "Стоимость за текущий месяц"
        unit_of_measurement: 'грн'
        value_template: "{{ (states.sensor.mqtt_power_month_158d0001291d12.state | float * 1.68)|round(2) }}"
        icon_template: mdi:square-inc-cash 
    
# Стоимость за прошлый месяц
  - platform: template
    sensors:
      money_lastmonth_158d0001291d12:
        friendly_name: "Стоимость за прошлый месяц"
        unit_of_measurement: 'грн'
        value_template: "{{ (states.sensor.mqtt_power_lastmonth_158d0001291d12.state | float * 1.68)|round(2) }}"
        icon_template: mdi:square-inc-cash 

# 30 сек расчет
- alias: 00_power_conter  
  initial_state: true
  trigger:
    - platform: time     #### c 0.86.1 платформа time_pattern 
      seconds: '/30'
  action:
#Потребление за день
    - service: mqtt.publish
      data_template:
        topic: "power/158d0001291d12/today"
        payload: '{{(states.sensor.mqtt_power_today_158d0001291d12.state | float +
                    (states.sensor.load_158d0001291d12.state | float /120000))|round(5)}}'
        retain: true
#Потребление за месяц
    - service: mqtt.publish
      data_template:
        topic: "power/158d0001291d12/month"
        payload: '{{(states.sensor.mqtt_power_month_158d0001291d12.state | float +
                    (states.sensor.load_158d0001291d12.state | float /120000))|round(5)}}'
        retain: true

# Начало дня    
- alias: 00_power_new_day
  initial_state: true
  trigger:
    - platform: time
      at: '00:00:05'
  action:
# Запись данных за прошедший день
    - service: mqtt.publish
      data_template:
        topic: "power/158d0001291d12/yesterday"
        payload: '{{(states.sensor.mqtt_power_today_158d0001291d12.state | float )|round(5)}}'
        retain: true 
    - delay: 00:00:05
# Обнуление данных текущего дня
    - service: mqtt.publish
      data_template:
        topic: "power/158d0001291d12/today"
        payload: '{{ 0.0 }}'
        retain: true

# Начало месяца
- alias: 00_power_new_ month
  initial_state: true
  trigger:
    - platform: time
      at: '00:00:10'
  condition:
    - condition: template
      value_template: '{{ now().day == 1 }}'
  action:
# Запись данных за прошедший месяц
    - service: mqtt.publish
      data_template:
        topic: "power/158d0001291d12/lastmonth"
        payload: '{{(states.sensor.mqtt_power_month_158d0001291d12.state | float )|round(5)}}'
        retain: true 
    - delay: 00:00:05
# Обнуление данных текущего месяца
    - service: mqtt.publish
      data_template:
        topic: "power/158d0001291d12/month"
        payload: '{{ 0.0 }}'
        retain: true
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