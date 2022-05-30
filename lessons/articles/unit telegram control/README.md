### [Уроки Home Assistant - Управление умным домом через Telegram из любой точки мира](https://youtu.be/tPYXpQwDLYc)

Первая часть - [Home Assistant. Урок 11.1 Уведомления Telegram - создание бота, отправка сообщений, прием команд](https://youtu.be/tV8RjvevVHs)    
Третья часть - [Уроки Home Assistant - Управление через Telegram, текстовые диалоги, права пользователей](https://youtu.be/gksZK58ZLDQ)

#### Текстовые материалы урока -    

:ballot_box_with_check: Unicode для эмодзи - [timwhitlock](https://apps.timwhitlock.info/emoji/tables/unicode) ; [emojipedia](https://emojipedia.org/)

:ballot_box_with_check: Пакадж из урока (две автоматизации второго уровня)     

```yaml      
telegram_control:

    automation:

    ## Стартовая автоматизация для запуска меню
      - id: Вызов меню управления телеграм
        alias: telegram_menu_start
        initial_state: true
        trigger:
          - platform: event
            event_type: telegram_command
            event_data:
              command: '/go'
        action:
          - service: telegram_bot.send_message
            data:
              target: "{{ trigger.event.data.user_id }}"
              message: |
                {{'\U0001F527'}} Выбрать комнату для управления :
              inline_keyboard: 
              - '{{''\U0001F6B6''}} Вход:/en_control , {{''\U0001F6C0''}} Санузел:/bt_control'
              - '{{''\U0001F3E2''}} Гостиная:/lr_control , {{''\U0001F374''}} Кухня:/kn_control'
              - '{{''\U0001F6B9''}} Детская Д:/dd_control , {{''\U0001F6BA''}} Детская А:/da_control'
              - '{{''\U0001F6AB''}} Убрать меню:/menu_hide'

    # ## Автоматизация управления главным меню
      - id: Главное меню управления телеграм
        alias: telegram_menu_control
        initial_state: true
        trigger:
          - platform: event
            event_type: telegram_callback
            event_data: {}
        action:
          - choose:
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/menu_hide'' }}'
                sequence:
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}' 
          - choose:
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/menu_back'' }}'
                sequence:
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: "{{ trigger.event.data.chat_id }}"
                      message: |
                        {{'\U0001F527'}} Выбрать комнату для управления :
                      inline_keyboard: 
                      - '{{''\U0001F6B6''}} Вход:/en_control , {{''\U0001F6C0''}} Санузел:/bt_control'
                      - '{{''\U0001F3E2''}} Гостиная:/lr_control , {{''\U0001F374''}} Кухня:/kn_control'
                      - '{{''\U0001F6B9''}} Детская Д:/dd_control , {{''\U0001F6BA''}} Детская А:/da_control'
                      - '{{''\U0001F6AB''}} Убрать меню:/menu_hide'


    ## Управление прихожая, коридор
      - id: Прихожая и коридор меню управления телеграм
        alias: telegram_en_menu_control
        initial_state: true
        trigger: 
          - platform: event
            event_type: telegram_callback
            event_data: {}
        action:
          - choose:
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/en_control'' }}'
                sequence:
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: &msg_en |
                        {{'\U0001F6B6'}} Управление прихожая, коридор :
                        {{'\U0001F6AA'}} Входная дверь - {% if is_state('binary_sensor.0x00158d000119378d_contact', 'on') %} Открыта {% else %} Закрыта {% endif %}
                        {{'\U0001F6AD'}} Датчик дыма - {% if is_state('binary_sensor.0x00158d000149d28b_smoke', 'on') %} Обнаружен дым {% else %} Задымления нет {% endif %}
                        Прихожая -
                        {{'\U0001F6B6'}} - {% if is_state('binary_sensor.0x00158d00013f7894_occupancy', 'on') %} Движение {% else %} Нет движения {% endif %} 
                        {{'\U0001F321'}} - {{ states('sensor.0x54ef44100001b68d_temperature') }} °C, {{'\U0001F4A7'}} - {{ states('sensor.0x54ef44100001b68d_humidity') }} %
                        Коридор -
                        {{'\U0001F6B6'}} - {% if is_state('binary_sensor.0x00158d00010f8920_occupancy', 'on') %} Движение {% else %} Нет движения {% endif %}
                        {{'\U0001F321'}} - {{ states('sensor.0x00124b0022659c04_temperature') }} °C, {{'\U0001F4A7'}} - {{ states('sensor.0x00124b0022659c04_humidity') }} %
                      inline_keyboard: &keyb_en
                        - '{{''\U0001F4A1''}} Лампочка - {% if is_state(''light.0x00158d0003e74c31'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_en_bulb_light , {{''\U0001F4A1''}} Люстра - {% if is_state(''light.cr_ceiling_light'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_cr_ceiling_light'
                        - '{{''\U000021A9''}} Вернуться:/menu_back , {{''\U000021AA''}} Обновить:/en_control' 
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/toggle_en_bulb_light'' }}'
                sequence:
                  - service: light.toggle
                    entity_id: light.0x00158d0003e74c31
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Лампочка в прихожей - {% if is_state('light.0x00158d0003e74c31', 'on') %} Включена {% else %} Выключена {% endif %} 
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_en
                      inline_keyboard: *keyb_en
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/toggle_cr_ceiling_light'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.cr_ceiling_light
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Люстра коридор - {% if is_state('light.cr_ceiling_light', 'on') %} Включена {% else %} Выключена {% endif %}
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_en
                      inline_keyboard: *keyb_en

    ## Управление санузел
      - id: Туалет, прачечная, ванная меню управления телеграм
        alias: telegram_bt_menu_control
        initial_state: true
        trigger: 
          - platform: event
            event_type: telegram_callback
            event_data: {}
        action:
          - choose:
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/bt_control'' }}'
                sequence:
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: &msg_bt |
                        {{'\U0001F6C0'}} Управление туалет, прачечная, ванная :
                        Туалет - 
                        {{'\U0001F321'}} - {{ states('sensor.0xec1bbdfffe6f3394_temperature') }} °C, {{'\U0001F4A7'}} - {{ states('sensor.0xec1bbdfffe6f3394_humidity') }} %
                        Прачечная -
                        {{'\U0001F6B6'}} - {% if is_state('binary_sensor.0x00158d0001e16204_occupancy', 'on') %} Движение {% else %} Нет движения {% endif %}
                        {{'\U0001F321'}} - {{ states('sensor.0xec1bbdfffe8d6ac9_temperature') }} °C, {{'\U0001F4A7'}} - {{ states('sensor.0xec1bbdfffe8d6ac9_humidity') }} %
                        Ванная -
                        {{'\U0001F6B6'}} - {% if is_state('binary_sensor.0x00158d0001e547a3_occupancy', 'on') %} Движение {% else %} Нет движения {% endif %} {{'\U0001F6AA'}} Дверь - {% if is_state('binary_sensor.0x00158d00054495dc_contact', 'on') %} Открыта {% else %} Закрыта {% endif %}
                        {{'\U0001F6B1'}} - Раковина - {% if is_state('binary_sensor.0x00158d0001d72fa2_water_leak', 'on') %} Протечка {% else %} Сухо {% endif %} {{'\U0001F6B1'}} - Душевая - {% if is_state('binary_sensor.0x00158d0001bb60c2_water_leak', 'on') %} Протечка {% else %} Сухо {% endif %}
                        {{'\U0001F321'}} - {{ states('sensor.0x00158d0001dcd47e_temperature') }} °C, {{'\U0001F4A7'}} - {{ states('sensor.0x00158d0001dcd47e_humidity') }} %
                      inline_keyboard: &keyb_bt
                        - '{{''\U0001F4A1''}} Туалет - {% if is_state(''light.tt_ceiling_light'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_tt_ceiling_light , {{''\U0001F4A1''}} Прачечная - {% if is_state(''light.0x00158d00014a1a55'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_ln_ceiling_light'
                        - '{{''\U0001F4A1''}} Ванная - {% if is_state(''light.bt_ceiling_light'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_bt_ceiling_light , {{''\U0001F300''}} Вентилятор - {% if is_state(''switch.0x00158d0001117040_left'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_bt_fan'
                        - '{{''\U00002668''}} Нагрев воды - {% if is_state(''switch.heater_mode'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_bt_boiler_mode , {{''\U0001F50C''}} Бойлер - {% if is_state(''switch.bathroom_bolier'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_bt_boiler'
                        - '{{''\U000021A9''}} Вернуться:/menu_back , {{''\U000021AA''}} Обновить:/bt_control' 
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/toggle_tt_ceiling_light'' }}'
                sequence:
                  - service: light.toggle
                    entity_id: light.tt_ceiling_light
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Люстра туалет - {% if is_state('light.tt_ceiling_light', 'on') %} Включена {% else %} Выключена {% endif %}
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_bt
                      inline_keyboard: *keyb_bt
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/toggle_ln_ceiling_light'' }}'
                sequence:
                  - service: light.toggle
                    entity_id: light.0x00158d00014a1a55
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Люстра прачечная - {% if is_state('light.0x00158d00014a1a55', 'on') %} Включена {% else %} Выключена {% endif %}
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_bt
                      inline_keyboard: *keyb_bt
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/toggle_bt_ceiling_light'' }}'
                sequence:
                  - service: input_button.press
                    target:
                        entity_id: input_button.bt_ceiling_light
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Люстра ванная - {% if is_state('light.bt_ceiling_light', 'on') %} Включена {% else %} Выключена {% endif %}
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_bt
                      inline_keyboard: *keyb_bt
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/toggle_bt_fan'' }}'
                sequence:
                  - service: switch.toggle
                    entity_id: switch.0x00158d0001117040_left
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Вентилятор ванная - {% if is_state('switch.0x00158d0001117040_left', 'on') %} Включен {% else %} Выключен {% endif %}
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_bt
                      inline_keyboard: *keyb_bt
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/toggle_bt_boiler_mode'' }}'
                sequence:
                  - service: switch.toggle
                    entity_id: switch.heater_mode
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Режим нагрева воды - {% if is_state('switch.heater_mode', 'on') %} Активирован {% else %} Деактивирован {% endif %}
                      show_alert: true
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_bt
                      inline_keyboard: *keyb_bt
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/toggle_bt_boiler'' }}'
                sequence:
                  - service: switch.toggle
                    entity_id: switch.bathroom_bolier
                  - delay:
                      milliseconds: 500
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Бойлер ванная - {% if is_state('switch.bathroom_bolier', 'on') %} Включен {% else %} Выключен {% endif %}
                      show_alert: true
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_bt
                      inline_keyboard: *keyb_bt
```    
____
### Как поддержать развитие проекта?
* [Стать спонсором моего Youtube](http://kvazis.link/sponsorship)
* [Подписаться на Patreon](http://kvazis.link/patreon)
* [Перевод через Paypal](http://kvazis.link/paypal)
* Webmoney - Z243592584952
* BTC - 1Gzr7WQugfnPuWVawu47EiCMTDUBqCAshj
* ETH - 0xa0ce3E29Cf537013649Ae9cdbc08C4853fF91FAc
* LTC - ltc1qs493yk2wk9ywx5h6aruk4p9zm75hx42ekv4ym2
* TRX - TFTCLqvS1tMBwokRHBwz1TCDJ4oD1Z5zPk