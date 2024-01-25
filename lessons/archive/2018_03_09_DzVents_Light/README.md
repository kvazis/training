### [Уроки по Domoticz - Введение в DzVents](https://youtu.be/wZpS_PPtKso)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Код из урока:  



:ballot_box_with_check: ИП и IDX - ставите свои 
```yaml
Вкл - http://192.168.0.98:8080/json.htm?type=command¶m=switchlight&idx=94&switchcmd=On
Выкл - http://192.168.0.98:8080/json.htm?type=command¶m=switchlight&idx=94&switchcmd=Off
Переключить - Выкл - http://192.168.0.98:8080/json.htm?type=command¶m=switchlight&idx=94&switchcmd=Toggle
```

:ballot_box_with_check: Управление цветом, hex - свой    
```yaml
http://192.168.0.98:8080/json.htm?param=setcolbrightnessvalue&type=command&idx=94&hex=2011f5&iswhite=false
Управление яркостью, от 1 до 100
http://192.168.0.98:8080/json.htm?type=command¶m=switchlight&idx=94&switchcmd=Set%20Level&level=25
```

:ballot_box_with_check: Сценарий показанный в обзоре:    
```yaml
return {
active = true,
on = {
devices = {
'Кнопка'
}
},
execute = function(domoticz, device)
local tone = domoticz.devices('Yeelight RGBW Tone')
if (device.name == 'Кнопка' and device.state == 'On' ) then
    if tone.state == 'Off' then
        tone.switchSelector(10)
    elseif tone.state == 'Синий' then
        tone.switchSelector(20)
    elseif tone.state == 'Розовый' then
        tone.switchSelector(30)
    elseif tone.state == 'Зеленый' then
        tone.switchSelector(0)
     
 
    end
end
end
}
}
```

____
#### Поддержать развитие проекта *Умный дом с Alex Kvazis*    
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg/join" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/youtube.png" alt="Youtube Sponsorship" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.patreon.com/alex_kvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/patreon-button.png" alt="Patreon Support" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.buymeacoffee.com/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/buymeacoffee.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.paypal.com/paypalme/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/training/master/lessons/img/paypal.png" alt="PayPal Me" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Или перевод любой суммы на -     
* Webmoney - Z243592584952
* BTC - 1PAjXcNbLtUKLY8d5HDnfxRqc5Zchj1fU3    
* TON - UQBEShkfKCFhvqlTs_oIpa6kFIQJguJR30hDXany1cCAbCfe    
* USDT (TRON (TRC20)) - TEpnJcLDRbkwq5oQpjVET9NbPpHKB7QMrD    