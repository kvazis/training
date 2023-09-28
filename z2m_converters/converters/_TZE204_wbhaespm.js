const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');

const definition = {
    // Since a lot of TuYa devices use the same modelID, but use different datapoints
    // it's necessary to provide a fingerprint instead of a zigbeeModel
    fingerprint: [
        {
            // The model ID from: Device with modelID 'TS0601' is not supported
            // You may need to add \u0000 at the end of the name in some cases
            modelID: 'TS0601',
            // The manufacturer name from: Device with modelID 'TS0601' is not supported.
            manufacturerName: '_TZE204_wbhaespm',
        },
    ],
    model: 'TS0601',
    vendor: 'TuYa',
    description: 'SMTONOFF power meter',
    fromZigbee: [tuya.fz.datapoints],
    toZigbee: [tuya.tz.datapoints],
    onEvent: tuya.onEventSetTime, // Add this if you are getting no converter for 'commandMcuSyncTime'
    configure: tuya.configureMagicPacket,
    exposes: [
        // Here you should put all functionality that your device exposes
        e.voltage(), e.power(), e.current(), e.energy()
    ],
    meta: {
        // All datapoints go in here
        tuyaDatapoints: [
            [1, 'energy', tuya.valueConverter.divideBy100],
            [6, null, tuya.valueConverter.phaseVariant2],
            [16, 'switch', tuya.valueConverter.onOff]
        ],
    },
};

module.exports = definition;