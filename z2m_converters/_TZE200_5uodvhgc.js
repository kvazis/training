// Название: FrankEver Tuya Zigbee Valve
// Модель: FK_V02
// manufacturerName: _TZE200_5uodvhgc

const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const globalStore = require('zigbee-herdsman-converters/lib/store');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
        fingerprint: [{modelID: 'TS0601', manufacturerName: '_TZE200_5uodvhgc'}],
        model: 'FK_V02',
        vendor: 'FrankEver',
        description: 'Zigbee smart water valve',
        fromZigbee: [fz.frankever_valve],
        toZigbee: [tz.tuya_switch_state, tz.frankever_threshold, tz.frankever_timer],
        exposes: [e.switch().setAccess('state', ea.STATE_SET),
            exposes.numeric('threshold', exposes.access.STATE_SET).withValueMin(0).withValueMax(100).withUnit('%')
                .withDescription('Valve open percentage (multiple of 10)'),
            exposes.numeric('timer', exposes.access.STATE_SET).withValueMin(0).withValueMax(600).withUnit('minutes')
                .withDescription('Countdown timer in minutes')],
};

module.exports = definition;