// Название: Matsee Tuya Zigbee Din Rail 80 A Energy Monitor
// Модель: DAC2161C
// modelID: TS0601
// manufacturerName: _TZE200_eaac7dkw

const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require("zigbee-herdsman-converters/lib/tuya");

const fzLocal = {
    tuya_xocadinrail_switch: {
        cluster: 'manuSpecificTuya',
        type: ['commandDataResponse', 'commandDataReport'],
        convert: (model, msg, publish, options, meta) => {
            for (const dpValue of msg.data.dpValues) {
                const value = tuya.getDataValue(dpValue);
                const dp = dpValue.dp;
                meta.logger.info(`RECEIVED DP #${dp} -- VALUE = ${value}`);
                
                switch (dp) {
                    case 16: // DPID that we added to common
                       return {   state: value ? 'ON' : 'OFF'};
                       
                      
                    case 1:
                        return {
                            energy: value / 100
                        };
                    case 6:   
                     return {
                            current: ((value[4] | value[3] << 8) / 1000), voltage: ((value[1] | value[0] << 8) / 10), power: ((value[7] | value[6] << 8))
                        };
                        
                    case 17:
                      const lookup = {
                       0: 'not set',
                       1: 'Over current threshold',
                       3: 'Over voltage threshold',
                                      };
                        return {
                            threshold_1: lookup[value[0]],
                            threshold1_value : (value[3] | value[2] << 8),
                            threshold_2: lookup[value[4]],
                            threshold2_value : (value[7] | value[6] << 8),                            
                    };    
                        
                      case 10:{
                          const lookup = {
                          0: 'clear',
                          1: 'over current threshold',
                          2: 'over power threshold',
                          4: 'over voltage threshold',
                          8: 'wrong frequency threshold',
                           };
                           return { alarm : lookup[value]} ;
                    }
                    case 18:{
                        meta.logger.warn(`zigbee-herdsman-converters:: NOT RECOGNIZED DP ` +
                            `#${dp} with data ${JSON.stringify(msg.data)} VALUE = ${value}`);
                            break;
                    }
                    default: {
                        meta.logger.warn(`zigbee-herdsman-converters:: NOT RECOGNIZED DP ` +
                            `#${dp} with data ${JSON.stringify(msg.data)} VALUE = ${value}`);
                            break;
                    }
                }
            }
        },
    },
};


const tzLocal = {
    state: {
        key: ['state'],
        convertSet: async (entity, key, value, meta) => {
            await tuya.sendDataPointBool(entity, 16, value === 'ON');
        },
    },
};


