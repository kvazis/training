### [Home Assistant. Урок 10.2 Практические кейсы - Мониторинг погоды и оповещения в телеграм](https://youtu.be/5B3RfOMzvak)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Ресурсы:    

:white_check_mark: **Коды эмоджи для телеграмм** - [unicode.org](https://tteck.github.io/Proxmox/)    

#### Пакадж из урока:  

```yaml
    sensor:
    # Перевод в мм. рт. столба
      - platform: template
        sensors:
          0x00158d0001a4b9da_pressure_mmhg:
            friendly_name: "Атмосферное давление на улице"
            unit_of_measurement: 'mmHg'
            value_template: "{{ (states('sensor.0x00158d0001a4b9da_pressure')|float * 0.7500637)|round(2) }}"
            icon_template: mdi:gauge
            
    script:
    
      climate_report:
        alias: Отчет о погоде
        sequence:
         - service: notify.telegram_id_1
           data:
             message: | 
                 {{"\U0001F3E0"}} Климат отчет за {{ states('sensor.time_date') }}
                 {{"\U0001F321"}} Температура - {{ states('sensor.0x00158d0001a4b9da_temperature') }} C
                 {{"\U0001F32B"}} Влажность - {{ states('sensor.0x00158d0001a4b9da_humidity') }} %
                 {{"\U0001F4AA"}} Давление - {{ states('sensor.0x00158d0001a4b9da_pressure_mmhg') }} мм рт. ст
                 {{"\U00002600"}} Погода - {{ states('sensor.openweathermap_weather') }}
                 {{"\U00002B50"}} Прогноз на сегодня - {{ states('sensor.openweathermap_forecast_temperature') }} C
                 {{"\U0001F327"}} Прогноз дождя - {{ states('sensor.openweathermap_rain') }}
                 {{"\U0001F328"}} Прогноз снега - {{ states('sensor.openweathermap_snow') }}  

            
    automation:   
    
        - id: Запрос на отчет о погоде
          alias: send_climate_report
        #   initial_state: true  - для работы поставить true !!!
          initial_state: false
          trigger:
          - platform: event
            event_type: telegram_command
            event_data:
              command: '/forecast'
          - platform: time
            at: '07:30:00'              
          action:
           - service: script.turn_on
             entity_id: 
                - script.climate_report
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