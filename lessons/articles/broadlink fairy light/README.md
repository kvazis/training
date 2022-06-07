### [BestCon BroadLink Fairy Light - гирлянда с динамическими сценами, интегрируем в Home Assistant](https://youtu.be/WW3_n8uLo7A)

#### Пакадж показанный в обзоре - обучение командам с пульта, применение в автоматизациях

```yaml
best_con_light:

    script:
    
          broadlink_learn:
            alias: Learn Bestcon LED strip
            sequence:
              - service: remote.learn_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: 
                     - power_on
                     - power_off
                     - speed
                     - fade
                     - jump
                     - afade
                     - ajump
        
          best_con_light_on:
            alias: Включить Bestcon LED strip
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: power_on
                  
          best_con_light_off:
            alias: Выключить Bestcon LED strip
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: power_off
                  
          best_con_light_speed:
            alias: Bestcon LED speed
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: speed
                  
    input_select:               
               
      best_con_light_mode:
        name: mode
        options:
          - fade
          - jump
          - afade
          - ajump
          
    automation: 
               
    - id: Смена режимов
      alias: change_mode
      initial_state: true
      trigger:
        - platform: state
          entity_id: input_select.best_con_light_mode
      action:
        - choose:
          - conditions:
              - condition: state
                entity_id: input_select.best_con_light_mode
                state: "fade"               
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: fade      
          - conditions:
              - condition: state
                entity_id: input_select.best_con_light_mode
                state: "jump"               
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: jump          
          - conditions:
              - condition: state
                entity_id: input_select.best_con_light_mode
                state: "afade"               
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: afade           
          - conditions:
              - condition: state
                entity_id: input_select.best_con_light_mode
                state: "ajump"               
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: ajump 
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