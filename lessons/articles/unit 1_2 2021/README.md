### [Home Assistant. Урок 1.2 - Установка Ubuntu Server на Raspberry PI 4B или 3B+, boot from USB SSD](https://youtu.be/GMOo0Af9eTw)

#### :ru: Команды и ссылки из урока:  

:white_check_mark: **Raspberry Pi OS Lite** - [Загрузка программы для записи образа](https://www.raspberrypi.org/software/)    

:ballot_box_with_check: Обновляем bootloader для загрузки с USB

:white_check_mark: **Удобный SSH клиент** - [Putty](https://www.putty.org/)

:ballot_box_with_check: Логин / пароль по умолчанию - `ubuntu / ubuntu`    

:heavy_exclamation_mark:Вставлять скопированный текст в консоль - правой клавишей мышки    

:ballot_box_with_check: Создание нового пользователя - `sudo adduser имя`    
:ballot_box_with_check: Добавление пользователя в группу sudo - `sudo usermod -aG sudo имя`    
:ballot_box_with_check: Переключение на нового пользователя - `su имя`    
:ballot_box_with_check: Репозиторий и список пакетов - `sudo add-apt-repository universe && sudo apt update`    
:ballot_box_with_check: Обновление пакетов - `sudo apt upgrade`    

:ballot_box_with_check: Настройка сети - Установка сетевых инструментов и Network Manager
```yaml
sudo apt install net-tools network-manager
sudo systemctl start NetworkManager.service
sudo systemctl enable NetworkManager.service

sudo reboot
```



Медиа контент в configuration.yaml

```yaml
media_source:
```

* Пример автоматизации

```yaml

```

```yaml

```

```yaml

```

```yaml

```

```yaml

```

```yaml

```

```yaml

```

```yaml

```

```yaml

```

```yaml

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