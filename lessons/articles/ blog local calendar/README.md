### [Home Assistant - Local Calendar, update 2022 12](https://youtu.be/nLNq187Fcps)     

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package from the Lesson:  

```yaml
reminder:


    automation:
    
      - alias: calendar_reminder_event_start
        description: Calendar event start
        initial_state: true
        trigger:
          - platform: calendar
            event: start
            entity_id: calendar.reminders
        condition:
          - condition: template
            value_template: "{{ 'Напоминание' in trigger.calendar_event.summary }}"
        action:  
          - service: persistent_notification.create
            data:
              message: |       
                Event start
                {{"\U0001F567"}} {{ now().strftime('%H:%M:%S')}}
                {{ trigger.event }}				
                {{ trigger.calendar_event.summary }} 
                {{ trigger.calendar_event.description }}
                {{ as_timestamp(trigger.calendar_event.start)| int | timestamp_custom("%H:%M:%S")}}

      - alias: calendar_reminder_event_end
        description: Calendar event end
        initial_state: true
        trigger:
          - platform: calendar
            event: end
            entity_id: calendar.reminders
        condition:
          - condition: template
            value_template: "{{ 'Напоминание' in trigger.calendar_event.summary }}"
        action:  
          - service: persistent_notification.create
            data:
              message: |       
                Event end
                {{"\U0001F567"}} {{ now().strftime('%H:%M:%S')}}
                {{ trigger.event }}				
                {{ trigger.calendar_event.summary }} 
                {{ trigger.calendar_event.description }}
                {{ as_timestamp(trigger.calendar_event.end)| int | timestamp_custom("%H:%M:%S")}}

      - alias: calendar_reminder_light
        description: Calendar light
        initial_state: true
        trigger:
          - platform: calendar
            event: start
            entity_id: calendar.reminders
          - platform: calendar
            event: end
            entity_id: calendar.reminders
        condition:
          - condition: template
            value_template: "{{ 'Свет' in trigger.calendar_event.summary }}"
        action: 
          - if:
            - "{{ trigger.event == 'start' }}"
            then:
              - service: light.turn_on
                entity_id: light.lr_tv_bulb
              - service: persistent_notification.create
                data:
                  message: |       
                    Включение лампочки
                    {{"\U0001F567"}} {{ now().strftime('%H:%M:%S')}}
            else:
              - service: light.turn_off
                entity_id: light.lr_tv_bulb 
              - service: persistent_notification.create
                data:
                  message: |       
                    Выключение лампочки
                    {{"\U0001F567"}} {{ now().strftime('%H:%M:%S')}}
        
```
____
#### To financially support the project *Smart Home with Alex Kvazis*    
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg/join" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/youtube.png" alt="Youtube Sponsorship" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.patreon.com/alex_kvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/patreon-button.png" alt="Patreon Support" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.buymeacoffee.com/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/buymeacoffee.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.paypal.com/paypalme/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/paypal.png" alt="PayPal Me" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Or a donation of any amount -     
* Webmoney - Z243592584952    
* USDT TRON (TRC20) - TUvBLFpVAFiR7Z64MEjkXvZcdf1DGDEYTu    
* BTC - bc1qpqma0ndrmxw70y28esdaghu2pl8ttf97nh0ghc    
* ETH - 0xD4D06B1B1a6879ce4B36922F6ad96ddf30FD7E1A    
* TON - UQBEShkfKCFhvqlTs_oIpa6kFIQJguJR30hDXany1cCAbCfe    