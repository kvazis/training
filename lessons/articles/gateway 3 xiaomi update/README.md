### [Xiaomi ZNCZ02LM - устраняем проблемы с работой zigbee сети, прошивка обновления v 90](https://youtu.be/4YD3qf5lw-A)

#### Текстовая версия инструкции по обновлению розетки Xiaomi ZNCZ02LM

:ballot_box_with_check: Запуск через интеграцию Xiaomi Gateway 3    
:ballot_box_with_check: Панель разработчика — `Службы — режим YAML`    
:ballot_box_with_check: Указываем имя сущности шлюза и цифровой ID розетки    

```yaml
service: remote.send_command
target: 
  entity_id: remote.0x680ae2fffe83f67a_pair
data:
  command: ota
  device: 158d000153dd8e
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