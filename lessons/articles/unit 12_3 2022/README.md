### [Home Assistant. Урок 12.3 Интерфейс - Lovelace, карта Sankey Chart Card](   )

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

:white_check_mark: **Sankey Chart Card**    

:ballot_box_with_check: Ручной режим `lovelace` и кастомная карта `sankey-chart` в ресурсах - `configuration.yaml`

```yaml
lovelace:
  mode: yaml
  resources:
   - url: /hacsfiles/ha-sankey-chart/ha-sankey-chart.js
     type: module    
```

:ballot_box_with_check: Страница из урока с картами - 

#### Сенсоры потребления    
```yaml
    template:
	
	
################# Сенсоры потребления #################

          - name: total_load
            state: >
                {% set variable = namespace(value = {}) %}
                {% set power = namespace(value = 0) %}
                {% for entity in states.sensor if (entity.entity_id.endswith("_power"))
                and states(entity.entity_id) not in ['unavailable','unknown','None']  %}
                {% set variable.value = dict(variable.value, **{entity.name: entity.state }) %}
                {% set power.value = power.value |int + entity.state |int %}
                {% endfor %}
                {{ (power.value) |round(2) }}

          - name: kitchen_total_load
            state: >
                {{states('sensor.0x00158d0001d35bc0_power')|float + states('sensor.0xa4c1385bcf7d00c9_power')|float
                + states('sensor.0xa4c138201dcb67f6_power')|float + states('sensor.0xa4c138d571b656c5_power')|float
                + states('sensor.0xa4c138273b49e4d0_power')|float + states('sensor.0x000d6f0014bb14b4_power')|float
                + states('sensor.0x00158d0001fa2934_power')|float + states('sensor.0x00158d0001291d12_power')|float
                + states('sensor.0x00158d000114a1e1_power')|float}}
 
          - name: lr_total_load
            state: > 
                {{states('sensor.0xa4c1388c89a46970_power')|float + states('sensor.0xa4c138f41459f92a_power')|float
                + states('sensor.0xa4c1384452a34172_power')|float  + states('sensor.0xa4c1387c6584d955_power')|float + states('sensor.lr_strip_usb_power')|float
                + states('sensor.lr_usb_socket_power')|float + states('sensor.lr_6x_power_strip_power')|float}}  
 
          - name: bt_total_load
            state: > 
                {{states('sensor.0x00158d00015751f4_power')|float + states('sensor.0x540f57fffe78ba20_power')|float}}
                
          - name: dd_total_load
            state: > 
                {{states('sensor.0x00158d0001a2ccab_power')|float + states('sensor.0x00158d00030a6e78_power')|float + states('sensor.0x00158d000153dd8e_power')|float}}

          - name: da_total_load
            state: > 
                {{states('sensor.0x00158d00010ec4b8_power')|float + states('sensor.0x00158d00012896cb_power')|float}}
                   
```

#### Карта показанная в уроке   
```yaml
title: Потребление
panel: true
icon: mdi:chart-gantt
cards:

    - type: custom:sankey-chart
      show_names: true
      height: 1000
      wide: true
      sections:
        - entities:
          - entity_id: sensor.total_load
            color: pink
            children:
               - sensor.0x00158d0003f46bb6_power
               - sensor.0x842e14fffe51c5ae_power
               - sensor.kitchen_total_load
               - sensor.lr_total_load
               - sensor.bt_total_load
               - sensor.dd_total_load
               - sensor.da_total_load
               
        - entities:
               - entity_id: sensor.0x00158d0003f46bb6_power
                 color: navy
               - entity_id: sensor.0x842e14fffe51c5ae_power
                 color: violet
               - entity_id: sensor.kitchen_total_load
                 color: cyan
                 children:
                   - sensor.0x00158d0001d35bc0_power
                   - sensor.0xa4c1385bcf7d00c9_power
                   - sensor.0xa4c138201dcb67f6_power
                   - sensor.0xa4c138d571b656c5_power
                   - sensor.0xa4c138273b49e4d0_power
                   - sensor.0x000d6f0014bb14b4_power
                   - sensor.0x00158d0001fa2934_power
                   - sensor.0x00158d0001291d12_power
                   - sensor.0x00158d000114a1e1_power
               - entity_id: sensor.lr_total_load
                 color: orange
                 children:
                   - sensor.0xa4c1388c89a46970_power
                   - sensor.0xa4c138f41459f92a_power
                   - sensor.0xa4c1384452a34172_power
                   - sensor.0xa4c1387c6584d955_power
                   - sensor.lr_strip_usb_power
                   - sensor.lr_usb_socket_power
                   - sensor.lr_6x_power_strip_power
               - entity_id: sensor.bt_total_load
                 color: bisque
                 children:
                   - sensor.0x00158d00015751f4_power
                   - sensor.0x540f57fffe78ba20_power
               - entity_id: sensor.dd_total_load
                 color: khaki
                 children:
                   - sensor.0x00158d0001a2ccab_power
                   - sensor.0x00158d00030a6e78_power
                   - sensor.0x00158d000153dd8e_power
               - entity_id: sensor.da_total_load
                 color: coral
                 children:
                   - sensor.0x00158d00010ec4b8_power
                   - sensor.0x00158d00012896cb_power 
                   
        - entities:
           - sensor.0x00158d0001d35bc0_power
           - sensor.0xa4c1385bcf7d00c9_power
           - sensor.0xa4c138201dcb67f6_power
           - sensor.0xa4c138d571b656c5_power
           - sensor.0xa4c138273b49e4d0_power
           - sensor.0x000d6f0014bb14b4_power
           - sensor.0x00158d0001fa2934_power
           - sensor.0x00158d0001291d12_power
           - sensor.0x00158d000114a1e1_power
           - sensor.0xa4c1388c89a46970_power
           - sensor.0xa4c138f41459f92a_power
           - sensor.0xa4c1384452a34172_power
           - sensor.0xa4c1387c6584d955_power
           - sensor.lr_strip_usb_power
           - sensor.lr_usb_socket_power
           - sensor.lr_6x_power_strip_power 
           - sensor.0x00158d00015751f4_power
           - sensor.0x540f57fffe78ba20_power
           - sensor.0x00158d0001a2ccab_power
           - sensor.0x00158d00030a6e78_power
           - sensor.0x00158d000153dd8e_power
           - sensor.0x00158d00010ec4b8_power
           - sensor.0x00158d00012896cb_power                    

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