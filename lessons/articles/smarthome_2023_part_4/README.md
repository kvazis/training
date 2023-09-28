### eWeLink, BroadLink, Orvibo    

:arrow_right: [Вернуться к оглавлению](https://github.com/kvazis/training/tree/master/lessons/articles/articles)    

*eWeLink* - это система управления умными устройствами для дома, разработанная китайской компанией ITEAD. История создания eWeLink началась с создания компанией ITEAD своего первого устройства для умного дома - Sonoff, который был запущен в продажу в 2015 году. Sonoff был прост в использовании, доступен по цене и имел совместимость с Wi-Fi. Однако управление устройством осуществлялось через веб-интерфейс, что не было удобным для многих пользователей. Чтобы решить эту проблему, была создана система управления eWeLink.    
Относительно систем про которые мы уже поговорили - парк устройств Ewelink - значительно скромнее, по большей части это wi-fi устройства, хотя есть и zigbee. Благодаря низкой стоимости и использованию в качестве модулей управления популярных чипов ESP8266 и ESP32 - многие устройства экосистемы пользуются популярностью, однако с учетом того, что зачастую на них устанавливается модифицированная прошивка, типа Tasmota или ESPhome - говорить о принадлежности к экосистеме Ewelink уже особо не приходится. Многие zigbee устройства Ewelink - отлично работают с шлюзами Tuya Smart.    
К достоинствам - относится бюджетность устройств, неплохое качество изготовления. Есть режим локальной работы по сети, который повышает скорость и надежность работы.    
К недостаткам - маленький, относительно других экосистем парк устройств. Создать полноценную систему управления умным домом - будет сложно.    

*BroadLink* - еще одна система управления умным домом, названная по имени производителя умных устройств.     
Компания BroadLink была основана в 2013 году в Китае. Ее целью было создание технологий для управления умным домом, которые были бы доступны для широкой аудитории. Первыми устройствами, стали контроллеры для управления инфракрасным сигналом (IR), таких как пульты ДУ для телевизоров и кондиционеров.    
На сегодняшний день, в ассортимент входят различные модели розеток, реле, умных удлинителей, светильников, систем сигнализации и т.п. Но в целом, сравнивая с экосистемами Tuya, Mihome или Aqara Home - выбор устройств намного более скромен.     
Имеется собственное приложение, работающее через облако и позволяющее управлять устройствами из любой точки мира. Есть возможность локального управления по сети, что обеспечивает легкую интеграцию с альтернативными системами управления, такими как Home Assistant, Domoticz и т.п.    
Устройства BroadLink характеризуются хорошим качеством изготовления и стабильностью работы, однако их выбор весьма ограничен.    

*Orvibo* - это китайская компания, занимающаяся производством устройств для умного дома. Она была основана в 2011 году в городе Шэньчжэнь. Компания также предлагает свою собственную систему управления умным домом, которая позволяет контролировать все устройства с помощью мобильного приложения.    
Среди устройств Orvibo можно найти различные смарт-розетки, умные лампы, умные дверные замки и системы безопасности, используются в основном wi-fi и zigbee сети. Но как и в случае с Ewelink и Broadlink - выбор устройств проигрывает сравнительно с тем же Tuya Smart.     
Также пользователи системы отмечают, что устройства могут быть нестабильными и иногда отключаться от сети. Кроме того, система имеет ограниченный набор функций, что может не подойти для более продвинутых пользователей, которые ищут более гибкие и настраиваемые решения.    

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