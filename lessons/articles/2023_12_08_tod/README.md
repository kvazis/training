### [Home Assistant Practice. Times of the Day, Application, Creating Templates](https://youtu.be/oLxN0GHk_rk)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>



#### Package from the Lesson:  

Examples of TOD Sensors in YAML:    

```yaml
    binary_sensor:
    
      - platform: tod
        name: night
        unique_id: night
        after: '23:00'
        before: '07:00'
        
      - platform: tod
        name: lightday
        unique_id: lightday
        after: sunrise
        before: sunset
        before_offset: "-01:00"
        
    input_datetime:
    
      night_start:
        name: Старт ночного режима
        has_date: false
        has_time: true

      night_stop:
        name: Завершение ночного режима
        has_date: false
        has_time: true
```

Template Sensor:    
```yaml
    template:
    
      - binary_sensor:
      
          - name: night_time
            unique_id: night_time
            state: >
                {% if states('input_datetime.night_start') < states('input_datetime.night_stop') %}
                {{ states('input_datetime.night_start') <= now().strftime('%H:%M:%S') <= states('input_datetime.night_stop') }}
                {% elif states('input_datetime.night_start') > states('input_datetime.night_stop') %}
                {{states('input_datetime.night_start') <= now().strftime('%H:%M:%S') <= '23:59:59'
                or '00:00:00' <= now().strftime('%H:%M:%S') <= states('input_datetime.night_stop')}}
                {% endif %}            
            device_class: running
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