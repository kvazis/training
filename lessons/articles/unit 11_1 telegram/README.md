### [Home Assistant. Урок 11.1 Уведомления Telegram - создание бота, отправка сообщений, прием команд](https://youtu.be/tV8RjvevVHs)

#### Текстовый материалы урока (обновлено в 2022, добавил про группы в телеграм) -    

:ballot_box_with_check: Создание своего чат бота:    
`@BotFather` - бот создающий боты    
Создание нового бота - `/newbot`    

Имя бота - любое, например Умный дом    
Название бота - латиница, в конце `bot`    
Получаем токен для бота    

:ballot_box_with_check: Обновление 20222, настройка для работы в группах:    
Список ботов - `/mybots`    
Выбираем своего бота, `Bot Setting`, `Allow Groups ?`, `Turn groups on`    

:ballot_box_with_check: Получение идентификатора    

`@myidbot` - вариант (не единственный) бота для получения ID    
Для получения ID пользователя - команда `/getid`    
Для получения ID группы - команда `/getgroupid`    


:ballot_box_with_check: Home Assistant    
Каждому пользователю нужно прописать свой ID (аналогично можно получить ID для группы, он должен начинаться с `-`)    
Платформа телеграмм бота -    
```yaml
telegram_bot:
  - platform: polling
    api_key: API ключ полученный в @botfather
    allowed_chat_ids:
      - ID пользователя 1
      - ID пользователя 2   
```

Платформа телеграмм уведомлений -    
```yaml      
notify:

  - name: Свое название для каждого пользователя
    platform: telegram
    chat_id: ID пользователя 1
    
  - name: Свое название для каждого пользователя
    platform: telegram
    chat_id: ID пользователя 2
```    
    
[Коды для телеграмм смайлов](https://apps.timwhitlock.info/emoji/tables/unicode)

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