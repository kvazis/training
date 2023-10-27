### [Home Assistant - Резервное копирование, Google Drive Backup - октябрь 2023](https://youtu.be/7_86CMuToxI)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Команды и ссылки из урока:  

:ballot_box_with_check: Путь для репозитория zigbee2mqtt - `https://github.com/sabeechen/hassio-google-drive-backup`    

:ballot_box_with_check: Облачный диск Google Drive - `https://drive.google.com`    


:ballot_box_with_check: Показанный вариант пакаджа `system_sensors.yaml` с учетом настроек из предыдущих уроков     
```yaml
system_sensors:


    homeassistant:

      customize:
        sensor.last_google_backup:
          friendly_name: Last backup -
        sensor.backups_in_google_drive:
          friendly_name: Backups in Google Drive
        sensor.backups_in_home_assistant:
          friendly_name: Backups in Local Server
        sensor.size_in_google_drive:
          friendly_name: Size in Google Drive
        sensor.size_in_home_assistant:
          friendly_name: Size in Local Server

    recorder:
      db_url: !secret db_link
      purge_keep_days: 7
      auto_purge: true

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
      
    template:
     
      - sensor:

          - name: last_google_backup
            unique_id: last_google_backup
            state: >
                {% if state_attr("sensor.backup_state","last_backup") %}
                {{as_timestamp(state_attr("sensor.backup_state","last_backup"))|timestamp_custom("%d.%m.%Y %H:%M")}}
                {% else %} 
                Getting data ...
                {% endif %} 
            icon: mdi:calendar-check-outline

          - name: backups_in_google_drive
            unique_id: backups_in_google_drive
            state: "{{ state_attr('sensor.backup_state', 'backups_in_google_drive') }}"
            unit_of_measurement: pcs
            icon: mdi:folder-google-drive    

          - name: backups_in_home_assistant
            unique_id: backups_in_home_assistant
            state: "{{ state_attr('sensor.backup_state', 'backups_in_home_assistant') }}"
            unit_of_measurement: pcs
            icon: mdi:home-assistant      

          - name: size_in_google_drive
            unique_id: size_in_google_drive
            state: "{{ state_attr('sensor.backup_state', 'size_in_google_drive') }}"
            icon: mdi:numeric
      
          - name: size_in_home_assistant
            unique_id: size_in_home_assistant
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
* BTC - 1PAjXcNbLtUKLY8d5HDnfxRqc5Zchj1fU3    
* TON - UQBEShkfKCFhvqlTs_oIpa6kFIQJguJR30hDXany1cCAbCfe    
* USDT (TRON (TRC20)) - TEpnJcLDRbkwq5oQpjVET9NbPpHKB7QMrD    