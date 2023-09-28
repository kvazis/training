### [Home Assistant. Урок 12.1 Интерфейс - Lovelace, карта auto-entities](https://youtu.be/cxDDZkOl-EM)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


####  Код из урока в текстовом виде - 

:white_check_mark: **Auto Entities**    

:ballot_box_with_check: Ручной режим `lovelace` и кастомная карта `auto-entities` в ресурсах - `configuration.yaml`

```yaml
lovelace:
  mode: yaml
  resources:
   - url: /hacsfiles/lovelace-auto-entities/auto-entities.js
     type: module  
```

:ballot_box_with_check: Страница из урока с картами - 

```yaml
  - title: Панель управления
    icon: mdi:keyboard

    cards:

    - type: vertical-stack
      cards: 

            - type: markdown
              content: >
                  **Все светильники**

            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: light

            - type: markdown
              content: >
                  **Активные светильники**
                      
            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: light
                   state: 'on'
                   options:
                      secondary_info: last-changed


            - type: markdown
              content: >
                  **Активные переключатели**
            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: switch
                   state: 'on'
                   options:
                      secondary_info: last-changed

    - type: vertical-stack
      cards: 

            - type: markdown
              content: >
                  **Движение**

            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - entity_id: binary_sensor.*occupancy
                   state: 'on'
                   options:
                      secondary_info: last-changed

            - type: markdown
              content: >
                  **Открытые окна и двери**

            - type: custom:auto-entities
              show_empty: true
              card:
                type: glance
                show_state: false
              filter:
                include:
                 - entity_id: binary_sensor.*contact
                   state: 'on'

            - type: markdown
              content: >
                  **Мощность более 10 Ватт**

            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - entity_id: sensor.*_power
                exclude:
                 - state: '< 10.0'

            - type: markdown
              content: >
                  **Влажность менее 30%**
                      
            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - entity_id: sensor.*_humidity
                exclude:
                 - state: '> 30.0'

            - type: markdown
              content: >
                  **Температура менее 20 С**
                      
            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - entity_id: sensor.*_temperature
                exclude:
                 - state: '> 20.0'

    - type: vertical-stack
      cards: 

            - type: markdown
              content: >
                  **Батарейки**

            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - entity_id: sensor.*battery*
                exclude:
                 - state: '> 70.0'
                 - state: 'unknown'

            - type: markdown
              content: >
                  **Аварийные датчики**
      
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - entity_id: binary_sensor.*water_leak
                   state: 'on'
                   options:
                      secondary_info: last-changed
                 - entity_id: binary_sensor.*smoke
                   state: 'on'
                   options:
                      secondary_info: last-changed

            - type: markdown
              content: >
                  **Отвалившиеся светильники**
                      
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: light
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed

            - type: markdown
              content: >
                  **Отвалившиеся переключатели**
                      
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: switch
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed
                      
            - type: markdown
              content: >
                  **Отвалившиеся сенсоры**
                      
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: sensor
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed
                 - domain: binary_sensor
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed
                   
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