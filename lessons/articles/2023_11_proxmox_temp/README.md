### [Proxmox - добавление в Home Assistant датчиков температуры CPU, Chipset, SSD](https://youtu.be/VMEYqal-lHw)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Ресурсы:    

:white_check_mark: **Оригинальный скрипт съема данных** - [github](https://gist.github.com/dmslabsbr/08970d068e2e021312055e7560bcac9a)    

:white_check_mark: **Скрипт показанный в уроке** - [github](https://raw.githubusercontent.com/kvazis/training/master/lessons/articles/2023_11_proxmox_temp/ha_post_temp.sh)    

#### Команды и ссылки из урока:  


:ballot_box_with_check: Установка lm sensors в Proxmox    
```yaml
apt-get install lm-sensors -y
```
:ballot_box_with_check: Команда для получения данных с датчиков температуры    
```yaml
sensors
```

:ballot_box_with_check: Создаем файл для скрипта    
```yaml
nano ha_post_temp.sh
```
Вставляем код [скрипта](https://raw.githubusercontent.com/kvazis/training/master/lessons/articles/2023_11_proxmox_temp/ha_post_temp.sh)    
`Ctrl X` - для выхода    
`Y` для сохранения    

:ballot_box_with_check: Права на запуск    
```yaml
chmod +x ha_post_temp.sh
```

:ballot_box_with_check: Ручной запуск    
```yaml
/root/ha_post_temp.sh
```

:ballot_box_with_check: Планировщик cron    
```yaml
crontab -e
```

:ballot_box_with_check: Ежеминутный запуск    
```yaml
*/1 * * * * /root/ha_post_temp.sh
```
`Ctrl X` - для выхода    
`Y` для сохранения    

:ballot_box_with_check: Перезагрузка сервиса cron    
```yaml
systemctl restart cron.service
```

:ballot_box_with_check: Проверка    
```yaml
systemctl status cron.service
```
____
#### Поддержать развитие проекта *Умный дом с Alex Kvazis*    
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg/join" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/youtube.png" alt="Youtube Sponsorship" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.patreon.com/alex_kvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/patreon-button.png" alt="Patreon Support" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.buymeacoffee.com/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/buymeacoffee.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.paypal.com/paypalme/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/paypal.png" alt="PayPal Me" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Или перевод любой суммы на -     
* Webmoney - Z243592584952    
* USDT TRON (TRC20) - TUvBLFpVAFiR7Z64MEjkXvZcdf1DGDEYTu    
* BTC - bc1qpqma0ndrmxw70y28esdaghu2pl8ttf97nh0ghc    
* ETH - 0xD4D06B1B1a6879ce4B36922F6ad96ddf30FD7E1A    
* TON - UQBEShkfKCFhvqlTs_oIpa6kFIQJguJR30hDXany1cCAbCfe    