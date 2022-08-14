### [Beelink GK Mini на Celeron J4125 - обзор, легкая установка Home Assistant OS - пошаговая инструкция](https://youtu.be/i4bp-s20Dm8)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

:ballot_box_with_check: Пакадж из урока, системные сенсоры и recorder

```yaml
system_sensors:


# Объявляем раздел записи в БД. 
# Запись в файле secrets.yaml для моей базы - 
# db_link: mysql://hass:hass@core-mariadb/homeassistant?charset=utf8
# В этом примере хранение 3 дня, интервал сохранения - 60 секунд
# Перечень объектов можно расширять в каждом новом пакадже

    recorder:
      db_url: !secret db_link
      purge_keep_days: 3
      auto_purge: true
      commit_interval: 60
      include:
        entities:
          - sensor.processor_use
          - sensor.disk_use_percent
          - sensor.memory_use_percent
          - sensor.disk_free
          - sensor.maria_db
          - sensor.cpu_temperature
          - sensor.file_editor_cpu_percent
          - sensor.mariadb_cpu_percent

# Кастомизация - присваиваем имена для интерфейса, тут же можно добавить иконки и device_class
          
    homeassistant:

      customize:
        sensor.processor_use:
          friendly_name: Загрузка процессора
        sensor.disk_use_percent:
          friendly_name: Использование диска
        sensor.disk_free:
          friendly_name: Свободно на диске
        sensor.memory_use_percent:
          friendly_name: Использование ОЗУ
        sensor.maria_db:
          friendly_name: Объем базы Maria DB
        sensor.online_custom:
          friendly_name: Home Assistant в онлайне -
        sensor.last_boot_custom:
          friendly_name: Сервер в онлайне -
        sensor.custom_time:
          friendly_name: Текущее время -
        sensor.cpu_temperature:
          friendly_name: Температура процессора -

# Сенсоры для мониторинга системы, использование процессора, памяти, хранилища

    sensor:    
    - platform: systemmonitor
      resources:
      - type: processor_use
      - type: disk_use_percent
        arg: /
      - type: memory_use_percent
      - type: last_boot
      - type: disk_free
        arg: /

# Температура процессора
# Команда для получения термальных зон - ls -1 /sys/class/thermal/thermal_zone*/type | xargs -I % sh -c "echo % ; cat %"
# Температура корпуса процессора - x86_pkg_temp

    - platform: command_line
      name: cpu_temperature
      command: "cat /sys/devices/virtual/thermal/thermal_zone1/temp"
      value_template: '{{ value | multiply(0.001) | round(2) }}'
      unit_of_measurement: '°C'

# Объем базы Maria DB - 
# После первого запуска - сенсор добавляется в GUI, после чего комментируем его тут

    # - platform: sql
    #   db_url: !secret db_link
    #   queries:
    #     - name: maria_db
    #       query: 'SELECT table_schema "database", Round(Sum(data_length + index_length) / 1048576, 2) "value" FROM information_schema.tables WHERE table_schema="homeassistant" GROUP BY table_schema;'
    #       column: 'value'
    #       unit_of_measurement: MB


# Время с последней перезагрузки Home Assistant в формате timestamp
    - platform: uptime
      name: online

# Сенсоры даты и времени
    - platform: time_date
      display_options:
        - 'time'
        - 'date'
        - 'date_time'
        - 'time_date'

    template:

# Сенсор времени с обновлением каждые 10 секунд в формате timestamp   
      - trigger:
          - platform: time_pattern
            seconds: "/10"
        sensor:
          - name: time_10_sec
            state: '{{ as_timestamp(now()) | round(default=0)}}'
            
      - sensor:

# Сенсор времени с обновлением каждые 10 секунд в формате для интерфейса        
          - name: custom_time
            state: >
              {{states("sensor.time_10_sec") | int | timestamp_custom("%H:%M:%S") }}

# Время с последней перезагрузки Home Assistant
          - name: online_custom
            state: >
               {% set s = (states("sensor.time_10_sec") | int - as_timestamp(states('sensor.online')) | int) %}
               {{ '{:d} дн. {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}

# Время с последней перезагрузки сервера
          - name: last_boot_custom
            state: >
               {% set s = (states("sensor.time_10_sec") | int - as_timestamp(states('sensor.last_boot')) | int) %}
               {{ '{:d} дн. {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}

        
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