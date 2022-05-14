### [BroadLink RM4 mini - ИК контроллер для умного дома, замена пультов дистанционного управления](https://youtu.be/WVA4iMhwEek)

#### Скрипты показанные в обзоре - обучение и отправка команд для ИК контроллера

```yaml

  broadlink_learn_rm4:
    alias: Обучение Broadlink RM4 mini
    sequence:
      - service: remote.learn_command
        target:
          entity_id: remote.broadlink_rm4_mini_remote
        data:
          device: tv
          command: on_off
          
          
  broadlink_learn_tv_remote:
    alias: Телевизионный пульт
    sequence:
      - service: remote.learn_command
        target:
          entity_id: remote.broadlink_rm4_mini_remote
        data:
          device: tv
          command: 
             - on_off
             - volume+
             - volume-
             
  tv_broadlink_power:
    alias: Питание телевизора
    sequence:
      - service: remote.send_command
        target:
          entity_id: remote.broadlink_rm4_mini_remote
        data:
          device: tv
          command: on_off
          
  tv_broadlink_volume_up:
    alias: Звук телевизора + 5
    sequence:
      - service: remote.send_command
        target:
          entity_id: remote.broadlink_rm4_mini_remote
        data:
          device: tv
          command: volume+
          num_repeats: 5
          
  tv_broadlink_power_volume:
    alias: Включить и добавить звук
    sequence:
      - service: remote.send_command
        target:
          entity_id: remote.broadlink_rm4_mini_remote
        data:
          device: tv          
          command: 
             - on_off
             - volume+ 
             - volume+
             - volume+          

  broadlink_send_rm4:
    alias: Отправка команд
    sequence:        
      - service: remote.send_command
        data:
          entity_id: remote.broadlink_rm4_mini_remote
          command:
            - b64:JgBoACQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAAFhJBEWERYtFS0WERYtFhEVLRYRFi0WLRYAAWEjEhURFi0WLRYQFi0WERYtFREWLRYtFgABYSQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAA0F==
            - b64:JgBoACQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAAFhJBEWERYtFS0WERYtFhEVLRYRFi0WLRYAAWEjEhURFi0WLRYQFi0WERYtFREWLRYtFgABYSQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAA0F==
            - b64:JgBoACQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAAFhJBEWERYtFS0WERYtFhEVLRYRFi0WLRYAAWEjEhURFi0WLRYQFi0WERYtFREWLRYtFgABYSQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAA0F==          

  air_conditioner:
    alias: Кондиционер
    sequence:
      - service: remote.learn_command
        target:
          entity_id: remote.broadlink_rm4_mini_remote
        data:
          device: conditioner
          command: 
             - on_heat_25
             - off
             
  delete_command:
    sequence:
      - service: remote.delete_command
        target:
          entity_id: remote.broadlink_rm4_mini_remote
        data:
          device: tv
          command: volume+

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