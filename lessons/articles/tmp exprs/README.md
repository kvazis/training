### [Практика Home Assistant. Разбираемся с шаблонами, часть 1. Templates - expressions](https://youtu.be/Ki01THanYGU)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### [Практика Home Assistant. Разбираемся с шаблонами, часть 2. Templates - statements](https://youtu.be/U0XdDn5Dl6Y)

#### Шаблоны из урока:  

```yaml
{{states('sensor.0x00158d0001581109_temperature')}}
{{state_attr('sensor.0x00158d0001581109_temperature','battery')}}


{{ is_state('binary_sensor.0x54ef44100042e226_motion', 'on') }}

{{(states('sensor.0xa4c138f41459f92a_power')|float) +
(states('sensor.0x00158d0001291d12_power')|float)| round(1) }}

{{(states('sensor.0xa4c138f41459f92a_power')|int) +
(states('sensor.0x00158d0001291d12_power')|int) }}

{{ (states('sensor.0x00158d000171ffde_pressure')|float * 0.7500637)|round(2) }}

== равно

!= не равно

> больше

>= больше или равно

< меньше

<= меньше или равно

{{ (states('sensor.0x00158d000171ffde_pressure')|float * 0.7500637)|round(2) >= 770}}

{{ not is_state('binary_sensor.0x54ef44100042e226_motion', 'on') }}

{{ is_state('light.lr_ceiling_light_1', 'on') and 
is_state('light.lr_ceiling_light_2', 'on') }}

{{ is_state('light.lr_ceiling_light_1', 'on') or
is_state('light.lr_ceiling_light_2', 'on') }}

{{ is_state('binary_sensor.0x00158d00016d56f5_occupancy', 'on') or
   is_state('binary_sensor.0x54ef44100042e226_motion', 'on') or
   is_state('binary_sensor.0x00158d00013f7894_occupancy', 'on') }}

{{ is_state('binary_sensor.0x00158d00016d56f5_occupancy', 'on') or
   is_state('binary_sensor.0x54ef44100042e226_motion', 'on') or
   (states('sensor.0x00158d0001291d12_power')|float) > 20 }}

{{ now()}}   
{{ as_timestamp(now())}}
{{ as_timestamp(now())| timestamp_custom("%H:%M:%S")}}

{{ as_timestamp(now())| timestamp_custom("%H:%M:%S") 
> states("input_datetime.bt_boiler_1")}}

{{ now().day }}
{{ now().weekday() }}
{{ now().strftime("%W") }}
{{ now().month }}
{{ now().year }}
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