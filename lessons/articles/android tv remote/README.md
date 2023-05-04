### [Home Assistant 2023.5 - Android TV Remote](https://youtu.be/EzK2e-PwASw)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

:ballot_box_with_check: Пульт для управления ТВ:    

```yaml

title: Remote control
icon: mdi:remote-tv
cards:


    - type: vertical-stack
      cards:

        - type: horizontal-stack
          cards:

            - type: button
              show_name: false
              show_icon: true
              icon: mdi:power-off
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: POWER
                target:
                  entity_id: remote.mitv
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:power
              entity: input_button.lr_tv_control
              tap_action:
                action: call-service
                service: input_button.press
                target:
                  entity_id: input_button.lr_tv_control
      
        - type: horizontal-stack
          cards:

            - type: button
              show_name: false
              show_icon: true
              icon: mdi:home
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: HOME
                target:
                  entity_id: remote.mitv
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:arrow-up-bold-box
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: DPAD_UP
                target:
                  entity_id: remote.mitv
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:arrow-u-left-top-bold
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: BACK
                target:
                  entity_id: remote.mitv

        - type: horizontal-stack
          cards:
          
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:arrow-left-bold-box
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: DPAD_LEFT
                target:
                  entity_id: remote.mitv
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:circle
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: DPAD_CENTER
                target:
                  entity_id: remote.mitv
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:arrow-right-bold-box
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: DPAD_RIGHT
                target:
                  entity_id: remote.mitv
                  

        - type: horizontal-stack
          cards:

            - type: button
              show_name: false
              show_icon: true
              icon: mdi:youtube
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.turn_on
                data: 
                  activity: https://www.youtube.com
                target:
                  entity_id: remote.mitv
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:arrow-down-bold-box
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: DPAD_DOWN
                target:
                  entity_id: remote.mitv
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:dots-horizontal-circle
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: DPAD_CENTER
                  hold_secs: 0.5
                target:
                  entity_id: remote.mitv

        - type: horizontal-stack
          cards:

            - type: button
              show_name: false
              show_icon: true
              icon: mdi:numeric-3-box
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: DPAD_LEFT
                  hold_secs: 3
                target:
                  entity_id: remote.mitv

            - type: button
              show_name: false
              show_icon: true
              icon: mdi:numeric-2-box
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: DPAD_LEFT
                  hold_secs: 2
                target:
                  entity_id: remote.mitv                  
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:numeric-1-box
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: DPAD_LEFT
                  hold_secs: 1
                target:
                  entity_id: remote.mitv

            - type: button
              show_name: false
              show_icon: true
              icon: mdi:numeric-1-box-outline
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: DPAD_RIGHT
                  hold_secs: 1
                target:
                  entity_id: remote.mitv
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:numeric-2-box-outline
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: DPAD_RIGHT
                  hold_secs: 2
                target:
                  entity_id: remote.mitv
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:numeric-3-box-outline
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: DPAD_RIGHT
                  hold_secs: 3
                target:
                  entity_id: remote.mitv

        - type: horizontal-stack
          cards:
          
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:skip-previous
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: MEDIA_PREVIOUS
                target:
                  entity_id: remote.mitv

            - type: button
              show_name: false
              show_icon: true
              icon: mdi:play-pause
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: MEDIA_PLAY_PAUSE
                target:
                  entity_id: remote.mitv
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:stop
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: MEDIA_STOP
                target:
                  entity_id: remote.mitv
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:skip-next
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: MEDIA_NEXT
                target:
                  entity_id: remote.mitv

        - type: horizontal-stack
          cards:
          
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:volume-minus
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: VOLUME_DOWN
                target:
                  entity_id: remote.mitv

            - type: button
              show_name: false
              show_icon: true
              icon: mdi:volume-mute
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: VOLUME_MUTE
                target:
                  entity_id: remote.mitv
                  
            - type: button
              show_name: false
              show_icon: true
              icon: mdi:volume-plus
              entity: remote.mitv
              tap_action:
                action: call-service
                service: remote.send_command
                data: 
                  command: VOLUME_UP
                target:
                  entity_id: remote.mitv

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