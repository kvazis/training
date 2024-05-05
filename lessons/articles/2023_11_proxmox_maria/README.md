### [Proxmox - установка базы данных Mariadb LXC, настройка, добавление в Home Assistant](https://youtu.be/gFbfh0srzDo)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Ресурсы:    

:white_check_mark: **Proxmox VE Helper Scripts** - [github](https://tteck.github.io/Proxmox/)    

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

:ballot_box_with_check: Скрипт безопасности -    
```yaml
mysql_secure_installation
```
Enter current password for root (enter for none): `enter`    
Switch to unix_socket authentication [Y/n] `y`    
Change the root password? [Y/n] `n`    
Remove anonymous users? [Y/n] `y`    
Disallow root login remotely? [Y/n] `y`    
Remove test database and access to it? [Y/n] `y`    
Reload privilege tables now? [Y/n] `y`    

:ballot_box_with_check: Настройка БД -    
```yaml
mysql
```
:ballot_box_with_check: Создание пользователя - `dbadmin` пароль `dbpassword` (меняем на свои)  -    
```yaml
CREATE USER 'dbadmin'@'localhost' IDENTIFIED BY 'dbpassword';
```
:ballot_box_with_check: Даем пользователю права администратора -    
```yaml
GRANT ALL ON *.* TO 'dbadmin'@'localhost' IDENTIFIED BY 'dbpassword' WITH GRANT OPTION;
```
:ballot_box_with_check: Предоставление доступа из локальной сети -    
```yaml
GRANT ALL ON *.* TO 'dbadmin'@'192.168.0.%' IDENTIFIED BY 'dbpassword' WITH GRANT OPTION;
```
:ballot_box_with_check: Очистка привилегий -    
```yaml
FLUSH PRIVILEGES;
```
:ballot_box_with_check: Выход -    
```yaml
exit
```
:ballot_box_with_check: Вход под созданным пользователем -    
```yaml
mysql -u dbadmin -p
```
:ballot_box_with_check: Вход под созданным пользователем (для новых релизов)-    
```yaml
/usr/bin/mariadb -u dbadmin -p
```
:ballot_box_with_check: Создание базы для Home Assistant    
```yaml
CREATE DATABASE homeassistant;
```
:ballot_box_with_check: Выход -    
```yaml
exit
```

:ballot_box_with_check: Путь к базе в файле `secrets.yaml`    
```yaml
db_link: mysql://dbadmin:dbpassword@192.168.0.41:3306/homeassistant?charset=utf8
```

:ballot_box_with_check: Рекордер в `system_sensors.yaml`    
```yaml
    recorder:
      db_url: !secret db_link
      purge_keep_days: 14
```

:ballot_box_with_check: Интеграция SQL    
Name:    
```yaml
MariaDB
```
Database URL:    
```yaml
mysql://dbadmin:dbpassword@192.168.0.41:3306/homeassistant?charset=utf8
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
____
#### To financially support the project *Smart Home with Alex Kvazis*    
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg/join" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/youtube.png" alt="Youtube Sponsorship" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.patreon.com/alex_kvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/patreon-button.png" alt="Patreon Support" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.buymeacoffee.com/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/buymeacoffee.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.paypal.com/paypalme/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/paypal.png" alt="PayPal Me" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Or a donation of any amount -     
* Webmoney - Z243592584952    
* USDT TRON (TRC20) - TUvBLFpVAFiR7Z64MEjkXvZcdf1DGDEYTu    
* BTC - bc1qpqma0ndrmxw70y28esdaghu2pl8ttf97nh0ghc    
* ETH - 0xD4D06B1B1a6879ce4B36922F6ad96ddf30FD7E1A    
* TON - UQBEShkfKCFhvqlTs_oIpa6kFIQJguJR30hDXany1cCAbCfe    