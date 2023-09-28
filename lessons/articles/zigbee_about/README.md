### Что такое Zigbee ?    

:arrow_right: [Вернуться к оглавлению](https://github.com/kvazis/training/tree/master/lessons/articles/articles)

Zigbee - это беспроводной протокол, используемый для построения сетей управления устройствами, такими как датчики, светильники, термостаты и другие устройства.    
Структура Zigbee сети включает в себя несколько компонентов:    
**Устройства (End Devices)**: это конечные устройства, которые подключены к сети Zigbee и могут передавать и принимать данные. Они могут быть различных типов, таких как датчики, светильники и термостаты.    
**Маршрутизаторы (Routers)**: это устройства, которые также подключены к сети Zigbee и способны перенаправлять данные между другими устройствами в сети. Они обеспечивают улучшение производительности сети, расширение зоны покрытия и повышение надежности.    
**Координатор (Coordinator)**: В сети Zigbee может быть только один Координатор, который играет роль контролирующей станции и управляет всей сетью. Координатор отвечает за инициализацию сети, управление устройствами, передачу команд и обработку данных.
Структура сети - ячеистая, она способна к самоорганизации - то есть ее узлы могут сами менять маршруты соединений, переходя с координатора на роутер и наоборот, или переходя с роутера на роутер.    

Максимальное число устройств, которые могут быть подключены к сети Zigbee, зависит от конкретной реализации протокола и от физических параметров сети, таких как скорость передачи данных, расстояние между устройствами и наличие помех в радиочастотном диапазоне.    
Однако, согласно спецификации Zigbee 3.0, максимальное число устройств в одной сети может достигать до **65 535** устройств, что позволяет создавать крупномасштабные сети управления устройствами. Однако, следует учитывать, что при большом количестве устройств в сети может снижаться производительность и надежность сети, поэтому для каждой конкретной задачи необходимо выбирать оптимальное количество устройств и топологию сети.    
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