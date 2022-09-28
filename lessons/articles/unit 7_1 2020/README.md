### [Home Assistant. Урок 7.1 Сохраняем резервные копии на Google Disk, recorder, разбираем шаблоны](https://youtu.be/-Jt--jeIiEY)    

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Команды и ссылки из урока:    

:white_check_mark: **Hass.io Google Drive Backup Repository** - `https://github.com/sabeechen/hassio-google-drive-backup`    

:ballot_box_with_check: Пример конфигурации recorder     
```yaml
  db_url: mysql://hass:hass@core-mariadb/homeassistant?charset=utf8
  include:
    domains:
      - switch
      - light
    entities: 
#Объем БД
      - sensor.maria_db_size
#Сенсоры температуры и влажности
      - sensor.0x00158d0001581109_temperature
      - sensor.0x00158d000159c7e6_temperature
      - sensor.0x00158d0001dcd47e_temperature
      - sensor.0x00158d0001581109_humidity
      - sensor.0x00158d000159c7e6_humidity
      - sensor.0x00158d0001dcd47e_humidity
# Сенсоры мощности
      - sensor.0x00158d00010ec4b8_power
      - sensor.0x00158d000114a1e1_power
      - sensor.0x00158d00012896cb_power
  exclude:
    entities: 
# Светильники шлюзов
      - light.gateway_light_286c07f0ad27
      - light.gateway_light_34ce0088b039
      - light.gateway_light_7811dc64f4c8
      - light.gateway_light_7811dc64f4c8
```

:ballot_box_with_check: Обновление 2022 - сжатие базы теперь происходит автоматически, нет необходимости в автоматизации    

:ballot_box_with_check: Сенсор lastboot и uptime в домене sensor    

```yaml

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
      - type: processor_temperature
      
    - platform: uptime
      name: online
```

:ballot_box_with_check: Обновление 2022 - новые версии шаблонов для сенсоров, в домене template (вместо sensor)    


```yaml
    template:

    # Время с последней перезагрузки Home Assistant    
          - name: online_custom
            state: >
               {% set s = (as_timestamp(now()) | round(default=0) | int - as_timestamp(states('sensor.online')) | int) %}
               {{ '{:d} дн. {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}

    # Время с последней перезагрузки сервера
          - name: last_boot_custom
            state: >
               {% set s = (as_timestamp(now()) | round(default=0) | int - as_timestamp(states('sensor.last_boot')) | int) %}
               {{ '{:d} дн. {:02d}:{:02d}:{:02d}'.format (s // 86400, s % 86400 // 3600, s % 3600 // 60, s % 60) }}    
    
```

:ballot_box_with_check: Обновление 2022 - пакадж для сенсоров аддона Google backup    

```yaml
google_backup:

    homeassistant:

      customize:
        sensor.last_google_backup_main:
          friendly_name: Последний бэкап -
        sensor.backups_in_google_drive:
          friendly_name: Снимки системы на Google Drive
        sensor.backups_in_home_assistant:
          friendly_name: Снимки системы на сервере
        sensor.size_in_google_drive:
          friendly_name: Занято на Google Drive
        sensor.size_in_home_assistant:
          friendly_name: Занято на сервере

    template:
     
      - sensor:

          - name: last_google_backup_main
            state: >
                {% if state_attr("sensor.backup_state","last_backup") %}
                {{as_timestamp(state_attr("sensor.backup_state","last_backup"))|timestamp_custom("%d.%m.%Y %H:%M")}}
                {% else %} 
                Получение данных...
                {% endif %} 
            icon: mdi:calendar-check-outline

          - name: backups_in_google_drive
            state: "{{ state_attr('sensor.backup_state', 'backups_in_google_drive') }}"
            unit_of_measurement: шт
            icon: mdi:folder-google-drive    

          - name: backups_in_home_assistant
            state: "{{ state_attr('sensor.backup_state', 'backups_in_home_assistant') }}"
            unit_of_measurement: шт
            icon: mdi:home-assistant      

          - name: size_in_google_drive
            state: "{{ state_attr('sensor.backup_state', 'size_in_google_drive') }}"
            icon: mdi:numeric
      
          - name: size_in_home_assistant
            state: "{{ state_attr('sensor.backup_state', 'size_in_home_assistant') }}"
            icon: mdi:numeric
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