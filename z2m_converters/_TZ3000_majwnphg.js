// Название: Girier Zigbee Mini Smart Switch
// Модель: JR-ZDS01
// modelID: TS0001
// manufacturerName: _TZ3000_majwnphg

const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    fingerprint: [{modelID: 'TS0001', manufacturerName: '_TZ3000_majwnphg'}],
        model: 'JR-ZDS01',
        vendor: 'Girier',
        description: 'Automatic Switch',
        toZigbee: extend.switch().toZigbee.concat([tz.moes_power_on_behavior]),
        fromZigbee: extend.switch().fromZigbee.concat([fz.moes_power_on_behavior]),
        exposes: extend.switch().exposes.concat([exposes.enum('power_on_behavior', ea.ALL, ['off', 'previous', 'on'])
            .withDescription('Controls the behaviour when the device is powered on')]),
        configure: async (device, coordinatorEndpoint, logger) => {
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['genOnOff']);
        },
    };

module.exports = definition;