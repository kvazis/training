# Пример карточки с отображением сенсора utility meter. 

* [Блог. Home Assistant 2022 - Utility meter, как создать сенсор потребления электроэнергии в месяц ?](https://youtu.be/rUFduUE0ZMc)


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