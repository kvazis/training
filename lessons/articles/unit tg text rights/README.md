### [Уроки Home Assistant - Управление через Telegram, текстовые диалоги, права пользователей](https://youtu.be/gksZK58ZLDQ)

Первая часть - [Home Assistant. Урок 11.1 Уведомления Telegram - создание бота, отправка сообщений, прием команд](https://youtu.be/tV8RjvevVHs)    
Вторая часть - [Уроки Home Assistant - Управление умным домом через Telegram из любой точки мира](https://youtu.be/tPYXpQwDLYc)    

#### Текстовые материалы урока -    

:ballot_box_with_check: Запрос состояния    

```yaml

      - id: Запрос состояния системы
        alias: system_status_query
        initial_state: true
        trigger:
          - platform: event
            event_type: telegram_text
        condition:
          - condition: template
            value_template: >-
              {{ trigger.event.data.text in ["Как дела", "как дела", "Отчет", "отчет", "Статус", "статус"] }}
        action:
          - service: telegram_bot.send_message
            data:
              target: "{{ trigger.event.data.user_id }}"
              message: | 
                   {{"\U0001F4AC"}} Основной сервер Raspberry Pi 4 B 8GB
                   {{"\U0001F567"}} Отчет за {{ states('sensor.time_date') }}
                   {{"\U0001F503"}} Режим управления - {{ states('switch.control_mode') }} 
                   {{"\U0001F4A1"}} Светильников недоступно - {{ states('sensor.count_light_unavailable') }} 
                   {{"\U0001F50C"}} Реле недоступно - {{ states('sensor.count_switch_unavailable') }} 
                   {{"\U00002668"}} Термоголовок недоступно - {{ states('sensor.count_climate_unavailable') }} 
                   {{"\U0001F321"}} Сенсоров недоступно - {{ states('sensor.count_sensor_unavailable') }} 
                   {{"\U0001F51F"}} Бинарных сенсоров недоступно - {{ states('sensor.count_binary_sensor_unavailable') }}
```

:ballot_box_with_check: Определение ID    

```yaml
      - id: Определение ID
        alias: telegram_id
        initial_state: true
        trigger:
          - platform: event
            event_type: telegram_text
        condition:
          - condition: template
            value_template: >-
              {{ trigger.event.data.text in ["whoami"] }}
        action:
          - service: telegram_bot.send_message
            data_template:
              target: "{{ trigger.event.data.chat_id }}"
              message: |
                Твой ID {{ trigger.event.data.user_id }}
```

:ballot_box_with_check: Template сенсоры, получающие данные из файла секретов


```yaml
    template:

      - sensor:

          - name: admin_1
            state: !secret chat_id_alex
            
          - name: user_1
            state: !secret chat_id_user
```

:ballot_box_with_check: Разные ответы в зависимости от ID

```yaml
      - id: Кто я
        alias: whoami
        initial_state: true
        trigger:
          - platform: event
            event_type: telegram_text
        action:
          - choose:
              - conditions:      
                  - condition: template
                    value_template: >-
                      {{ trigger.event.data.text in ["Кто я?",] }}
                  - condition: template
                    value_template: >
                       {{ trigger.event.data.user_id == (states('sensor.admin_1')|int) }}
                sequence:
                  - service: telegram_bot.send_message
                    data:
                      target: "{{ trigger.event.data.user_id }}"
                      message: | 
                           {{"\U0000270B"}} Привет, я тебя узнал, твой статус - Администратор, доступ - полный
              - conditions:      
                  - condition: template
                    value_template: >-
                      {{ trigger.event.data.text in ["Кто я?",] }}
                  - condition: template
                    value_template: >
                       {{ trigger.event.data.user_id == (states('sensor.user_1')|int) }}
                sequence:
                  - service: telegram_bot.send_message
                    data:
                      target: "{{ trigger.event.data.user_id }}"
                      message: | 
                           {{"\U0000270B"}} Привет, я тебя узнал, твой статус - Пользователь, доступ - управление комнатой
```

:ballot_box_with_check: Стартовая автоматизация с разными меню управления, в зависимости от ID

```yaml
      - id: Вызов меню управления телеграм
        alias: telegram_menu_start
        initial_state: true
        trigger:
          - platform: event
            event_type: telegram_text
        condition:
          - condition: template
            value_template: >-
              {{ trigger.event.data.text in ["куку", "Куку", "Rere", "rere", "Привет", "привет", "Ghbdtn", "ghbdtn"] }}
        action:
          - choose:
              - conditions:
                  - condition: template
                    value_template: >
                       {{ trigger.event.data.user_id == (states('sensor.admin_1')|int) }}
                sequence:
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
              - conditions:
                  - condition: template
                    value_template: >
                       {{ trigger.event.data.user_id == (states('sensor.user_1')|int) }}
                sequence:
                  - service: telegram_bot.send_message
                    data:
                      target: "{{ trigger.event.data.user_id }}"
                      message: &msg_locdd |
                        {{'\U0001F6B9'}} Управление Детской Д :
                        Детская Д -
                        {{'\U0001F6B6'}} - {% if is_state('binary_sensor.0x00158d0001a66222_occupancy', 'on') %} Движение {% else %} Нет движения {% endif %} {{'\U0001FA9F'}} - {% if is_state('binary_sensor.0x00158d0001193697_contact', 'on') %} Открыто {% else %} Закрыто {% endif %}
                        {{'\U0001F321'}} - {{ states('sensor.0x00158d000156e92e_temperature') }} °C, {{'\U0001F4A7'}} - {{ states('sensor.0x00158d000156e92e_humidity') }} %
                        Балкон -
                        {{'\U0001F6AA'}} - {% if is_state('binary_sensor.0x00158d00015843d4_contact', 'on') %} Открыта {% else %} Закрыта {% endif %} 
                        {{'\U0001FA9F'}} 1 - {% if is_state('binary_sensor.0x00158d0001a65b68_contact', 'on') %} Открыто {% else %} Закрыто {% endif %}  {{'\U0001FA9F'}} 2 - {% if is_state('binary_sensor.0xec1bbdfffe3a653e_contact', 'on') %} Открыто {% else %} Закрыто {% endif %} 
                        {{'\U0001F321'}} - {{ states('sensor.0x00158d0001fa8321_temperature') }} °C, {{'\U0001F4A7'}} - {{ states('sensor.0x00158d0001fa8321_humidity') }} %
                      inline_keyboard: &keyb_locdd
                        - '{{''\U0001F4A1''}} Люстра - {% if is_state(''light.dd_ceiling_light'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_locdd_ceiling_light , {{''\U0001F4A1''}} Бра - {% if is_state(''light.0x00158d000420dbab'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_locdd_bra'
                        - '{{''\U0001F4A1''}} Адресная лента - {% if is_state(''light.dd_wled_light'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_locdd_wled_light , {{''\U0001F4A1''}} Настольная - {% if is_state(''light.dd_table_lamp'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_locdd_table_lamp'
                        - '{{''\U0001F4A1''}} Свет на балконе - {% if is_state(''light.0x680ae2fffe71ae63'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_locdd_balcony_light '
                        - '{{''\U000021AA''}} Обновить:/dd_local_control' 
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