# Home Assistant. Установка на Raspberry PI 3B+ или 4B, загрузка с USB SSD

- Видеоинструкция - https://www.youtube.com/watch?v=d82QKrJwjx8
- Загрузка программы для записи образа - https://www.raspberrypi.org/software/
- Удобный SSH клиент - https://www.putty.org/

## Инструкция

1. Обновляем bootloader для загрузки с USB

2. Разворачиваем образ (Raspberry Pi OS Lite) на носитель и создаем в корневом каталоге пустой файл ssh

3. Логин и пароль по умолчанию - pi / raspberry

4. Обновление списка пакетов и пакетов
```bash
sudo apt update
```
```bash
sudo apt upgrade -y
```

5. Обновление прошивки
```bash
sudo rpi-update
```

6. Перезагрузка
```bash
sudo reboot
```

7. Добавление пользователя
```bash
sudo adduser имя
```

8. Добавление в группу sudo
```bash
sudo usermod -aG sudo имя
```

9. Переключение на нового пользователя
```bash
su имя
```

10. Установка программы для управления сетевыми соединениями (требуется для supervised-installer)
```
sudo apt-get install -y network-manager
```

11. Отключаем dhcpcd
```bash
sudo nano /etc/dhcpcd.conf
```
Добавляем в конец файла
```
denyinterfaces wlan0
denyinterfaces eth0
```

Выход - Ctrl-X 
Сохранить изменения - Y

12. Конфигурация NetworkManager
```bash
sudo nano /etc/NetworkManager/NetworkManager.conf
```

```
[main]
plugins=ifupdown,keyfile
dhcp=internal

[ifupdown]
managed=true
```

Выход - Ctrl-X 
Сохранить изменения - Y

13. Перезагрузка
```bash
sudo reboot
```

14. Отключение DHCP клиента
```bash
sudo systemctl stop dhcpcd
sudo systemctl disable dhcpcd
```

15. Настрока WiFi и статического iP адреса 
```bash
sudo nmtui
```

- Activate connection - подключаем wi-fi
- Edit connection - настройки IP

16. Отключение случайного МАС (опционально)
```bash 
sudo nano /etc/NetworkManager/conf.d/100-disable-wifi-mac-randomization.conf
```
```
[connection]
wifi.mac-address-randomization=1

[device]
wifi.scan-rand-mac-address=no
```

17. Перезагрузка
```bash
sudo reboot
```

18. Проверка сетевых интерфейсов
```bash
ifconfig
```

19. Настройки Raspberry
```bash
sudo raspi-config
```
- 8 Update - обновление приложение
- 5 Localisation Options / I1 Change Locale - ищем и выбираем пробелом ru_RU.UTF-8 UTF-8
- 5 Localisation Options / I2 Change Timezone - выбираем часовой пояс

20. Установка пакетов нужных для работы и установки Hass.io

```bash
sudo apt-get install -y bash curl git jq avahi-daemon dbus apparmor-utils libavahi-compat-libdnssd-dev libatlas3-base apt-transport-https ca-certificates socat software-properties-common ftpd mc
```

21. Перезагрузка
```bash
sudo reboot
```

22. Установка docker 
```bash
sudo curl -fsSL get.docker.com -o get-docker.sh && sh get-docker.sh
```

23. Добавляем группу docker и добавляем в нее пользователя
```bash
sudo groupadd docker
```
```bash
sudo gpasswd -a $USER docker
```
```bash
newgrp docker
```

24. ставим Portainer

```bash
docker pull portainer/portainer-ce
docker volume create portainer_data
docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```

Веб интерфейс Portainer - IP adress:9000

### Установка [supervised-installer](https://github.com/home-assistant/supervised-installer)

25. Установка зависимостей

```bash
apt-get install \
wget \
udisks2 \
libglib2.0-bin -y
```

