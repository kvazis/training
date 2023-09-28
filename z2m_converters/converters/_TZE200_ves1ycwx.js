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
            manufacturerName: '_TZE200_ves1ycwx',
        },
    ],
        model: 'SPM02',
        vendor: 'TuYa',
        description: 'Smart energy monitor for 3P+N system',
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        configure: tuya.configureMagicPacket,
        exposes: [tuya.exposes.voltageWithPhase('X'), tuya.exposes.voltageWithPhase('Y'), tuya.exposes.voltageWithPhase('Z'),
            tuya.exposes.powerWithPhase('X'), tuya.exposes.powerWithPhase('Y'), tuya.exposes.powerWithPhase('Z'),
            tuya.exposes.currentWithPhase('X'), tuya.exposes.currentWithPhase('Y'), tuya.exposes.currentWithPhase('Z'),
            // Change the description according to the specifications of the device
            e.energy().withDescription('Total forward active energy'),
            e.produced_energy().withDescription('Total reverse active energy'),
        ],
    meta: {
        tuyaDatapoints: [
            [1, 'energy', tuya.valueConverter.divideBy100],
            [2, 'produced_energy', tuya.valueConverter.divideBy100],
            [6, null, tuya.valueConverter.phaseVariant2WithPhase('X')],
            [7, null, tuya.valueConverter.phaseVariant2WithPhase('Y')],
            [8, null, tuya.valueConverter.phaseVariant2WithPhase('Z')],
            ],
    },
};


module.exports = definition;