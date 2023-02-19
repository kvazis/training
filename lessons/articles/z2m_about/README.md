### Что такое Zigbee2MQTT ?    

:arrow_right: [Вернуться к оглавлению](https://github.com/kvazis/training/tree/master/lessons/articles/articles)

Zigbee2MQTT - это программное обеспечение с открытым исходным кодом, которое позволяет управлять устройствами Zigbee с помощью MQTT (Message Queuing Telemetry Transport) протокола.    
Zigbee2MQTT был создан в 2018 году нидерландским разработчиком программного обеспечения Koen Kanters. В то время он столкнулся с проблемой совместимости устройств Zigbee от разных производителей, которые, несмотря на общий протокол связи, использовали различные подходы для управления своими устройствами.    
Он решил создать свое программное решение, которое позволит управлять различными устройствами Zigbee, и связать его с системами управления умным домом с помощью MQTT протокола . Так появился Zigbee2MQTT.    
С тех пор проект вырос в популярность и стал одним из наиболее популярных решений для управления устройствами Zigbee. Программное обеспечение продолжает развиваться и улучшаться благодаря вкладу сообщества разработчиков и пользователей, чему благоприятствует гибкость и возможность создания так называемых конвертеров - это описания содержащие данные о том, как работать с тем или иным устройством.

Использование Zigbee2MQTT позволяет снизить зависимость от производителя и управлять устройствами Zigbee с помощью общих интерфейсов, что упрощает интеграцию устройств в умный дом и повышает его гибкость.     

Для работы с Zigbee2MQTT необходимо иметь аппаратную платформу, обычно это МиниПК или одноплатик типа Raspberry Pi, на котором будет установлен Zigbee2MQTT.    
Координатор Zigbee, который используется для связи с устройствами. Чаще всего применяют USB-адаптер, на сегодняшний день актуальный чип CC2652P - например Sonoff P. Существуют и координаторы работающие по сети, такие как Zigstar LAN, POE, SMlight и др.    
Кроме Zigbee2MQTT, необходимо установить MQTT-брокер, такой как Mosquitto, который используется для передачи сообщений между Zigbee2MQTT, устройствами и системой управления умным домом.

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