const definition = {
    fingerprint: [{
        modelID: 'TS0601',
        manufacturerName: '_TZE200_eaac7dkw'
    }],
    model: 'DAC2161C',
    vendor: 'Tuya',
    extend: extend.switch(),
    description: 'Matsee Tuya Zigbee Din Rail 80 A Energy Monitor',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAACWCAMAAAAMsZ2AAAADAFBMVEUAAAD////c2Nr59/jn5ebGwcXr5uzPy9G/u8PS0dPKyc24uL/q6uvW1tfi4+3Oz9bKy9K+v8XGx83Excvj5e3Iyc3Gx8vExcnBwsbk5enHydDr7fTp6/Ln6fDl5+7h4+q5vMS/wce7vcPm5+rOz9KytsDAw8q3vMbn7Pbs8Pi/wcW9v8O7vcHr7fHp6+/n6e25ury9wcjFydDo7PPl6fDh5ezl7v3b4/C6wMq+xM7R1+Hd4+3i6PLByNLM0tvY3ua6v8a1usHKz9be4+rW2+Li5+7Iy8/e5e7S1tvFzdbf5/C2vMPa4OfJ2+3a4urk7PTO1dyfpKnBx82ytrqqrrLDx8vBxcm/w8e9wcW7v8O5vcG2ur7b3+PO0tbKztLFyc3y9vru8vbr7/Pp7fHn6+/l6e3j5+vh5enR1Ne/wcO6vL7I1eHd6/jG0dvS6PvO3+7B0d+7y9ixuL7q8vno8Pe9w8jFy9Df5erJ2ufF1uPU4u3i7/mtsrbV2t7g5OfZ3eC+xcq4v8TGzdKkqq7u9frDyc3Bx8uSmp/r9vyZoKS7wsbL0tbg5+vd4uXJ1dvm8PXk7PDi6u61ubuxtbfT19nN0dPJzc/Hy83Dx8m/w8W9wcO7v8Hr7/Hp7e/n6+3l6evj5+nZ6O+Kk5fO1dj1+vyntLnS3+To8PNUXWC+ys7Bx8m9w8W7wcPFy83l6+3j6ev1+Pne4eJ/iYzCzM/Cycvo7/Hm7e/g5+m1wcTP297FycrCxscVHiB0foDY4ePx9vft8vOrvL+5v8CyxcjF0tTK0dLGzc5CS0y4y81mb3C7xseyvL3c5ue3vb2zubm/xcW9w8P5/v7BxcW/w8O9wcG3u7vMz8/Bw8Py8/O/wMAqMjE4QD+/xcO9w8Hj6eexu7fj7elOWlTEysfBxcNeaWNXY1tlcmlqd23JzcptfHB8h31xfnJ1gXbv8+709e/29vTi39b9/Pni1L/PzcrfyLLmsIfX09DQj3O8eWDTtarEmY26qqfw7+/JyMjGxsb///8QE/QFAAABAHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AU/cHJQAAAAlwSFlzAAALEwAACxMBAJqcGAAABO5pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmVkYTJiM2YsIDIwMjEvMTEvMTQtMTI6MzA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4xIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMDctMjdUMTY6MjY6MTgrMDM6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDctMjdUMTY6MjY6MTgrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTA3LTI3VDE2OjI2OjE4KzAzOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyZGZmNDE1Yi0yODM1LWM2NDItOGJlMS05YmYwZmRlZjQ0MzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MmRmZjQxNWItMjgzNS1jNjQyLThiZTEtOWJmMGZkZWY0NDM0IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MmRmZjQxNWItMjgzNS1jNjQyLThiZTEtOWJmMGZkZWY0NDM0IiBwaG90b3Nob3A6Q29sb3JNb2RlPSIyIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyZGZmNDE1Yi0yODM1LWM2NDItOGJlMS05YmYwZmRlZjQ0MzQiIHN0RXZ0OndoZW49IjIwMjItMDctMjdUMTY6MjY6MTgrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy4xIChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7F2b54AAAigklEQVRo3r2bC1xTV7b/L23nodaqWIGxtRZEq0l41MdMBTUKIQZlgEPOI8lJcgiEEGO9M/WBdiYnQQ6QBkxrc/LgIT4CVKuimKK2SSWRFi2OaHGEcfR+Zv6dv49q7XTmdqbt9NrOf50TQFFLnd7+Z/GKfiRff2uvvfZaZ+/9H//8N9p/fLdf+/Xzz//bYEf++teHP2kPFVb++tf/Cva7wf7854cfbm9paW9vf/hhwAJX99I6AH9vsPaPh1/m/fnj9vbCTwpDYBdC7fC9sL39k0ELVerC634K9r+BRf3l3aGXhz8OfQJvH7ptF+DzwoUI7c/w9TBv3L/4ZNF3gBX+dfynLw++/vgC9zbt4Mi+ltBdBsyPLwxZ6MInf6UfBPba6Vdf3bXrV4N/+s++R7sHPt006EVwGyhrCW3fGe4bFFjI2SBQp9PBtwsXwuGmH/bFLvx22KEZ21MeTW5KSZmWtwjsifYUtfWh8Rz7Pyu5t24vbDL2sk4zXtgSAQ3BQG1LuN1iAc260I5t4f6V3wr71aMzNEbj+PEPPfTQoUOPzLh1IYl7ywtJr8xelFWclFxcpCvBtChpNiNkX2EoNAxr79tmsdLhqLpAHzeSO9oPseQvvw32hwsuLCYmOjp68mT4mqidYNTQaqv6kOXR5EeTk1L0xSkG9RHLaRldghtCRWEdRyos1LWHNF2Mr7+v0Onc1nIhFN7Roun9/cJvge36ZCcmpa00LZMZjYkTp0yJEwgm/WBS/OSFBXMrNDKaVqvVOw1HinS6sC4lRZ8UCut1oXA4FA7YzqTa6ahDZxh3ny60vSnccP53s74FlqxLVNDJKU8+OW3atJSUn1gsaquVdhk12qpZ5c8mJCxNUBIYNjVDA1y1w3I0pbgkmU4J6cJ1ziDiRWZEuVnnf21rD+0MHXLW1wtWjw67oE7QGkoMYD/5yYwZM8BtxXq9PsVQanGo1bRMo5VOxp9N2Lxy5dKaDQVlGW6vxuCygjRL03a30dQXanTW9xtD23aGBhqDZ//rjVFhebeoSdYijlVa+hPOSsEs8AV/A17TP6kvyVSrrbL82ury8vINCoFU46EHdobCLYWhqPaWPvWZhsbGfnr79m31wWDwT3tHhV2gTQM79KURG4KVWiylQ1CglkzTHyl+dWOmmJa5pUYZZewdaNm2LRwObwu3e/obztf3uraFDjUGgsEPv14zCmzRrYCQLjaUlg7jSu9j0zNzHbkLsrIMW5scLo3U3X8mKSqKg4WaukwNDe83uo2uQH1dsO7DP5WNArulFgYsKbwXQQ33Cd8sG8EGOZmW6dMzp2dyNn16aamDtrq1FCn3uo72hbc1tVj7G95/v75+gPEFA3V1gRMnqE3fCNv6aEDo5qPDUhTW77Q4HA61w8HTBmGOzGHjYBCpXreCVAX9H7B9TdtCnt5V9fX1ZwNsoytYV+edOHZi7TfCwtaVBWoOVhpKKtGFWqKi+grDKTssuZk5gLRYMoHOg3JzMzPTMw2cMMwrUim1zNuXo5pC2xsbztbXn4PI+IN1FQib+KMfffhNsLwkr1JbklVSYih07Pngco/fZjfjGmtJJSR5yPLFhswctVoszskFFofjhFFajFQphXX+usId7VZn/dngWdAUNHrOBbwnTkwcGFj9DbALVtMsWl+y1bAxyv/2JbCLYJcundzT47czf3yjs6SyD6Atc2Zn5gANhs7q0OAaQW8jRLuxb+f20EAXBHwdWCBY5w14PR7PgCfj/rCtH7f1Tn38CXqtpNBw8tKVq1cvX77ywQcc8u23OexFoB7zIxvSXl3Pi5uupq1ejBICq/H8b3duD+84//5ZnlUX+FPA65UCa2Bg4v1hukMNQtkTxbPkjij04pWeax9dvwbAKwAEO3mSh3J28aK/kFNmoa1GTIubznO0fs+OkLU3WHcuEOBgAV4YsAYSV98PdvoTTcKsBUVqNGN3S8+ly9du3rz5EUcDfVcGiYAE6KW3fVFZ8zda1LREiktxE8cSNvZawoF6MzsQUQbCPDzM7a69H0z3hw5l2RNZEkrdt/fSB1dv3rjB44A3RPzgA+5rz8k9eVtrVuZMk1hllFaaoGxsXLWqoaHfvbPxHIN4hmDA8rjBNBM23Qvr7Gvep6LnOKzzt/TduHj5+o0bHO2j69evcXY1opG3k7b1TMFKRKKWaDEtZoIxO3u2AXCB+l4WPeO5zRrgWEuML98LKwx3EMqSYvVUtc5y8iQnjId9BLiIXR20nj2vP5e/VLJQ7pBNxbyEsqGxob4e0kZ9Y10/gjIBQAWGfagB2Jh7YLlRrg1dmqJSo8YRxVy8cu3YjYgbeVYEyMvr6dnj1y7OQ3LL5I6MqRimjBcAC7LG2WAQhgxFIUIiIzaQmMjBmo1j0u6G6W5hit6jOpqUPdFy+dKQsJuDugZpnF3fgy5HMvKzGY16arW2zkQo3oesAXP5XKALaUTZAB8dfCjyMOMYo/Eu2M+i6C6VdN606cbMqODFD67xrBs3bztxyJ+Ae7nyDWbZ2lqIe9yz6jwk3rNc2ggGvU6EYeoB5uVgWq02ccIEgBnBjyNhh9spkrTqS596ojTqxsWrH90YGrJhGK/u2vXrl32VuXmZki0SiQbHAg2r3gdhgKoLBgPnGRT11nm9t2GJRo1R9lnzSNgvLlgmJVClT9JzHZWOkyevDXvxo9vCBl/2nKrMzVyQJZbRUkzrbeSFRWDnPCjS/2HgbN2HEB7AcrsBZhzvGvPaSFhneOLTKpc+a5ZiepT94pXbwu6E8a+vHXvrVS4Ji2UTsIA2CMvXb8/yNLC6PyFdnrOoqXsYNoGrQF13ReORnQolVpriqJIVt1+5dPl2eNwxZvyPm5d9W3KylmfmSiQQ91JOGBcdPCqSf01djTwqMTGRGzHN+PFpI2G/0rmUQmORQWp29NVHskfEibfH7PoQ7I+vbM3Oni/Ob67CMOouGJfqWSYonRiBaTR8bX1XBlnQRIni1SkOecEWCI8r1+7DGoRdvXF6+XImf15aWgYVj+MNd8Aia0ugEV2VKPVwrAjMNf6u3LhNLVBIDXqXOb9w58mT4MWbkQEbQeOJl5FX8rKZ9Tlp9NzoeCq+fhh2DlZMTlpdF7hRwAsDN3Is2UiYOGxUEHRx8jK5hc8eN28Msa7fBbt+9Y1XttrXrpekyeYKCY+QqB8SFjChXImDeZxsogp1a2FCTxj24p2wA/8Hi6cyn2i2RxdVfnDpMheLQ7pGwj666l+xfsNl5RyZrKJMgeNCjsXVHMGgB2W6MbBo6cQxTlLj0XJJ2DjGNX78yMXzV2HXswrN/GkTxjn6Nl/8oOe2sEHUtdteZH6d27x0o0Mmq64mKGX8bZgXtZ134xxMGu3xSgdZIEw2Erbigid+sjqZnmp9vO/YxT3Xbh67MTI6uIwYSYw9r78iNlRukcjy59bglJIYhp1zI36TSorFRMdMicGMUlzDwWDEXJtGwrYdUiyd+9Q8GSkrVF86efmjmyMG7Nrw17Xrl/2v7sqEYk72VlnZLEwguA0LutkbPtINsCmTBURzl9w4CDOOLOV2fWxULJXNe8zMZkLtsafnozsyx7WIDf68fgV9CUqdTMkSWcdcnBIJBPzaAkUOFFVf+e1GiqKmxMiFlMakMLq5wI/E4h2wV0uo92c99uSCZzMO87XHyNEaJPGuvHq9c0venDnzm/Nr59aUU0JiCBYM9COBgQGMomLGTknFITq0PAuCMW0k7Jbk9ZoJ8xc8Pm9LyyxO2MjJde0Ou2JvZlqX1lSk0VVzNxTEK4aU1Z2FFAzlAAQjFTuRdWqkUn7IIOMbfz4CtuJWxqnnxE8+/niWIerY25wXAXbtXrt69drlP25GfD7ELqGrywvmqojbsACKDtQFAeaJI9FJib0KjcatoROwh2Qju5jknWXPVj2VBTat0r+np6eHL2rgrfkyh/vk6yt4cfnGCcYsXomszdFKlfGYcNWqVUNuHGDM/agX8wJOThoFzBRjrNZoFHjG54+E3aIxVf48YD31lEE3TTZxqRnxHeuBmg1qt8s8ZdCuXbG9Zls2Z659WWcVpsIVgjtgnt6bNxRuUu7GCYrUylM1GpJyabXjx2waActrchOTpus5ZU9Nmzdn/brKObrDB9+q2I/6/Dd6uNp0mHm5FUXsUD/R+dUqpVS06g5Y0GNj3BRmDhAYriLl0a4Y0u3yuF3NI9vc7TspcuI8zo1PGQqmZktWLBLnbt24df368OEjp+kTf2RsN65f5pkf9Iife8Zs98k3VnSYCN6Lw7BzwcSBc3VakpEqnBgj1BrHEtDrN7vyR8B23bLiUHssgKb1iQwzgqA2Zu6SJZIlEijmt27NW79uXeXWzOZTZrv/2GVmXV5WjqRC1lxA1GFKxapVv/1tpIaDhE8QWAByB0qI5FIYNW2cx6XRuDSbRsC2PioT4tMXGAyPP/ZUjoSWTZ2JzCpgNiP2hZuXPvd67Ypc8Yq8n64DW78rNy9dnJOTmZlfW6DAKJGiYXAxO8ctLTikxSljJ8aaKYygTFoNoXXBjB7zixGwW4+UqYxP6JMNCxYsePzxaU/Nf+KxnLT8hcuey7Db/H67b2H60oVpPxOvWJSeu2J5OrScmXRzWXUBJRQOw84OwaLHxmAqEiO0QtwIsQiw/BFPeFbcsu4jOrOXiHMypy14bAE055kLFmx5NW/FohWS7IznGNviNJ/P5mPQhZL0nPR0rsPNby4oL8NMitswLkD41WVsLK6VqwRyL+WhIH3IjGkjYCWPupdJP/uf/0n9QcLEaYN9Of99ee6KRVkLMmfnSpYsfAZi0I+uSAfLXCBuzigoqMJV94HFjI2r68blhFMLjuSUGX8xAnZrRgz52ZdffPH5l//zdd78rEULgMN1lYvW5a2fvSh9eW5u+gqgiNOzs9PTly9PT8+S5FcUUNVKoVA5BCNwsMmTY2KisTrSJFPiMLUVwJINZvwhWF7IKgr+4+9///yLzz//KnuuRCLJyZk9Oyf3sVyGQZctlqTPhomQKxbnihctF29cvhHGLD+/rLygmpx0H9gUTEGwHqlIiiu8dyThIdgrn7idY/4Bwv7+xZc/8vt89mXiJ59+Ojd3NtOa/YwZYRBk4Yr03OV5c2ZDpZjJ9dHi5trazSurTYPK3ud4QzApLiJJp0tIUiSk4THjjavvhD0fSopL/cvf/v7551988Q86I9+8dunjT9uQ3Jwl9p/NyZVUzl7yjC83fX22HZ25eIk4ff2inHSJrLZs7dIacKPwblh0jKLeTKgoD+GmNBqZ0agZ8UB6XntmavC//w72+ecP/XQusnyLZEHBEiZtzszWFtS/2Daz7xkGJpd94crWVgQmfNqiHBldm+CUOoUJHKyhQQCrdcSNMdFjcZUyBt/XpW3D3Nzi8ln+CNicv06Y6fobN2RffPnwmj2XZlbOk9hmLpdk2dIYX27fsbfTmIV5eWtb1y3KW5H+WlqrfZE4n641qYJkwt2w6DiRSIiTGC6vqj5BYhAezWPSRsAKw3FC61/++2//+PLLhwpnnjyWtn6e/+Sx5bMXI2k+sVi8sOcZRixZgWQvF0vE4tkvLW5dlJbWrCUJVQIHa2y8E4ai8niv0Czdh7d1yKF5kblvBz4Hm91y6MzEQ6d3bUl+5IePZeY8J5md+Zj/8rK8Ocxz9pNLMivNyEx0Tno2suI1sViS90zrzIUr0iS1hIgihXfDMBxgBBYUqbprKvabXTJX7VdpI7ZHkh8eENKHrJ2d8F45YnXl+vnzs2RLFuVIEPFzb9vmo36xfXH67NbW9etemp27zm8ziyX5tIxU4SoACfkQAVgcB4N2gh1H4UIt2tXGe5Gu+/q1EbBHb032uGgrZ2q11fEs2lqQNq3wsSeW+cSzJQvL7eIM+wLJcmaxrWePL+0Z/zPmeVB1a0mFiX+ABDiFgoPFAYxiGDYWYwReUiSNJ8GFtPDrX90Jy9kxw0VHWFYrLVFXIH47g5iR58w+OzJzQ1VOnm3ZvC2LmRUL/Zd6/HuQpXOzJBLZLGUdmSAaCYPFjUHlMSQipSgvbsJkY4z5iHnkLtPyQ+Ot3GNE7sE2DbQccf7cmQhi983NrVgGE9qOZHbm2WfOXt+37vm01WuQLDEoe5qsJ1Wqu2AeFjGzsSrGTGoxTKWFsuqXL9y9pbVmbKKMdlnVEqvFUWrIzFRLxGpxjkQmgdSftSgnI8chyVpmY1qfyZYsb5nZOl+SJskQESqV6i5lOOZkx4mmwNrbr4EahEtVm+7dP3v2d14vVaHNaOYWBFenw1E6XU3LaBlntMThyHF05uY/a0YZSJV2eoFEIi7vqksVie6CYUpGzgo9QpYhpZhCYdSMmXC/zbqlov01GzZUlVGctyu03c1GGbgTVuzmjFqZRALOFWfCapCeP3ftkqycNEna5hqh6V4YixJOHDMG7CRFqSgQtuS+O4OLf4cVlJdviCeCBF7dRmFzC+ZO5KQCxaGWyJo1+Wl0WhqdswDKjxxakrGBcI5LNZmgvbwThjjdCVApCFgKw0WQFzWb7r8NWfC76oLqahwnhF0rG/fh0VOlVEFHQUFFbW0ziIQ1BcZQlpYm4YyWFJQrnKn3wCglKhJQBIq5ITxURs2SJd+05/nCKgzHq6vLl6pEkA3KNzz7bE35iRNlBdUFBa8DErzZmeMAlXR+rZUmcDJ1CDaUQQSxZBxqjp0yOZ7y4FgCZPwxGd+4wfrC789N5mHwe0Q52KlTp/bDUL5e9QZ4+NSG13mVVnUnvYWmgs57YWNhQRDh0VO8lBSXOj0Ae/mbd3Ozz00uKCjfrCRwGDcwHnfq1IaazZuXlle9UVVQAH1ERbdW5nBLE+6F4XEoigpjo6HBJTDCBK3ShJ+PsnW8JlhQsGElVM4YVg4wjlQOHxtqak7VLN1c82ZNeVVZVTVR1YbHk/fA6jE5gpjipkSPBWEUSsjcmoxR96l/qcAVCqyjo4MrkrC9e/dy3izfELGaGoVCqVIpCUwpkssjY2aC+BfuF/KJWMowztSYKdFTKEpKyvOhWXpx9E3x2qAQa6tqq6ICgZgA58oCDhUhAozL7wqhijTJUadoHE/jYJMEk+JiY0w2HBfCSh0NVZVyc/4SzYRv2YGfHyChR61q88LcpkAhBH/5kG3YEC8QKMCEIqGCZcaZUuGDgwkFijgBG8vaSYVwCsCkOO6urdXcM6PvhjkEUoeVbu6GRCLFqLa2trIqsIJBGEEQ9YM4pdk8joeZTMJJ9fVxTkaEoqwTnzI2OprC8V6IjvzV3wJzCR3FWw8cOGhR00ZtW0cHRZVxBhK53UaCNwEHM4lQuYhDmbqUMGCTzYjTjnaZsOhoqPQhIWvcE5a8ODpsR1DK7dCV6JPhw1BqlRk9VVUcEjR2cCMIXuWBECkkKlf19vZ2dQkBJjAxcsZsVnJxJcVwlmieIFvyLUc01EKrntvMHCSmpJQYOK9qT3DjV9UGI8ghYUUmBI0KJ0p2RWBCgcgWKzIzKgKj4EMZgITlnrB6dNi2RLyE26IrGTJ4eaDk4MEtFm4cT3Tg5QVVXNR0YFwOFchRUwQmMgnMqFnIqqAuoCgcI53G7m7ti6PDDp43FhtGwgyGo6ePHjx44MiBg0ch+9dWVHVU793LeQucybJdABNMIkUIK7d74k3cAxAvrDSEsXbAM/pJl7CrqzSZI6Rwpuf2wMF4KvizpESv33rwqMXq0mgpeFdwphJ1NvY2Ck3Or33Qz6MkwecCXIC6te4xtaPDbu31JOkBVnIvLCLSYDhYciDFUGLggtVDYZ7E871djabUfieaCukDIaU4DJlAyWrd7k9XjwpbZ+m3FkUQ+jssJWIc8ODBg4ajBgOEELfv77CWFmrNXb1OZ5wN+TGUOiRCUAGKoOSoy+3Wjn5gKDTwW32xPjlZP9LugAEtcgAgshdvKEo6f6afy8hOp41lUa+T8VCUAkeFRve9S9kI2NYmlSusB9hdNgiEcUu57U5+C9vQcogFXc5VjP2rVLtZIFegZg2BC83d3d3u1aPCLtBkSlHKfWHcjyGBt2Gl+hYt2+90yoVm27gYhIlFyQZEiBFsV7fWnfHz0WDPXwh6i5L59y0uvg8sgrstrcSQEkrqBS86SZZBGYRJFbFCUxARYWYMlGWPesirsJR0FEXeNDmp+A4b4U99xJdcsG7X91lRcOIZEYuYGDvKpGIkNLask9FouwdeHg32fEu3vDgULkoqBnXFo8E44/9Q1Eeh/WecZ37M2BnG7hTZpSRhVuIiYUZG98Cm0WCVt1gUp48WF4V1Ol3RCGn3UAe9WlgEMvj4QO12RKRB7ISZxXGttKJ7QDvqWbkWGn4FMYukGpcjBYjhoqLi4qZRYPriPprzorOR8f8YsTOxDMswApIQQfrISFwyGuzXn3RBwrHbEIZUOUUel7U0RcdJvK+2yOuiFoofMgFjZxF7KnkDHbALKJWI8WRkaDeNBpvzCINC22C3M/JggpklFZjXTasNTUVhkJjEYe6BFSZzupz9rB2FrooYh5hwxi7CUIW2IiNj9COHcehaG2hDEMSsIkmRYh/Ru5/AKTftMBTfPYpJYMXJg17sR21mO8LGiUwQiWYUQz1S7TfM6GHYC3LUxnLqEPjmFClq9hP7cRwqAAIHp/LDWDRE5GFJhefQM8DqAtfD70xmU2MARcmdWq/2G704nEHkrNmMonwL1guauuSgDKpVaBoUApAIw5hcpAtFIgdghUksCzBnAwQHgppiWWEQZeO1CKmResq+/eRmKsDMZhZF0K795R1tv3HiQqVSroLuh8BUpICgpG7aklLMnSUEYB/NQOD39zt/f87mY6YIU2MnM05PI0ppPQPvPsAx0UmgzbwWRTZ3dOCKfWe78CrsRC9KChW4EtoiXABlDrFXqqEt+nBRqPA8wwnr7+03pfrQOqGQwGwqrRnVerQfvvggZ1ILWNY8k2HdtbSVltVW7du/v5cgEzBoNFBTQzyGV+917t8vFIHG0j692XyGD8deUxyaGk8QuBMNUGazVnr/guDe6mqNySlHq2mahrba4eiUnahWKqCyITARKoD/u1O+fz9BmEiRSR9lZNgzPK1XJIoREkoRbhJKRQgm1XoyHvC07YvPyklrp+M0wNTqzk6HxUG73NKgAhMKoHIiGLOiSxhvNlMtLSYOxuF6ExJEMQiCKwhMqkTdHm3ktM4DHe1dKNt4+vTpo5ajRy1q4KmtaocanKqhiHhT1352L/RurN0YZUDNLM/iYThr9oJ+nBHAkCV6X3xQ2M9mWCwbS7ccDh8+XKnj9Kn5Jz+dh6zGClypYs2kEGfUUR7mDA87w8GEwtjYSVi8l2QC3Kb7QPaDwk5bQFRROJ+122y1hdzQWQAJCrnnWnRzBcHNR+MOOYuiw8qEkwRxIiRVijr5QxIDqx8QJt6ZbNiye/dvfLZWxnfs1Dr+tJojYlYrTVvVVtfEuUIUNSPcpObGzATKgMZOwhC5W6pN1Ho2PRjs0COP5xiO7Dbb3nzt1JtvMb7TR7hSCsbPEoECziWTWGlcjsqdkXAchAmmQO8i8kq1ExJPPFiA7JqRRPqsLdX2zpf9x957t9X+ZsgyfJqRI+aoYULIaBftkZtZVs5HYyq0g0IF93ATGsiKjAmfrnkw2NEdOtSuK2KQU7t9vnds77xVu30nfzKUh512WA6v3z1vd47M5aIpM8py0s7cCQtIaydM+HTTg8EOzEg2NLVY/cx7ra3295jWrad3RgoqHrZxty5/5VpG3nmEBnUfQh6V82MmghDhYBjmlaLaMRkPdoQ+7w8p+qSmQqP/vZZW/3svHfehdDh5uFY8Gioy++x+m//YmwaZzEX/iTWficCgr47ApATjHvPyg8GSH+GKi8JmXw3znn3TG+DJ3duTh+o3w+F1jH9tq+1dm93/mloGOS0I89rZC+lqWBml3Dt+NC/eCfvhDG7lDxf5emybbH6bbe2W3frkwU6j5OBLrX77cf87byHvvfWamHvCa+1F2Dtg0MFQKveYTx/sJsKTj8zjy4y+4z2tPgTqzo27jwzDDlS+5Tt+HKYfYt9VzmzhskpT/w1z/xAsHhZaClc0D9Q+GOyHP+HrmaQiGDEb85vXc9cdPjLYQiUnH2j5je/ll35haz1+3H6s9VV16SHLTtRPe870imCecY+uQJmQavasfiBYniM5qQmkNR3Z3Xf63XetOt3WIxEYV+3rC1v9x48ztvf6jvv8b+ZZ6ENNVh/6cB17J4xwa0482IWOsNVqgTo/advhIwcqWwori4c6Gj1XvelbkGPvvMsce6HFfszerWvzoU3jxx+ycuvZIAzroDzuUUqCEbCkpBn8cesdBw7vPpysh+EqHgF7Z897u1oZpNXnG1cSbvB7Lca+gX4uQCIwDOtoK/OO7sVh2LwLISjXipNLIeUeLeFOsScNFaR8UaorOob4fK3X/TbUWvTq0c6Qy7KdPQMBYroNq/BKH/BeDG2BpqJSFz68+8BpWFhKITC4mm2YFmXd02P399jeyV1nMBzRHTGGjGhv7yBMMQirfdBLOE//eExnli4cCoWTincfKeEOr5fo9QAcLL6jOhmm9b38I5UHIHCKra4+ARRzw8pisKoyzyiL9N2TejGbWjd1jNWSpAsVVhYdSdYbLI5SaP2aIgpLCvte2l1ZmLyda5hCMkux+U4Y1gEwz79wvShNyAohe3uM9OndusKQbltRUQokYUNpSgmUw+EDBw6Hm1L4LiOpSFto5Ip9HqbgYW+cGMj4l+4yLURRlUCI4fuqNOrSJF1hoS6pSFdssKgdFoOhqBIqkyS+j9JZNX2EuZ+HqSLxEfjQc2LNv3ZxajWLQMXfSCgU+wW422oIA4/rfrmHLFBplUQ6Gn1Ie2gb50WIRpUyAvN6PG2b/tVbWtFcL8MqarhjaU4VruHHMKQDpAFKHhqARUDEW1xc/d07DItpO/GN3e0oN37SxqHQYshh4VcRSqWJVAKwNDnUzrUwxaVW7rKMwY31nedbptuwsopP077LZbcfgCehn7H7fCxpUgqEXaYE3E2XQjuhC4d1SRbaqNI3oXzBA7CEiBvLBsZu+i6wf2pZYLGoDWmUw+pPJigUItLJKTRAkIagTdNxxT5fFXQNwaZ+a+B/01UVSbxcnvBjKDrrcCHJsqQSekKlykQKKY21BII01NIIMDmvDNxI4B1VUk/Gd4T985/Sr8cYuysCwSBWvbdmfxfBtaCwHqtMKoHUaClUM1wtNwyrrmrTSld/9wuKEu2Jiu4MrceLVXdU71MIFfUKgYqVKykPoXISJGOWA4wLkAT4P3RUtX17LI5+jW/NCalnINHdra2C7kWphAaUZew+G6oSilQkF7DA6orAqIqBjP8dDOZ4RZs34O0eSJyQUUHhBEH0o5D4oclne1eyZjm3+wN1HFfsSAde/h7ueW76ZdmUr74qq9BmyIxSCt+PqrxdTu7BAjTFztRxqSAMqh1o3L+vS6WbVr+weKKW8KitzbUnqrgTCwR0xE5uZ2uckivjApRnzfcFA/v5EjV7zG+TaxzdlBSLJxT1hEKQ6kw1KSNe9K7+HmG/kFnpIGqzQ21VMVGrDeDxxL6GeFNqKgej2ga83+vd3Hyjy/HojEN77ftk0c5TX3nbvJPj4uIEIhGnrOrDiu/3IvCmNWsGPvtMbbGq9yHHZ/3fc1+PHSudEhMrbIAsPHHsy98vjOdlr8ke8xVr/vk/V/9y8Ya42JixYwMQLmN/lLjpe4dFgBveHLwl+mL2YvxcbF1d3dgfTfj/eVP89rTPfr089qtPV/9bYNysWJ39xqZ/F+zB7f8B+o0RntSgP3AAAAAASUVORK5CYII=',
    fromZigbee: [fzLocal.tuya_xocadinrail_switch, ],
    toZigbee: [tzLocal.state],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await reporting.bind(endpoint, coordinatorEndpoint, ['genBasic']);
    },
    exposes: [e.switch().setAccess('state', ea.STATE_SET), 
              e.voltage(), 
              e.power(), 
              e.current(), 
              e.energy(),
              exposes.text('threshold_1', ea.STATE),
              exposes.text('threshold1_value', ea.STATE),
              exposes.text('threshold_2', ea.STATE),
              exposes.text('threshold2_value', ea.STATE),
              exposes.text('alarm', ea.STATE),

              ] 
    
};

module.exports = definition;
            
            
            