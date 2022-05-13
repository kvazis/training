* [Блог. Home Assistant - Text to speech, озвучка уведомлений, Reverso TTS](https://youtu.be/Ib7lZYB35E8)

# Примеры кода из обзора 

Объявление в configuration.yaml

```yaml
tts:
  - platform: reversotts
    language: 'Alyona-Russian'
    pitch: "100"
    bitrate: "128k"
```

Медиа контент в configuration.yaml

```yaml
media_source:
```

* Пример автоматизации

```yaml
    automation:

      - id: Голосовое уведомление
        alias: voice_message
        initial_state: true
        trigger:

        - platform: state
          entity_id: input_button.test_voice
        action:

        - service: media_player.volume_set
          data:
            volume_level: 0.6
          target:
            entity_id: media_player.mi_smart_clock
     
        - service: tts.reversotts_say
          entity_id: media_player.mi_smart_clock
          data:
            message: "Здравствуйте друзья, тест голосового сообщения"

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