### Структура Home Asisstant

:arrow_right: [Вернуться к оглавлению](https://github.com/kvazis/training/tree/master/lessons/articles/articles)

Главный и основной момент - Home Assistant имеет модульную структуру.    
Есть `core` - ядро, это сама система управления, содержащая в себе всю логическую часть - автоматизации, шаблоны, интерфейс и т.п. Это совершенно обязательная часть, которая существует при любом способе установки.    
Для его запуска нужна специальная программная среда - а вот тут уже есть варианты - `Home Assistant OS`, `Home Assistant Container`, `Supervised` и для особых ценителей - ручная установка в виртуальной среде Python.    
Сам по себе чистый HA - управлять умным домом не может, так как умный дом состоит из множества различных устройств с которыми нужно взаимодействовать.    
Запихивать поддержку всего подряд прямо в ядро - было бы неразумным, поэтому используется модульная структура позволяющая создать именно то, что нужно вам.    
Какие модули для НА бывают?    
**Аддоны (Дополнения)** - это сторонние самостоятельные системы которые могут взаимодействовать с ядром Home Assistant.    
Кстати одна из задач `Supervisor` - как раз управление дополнениями (магазин дополнений). В качестве примера - `Mosquitto broker` (это сервер MQTT), сторонние БД - например `MariaDB`, системы для взаимодействия с устройствами - `Zigbee2mqtt`, `ESPHome`, `File editor` и другие.    
Еще раз обращу внимание на то, что дополнения - это **самостоятельные системы**, они могут взаимодействовать с HA, а могут и не взаимодействовать, они не зависят от его состояния - например `Zigbee2mqtt` в связке с `Mosquitto broker` - прекрасно работают в тот момент когда НА скажем перегружается и т.п.    
Еще один полезный бонус `Supervisor` в том, что он не только облегчает процесс установки и обновления аддонов, а и включает их в резервные копии. При восстановлении рабочей системы на голую инсталляцию HA - вы получите не только свои настройки, автоматизации и шаблоны, но и все аддоны с их данными и конфигурацией.    
**Интеграции** - тут долго думал какой термин подобрать, - это логические интерфейсы самого Home Assistant, расширение его собственных возможностей, можно сказать его глаза, уши и рот.    
Например для того чтобы управлять wi-fi устройствами Xiaomi - мы ставим отдельную интеграцию `xiaomi miio` - и получаем интерфейс управления между ними и Home Assiastant. Для светильников Yeelight - своя, одноименная, интеграция-интерфейс, `Xiaomi Gateway 3`, `ZHA - Zigbee Home Automation` (это в отличии от `Zigbee2mqtt` интеграция, а не аддон), и так далее.    
Для того чтобы работать с `Mosquitto broker` (который может быть установлен тут же в виде аддона, а может и совсем на другом сервере) - интеграция `MQTT`. Для получения погоды - одна интеграция, для отправки голосовых сообщения на колонку - другая, для обработки команд из телеграмм - третья.    
Даже в базовом репозитории Home Assistant - огромное количество различный интеграций, а в альтернативном хранилище HACS - их еще больше. Эти сущности, в отличии от аддонов - неразрывно связаны с ядром системы и не могут работать без нее.    

Я часто слышу вопрос - умеет ли Home Assistant работать с таким-то устройством?    
:heavy_exclamation_mark: Так вот - Home Assistant **не умеет работать с устройствами**.    
Он работает с интеграциями. И правильный вопрос - **есть ли интеграция, поддерживающая то или иное устройство ?**.    
А далее - уже ее задача, передать в Home Assistant стандартную сущность - например `switch`, `light`, `climate`, `sensor` и т.п. и данные в понятном для НА формате, и обратно - стандартную команду НА передать в понятном для устройстве формате.    
Таким образом, устанавливая необходимые дополнения и оснащая Home Assistant интеграциями - вы превращаете ее в систему управления умным домом, способную взаимодействовать с устройствами различных производителей, с самыми разнообразными интерфейсами и форматами сообщений, получать данные из самых разных источников.

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