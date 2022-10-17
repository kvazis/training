### [Практика Home Assistant. Разбираемся с шаблонами, часть 2. Templates - statements](https://youtu.be/U0XdDn5Dl6Y)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### [Практика Home Assistant. Разбираемся с шаблонами, часть 1. Templates - expressions](https://youtu.be/Ki01THanYGU)

#### Шаблоны из урока:  

```yaml
{{ is_state('binary_sensor.0x00158d00013ed373_contact', 'on') }}

{% if is_state('binary_sensor.0x00158d00013ed373_contact', 'on') %} Открыто
{% elif is_state('binary_sensor.0x00158d00013ed373_contact', 'off') %} Закрыто
{% else %} Недоступно {% endif %}


{{ states('sensor.0x00158d0001a4b9da_temperature') | float }}

{% if states('sensor.0x00158d0001a4b9da_temperature') | float > 30 %}
Очень жарко
{% elif states('sensor.0x00158d0001a4b9da_temperature') | float > 25 %}
Жарко
{% elif states('sensor.0x00158d0001a4b9da_temperature') | float > 20 %}
Тепло
{% elif states('sensor.0x00158d0001a4b9da_temperature') | float > 10 %}
Умеренно
{% elif states('sensor.0x00158d0001a4b9da_temperature') | float > 0 %}
Прохладно
{% elif states('sensor.0x00158d0001a4b9da_temperature') | float > -10 %}
Холодно
{% elif states('sensor.0x00158d0001a4b9da_temperature') | float < -20 %}
Очень холодно
{% endif %}

{{ states('binary_sensor.0x00158d0005414857_occupancy')}}
{{ states('light.lr_ceiling_light_1')}}
{{ states('light.lr_ceiling_light_2')}}

{% if is_state('binary_sensor.0x00158d0005414857_occupancy', 'on') 
   and is_state('light.lr_ceiling_light_1', 'on') 
   and is_state('light.lr_ceiling_light_2', 'on') %}
Движение есть, оба светильника работают
{% elif is_state('binary_sensor.0x00158d0005414857_occupancy', 'off') 
   and is_state('light.lr_ceiling_light_1', 'on') 
   and is_state('light.lr_ceiling_light_2', 'on') %}
Движения нет, оба светильника работают
{% elif is_state('binary_sensor.0x00158d0005414857_occupancy', 'on') 
   and is_state('light.lr_ceiling_light_1', 'off') 
   and is_state('light.lr_ceiling_light_2', 'off') %}
Движение есть, оба светильника выключены
{% elif is_state('binary_sensor.0x00158d0005414857_occupancy', 'off') 
   and is_state('light.lr_ceiling_light_1', 'off') 
   and is_state('light.lr_ceiling_light_2', 'off') %}
Движения нет, оба светильника выключены
{% elif is_state('binary_sensor.0x00158d0005414857_occupancy', 'on') 
   and is_state('light.lr_ceiling_light_1', 'on') 
   or is_state('binary_sensor.0x00158d0005414857_occupancy', 'on') 
   and is_state('light.lr_ceiling_light_2', 'on') %}
Движение есть, один из светильников включен
{% elif is_state('binary_sensor.0x00158d0005414857_occupancy', 'off') 
   and is_state('light.lr_ceiling_light_1', 'on') 
   or is_state('binary_sensor.0x00158d0005414857_occupancy', 'off') 
   and is_state('light.lr_ceiling_light_2', 'on') %}
Движения нет, один из светильников включен
{%endif%}

{{ (((states('sensor.0x00158d0001581109_temperature') | float) + 
   (states('sensor.0x00158d00015aebb6_temperature') | float) + 
   (states('sensor.0x00158d000156e92e_temperature') | float)) /3)|round (2)}}

{% set mediumtemp = (((states('sensor.0x00158d0001581109_temperature') | float) + 
   (states('sensor.0x00158d00015aebb6_temperature') | float) + 
   (states('sensor.0x00158d000156e92e_temperature') | float)) /3)|round (2)%}
{% if mediumtemp > 30 %}
Очень жарко
{% elif mediumtemp > 25 %}
Жарко
{% elif mediumtemp > 20 %}
Тепло
{% elif mediumtemp > 10 %}
Умеренно
{% elif mediumtemp > 0 %}
Прохладно
{% elif mediumtemp > -10 %}
Холодно
{% elif mediumtemp < -20 %}
Очень холодно
{% else %}
Сенсор недоступен
{% endif %}

{% set mediumtemp = (((states('sensor.0x00158d0001581109_temperature') | float) + 
   (states('sensor.0x00158d00015aebb6_temperature') | float) + 
   (states('sensor.0x00158d000156e92e_temperature') | float)) /3)|round (2)%}
{%- if mediumtemp > 30 -%}
Очень жарко
{%- elif mediumtemp > 25 -%}
Жарко
{%- elif mediumtemp > 20 -%}
Тепло
{%- elif mediumtemp > 10 -%}
Умеренно
{%- elif mediumtemp > 0 -%}
Прохладно
{%- elif mediumtemp > -10 -%}
Холодно
{%- elif mediumtemp < -20 -%}
Очень холодно
{%- else -%}
Сенсор недоступен
{% endif %}

{{now().weekday()}}

{%- set day_num = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"] %}
{%- set day_of_week = day_num[now().weekday()] %}
{{day_of_week}}

{{now().month}}
{%- set month_num = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"] %}
{%- set month_of_year = month_num[now().month-1] %}
{{month_of_year}}

{%- set month_num = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"] %}
{% for object in month_num %}
{{ object }}
{% endfor %}


{% for object in states.switch %}
{{ object }}
{% endfor %}

{% for object in states.switch if is_state(object.entity_id, 'on') %}
{{ object }}
{% endfor %}

{% for object in states.switch if is_state(object.entity_id, 'on') %}
{{ object.entity_id }}
{% endfor %}

{% for object in states.switch if is_state(object.entity_id, 'on') %}
{{ object.name }}
{% endfor %}
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