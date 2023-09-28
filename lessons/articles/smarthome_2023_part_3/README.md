### Mihome, Aqara Home    

:arrow_right: [Вернуться к оглавлению](https://github.com/kvazis/training/tree/master/lessons/articles/articles)    

*MiHome* - это система умного дома, разработанная китайской компанией Xiaomi в 2014 году. Изначально ориентированная на работу с устройствами собственного изготовления (для этого был создан отдельный бренд Mijia). Эта экосистема в основном ориентируется на внутренний, китайский рынок, поэтому многие устройства имеют специфические тройные вилки питания, инструкции только на китайском, отсутствие локализации, голосовые помощники только на китайском языке и т.п.    
С течением времени MiHome стала доступна и в других странах, где Xiaomi продает свои устройства умного дома, но перечень таких, глобальных устройств намного меньше, чем тот, что создан для Китая.     
На сегодняшний день, в экосистему Mihome - также входит множество производителей (имеется даже специальная краудфандинговая платформа Youpin, созданная Xiaomi, которая дает возможность своим пользователям продвигать новые идеи и проекты для устройств умного дома, гаджетов и других продуктов).    
Платформа Mihome, на сегодняшний день, сосредоточилась на умных устройствах с интерфейсами wi-fi, bluetooth mesh, ble - отдав zigbee сегмент в руки Aqara Home.    

*Aqara Home* - это система умного дома, разработанная китайской компанией Aqara, которая является суббрендом компании Xiaomi. Изначально устройства под брендом Aqara - предназначались для использования в mihome - первые серии датчиков, выключателей, реле и т.п. Через некоторое время, была создана своя система управления, которая получила название Aqara Home и на сегодняшний день, большинство новых устройств экосистемы, не совместимы с mihome.    
В отличие от MiHome, Aqara Home более ориентирована на международный рынок и имеет поддержку для работы с Apple HomeKit и Amazon Alexa. Основным интерфейсом для устройств - выбран Zigbee 3.0, для которого создана линейка устройств - шлюзов. На сегодняшний день идут работы по внедрению стандарта Matter.     
Таким образом, MiHome и Aqara Home имеют общего родоначальника - компанию Xiaomi, и обе представляют собой системы управления умными устройствами для дома. Однако Aqara Home более ориентирована на международный рынок в то время как MiHome была первоначально ориентирована на китайский рынок.     
К достоинствам систем стоит отнести - хорошее качество устройств, неплохой, хотя и существенно меньший чем у Tuya выбор типов гаджетов, невысокую стоимость.    
К недостаткам - региональную зависимость, регион устанавливается в приложении - это определяет к какому из облачных серверов вы будете подключаться. Каждый из регионов имеет свой перечень поддерживаемых устройств и нередки ситуации когда, например пылесос работает в европейском, а люстра - только в китайском регионе. Часть проблем можно решить при помощи кастомизированных приложений, для Mihome [есть такое](https://www.vevs.me/2017/11/mi-home.html), для Aqara подобное мне не встречалось.    

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