### [Блог. Home Assistant. Определение типа включения - вручную, в интерфейсе или автоматизацией](https://youtu.be/CEpP3zdT-48)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

:ballot_box_with_check: Пакадж из урока, сенсор, автоматизации для определения и разделения по типам воздействия....

```yaml
    template:
    
      - trigger:
        - platform: state
          entity_id: switch.0x04cf8cdf3c788a1b
        sensor:
          - name: '0x04cf8cdf3c788a1b_type'
            state: >
              {% if trigger.to_state.context.parent_id == none
                and trigger.to_state.context.user_id != none
              %}
              Интерфейс
              {% elif trigger.to_state.context.parent_id != none
                and trigger.to_state.context.user_id == none
              %}
              Автоматизация
              {% elif trigger.to_state.context.parent_id == none
                and trigger.to_state.context.user_id == none
              %}
              Физически              
              {% endif %}

    automation:
    
      - id: Переключение
        alias: switch_toggle
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_button.0x04cf8cdf3c788a1b
        action:
        - service: switch.toggle
          entity_id: switch.0x04cf8cdf3c788a1b
          
          
      - id: Идентификация
        alias: switch_ident
        initial_state: false
        trigger:
        - platform: state
          entity_id: switch.0x04cf8cdf3c788a1b
        action:
        - service: persistent_notification.create
          data:
            title: "Определение состояния"
            message: >
              ParentID: {{ trigger.to_state.context.parent_id }} UserID: {{ trigger.to_state.context.user_id }}

      - id: Разделение типов нажатий
        alias: separate_switch_type
        initial_state: true
        trigger:
        - platform: state
          entity_id: switch.0x04cf8cdf3c788a1b
        action:
            - choose:

              - conditions:
                  - "{{ trigger.to_state.context.parent_id == none }}"
                  - "{{ trigger.to_state.context.user_id != none }}"
                sequence:
                    - service: persistent_notification.create
                      data:
                        title: "Тип нажатия"
                        message: "Интерфейс"
        
              - conditions:
                  - "{{ trigger.to_state.context.parent_id != none }}"
                  - "{{ trigger.to_state.context.user_id == none }}"
                sequence:
                    - service: persistent_notification.create
                      data:
                        title: "Тип нажатия"
                        message: "Автоматизация"        
        
              - conditions:
                  - "{{ trigger.to_state.context.parent_id == none }}"
                  - "{{ trigger.to_state.context.user_id == none }}"
                sequence:
                    - service: persistent_notification.create
                      data:
                        title: "Тип нажатия"
                        message: "Физически"        
        
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