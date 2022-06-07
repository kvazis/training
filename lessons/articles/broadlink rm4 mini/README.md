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