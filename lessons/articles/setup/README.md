### Установка Home Asisstant

:arrow_right: [Вернуться к оглавлению](https://github.com/kvazis/training/tree/master/lessons/articles/articles)

Для установки Home Assistant вам понадобится устройство, которое будет служить сервером вашей системы умного дома.    
Вариантов таких устройств - очень много -  это и одноплатные системы типа Raspberry Pi, Orange Pi, Khadas и т.д. Медиа (Android) Боксы, NAS системы, мини ПК, полноценные ПК и ноутбуки и т.д.     
Желательно иметь не менее 2 ГБ оперативной памяти и 16 ГБ дискового пространства. Если говорить о мини ПК, доступные в различной конфигурации, то по соотношению цена-качества, оптимальными являются системы с 8 ГБ оперативной памяти и 128 ГБ SSD диском.
Home Assistant можно установить различными способами, в зависимости от вашей платформы и предпочтений.     

Ниже перечислены некоторые из наиболее распространенных способов установки Home Assistant:    

#### Home Assistant OS - специально адаптированная под работу с системой управления умным домом операционная система на базе Linux. Она включает в себя все необходимые для ее работы элементы и сервисы. Легко обновляется и резервируется. Является официально рекомендованным способом установки. Недостаток - ограниченные возможности самой операционной системы.    
[Установка Home Assistant OS на Raspberry PI 4B](https://youtu.be/oO8b1SvmOog)    
[Установка Home Assistant OS на Intel mini PC](https://youtu.be/i4bp-s20Dm8)    

#### Supervised Home Assistant на Linux - аналогичная по функциональности с предыдущим способом система Home Assistant, с возможностью установки дополнений, бекапов и пр. Несколько сложнее в установке - сначала ставится OS Linux, рекомендуется Debian 11, затем Docker, затем необходимые для работы компоненты. Преимуществом является то, что пользователь получает кроме Home Assistant еще полноценный Linux, которым можно пользоваться для различных задач. Недостаток - чуть более сложный в установке и поддержке.    
[Установка Supervised Home Assistant на Raspberry PI 4B](https://youtu.be/vGYwvxsMULE)    
[Установка Supervised Home Assistant нна Intel mini PC](https://youtu.be/RqW5q-0RYio)    

#### Установка в виртуальную среду. По сути это первый метод - Home Assistant OS, только развернутая в виде виртуальной машины. Один из наиболее популярных вариантов - гипервизор Proxmox. Метод сочетает в себе преимущества первых двух вариантов, однако тоже требует отдельной, хотя и несложной, установки и поддержки.    
[Proxmox, виртуальная машина Home Assistant OS](https://youtu.be/o1MA6nsXC14)    

Есть еще ряд методов, в том числе гиковские - вроде ручной установки отдельных контейнеров или вообще развертывании вручную python окружения. Я не вижу в них прикладного смысла, при наличии более удобных, перечисленных выше способов.  


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