### [Xiaomi Gateway 2 DGNWG02LM - локальная запись mp3 файлов, звуковые уведомления в Home Assistant](https://youtu.be/xKbEj7pE9iU)

#### Текстовая версия конфигурации и команд из видео урока

:ballot_box_with_check: Samba share конфигурация    

```yaml

allow_hosts:
  - 10.0.0.0/8
  - 172.16.0.0/12
  - 192.168.0.0/16
compatibility_mode: false
password: homeassistant
username: homeassistant
veto_files:
  - ._*
  - .DS_Store
  - Thumbs.db
  - icon?
  - .Trashes
workgroup: WORKGROUP

```
:ballot_box_with_check: Обновление    
```yaml
sudo apt update
sudo apt upgrade -y
```
:ballot_box_with_check: Установка php, bc, ffmpeg    
```yaml
sudo apt-get -y install php bc ffmpeg
```
:ballot_box_with_check: Установка php-miio
```yaml
sudo git clone https://github.com/skysilver-lab/php-miio.git
```
:ballot_box_with_check: Тестовый запрос
```yaml
php /home/ИМЯ пользователя/php-miio/miio-cli.php --ip IP_УСТРОЙСТВА --token ТОКЕН --info
```
:ballot_box_with_check: Записываем mp3 файл
```yaml

:white_check_mark: Бот Максим - `@Maksobot`

```
:ballot_box_with_check: Конвертируем
```yaml
sudo ffmpeg -i /usr/share/hassio/homeassistant/mp3/test.mp3 -b:a 64k /usr/share/hassio/homeassistant/mp3/test.aac
```
:ballot_box_with_check: Переносим в корневую папка apache
```yaml
sudo mv /usr/share/hassio/homeassistant/mp3/test.aac /var/www/html/test.aac
```
:ballot_box_with_check: Удаляем mp3
```yaml
sudo rm /usr/share/hassio/homeassistant/mp3/test.mp3
```
:ballot_box_with_check: Пишем на шлюз
```yaml
php /home/ИМЯ пользователя/php-miio/miio-cli.php --ip IP_ШЛЮЗА --token ТОКЕН_ШЛЮЗА  --sendcmd '{"id":1,"method":"download_user_music","params":["НОМЕР СЛОТА ОТ 1000","http://IP_СЕРВЕРА/test.aac"]}'
```
:ballot_box_with_check: Статус загрузки
```yaml
php /home/ИМЯ пользователя/php-miio/miio-cli.php --ip IP_ШЛЮЗА --token ТОКЕН_ШЛЮЗА  --sendcmd '{"id":1,"method":"get_download_progress","params":[]}'
```
:ballot_box_with_check: Воспроизведение
```yaml
php /home/ИМЯ пользователя/php-miio/miio-cli.php --ip IP_ШЛЮЗА --token ТОКЕН_ШЛЮЗА  --sendcmd '{"id":1,"method":"play_music_new","params":["НОМЕР СЛОТА ОТ 1000",10]}'
```
:ballot_box_with_check: Данные о занятых слотах
```yaml
php /home/ИМЯ пользователя/php-miio/miio-cli.php --ip IP_ШЛЮЗА --token ТОКЕН_ШЛЮЗА  --sendcmd '{"id":1,"method":"get_music_info","params":[0]}'
```
:ballot_box_with_check: Данные о занятой памяти
```yaml
php /home/ИМЯ пользователя/php-miio/miio-cli.php --ip IP_ШЛЮЗА --token ТОКЕН_ШЛЮЗА  --sendcmd '{"id":1,"method":"get_music_free_space","params":[]}'
```
:ballot_box_with_check: Удаление слота с музыкой
```yaml
php /home/ИМЯ пользователя/php-miio/miio-cli.php --ip IP_ШЛЮЗА --token ТОКЕН_ШЛЮЗА  --sendcmd '{"id":1,"method":"delete_user_music","params":["НОМЕР СЛОТА ОТ 1000"]}'
```
:ballot_box_with_check: Удаляем aac
```yaml
sudo rm /var/www/html/test.aac
```
:ballot_box_with_check: Проверка файлов в корневой папке apache
```yaml
sudo ls /var/www/html/
```
:ballot_box_with_check: Запуск в НА голосового сообщения из слота 10001
```yaml
      - service: xiaomi_aqara.play_ringtone
        data:
          gw_mac: 34:CE:00:88:B0:39
          ringtone_id: 10001
          ringtone_vol: 50
```
:ballot_box_with_check: Запуск с подсветкой
```yaml
      - service: light.turn_on
        entity_id:
            - light.gateway_light_34ce0088b039
        data_template:
           brightness_pct: 20
           rgb_color: [0, 0, 255]
      - service: xiaomi_aqara.play_ringtone
        data:
          gw_mac: 34:CE:00:88:B0:39
          ringtone_id: 10010
          ringtone_vol: 50
      - delay: 00:00:04
      - service: light.turn_off
        entity_id:
            - light.gateway_light_34ce0088b039 
```

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