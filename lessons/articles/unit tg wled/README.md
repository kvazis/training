### [Уроки Home Assistant - Управляем адресным светильником WLED через меню в Telegram](https://youtu.be/KqjjBY3QaCg)

Первая часть - [Home Assistant. Урок 11.1 Уведомления Telegram - создание бота, отправка сообщений, прием команд](https://youtu.be/tV8RjvevVHs)    
Вторая часть - [Уроки Home Assistant - Управление умным домом через Telegram из любой точки мира](https://youtu.be/tPYXpQwDLYc)    
Третья часть - [Уроки Home Assistant - Управление через Telegram, текстовые диалоги, права пользователей](https://youtu.be/gksZK58ZLDQ)

#### Текстовые материалы урока -    

:ballot_box_with_check: Пакадж целиком    

```yaml
telegram_wled:


    template:
    
      - sensor:
      
          - name: dd_wled_light_brightness
            state: >
              {% if is_state('light.dd_wled_light', 'on') %}
              {{ (state_attr('light.dd_wled_light', 'brightness') / 2.55 ) | float |round(0)}}
              {% else %}
              0
              {% endif %}
              
          - name: dd_wled_light_speed
            state: >
              {% if is_state('light.dd_wled_light', 'on') %}
              {{ (states('number.dd_wled_light_speed') | float / 2.55 )  |round(0)}}
              {% else %}
              0
              {% endif %}

          - name: dd_wled_light_intensity
            state: >
              {% if is_state('light.dd_wled_light', 'on') %}
              {{ (states('number.dd_wled_light_intensity') | float / 2.55 )  |round(0)}}
              {% else %}
              0
              {% endif %}
              
          - name: dd_wled_light_effect
            state: >
              {% if is_state('light.dd_wled_light', 'on') %}
              {{ state_attr('light.dd_wled_light', 'effect') }}
              {% else %}
              Выключено
              {% endif %}

          - name: dd_wled_light_color
            state: >
              {% if is_state('light.dd_wled_light', 'on') %}
              {{ states('select.dd_wled_light_color_palette') }}
              {% else %}
              Выключено
              {% endif %}


    automation:

    ## Управление основными параметрами WLED светильника
      - id: wled лента в детской Д
        alias: dd_telegram_wled_menu_control
        initial_state: true
        trigger: 
          - platform: event
            event_type: telegram_callback
            event_data: {}
        action:
          - choose:
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/dd_wled_light_control'' }}'
                sequence:
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: &msg_dd_wled |
                        {{'\U0001F4F1'}} Детская Д WLED лента:
                        {{'\U0001FA84'}} Эффект - {{ states('sensor.dd_wled_light_effect') }}, {{'\U0001F308'}} Цвет - {{ states('sensor.dd_wled_light_color') }}
                        {{'\U0001F4A1'}} Яркость - {{ states('sensor.dd_wled_light_brightness') }} % , {{'\U000023E9'}} Скорость - {{ states('sensor.dd_wled_light_speed') }} %
                        {{'\U000023EB'}} Интенсивность - {{ states('sensor.dd_wled_light_intensity') }} % , {{'\U000026A1'}} Ток - {{ states('sensor.dd_wled_light_estimated_current') }} мА
                      inline_keyboard: &keyb_dd_wled
                        - '{{''\U0001F4A1''}} Лента - {% if is_state(''light.dd_wled_light'', ''off'')%}{{''🔴''}}{% else %}{{''🟢''}}{% endif %}:/toggle_dd_wled_strip'
                        - '{{''\U0001F319''}} Ночь:/night_dd_wled_light, {{''\U0001F39E''}} Кино:/cinema_dd_wled_light, {{''\U00002600''}} Свет:/light_dd_wled_light'
                        - '{{''\U00000031''}}:/effect1_dd_wled_light , {{''\U00000032''}}:/effect2_dd_wled_light , {{''\U00000033''}}:/effect3_dd_wled_light , {{''\U00000034''}}:/effect4_dd_wled_light , {{''\U00000035''}}:/effect5_dd_wled_light'
                        - '{{''\U0001F505''}} Яркость -10%:/brightness_down_dd_wled_light, {{''\U0001F506''}} Яркость +10%:/brightness_up_dd_wled_light'
                        - '{{''\U000023EA''}} Скорость -10%:/speed_down_dd_wled_light, {{''\U000023E9''}} Скорость +10%:/speed_up_dd_wled_light'
                        - '{{''\U000023EC''}} Интенсивность -10%:/intensity_down_dd_wled_light, {{''\U000023EB''}} Интенсивность +10%:/intensity_up_dd_wled_light'
                        - '{{''\U0001FA84''}} Эффекты:/effect_dd_wled_light, {{''\U0001F308''}} Цвет:/color_dd_wled_light'
                        - '{{''\U000021A9''}} Вернуться:/dd_local_control , {{''\U000021AA''}} Обновить:/dd_wled_light_control' 

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/toggle_dd_wled_strip'' }}'
                sequence:
                  - service: light.toggle
                    entity_id: light.dd_wled_light
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - {% if is_state('light.dd_wled_light', 'on') %} Включена {% else %} Выключена {% endif %} 
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/night_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Solid
                      brightness_pct: 1
                      kelvin: 2700
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - ночной свет
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/cinema_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Solid
                      brightness_pct: 50
                      rgb_color: [169, 153, 255]
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - подсветка для кино
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/light_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Solid
                      brightness_pct: 100
                      kelvin: 4000
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - яркий свет
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/effect1_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Saw
                      brightness_pct: 50
                  - service: select.select_option
                    data:
                      option: Splash
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_speed
                    data:
                      value: 114
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_intensity
                    data:
                      value: 76
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - эффект 1
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/effect2_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Lake
                      brightness_pct: 50
                  - service: select.select_option
                    data:
                      option: Fire
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_speed
                    data:
                      value: 221
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_intensity
                    data:
                      value: 255
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - эффект 2
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/effect3_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Scan Dual
                      brightness_pct: 50
                  - service: select.select_option
                    data:
                      option: Blink Red
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_speed
                    data:
                      value: 130
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_intensity
                    data:
                      value: 130
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - эффект 3
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/effect4_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Sinelon Dual
                      brightness_pct: 30
                  - service: select.select_option
                    data:
                      option: Yelblu
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_speed
                    data:
                      value: 99
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_intensity
                    data:
                      value: 153
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - эффект 3
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/effect5_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Palette
                      brightness_pct: 40
                  - service: select.select_option
                    data:
                      option: Icefire
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_speed
                    data:
                      value: 39
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_intensity
                    data:
                      value: 130
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - эффект 3
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/brightness_down_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data_template:
                      brightness_pct: > 
                        {% set brightness = states('sensor.dd_wled_light_brightness') | float  -10 %}
                        {% if brightness < 1 %}
                          1
                        {% else %}
                          {{ brightness }}
                        {% endif %}
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Текущая яркость - {{ states('sensor.dd_wled_light_brightness') }} %
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/brightness_up_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data_template:
                      brightness_pct: > 
                        {% set brightness = states('sensor.dd_wled_light_brightness') | float +10 %}
                        {% if brightness > 100 %}
                          100
                        {% else %}
                          {{ brightness }}
                        {% endif %}
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Текущая яркость - {{ states('sensor.dd_wled_light_brightness') }} %
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/speed_down_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_speed
                    data_template:
                      value: > 
                        {% set speed = states('number.dd_wled_light_speed') | float - 25 %}
                        {% if speed < 1 %}
                          1
                        {% else %}
                          {{ speed }}
                        {% endif %}
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Текущая скорость - {{ states('sensor.dd_wled_light_speed') }} %
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/speed_up_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_speed
                    data_template:
                      value: > 
                        {% set speed = states('number.dd_wled_light_speed') | float + 25 %}
                        {% if speed > 255 %}
                          255
                        {% else %}
                          {{ speed }}
                        {% endif %}
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Текущая скорость - {{ states('sensor.dd_wled_light_speed') }} %
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/intensity_down_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_intensity
                    data_template:
                      value: > 
                        {% set speed = states('number.dd_wled_light_intensity') | float - 25 %}
                        {% if speed < 1 %}
                          1
                        {% else %}
                          {{ speed }}
                        {% endif %}
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Текущая интенсивность - {{ states('sensor.dd_wled_light_intensity') }} %
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/intensity_up_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: number.set_value
                    target:
                      entity_id: number.dd_wled_light_intensity
                    data_template:
                      value: > 
                        {% set speed = states('number.dd_wled_light_intensity') | float + 25 %}
                        {% if speed > 255 %}
                          255
                        {% else %}
                          {{ speed }}
                        {% endif %}
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} Текущая интенсивность - {{ states('sensor.dd_wled_light_intensity') }} %
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled
                      inline_keyboard: *keyb_dd_wled
                      
    ## Управление эффектами WLED светильника
      - id: wled лента меню управления эффектами
        alias: dd_telegram_wled_effect
        initial_state: true
        trigger: 
          - platform: event
            event_type: telegram_callback
            event_data: {}
        action:
          - choose:
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/effect_dd_wled_light'' }}'
                sequence:
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: &msg_dd_wled_effect |
                        {{'\U0001F4F1'}} Гостиная WLED панель:
                        {{'\U0001FA84'}} Эффект - {{ states('sensor.dd_wled_light_effect') }}, {{'\U0001F308'}} Цвет - {{ states('sensor.dd_wled_light_color') }}
                        {{'\U0001F4A1'}} Яркость - {{ states('sensor.dd_wled_light_brightness') }} % , {{'\U000023E9'}} Скорость - {{ states('sensor.dd_wled_light_speed') }} %
                        {{'\U000023EB'}} Интенсивность - {{ states('sensor.dd_wled_light_intensity') }} % , {{'\U000026A1'}} Ток - {{ states('sensor.dd_wled_light_estimated_current') }} мА
                      inline_keyboard: &keyb_dd_wled_effect
                        - 'Solid:/solid_dd_wled_light , Android:/android_dd_wled_light , Aurora:/aurora_dd_wled_light , Blends:/blends_dd_wled_light'
                        - 'Bouncing Balls:/bouncing_balls_dd_wled_light , Bpm:/bpm_dd_wled_light , Breathe:/breathe_dd_wled_light , Candy Cane:/candy_cane_dd_wled_light' 
                        - 'Chase:/chase_dd_wled_light , Chase 2:/chase_2_dd_wled_light , Chase Random:/chase_random_dd_wled_light , Chunchun:/chunchun_dd_wled_light' 
                        - 'Colorful:/colorful_dd_wled_light , Colorloop:/colorloop_dd_wled_light , Colortwinkles:/colortwinkles_dd_wled_light , Colorwaves:/colorwaves_dd_wled_light' 
                        - 'Dancing Shadows:/dancing_shadows_dd_wled_light , Dissolve:/dissolve_dd_wled_light , Dynamic:/dynamic_dd_wled_light , Dynamic Smooth:/dynamic_smooth_dd_wled_light' 
                        - 'Fade:/fade_dd_wled_light , Fairy:/fairy_dd_wled_light , Fairytwinkle:/fairytwinkle_dd_wled_light , Fire 2012:/fire_2012_dd_wled_light' 
                        - 'Fireworks:/fireworks_dd_wled_light , Flow:/flow_dd_wled_light , Gradient:/gradient_dd_wled_light , Halloween:/halloween_dd_wled_light' 
                        - 'Lake:/lake_dd_wled_light , Loading:/loading_dd_wled_light , Noise Pal:/noise_pal_dd_wled_light , Palette:/palette_dd_wled_light' 
                        - 'Police:/police_dd_wled_light , Rainbow:/rainbow_dd_wled_light , Scanner Dual:/scanner_dual_dd_wled_light , Tri Wipe:/tri_wipe_dd_wled_light' 
                        - 'Twinklecat:/twinklecat_dd_wled_light , Two Dots:/two_dots_dd_wled_light , Wipe:/wipe_dd_wled_light , Wipe Random:/wipe_random_dd_wled_light' 
                        - '{{''\U000021A9''}} Вернуться:/dd_wled_light_control , {{''\U000021AA''}} Обновить:/effect_dd_wled_light' 

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/solid_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Solid
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Solid
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/android_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Android
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Android
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/aurora_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Aurora
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Aurora
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/blends_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Blends
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Blends
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/bouncing_balls_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Bouncing Balls
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Bouncing Balls
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/bpm_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Bpm
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Bpm
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/breathe_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Breathe
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Breathe
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/candy_cane_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Candy Cane
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Candy Cane
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/chase_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Chase
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Chase
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/chase_2_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Chase 2
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Chase 2
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/chase_random_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Chase Random
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Chase Random
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/chunchun_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Chunchun
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Chunchun
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/colorful_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Colorful
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Colorful
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/colorloop_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Colorloop
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Colorloop
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/colortwinkles_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Colortwinkles
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Colortwinkles
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/colorwaves_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Colorwaves
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Colorwaves
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/dancing_shadows_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Dancing Shadows
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Dancing Shadows
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/dissolve_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Dissolve
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Dissolve
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/dynamic_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Dynamic
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Dynamic
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/dynamic_smooth_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Dynamic Smooth
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Dynamic Smooth
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/fade_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Fade
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Fade
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/fairy_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Fairy
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Fairy
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect 
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/fairytwinkle_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Fairytwinkle
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Fairytwinkle
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect 
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/fire_2012_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Fire 2012
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Fire 2012
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect 

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/fireworks_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Fireworks
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Fireworks
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect 

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/flow_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Flow
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Flow
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect 

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/gradient_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Gradient
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Gradient
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect 

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/halloween_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Halloween
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Halloween
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect 
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/lake_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Lake
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Lake
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/loading_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Loading
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Loading
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/noise_pal_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Noise Pal
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Noise Pal
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect 
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/palette_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Palette
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect 
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/police_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Police
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Police
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/rainbow_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Rainbow
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Rainbow
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/scanner_dual_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Scanner Dual
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Scanner Dual
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/tri_wipe_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Tri Wipe
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Tri Wipe
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/twinklecat_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Twinklecat
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Twinklecat
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/two_dots_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Two Dots
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Two Dots
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/wipe_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Wipe
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Wipe
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/wipe_random_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Wipe Random
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен эффект Wipe Random
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_effect
                      inline_keyboard: *keyb_dd_wled_effect
                      
    ## Управление цветом WLED светильника
      - id: wled лента меню управления цветом
        alias: dd_telegram_wled_color
        initial_state: true
        trigger: 
          - platform: event
            event_type: telegram_callback
            event_data: {}
        action:
          - choose:
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/color_dd_wled_light'' }}'
                sequence:
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: &msg_dd_wled_color |
                        {{'\U0001F4F1'}} Гостиная WLED панель:
                        {{'\U0001FA84'}} Эффект - {{ states('sensor.dd_wled_light_effect') }}, {{'\U0001F308'}} Цвет - {{ states('sensor.dd_wled_light_color') }}
                        {{'\U0001F4A1'}} Яркость - {{ states('sensor.dd_wled_light_brightness') }} % , {{'\U000023E9'}} Скорость - {{ states('sensor.dd_wled_light_speed') }} %
                        {{'\U000023EB'}} Интенсивность - {{ states('sensor.dd_wled_light_intensity') }} % , {{'\U000026A1'}} Ток - {{ states('sensor.dd_wled_light_estimated_current') }} мА
                      inline_keyboard: &keyb_dd_wled_color
                        - 'Красный:/red_dd_wled_light , Желтый:/yellow_dd_wled_light , Зеленый:/green_dd_wled_light , Синий:/blue_dd_wled_light'
                        - 'Default:/default_dd_wled_light , Analogous:/analogous_dd_wled_light , April Night:/april_night_dd_wled_light , Aqua Flash:/aqua_flash_dd_wled_light'
                        - 'Atlantica:/atlantica_dd_wled_light , Aurora 2:/aurora_2_dd_wled_light , Autumn:/autumn_dd_wled_light , Beach:/beach_dd_wled_light'
                        - 'Blink Red:/blink_red_dd_wled_light , C9 New:/c9_new_dd_wled_light , Candy:/candy_dd_wled_light , Drywet:/drywet_dd_wled_light'
                        - 'Fire:/fire_dd_wled_light , Forest:/forest_dd_wled_light , Hult:/hult_dd_wled_light , Icefire:/icefire_dd_wled_light'
                        - 'Lava:/lava_dd_wled_light , Magenta:/magenta_dd_wled_light , Magred:/magred_dd_wled_light , Orangery:/orangery_dd_wled_light'
                        - 'Party:/party_dd_wled_light , Pastel:/pastel_dd_wled_light , Pink Candy:/pink_candy_dd_wled_light , Rainbow:/rainbowcolor_dd_wled_light'
                        - 'Red Flash:/red_flash_dd_wled_light , Red Reaf:/red_reaf_dd_wled_light , Semi Blue:/semi_blue_dd_wled_light , Sherbet:/sherbet_dd_wled_light'
                        - 'Sunset:/sunset_dd_wled_light , Tertiary:/tertiary_dd_wled_light , Tiamat:/tiamat_dd_wled_light , Toxy Reaf:/toxy_reaf_dd_wled_light'
                        - 'Vintage:/vintage_dd_wled_light , Yelblu:/yelblu_dd_wled_light , Yelblu Hot:/yelblu_hot_dd_wled_light , Yelmag:/yelmag_dd_wled_light'
                        - '{{''\U000021A9''}} Вернуться:/dd_wled_light_control , {{''\U000021AA''}} Обновить:/color_dd_wled_light' 

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/red_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Solid
                      rgb_color: [255, 0, 0]
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Красный
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/yellow_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Solid
                      rgb_color: [255, 255, 0]
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Желтый
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/green_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Solid
                      rgb_color: [0, 255, 0]
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Зеленый
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/blue_dd_wled_light'' }}'
                sequence:
                  - service: light.turn_on
                    entity_id: light.dd_wled_light
                    data:
                      effect: Solid
                      rgb_color: [0, 0, 255]
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Синий
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/default_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Default
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Default
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/analogous_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Analogous
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Analogous
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/april_night_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: April Night
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет April Night
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/aqua_flash_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Aqua Flash
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Aqua Flash
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/atlantica_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Atlantica
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Atlantica
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color 
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/aurora_2_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Aurora 2
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Aurora 2
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/autumn_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Autumn
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Autumn
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/beach_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Beach
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Beach
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/blink_red_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Blink Red
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Blink Red
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color 
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/c9_new_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: C9 New
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет C9 New
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/candy_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Candy
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Candy
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/drywet_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Drywet
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Drywet
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/fire_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Fire
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Fire
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/forest_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Forest
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Forest
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/hult_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Hult
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Hult
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/icefire_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Icefire
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Icefire
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/lava_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Lava
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Lava
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/magenta_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Magenta
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Magenta
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/magred_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Magred
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Magred
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/orangery_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Orangery
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Orangery
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/party_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Party
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Party
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/pastel_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Pastel
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Pastel
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/pink_candy_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Pink Candy
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Pink Candy
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/rainbowcolor_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Rainbow
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Rainbow
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/red_flash_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Red Flash
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Red Flash
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/red_reaf_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Red Reaf
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Red Reaf
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/semi_blue_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Semi Blue
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Semi Blue
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/sherbet_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Sherbet
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Sherbet
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/sunset_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Sunset
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Sunset
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color

              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/tertiary_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Tertiary
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Tertiary
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color 
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/tiamat_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Tiamat
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Tiamat
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color 
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/toxy_reaf_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Toxy Reaf
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Toxy Reaf
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/vintage_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Vintage
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Vintage
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/yelblu_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Yelblu
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Yelblu
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/yelblu_hot_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Yelblu Hot
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Yelblu Hot
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color
                      
              - conditions:
                  - condition: template
                    value_template: '{{ trigger.event.data.command == ''/yelmag_dd_wled_light'' }}'
                  - condition: state
                    entity_id: light.dd_wled_light
                    state: 'on'
                sequence:
                  - service: select.select_option
                    data:
                      option: Yelmag
                    target:
                      entity_id: select.dd_wled_light_color_palette
                  - delay: 00:00:01
                  - service: telegram_bot.answer_callback_query
                    data:
                      callback_query_id: "{{ trigger.event.data.id }}"
                      message: | 
                          {{"\U0001F4AC"}} WLED в Детской Д - установлен цвет Yelmag
                  - service: telegram_bot.delete_message
                    data_template:
                      message_id: '{{ trigger.event.data.message.message_id }}'
                      chat_id: '{{ trigger.event.data.chat_id }}'
                  - service: telegram_bot.send_message
                    data:
                      target: '{{ trigger.event.data.chat_id }}'
                      message: *msg_dd_wled_color
                      inline_keyboard: *keyb_dd_wled_color


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