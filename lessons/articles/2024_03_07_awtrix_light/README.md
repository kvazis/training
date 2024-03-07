### [Ulanzi TC001, installation of Awtrix Light, integration into Home Assistant, notification]( )

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Resources:    

:white_check_mark: **Awtrix Light:**    
:ballot_box_with_check: [Documentation](https://blueforcer.github.io/awtrix-light/#/?id=awtrix-light)     
:ballot_box_with_check: [Web Flasher](https://blueforcer.github.io/awtrix-light/#/flasher)     
:ballot_box_with_check: [Interaction](https://blueforcer.github.io/awtrix-light/#/api?id=interaction)     
:ballot_box_with_check: [Effects](https://blueforcer.github.io/awtrix-light/#/effects)     
:ballot_box_with_check: [Color Table](https://www.rapidtables.com/web/color/RGB_Color.html)     
:ballot_box_with_check: [MQTT Explorer](https://mqtt-explorer.com/)     

#### Program code:  


:ballot_box_with_check: Inscription Home Assistant    

```yaml
      - alias: awtrix_test_message
        id: awtrix_test_message
        description: Awtrix test message
        initial_state: true
        trigger:
    ## Virtual button
        - platform: state
          entity_id: input_button.test_test
        action:
        - service: mqtt.publish
          data_template:
            topic: "awtrix_6c9da0/notify"
            payload_template: '{ "text": "Home Assistant", "duration": 5, "color": "#5CE0FF" }'
```

:ballot_box_with_check: Temperature sensor data    

```yaml
      - alias: awtrix_test_message
        id: awtrix_test_message
        description: Awtrix test message
        initial_state: true
        trigger:
    ## Virtual button
        - platform: state
          entity_id: input_button.test_test
        action:
        - service: mqtt.publish
          data_template:
            topic: "awtrix_6c9da0/notify"
            payload_template: '{ "text": "t - {{ states(''sensor.0xec1bbdfffe6f3394_temperature'')}} C", "duration": 10, "color": "#FFF97D", "noScroll": true }'
```

:ballot_box_with_check: Temperature sensor data with icon    

```yaml
      - alias: awtrix_test_message
        id: awtrix_test_message
        description: Awtrix test message
        initial_state: true
        trigger:
    ## Virtual button
        - platform: state
          entity_id: input_button.test_test
        action:
        - service: mqtt.publish
          data_template:
            topic: "awtrix_6c9da0/notify"
            payload_template: '{ "icon": "1165", "text": "{{ states(''sensor.0xec1bbdfffe6f3394_temperature'')}} C", "duration": 10, "color": "#FFF97D", "noScroll": true }'
```

:ballot_box_with_check: Effect Radar with text    

```yaml
      - alias: awtrix_test_message
        id: awtrix_test_message
        description: Awtrix test message
        initial_state: true
        trigger:
    ## Virtual button
        - platform: state
          entity_id: input_button.test_test
        action:
        - service: mqtt.publish
          data_template:
            topic: "awtrix_6c9da0/notify"
            payload_template: '{ "text": "air raid alert", "effect": "Radar", "duration": 15, "color": "#FFD4FF" }'
```

:ballot_box_with_check: Youtube packages    

```yaml
youtube_sensors:

  sensor:
  - platform: rest
    name: youtube_api
    resource_template: !secret youtube
    method: GET
    headers:
      content-type: 'application/json'
    value_template: "0"
    json_attributes:
      - "items"
    scan_interval: 600 # 10 Minutes

## in secret.yaml - youtube: "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=CHANNEL_ID&key=CHANNEL_API"


  template:
    
      - sensor:

          - name: youtube_subscriber_count
            unique_id: youtube_subscriber_count
            state: > 
               {{state_attr('sensor.youtube_api','items')[0].statistics.subscriberCount }} 
               
          - name: youtube_view_count
            unique_id: youtube_view_count
            state: > 
               {{state_attr('sensor.youtube_api','items')[0].statistics.viewCount }}

          - name:  youtube_video_count
            unique_id: youtube_video_count
            state: > 
               {{state_attr('sensor.youtube_api','items')[0].statistics.videoCount }}
```

:ballot_box_with_check: Send youtube stats    

```yaml
      - alias: awtrix_test_message
        id: awtrix_test_message
        description: Awtrix test message
        initial_state: true
        trigger:
    ## Virtual button
        - platform: state
          entity_id: input_button.test_test
        action:
        - service: mqtt.publish
          data_template:
            topic: "awtrix_6c9da0/notify"
            payload_template: '{"icon": "10835", "text": "{{ states(''sensor.youtube_subscriber_count'')}}", "duration": 5 }'
        - delay: 00:00:05
        - service: mqtt.publish
          data_template:
            topic: "awtrix_6c9da0/notify"
            payload_template: '{"icon": "10519", "text": "{{ states(''sensor.youtube_view_count'')}}", "color": "#00FF00", "duration": 5 }' 
        - delay: 00:00:05
        - service: mqtt.publish
          data_template:
            topic: "awtrix_6c9da0/notify"
            payload_template:  '{"icon": "9452", "text": "{{ states(''sensor.youtube_video_count'')}}", "color": "#007FFF", "duration": 5 }'
```

____
#### Donate *Smart home with Alex Kvazis*    
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg/join" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/youtube.png" alt="Youtube Sponsorship" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.patreon.com/alex_kvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/patreon-button.png" alt="Patreon Support" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.buymeacoffee.com/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/buymeacoffee.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.paypal.com/paypalme/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/paypal.png" alt="PayPal Me" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Or     
* Webmoney - Z243592584952
* BTC - 1PAjXcNbLtUKLY8d5HDnfxRqc5Zchj1fU3    
* TON - UQBEShkfKCFhvqlTs_oIpa6kFIQJguJR30hDXany1cCAbCfe    
* USDT (TRON (TRC20)) - TEpnJcLDRbkwq5oQpjVET9NbPpHKB7QMrD    