26. Установка [OS-Agent](https://github.com/home-assistant/os-agent#installation--update)

Откроем директорию пользователя
```bash
cd ~/
```
Определение архитектуры устройства:
```bash
uname -m 
```
Откройте страницу с релизами в браузере https://github.com/home-assistant/os-agent/releases/

| uname результат | релиз с префиксом |
| --------------- | ----------------- |
| i386 или i686   | i386       |
| x86_64          | amd64      |
| armv7l          | armv7      |
| aarch64         | aarch64    |

Скопируйте ссылку (правой кнопкной мыши) на нужный вам релиз. Если релиз заканчивается на `tar.gz` скорее всего скаченный файл нужно будет распаковать.

<details>
  <summary>Пример</summary>
  
  ```
  pi@raspberrypi:~ $ uname -m 
  armv7l
  ```
  Получился os-agent_1.2.2_linux_armv7.deb
</details>

Скачайте релиз
```bash
wget ссылка с релизом
# пример
# wget https://github.com/home-assistant/os-agent/releases/download/1.2.2/os-agent_1.2.2_linux_armv7.deb
```

Установка OS-Agent
```bash
sudo dpkg -i название файла (введите первые буквы название и нажмите TAB)
# пример
# sudo dpkg -i os-agent_1.2.2_linux_armv7.deb
```

Проверка статуса после установки
```bash
gdbus introspect --system --dest io.hass.os --object-path /io/hass/os
```
<details>
  <summary>Пример лога</summary>
    ```
    pi@raspberrypi:~ $ gdbus introspect --system --dest io.hass.os --object-path /io/hass/os
    node /io/hass/os {
    interface org.freedesktop.DBus.Introspectable {
        methods:
        Introspect(out s out);
        signals:
        properties:
    };
    interface org.freedesktop.DBus.Properties {
        methods:
        Get(in  s interface,
            in  s property,
            out v value);
        GetAll(in  s interface,
                out a{sv} props);
        Set(in  s interface,
            in  s property,
            in  v value);
        signals:
        PropertiesChanged(s interface,
                            a{sv} changed_properties,
                            as invalidates_properties);
        properties:
    };
    interface io.hass.os {
        methods:
        signals:
        properties:
        @org.freedesktop.DBus.Property.EmitsChangedSignal("true")
        readwrite b Diagnostics = false;
        @org.freedesktop.DBus.Property.EmitsChangedSignal("invalidates")
        readonly s Version = '1.2.2';
    };
    };
    ```
</details>

27. Установка supervised-installer

```bash
wget https://github.com/home-assistant/supervised-installer/releases/latest/download/homeassistant-supervised.deb
```
```bash
sudo dpkg -i homeassistant-supervised.deb
```

<details>
  <summary>Пример логов</summary>
  
  ```bash
    pi@raspberrypi:~ $ sudo dpkg -i homeassistant-supervised.deb
    Selecting previously unselected package homeassistant-supervised.
    (Reading database ... 43840 files and directories currently installed.)
    Preparing to unpack homeassistant-supervised.deb ...
    [warn] 
    [warn] If you want more control over your own system, run
    [warn] Home Assistant as a VM or run Home Assistant Core
    [warn] via a Docker container.
    [warn] 
    [warn] ModemManager service is enabled. This might cause issue when using serial devices.
    Adding 'diversion of /etc/NetworkManager/NetworkManager.conf to /etc/NetworkManager/NetworkManager.conf.real by homeassistant-supervised'
    Adding 'diversion of /etc/NetworkManager/system-connections/default to /etc/NetworkManager/system-connections/default.real by homeassistant-supervised'
    Adding 'diversion of /etc/docker/daemon.json to /etc/docker/daemon.json.real by homeassistant-supervised'
    Adding 'diversion of /etc/network/interfaces to /etc/network/interfaces.real by homeassistant-supervised'
    Unpacking homeassistant-supervised (1.0.1) ...
    Setting up homeassistant-supervised (1.0.1) ...
    [info] Restarting NetworkManager
    [info] Restarting docker service
    PING version.home-assistant.io (172.67.68.90) 56(84) bytes of data.
    64 bytes from 172.67.68.90 (172.67.68.90): icmp_seq=1 ttl=50 time=46.2 ms

    --- version.home-assistant.io ping statistics ---
    1 packets transmitted, 1 received, 0% packet loss, time 0ms
    rtt min/avg/max/mdev = 46.159/46.159/46.159/0.000 ms
    [info] Install supervisor Docker container
    [info] Install supervisor startup scripts
    [info] Install AppArmor scripts
    [info] Start Home Assistant Supervised
    [info] Installing the 'ha' cli
    pi@raspberrypi:~ $ 
  ```
</details>

28. Подождите несколько минут и в Portainer появяться контейнеры
29. Веб интерфейс Home Assistant - IP adress:8123