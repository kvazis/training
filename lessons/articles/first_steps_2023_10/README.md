### [Home Assistant - первые настройки, File Editor, Maria DB, HACS - октябрь 2023](https://youtu.be/rhyEPm5SXGU)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Команды и ссылки из урока:  


:ballot_box_with_check: Панель Система в `configuration.yaml`    
```yaml
panel_custom:
  - name: server_state
    sidebar_title: 'System'
    sidebar_icon: mdi:server
    js_url: /api/hassio/app/entrypoint.js
    url_path: 'hassio/system'
    embed_iframe: true
    require_admin: true
    config:
      ingress: core_configurator
```


:ballot_box_with_check: Активация пакаджей `configuration.yaml`    
```yaml
homeassistant:
  packages: !include_dir_merge_named includes/packages
```

:ballot_box_with_check: Сенсоры в `system_sensors.yaml`    
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
```

:ballot_box_with_check: Конфигурация Maria DB    
Logins:    
```yaml
- username: hass
  password: hass
```
Rights:    
```yaml
- username: hass
  database: homeassistant
```
:ballot_box_with_check: Путь к базе в файле `secrets.yaml`    
```yaml
db_link: mysql://hass:hass@core-mariadb/homeassistant?charset=utf8
```

:ballot_box_with_check: Интеграция SQL    
Name:    
```yaml
MariaDB
```
Column:    
```yaml
value
```
Select Query:    
```yaml
SELECT table_schema "database", Round(Sum(data_length + index_length) / 1048576, 2) "value" FROM information_schema.tables WHERE table_schema="homeassistant" GROUP BY table_schema;
```
Unit of Measure:    
```yaml
MB
```

:ballot_box_with_check: Рекордер в `system_sensors.yaml`    
```yaml
    recorder:
      db_url: !secret db_link
      purge_keep_days: 7
      auto_purge: true
```

:ballot_box_with_check: HACS    
режим root:    
```yaml
sudo -s
```
:white_check_mark: [Команда с сайта HACS](https://hacs.xyz/docs/setup/download)    
Загрузка и установка HACS - `wget -O - https://get.hacs.xyz | bash -`    
Выход:    
```yaml
exit
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