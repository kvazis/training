### [Home Assistant. Урок 11.1 Уведомления Telegram - создание бота, отправка сообщений, прием команд](https://youtu.be/tV8RjvevVHs)

Вторая часть урока - [Уроки Home Assistant - Управление умным домом через Telegram из любой точки мира](https://youtu.be/tPYXpQwDLYc)    
Третья часть - [Уроки Home Assistant - Управление через Telegram, текстовые диалоги, права пользователей](https://youtu.be/gksZK58ZLDQ)    
Четвертая часть - [Уроки Home Assistant - Управляем адресным светильником WLED через меню в Telegram](https://youtu.be/KqjjBY3QaCg)    

#### Текстовый материалы урока (обновлено в 2022, добавил про группы в телеграм) -    

:ballot_box_with_check: Создание своего чат бота:    
`@BotFather` - бот создающий боты    
Создание нового бота - `/newbot`    

Имя бота - любое, например Умный дом    
Название бота - латиница, в конце `bot`    
Получаем токен для бота    

:ballot_box_with_check: Обновление 20222, настройка для работы в группах:    
Список ботов - `/mybots`    
Выбираем своего бота, `Bot Setting`, `Allow Groups ?`, `Turn groups on`    

:ballot_box_with_check: Получение идентификатора    

`@myidbot` - вариант (не единственный) бота для получения ID    
Для получения ID пользователя - команда `/getid`    
Для получения ID группы - команда `/getgroupid`    


:ballot_box_with_check: Home Assistant    
Каждому пользователю нужно прописать свой ID (аналогично можно получить ID для группы, он должен начинаться с `-`)    

:ballot_box_with_check: Платформа телеграмм бота -    
```yaml
telegram_bot:
  - platform: polling
    api_key: API ключ полученный в @botfather
    allowed_chat_ids:
      - ID пользователя 1
      - ID пользователя 2   
```

:ballot_box_with_check: Платформа телеграмм уведомлений -    
```yaml      
notify:

  - name: Свое название для каждого пользователя
    platform: telegram
    chat_id: ID пользователя 1
    
  - name: Свое название для каждого пользователя
    platform: telegram
    chat_id: ID пользователя 2
```    
    
:ballot_box_with_check: Unicode для эмодзи - [timwhitlock](https://apps.timwhitlock.info/emoji/tables/unicode) ; [emojipedia](https://emojipedia.org/)

:ballot_box_with_check: Пакадж из урока -    
```yaml      
telegramm:


    sensor:

      - platform: template
        sensors:

          unavailable_now_light:
            friendly_name: "Всего недоступных светильников - "
            entity_id:
              - sensor.time
            value_template: "{{states.light | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon_template: mdi:counter        

          unavailable_now_switch:
            friendly_name: "Всего недоступных реле - "
            entity_id:
              - sensor.time
            value_template: "{{states.switch | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon_template: mdi:counter 
            
          unavailable_now_sensor:
            friendly_name: "Всего недоступных сенсоров - "
            entity_id:
              - sensor.time
            value_template: "{{states.sensor | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon_template: mdi:counter
            
          unavailable_now_binary_sensor:
            friendly_name: "Всего недоступных бинарных сенсоров - "
            entity_id:
              - sensor.time
            value_template: "{{states.binary_sensor | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon_template: mdi:counter

    script:
    
      send_message_1:
        alias: Отправка через сервис уведомлений
        sequence:
        - service: notify.telegram_id_1
          data:
            message: "Текущее время - {{ states('sensor.time') }} . Все в порядке"
            
      system_report:
        alias: Отправка отчета о состоянии системы
        sequence:
         - service: notify.telegram_id_1
           data:
             message: | 
                 {{"\U0001F6C0"}} Состояние системы
                 {{"\U0001F567"}} Отчет за {{ states('sensor.time_date') }}
                 {{"\U0001F4A1"}} Светильников недоступно - {{ states('sensor.unavailable_now_light') }} 
                 {{"\U0001F50C"}} Свичей недоступно - {{ states('sensor.unavailable_now_switch') }} 
                 {{"\U0001F321"}} Сенсоров недоступно - {{ states('sensor.unavailable_now_sensor') }} 
                 {{"\U0001F51F"}} Бинарных сенсоров недоступно - {{ states('sensor.unavailable_now_binary_sensor') }}             
            
                        
    automation:   
    
        - id: Отчет при запуске системы
          alias: start_message
          initial_state: true
          trigger:   
             - platform: homeassistant
               event: start          
          action:          
             - service: notify.telegram_id_1
               data:
                 message: | 
                     {{"\U0001F4AC"}} Основной сервер Raspberry Pi 
                     {{"\U0001F567"}} Зафиксирован запуск в {{ states('sensor.time_date') }} 
                     {{"\U0001F4C3"}} Отчет о состоянии будет через 1 минуту            
             - delay: 00:01:10
             - service: script.turn_on
               entity_id: script.system_report
               
               
        - id: Запрос на отчет             
          alias: send_report
          initial_state: true
          trigger:
          - platform: event
            event_type: telegram_command
            event_data:
              command: '/report'
          action:
           - service: script.turn_on
             entity_id: 
                - script.system_report
                
        - id: Включить свет             
          alias: send_light
          initial_state: true
          trigger:
          - platform: event
            event_type: telegram_command
            event_data:
              command: '/light'
          action:
           - service: light.turn_on
             entity_id: 
                - light.yeelight_650
                
        - id: Уведомление о включении             
          alias: send_light_on
          initial_state: false
          trigger:
          - platform: state
            entity_id: light.yeelight_650
            to: 'on'
          action:
          - service: notify.telegram_id_1
            data:
              message: "Светильник 650 включен в - {{ states('sensor.time') }} "

        - id: Клавиатура телеграмм бота
          alias: telegram_keyboard
          initial_state: true
          trigger:
          - platform: event
            event_type: telegram_command
            event_data:
              command: '/start'
          action:
          - service: notify.telegram_id_1
            data:
              message: 'commands'
              data:
                keyboard:
                  - '/report, /light'
                  - '/report2, /light2, /light3'           
                  - '/report3, /light4, /light5'              

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