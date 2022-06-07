### [Блог. Home Assistant - Trigger-based binary sensor, примеры использования](https://youtu.be/E3bMYbgByLc)

#### Примеры кода для использования input button

:ballot_box_with_check: Контроль включения - пакадж    

```yaml

triggerbased:

    template:
     
      - trigger:
        - platform: state
          entity_id: sensor.0x00158d0001718ca8_action
          to: 'single_left'
        - platform: state
          entity_id: sensor.0x00158d0002af829b_action
          to: 'single'
        binary_sensor:
          - name: switch_0x00158d0002d7bb2b_l1
            auto_off: 1
            state: "true"
            
    automation:
    
      - id: Управление реле
        alias: manual_relay_control
        initial_state: true
        trigger:
        - platform: state
          entity_id: binary_sensor.switch_0x00158d0002d7bb2b_l1
          to: 'on'
        action:
          - service: switch.toggle
            entity_id: switch.0x00158d0002d7bb2b_l1

      - id: Контроль включения реле
        alias: relay_control
        initial_state: true
        trigger:
        - platform: state
          entity_id: switch.0x00158d0002d7bb2b_l1
          to: 'on'
        - platform: state
          entity_id: switch.0x00158d0002d7bb2b_l1
          to: 'off'
        condition:
        - condition: state
          entity_id: binary_sensor.switch_0x00158d0002d7bb2b_l1
          state: 'off'
        action:
          - service: switch.toggle
            entity_id: switch.0x00158d0002d7bb2b_l1
          - delay: 00:00:01

```

:ballot_box_with_check: Переключение каждые 30 секунд    

```yaml

    template:
     
      - trigger:
        - platform: time_pattern
          seconds: "/30"
        - platform: state
          entity_id: sensor.0x00158d0001718ca8_action
          to: 'single_left'
        - platform: state
          entity_id: sensor.0x00158d0002af829b_action
          to: 'single'
        binary_sensor:
          - name: switch_0x00158d0002d7bb2b_l1
            auto_off: 1
            state: "true"

```

:ballot_box_with_check: Переключение каждые 5 минут    

```yaml

    template:
     
      - trigger:
        - platform: time_pattern
          minutes: "/5"
        - platform: state
          entity_id: sensor.0x00158d0001718ca8_action
          to: 'single_left'
        - platform: state
          entity_id: sensor.0x00158d0002af829b_action
          to: 'single'
        binary_sensor:
          - name: switch_0x00158d0002d7bb2b_l1
            auto_off: 1
            state: "true"

```

:ballot_box_with_check: Переключение каждый час в 25 минут   

```yaml

    template:
     
      - trigger:
        - platform: time_pattern
          minutes: 25
        - platform: state
          entity_id: sensor.0x00158d0001718ca8_action
          to: 'single_left'
        - platform: state
          entity_id: sensor.0x00158d0002af829b_action
          to: 'single'
        binary_sensor:
          - name: switch_0x00158d0002d7bb2b_l1
            auto_off: 1
            state: "true"

```

:ballot_box_with_check: Переключение в 16:00:00   

```yaml

    template:
     
      - trigger:
        - platform: time_pattern
          minutes: 25
        - platform: state
          entity_id: sensor.0x00158d0001718ca8_action
          to: 'single_left'
        - platform: state
          entity_id: sensor.0x00158d0002af829b_action
          to: 'single'
        binary_sensor:
          - name: switch_0x00158d0002d7bb2b_l1
            auto_off: 1
            state: "true"

```

:ballot_box_with_check: Таймеры - пакадж    

```yaml

triggerbased:

    timer:
    
        switch_0x00158d0002d7bb2b_l1:
          name: Реле отключится через - 
          duration: '00:00:10'

    template:
     
      - trigger:
        - platform: time
          at: "16:00:00"
        - platform: state
          entity_id: sensor.0x00158d0001718ca8_action
          to: 'single_left'
        - platform: state
          entity_id: sensor.0x00158d0002af829b_action
          to: 'single'
        - platform: event
          event_type: timer.finished
          event_data:
            entity_id: timer.switch_0x00158d0002d7bb2b_l1
        binary_sensor:
          - name: switch_0x00158d0002d7bb2b_l1
            auto_off: 1
            state: "true"
            
    automation:
    
      - id: Управление реле
        alias: manual_relay_control
        initial_state: true
        trigger:
        - platform: state
          entity_id: binary_sensor.switch_0x00158d0002d7bb2b_l1
          to: 'on'
        action:
            - choose:
    # Включение реле и таймера
              - conditions:
                  - condition: state
                    entity_id: switch.0x00158d0002d7bb2b_l1
                    state: 'off'
                sequence:
                  - service: switch.turn_on
                    entity_id: switch.0x00158d0002d7bb2b_l1
                  - service: timer.start
                    entity_id: timer.switch_0x00158d0002d7bb2b_l1
    # Выключение реле и таймера
              - conditions:
                  - condition: state
                    entity_id: switch.0x00158d0002d7bb2b_l1
                    state: 'on'
                sequence:
                  - service: switch.turn_off
                    entity_id: switch.0x00158d0002d7bb2b_l1
                  - service: timer.cancel
                    entity_id: timer.switch_0x00158d0002d7bb2b_l1

      - id: Контроль включения реле
        alias: relay_control
        initial_state: true
        trigger:
        - platform: state
          entity_id: switch.0x00158d0002d7bb2b_l1
          to: 'on'
        - platform: state
          entity_id: switch.0x00158d0002d7bb2b_l1
          to: 'off'
        condition:
        - condition: state
          entity_id: binary_sensor.switch_0x00158d0002d7bb2b_l1
          state: 'off'
        action:
          - service: switch.toggle
            entity_id: switch.0x00158d0002d7bb2b_l1
          - delay: 00:00:01

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