const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;


const definition = {
    fingerprint: [
        {modelID: 'TS0601', manufacturerName: '_TZE204_mhxn2jso'},
    ],
    model: 'rtsc11r', 
    vendor: 'TuYa',
    description: '5.8G microvawe human presence sensor',
    configure: tuya.configureMagicPacket,
    fromZigbee: [tuya.fz.datapoints],
    toZigbee: [tuya.tz.datapoints],
    onEvent: tuya.onEventSetTime, 
    exposes: [
      e.enum('presence_state',ea.STATE,['none','presence']).withDescription('none : did not checkout '),
      e.numeric('dis_current',ea.STATE).withValueMin(0).withValueMax(1000).withValueStep(1)
          .withDescription('Entry distance indentation').withUnit('cm'),
      e.numeric('illuminance_value',ea.STATE).withValueMin(0).withValueMax(10000).withValueStep(1)
          .withDescription('Illumination threshold for switching on').withUnit('lux'),

      e.numeric('presence_time',ea.STATE_SET).withValueMin(1).withValueMax(3600).withValueStep(1)
          .withDescription('Entry filter time').withUnit('s'),
      e.numeric('sensitivity',ea.STATE_SET).withValueMin(0).withValueMax(10).withValueStep(1)
          .withDescription('Sensitivity of sensors'),
      e.numeric('presence_delay',ea.STATE_SET).withValueMin(5).withValueMax(3600).withValueStep(1)
        .withDescription('Turn off delay').withUnit('s'),
      e.numeric('minimum_range',ea.STATE_SET).withValueMin(0).withValueMax(1000).withValueStep(50)
        .withDescription('Detection range').withUnit('m'),
      e.numeric('maximum_range',ea.STATE_SET).withValueMin(50).withValueMax(1000).withValueStep(50)
        .withDescription('Detection range').withUnit('m'),
    ],
    meta: {
        tuyaDatapoints:[
          [1, 'presence_state', tuya.valueConverterBasic.lookup({'none': tuya.enum(0), 'presence': tuya.enum(1)})],
          [12,'presence_time',tuya.valueConverter.divideBy10],
          [19,'dis_current',tuya.valueConverter.raw],
          [20,'illuminance_value',tuya.valueConverter.raw],
          [101,'sensitivity',tuya.valueConverter.divideBy10],
          [102,'presence_delay',tuya.valueConverter.raw],
          [111,'minimum_range',tuya.valueConverter.divideBy100],
          [112,'maximum_range',tuya.valueConverter.divideBy100],
        ],
    },
};

module.exports = definition;