### [Home Assistant, панель Энергия - решение проблемы добавления сенсоров потребления](https://youtu.be/QwRHxqCBixI)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


:ballot_box_with_check: Пакадж из обзора    

```yaml

energy:

    recorder:
      include:
        entities:
           - sensor.0xa4c138940f10d76d_power
           - sensor.0xa4c138940f10d76d_meter
           - sensor.0xa4c138940f10d76d_meter_cost
           - sensor.0x60a423fffe7ff8c8_power
           - sensor.0x60a423fffe7ff8c8_meter
           

    homeassistant:
      customize:
      
        sensor.0xa4c138940f10d76d_meter:
          friendly_name: DIN rail
          unit_of_measurement: kWh
          device_class: energy
          state_class: total


        sensor.0x60a423fffe7ff8c8_meter:
          friendly_name: EU Socket
          unit_of_measurement: kWh
          device_class: energy
          state_class: total

    utility_meter:

      0xa4c138940f10d76d_meter:
        source: sensor.0xa4c138940f10d76d_energy
        unique_id: 0xa4c138940f10d76d
        cycle: monthly
        offset:
          days: 0
          hours: 9
          minutes: 0
    
      0x60a423fffe7ff8c8_meter:
        source: sensor.0x60a423fffe7ff8c8_energy
        unique_id: 0x60a423fffe7ff8c8
        cycle: monthly
        offset:
          days: 0
          hours: 9
          minutes: 0

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