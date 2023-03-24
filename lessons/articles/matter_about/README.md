### Что такое Matter ?    

:arrow_right: [Вернуться к оглавлению](https://github.com/kvazis/training/tree/master/lessons/articles/articles)

Matter (ранее известный как CHIPS) - это протокол с открытым исходным кодом, который разрабатывается для облегчения коммуникации между устройствами Интернета вещей (IoT). Протокол Matter был создан совместными усилиями ведущих компаний по производству устройств IoT, включая Apple, Google, Amazon, Samsung и другие. В разработке стандарта участвует и организация Connectivity Standards Alliance (ранее известная как Zigbee Alliance)  - это некоммерческая организация, созданная в 2002 году, которая занимается разработкой и стандартизацией беспроводных протоколов для сетей IoT. Она была одним из основных создателей протоколов Thread и Zigbee, которые являются основой протокола Matter.    
Основная цель протокола Matter - это создание стандарта, который позволит различным устройствам взаимодействовать друг с другом без необходимости в дополнительных устройствах или приложениях. Таким образом, пользователи смогут легко управлять своими устройствами IoT и получать данные с них через общий интерфейс.    
####Преимущества протокола Matter:    
**Совместимость:** Matter обеспечивает совместимость между устройствами разных производителей, что позволяет им легко взаимодействовать друг с другом без дополнительных настроек.    
**Безопасность:** Matter использует шифрование и аутентификацию для обеспечения безопасности связи между устройствами.    
**Простота:** Matter создан для того, чтобы быть простым в использовании для обычных пользователей, что позволит им без проблем управлять своими устройствами IoT.    
####Недостатки протокола Matter:    
**Новизна:** Matter является относительно новым протоколом, и его использование может быть ограничено на ранних стадиях развития.    
**Ограниченная функциональность:** В настоящее время Matter поддерживает только основные функции, что может ограничивать его использование в более сложных сценариях. На практике это скорее всего будет выглядеть так, например реле будет везде работать на вкл-выкл, но дополнительные опции - память состояния, энергомониторинг, типы внешних выключателей и т.п. - только в родной экосистеме    

Протокол Matter использует несколько транспортных протоколов для передачи данных между устройствами IoT. В частности, Matter может использовать следующие протоколы:    
**Bluetooth Low Energy (BLE)** - это беспроводной протокол, который используется для передачи данных на короткие расстояния. Он широко используется в устройствах IoT, таких как датчики, умные часы и фитнес-трекеры.    
**Thread** - это беспроводной протокол, основанный на стандарте IEEE 802.15.4, который используется для передачи данных в маломасштабных сетях IoT, таких как домашние автоматизационные системы.    
**Wi-Fi** - это беспроводной протокол, который широко используется для передачи данных в локальных сетях. Он может использоваться для управления устройствами IoT и получения данных с них.    
**Ethernet** - это проводной протокол, который используется для передачи данных в локальных сетях. Он может быть использован для управления устройствами IoT и получения данных с них, особенно в случаях, когда требуется более высокая скорость передачи данных.    

А что ждет Zigbee устройства ? Тут мне видится два варианта событий, чипы которые физически поддерживают кроме Zigbee - Thread и или BLE - будут на уровне обновления прошивки переведены на них. В остальных случаях будут использваться Zigbee шлюзы c Ethernet или Wi-fi и поддержкой Matter.
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