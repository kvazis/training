### [Блог. Home Assistant - Программная перезагрузка устройств, wait for a template](https://youtu.be/8bhnfkhqrsc)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>



:ballot_box_with_check: Автоматизация перезагрузки    

```yaml
      - id: Кухня перезагрузка шлюза xiaomi
        alias: reload_xiaomi_gateway_kn
        initial_state: true
        trigger:
    ## Виртуальная кнопка
        - platform: state
          entity_id: input_button.kn_gateway_reset
    # Проверка раз в 10 минут
        - platform: time_pattern
          minutes: '/10'
        condition:
    # Шлюз недоступен
        - condition: state
          entity_id: light.gateway_light_7811dc64f4c8
          state: 'unavailable'
        action:  
    # Перезагрузка
        - service: homeassistant.reload_config_entry
          data: {}
          target:
            device_id: 4063f2da86f527b793ff4d1e9790782e

```

:ballot_box_with_check: Автоматизация перезагрузки с проверкой и сбросу по питанию    

```yaml
      - id: Кухня перезагрузка шлюза xiaomi
        alias: reload_xiaomi_gateway_kn
        initial_state: true
        trigger:
    ## Виртуальная кнопка
        - platform: state
          entity_id: input_button.kn_gateway_reset
    # Проверка раз в 10 минут
        - platform: time_pattern
          minutes: '/10'
        condition:
    # Шлюз недоступен
        - condition: state
          entity_id: light.gateway_light_7811dc64f4c8
          state: 'unavailable'
        action:  
    # Перезагрузка
        - service: homeassistant.reload_config_entry
          data: {}
          target:
            device_id: 4063f2da86f527b793ff4d1e9790782e
        - wait_template: "{{ not is_state('light.gateway_light_7811dc64f4c8', 'unavailable') }}"
          timeout: 10
        - if:
             - "{{ not wait.completed }}"
          then:
             - service: persistent_notification.create
               data:
                 message: "Шлюз недоступен, перезагрузка по питанию."
                 title: "Внимание"    
    # Перезагрузка по питанию
             - service: switch.turn_off
               entity_id: switch.0xa4c1388c89a46970
             - delay: 00:00:05
             - service: switch.turn_on
               entity_id: switch.0xa4c1388c89a46970

```

:ballot_box_with_check: Автоматизация перезагрузки с проверкой и единичным уведомлением    

```yaml
      - id: Кухня перезагрузка шлюза xiaomi
        alias: reload_xiaomi_gateway_kn
        initial_state: true
        trigger:
    ## Виртуальная кнопка
        - platform: state
          entity_id: input_button.kn_gateway_reset
    # Проверка раз в 10 минут
        - platform: time_pattern
          minutes: '/10'
        condition:
    # Шлюз недоступен
        - condition: state
          entity_id: light.gateway_light_7811dc64f4c8
          state: 'unavailable'
    # Предохранитель
        - condition: state
          entity_id: input_boolean.gateway_block
          state: 'off'
        action:  
    # Перезагрузка
        - service: homeassistant.reload_config_entry
          data: {}
          target:
            device_id: 4063f2da86f527b793ff4d1e9790782e
        - wait_template: "{{ not is_state('light.gateway_light_7811dc64f4c8', 'unavailable') }}"
          timeout: 10
        - if:
             - "{{ not wait.completed }}"
          then:
             - service: telegram_bot.send_message
               data_template:
                 target:
                     - !secret chat_id_
                 message: | 
                      Внимание!
                      Шлюз недоступен, перезагрузка не имела успеха
    # Включение предохранителя
             - service: input_boolean.turn_on
               entity_id: input_boolean.gateway_block

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