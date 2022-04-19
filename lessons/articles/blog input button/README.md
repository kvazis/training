* [Блог. Home Assistant 2022 - Input Button, создаем виртуальную кнопку для запуска автоматизаций](https://youtu.be/b4VB-Sm9rvs)

# Примеры кода для использования input button

* Использование в качестве триггера автоматизации

```yaml

        trigger:
    ## Виртуальная кнопка
        - platform: state
          entity_id: input_button.name_of_button

```

* Применение в интерфейсе, entity-button

```yaml

    - type: entity-button
      entity: input_button.name_of_button
      name: Полный свет
      tap_action:
        action: call-service
        service: input_button.press
        service_data:
          entity_id: input_button.name_of_button

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