### [Расширение для LED ленты Yeelight 2, новогоднее освещение в Home Assistant](https://youtu.be/cgIKF0vhNfY)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Код из урока:  


```yaml
- alias: 04_сhristmas_on
  trigger:
   - platform: sun
     event: sunset
     offset: '00:30:00'
   - platform: event
     event_type: xiaomi_aqara.click
     event_data:
       entity_id: binary_sensor.switch_158d0001e8a244
       click_type: single 
  condition:
   - condition: state
     entity_id: light.yeelight_strip2_7c49ebb111e4
     state: 'off'
  action:
   - service: light.turn_on
     data:
       entity_id: light.yeelight_strip2_7c49ebb111e4
       effect: Christmas
 
- alias: 04_сhristmas_off
  trigger:
   - platform: time
     at: '21:00:00'
   - platform: event
     event_type: xiaomi_aqara.click
     event_data:
       entity_id: binary_sensor.switch_158d0001e8a244
       click_type: single 
  condition:
   - condition: state
     entity_id: light.yeelight_strip2_7c49ebb111e4
     state: 'on'
  action:
   - service: light.turn_off
     entity_id: light.yeelight_strip2_7c49ebb111e4

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