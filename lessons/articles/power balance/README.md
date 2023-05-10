### [Home Assistant - применение энергомониторинга для балансировки мощности, виртуальный тестовый стенд](https://youtu.be/iuU2J_a7U7k)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

:ballot_box_with_check: Пакадж показанный в видео 

```yaml
power_balance:


    input_button:

      kettle:
        name: Включение чайника
        icon: mdi:kettle
        
      microwave:
        name: Включение микролновки
        icon: mdi:microwave
        
      stove:
        name: Включение мультипечи
        icon: mdi:stove

    input_boolean:
    
      kettle:
        name: Чайник
        icon: mdi:kettle

      kettle_power:
        name: Кипение
        icon: mdi:kettle-steam
        
      microwave:
        name: Микроволновка
        icon: mdi:microwave

      microwave_power:
        name: Приготовление
        icon: mdi:microwave
        
      stove:
        name: Мультипечь
        icon: mdi:stove

      stove_power:
        name: Приготовление
        icon: mdi:stove

    template:
     
      - sensor:

          - name: kitchen_power
            state: >
                {{states('sensor.kettle_power')|float(0) + states('sensor.microwave_power')|float(0) + states('sensor.stove_power')|float(0)}}
      
          - name: kettle_power
            state: >
              {% if is_state('input_boolean.kettle_power', 'on') %}
              2000
              {% else %}
              0
              {% endif %}
              
          - name: microwave_power
            state: >
              {% if is_state('input_boolean.microwave_power', 'on') %}
              1200
              {% else %}
              0
              {% endif %}
              
          - name: stove_power
            state: >
              {% if is_state('input_boolean.stove_power', 'on') %}
              1500
              {% else %}
              0
              {% endif %}
              
    automation:

      - alias: kettle
        id: kettle
        description: Кипение чайника
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_button.kettle
          id: button_tap
        - platform: state
          entity_id: input_boolean.kettle
          from: 'on'
          to: 'off'
          id: socket_off
        action:
            - choose:
              - conditions:
                  - condition: trigger
                    id: button_tap
                  - condition: state
                    entity_id: input_boolean.kettle
                    state: 'on'
                sequence:          
                  - service: input_boolean.toggle
                    entity_id: input_boolean.kettle_power          
              - conditions:
                  - condition: trigger
                    id: socket_off
                  - condition: state
                    entity_id: input_boolean.kettle_power
                    state: 'on'
                sequence:          
                  - service: input_boolean.turn_off
                    entity_id: input_boolean.kettle_power         
          
          
      - alias: microwave
        id: microwave
        description: Работа микроволновки
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_button.microwave
          id: button_tap
        - platform: state
          entity_id: input_boolean.microwave
          from: 'on'
          to: 'off'
          id: socket_off
        action:
            - choose:
              - conditions:
                  - condition: trigger
                    id: button_tap
                  - condition: state
                    entity_id: input_boolean.microwave
                    state: 'on'
                sequence:          
                  - service: input_boolean.toggle
                    entity_id: input_boolean.microwave_power   
              - conditions:
                  - condition: trigger
                    id: socket_off
                  - condition: state
                    entity_id: input_boolean.microwave_power
                    state: 'on'
                sequence:          
                  - service: input_boolean.turn_off
                    entity_id: input_boolean.microwave_power

      - alias: stove
        id: stove
        description: Работа мультипечи
        initial_state: true
        trigger:
        - platform: state
          entity_id: input_button.stove
          id: button_tap
        - platform: state
          entity_id: input_boolean.stove
          from: 'on'
          to: 'off'
          id: socket_off
        action:
            - choose:
              - conditions:
                  - condition: trigger
                    id: button_tap
                  - condition: state
                    entity_id: input_boolean.stove
                    state: 'on'
                sequence:          
                  - service: input_boolean.toggle
                    entity_id: input_boolean.stove_power
              - conditions:
                  - condition: trigger
                    id: socket_off
                  - condition: state
                    entity_id: input_boolean.stove_power
                    state: 'on'
                sequence:          
                  - service: input_boolean.turn_off
                    entity_id: input_boolean.stove_power

      - alias: power_control
        id: power_control
        description: Контроль питания
        initial_state: true
        trigger:
         - platform: numeric_state
           entity_id: sensor.kitchen_power
           above: 2100
           id: overpower
         - platform: numeric_state
           entity_id: sensor.kitchen_power
           below: 2100
           id: underpower
        action:
            - choose:
              - conditions:
                  - condition: trigger
                    id: overpower
                  - condition: numeric_state
                    entity_id: sensor.kettle_power
                    below: 50
                sequence:          
                  - service: input_boolean.turn_off
                    entity_id: input_boolean.kettle
              - conditions:
                  - condition: trigger
                    id: overpower
                  - condition: numeric_state
                    entity_id: sensor.microwave_power
                    below: 50
                sequence:          
                  - service: input_boolean.turn_off
                    entity_id: input_boolean.microwave
              - conditions:
                  - condition: trigger
                    id: overpower
                  - condition: numeric_state
                    entity_id: sensor.stove_power
                    below: 50
                sequence:          
                  - service: input_boolean.turn_off
                    entity_id: input_boolean.stove
              - conditions:
                  - condition: trigger
                    id: underpower
                sequence: 
                  - service: input_boolean.turn_on
                    entity_id:
                      - input_boolean.kettle
                      - input_boolean.microwave
                      - input_boolean.stove
                    

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