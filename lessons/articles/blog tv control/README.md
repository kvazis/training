* [Блог. Home Assistant - управление устройствами через ИК контроллер Broadlink, обратная связь](https://youtu.be/R2jMUh-5PCE)

# Пакадж для управления телевизором через ИК контроллер Broadlink с обратной связью по энергомониторингу


```yaml
lr_tv_control:

    recorder:
      include:
        entities:
           - sensor.0xa4c1384452a34172_power
           
    homeassistant:
      customize:

        switch.0xa4c1384452a34172:
          friendly_name: Гостиная, телевизор
          device_class: plug  
          icon: mdi:power-socket-eu
        sensor.0xa4c1384452a34172_power:
          friendly_name: Гостиная, телевизор
          icon: mdi:flash
          unit_of_measurement: 'Вт'
        sensor.0xa4c1384452a34172_energy:
          friendly_name: Гостиная, телевизор
          icon_template: mdi:gauge
          unit_of_measurement: 'КВт*ч'
          
    template:
     
      - binary_sensor:

          - name: lr_tv_work
            state: >
              {{ states('sensor.0xa4c1384452a34172_power')|float > 50 
              }}
            icon: >
              {% if is_state("binary_sensor.lr_tv_work", "on") %}
              mdi:television
              {% else %}
              mdi:television-off
              {% endif %}
              
    automation:
    
      - id: Гостиная, управление ТВ
        alias: lr_tv_control
        initial_state: true
        trigger:
    ## 5 кнопка Aqara Opple
        - platform: state
          entity_id: sensor.0x04cf8cdf3c79360a_action
          to: 'button_5_single' 
    ## Виртуальная кнопка
        - platform: state
          entity_id: input_button.lr_tv_control
        condition:
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.lr_tv_work
                    state: 'off'
                sequence:
                  - service: remote.send_command
                    data:
                      entity_id: remote.lr_ir_base_remote
                      command:
                        - b64:JgBoACQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAAFhJBEWERYtFS0WERYtFhEVLRYRFi0WLRYAAWEjEhURFi0WLRYQFi0WERYtFREWLRYtFgABYSQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAA0F==
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.lr_tv_work
                    state: 'on'
                sequence:
                  - service: remote.send_command
                    data:
                      entity_id: remote.lr_ir_base_remote
                      command:
                        - b64:JgCCACQRFiQWEBYbFSQWERURFhoWLRYkFhoWAAGcJBEWJBYQFhsVJBYRFhAWGxUtFiQWGhYAAZwkERYkFhEVGxYjFhEWEBYbFS0WJBYaFgABnCUQFiQWERUbFiMWERYQFhsWLBYkFhoWAAGdJBEVJBYRFhoWIxYRFhEVGxYtFiMWGhYADQUAAAAAAAA==
                        - b64:JgCCACQRFiQWEBYbFSQWERURFhoWLRYkFhoWAAGcJBEWJBYQFhsVJBYRFhAWGxUtFiQWGhYAAZwkERYkFhEVGxYjFhEWEBYbFS0WJBYaFgABnCUQFiQWERUbFiMWERYQFhsWLBYkFhoWAAGdJBEVJBYRFhoWIxYRFhEVGxYtFiMWGhYADQUAAAAAAAA==
                        - b64:JgCCACQRFiQWEBYbFSQWERURFhoWLRYkFhoWAAGcJBEWJBYQFhsVJBYRFhAWGxUtFiQWGhYAAZwkERYkFhEVGxYjFhEWEBYbFS0WJBYaFgABnCUQFiQWERUbFiMWERYQFhsWLBYkFhoWAAGdJBEVJBYRFhoWIxYRFhEVGxYtFiMWGhYADQUAAAAAAAA==
                        - b64:JgCCACQRFiQWEBYbFSQWERURFhoWLRYkFhoWAAGcJBEWJBYQFhsVJBYRFhAWGxUtFiQWGhYAAZwkERYkFhEVGxYjFhEWEBYbFS0WJBYaFgABnCUQFiQWERUbFiMWERYQFhsWLBYkFhoWAAGdJBEVJBYRFhoWIxYRFhEVGxYtFiMWGhYADQUAAAAAAAA==
                        - b64:JgBoACQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAAFhJBEWERYtFS0WERYtFhEVLRYRFi0WLRYAAWEjEhURFi0WLRYQFi0WERYtFREWLRYtFgABYSQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAA0F==

```

# Как поддержать развитие проекта?
* [Стать спонсором моего Youtube](http://kvazis.link/sponsorship)
* [Подписаться на Patreon](http://kvazis.link/patreon)
* [Перевод через Paypal](http://kvazis.link/paypal)
* Webmoney - Z243592584952
* BTC - 1Gzr7WQugfnPuWVawu47EiCMTDUBqCAshj
* ETH - 0xa0ce3E29Cf537013649Ae9cdbc08C4853fF91FAc
* LTC - ltc1qs493yk2wk9ywx5h6aruk4p9zm75hx42ekv4ym2
* TRX - TFTCLqvS1tMBwokRHBwz1TCDJ4oD1Z5zPk