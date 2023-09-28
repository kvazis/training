### Что такое Thread ?    

:arrow_right: [Вернуться к оглавлению](https://github.com/kvazis/training/tree/master/lessons/articles/articles)    

**Thread** – это открытый протокол локальной беспроводной сети с ячеистой топологией, созданный специально для коммуникации IoT-устройств.    
Протокол Thread был разработан с целью улучшить способ подключения и контроля за IoT-устройствами в домашних условиях и предназначен для безопасного и надежного подключения данных устройств в пределах умного дома. Thread был создан на основе технологии IEEE 802.15.4 и анонсирован организацией Thread Group в ноябре 2014 года. В июле 2015 года вышла версия 2.0. В Thread Group входят более 200 ведущих мировых компаний, среди которых: TDK, Nest, Siemens, Samsung, Salto, Silicon Labs, Bosch, P&G, Qualcomm, NXP, Philips, Microsoft, Huawei, Dell и другие.     

Топология сети с использованием данного протокола представляет собой ячеистую сеть с обеспечением соединения «устройство-устройство» и «устройство-облако». Протокол Thread использует технологию 6LoWPAN, которая предоставляет каждому узлу в сети IP-адрес, следовательно, поддерживает адресацию IPv6. Одними из главных отличительных особенностей данного протокола является надежная система защиты информации (шифрование AES) и низкое энергопотребление.    
**Технические характеристики:**    
Дальность связи между устройствами: до 30 м;    
максимальное количество устройств: 250-300 шт.;    
скорость: 250 кбит/с;    
частота: 2,4 ГГц.    
**Типы устройств:**    
**Border Routers (пограничные роутеры)** – обеспечивают соединение с пограничными сетями, использующими иные технологии (например, Wi-Fi или Ethernet);    
**Routers** – маршрутизаторы, всегда находятся в активном состоянии.    
**REEDs (Router-eligible End Devices)** – конечные устройства, которые могут взять на себя роль маршрутизаторов при необходимости.    
**Sleepy End devices** - конечные устройства, общающиеся только через маршрутизатор, т.к. не могут самостоятельно пересылать сообщения для других узлов.    

**Thread vs Zigbee**    
Thread и Zigbee — это протоколы беспроводной сети с низким энергопотреблением, предназначенные для домашней автоматизации и автоматизации зданий. Оба протокола используют стандарт IEEE 802.15.4    
Ключевое различие между Thread и Zigbee заключается в том, что Thread использует собственную адресацию IPv6, что обеспечивает естественное соединение между сетями Thread и существующими сетями на основе IPv6, такими как Wi-Fi.     
А Zigbee, был построен с нуля, и каждый узел в сети получает 16-битный адрес, который необходимо преобразовать в IP с помощью шлюза прикладного уровня.    
Уникальным аспектом Thread является то, что он не включает прикладной уровень — фактически протокол Thread существует исключительно на сетевом уровне. Существуют также некоторые различия в процессе аутентификации между двумя протоколами.    
Еще одно отличие - новизна. Thread был впервые выпущен в 2015 году, но Zigbee существует с 2005 года. Поэтому Zigbee имеет гораздо большее проникновение на рынок и более крупный отраслевой форум.     

**Thread** – Является одним из основных транспортных протоколов Matter    

Многие распространенные контроллеры, используемые для работы в Zigbee, например СС2652Р, EFR32MG21 - являются мультипроткольными и поддерживают Thread, переход осуществляется при помощи соответствующей прошивки.    

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