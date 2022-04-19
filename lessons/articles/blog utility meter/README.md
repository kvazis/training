* [Блог. Home Assistant 2022 - Utility meter, как создать сенсор потребления электроэнергии в месяц ?](https://youtu.be/rUFduUE0ZMc)

# Пример карточки с отображением сенсора utility meter. 

```yaml
    - entity: switch.0x60a423fffe6850e1
      type: custom:multiple-entity-row
      toggle: true
      state_color: true
      name: Гостиная, телевизор
      secondary_info: last-changed
      state_header: Питание
      entities:
      - entity: sensor.0x60a423fffe6850e1_meter
        name: Потреблено за месяц
        unit: 'кВт·ч'
      - attribute: power
        name: Мощность
        unit: 'Ватт'
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