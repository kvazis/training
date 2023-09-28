const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const e = exposes.presets;

const definition = {
    fingerprint: [
        {
            modelID: 'TS0601',
            manufacturerName: '_TZE204_dqolcpcp',
        },
    ],
    zigbeeModel: ['TS0601'], // The model ID from: Device with modelID 'lumi.sens' is not supported.
    model: 'TS0601', // Vendor model number, look on the device for a model number
    vendor: 'Tuya', // Vendor of the device (only used for documentation and startup logging)
    description: '12 channels switch', // Description of the device, copy from vendor site. (only used for documentation and startup logging)
    exposes: [
        e.switch().withEndpoint('l1'),
        e.switch().withEndpoint('l2'),
        e.switch().withEndpoint('l3'),
        e.switch().withEndpoint('l4'),
        e.switch().withEndpoint('l5'),
        e.switch().withEndpoint('l6'),
        e.switch().withEndpoint('l7'),
        e.switch().withEndpoint('l8'),
        e.switch().withEndpoint('l9'),
        e.switch().withEndpoint('l10'),
        e.switch().withEndpoint('l11'),
        e.switch().withEndpoint('l12'),
    ],
    fromZigbee: [
        fz.ignore_basic_report, 
        tuya.fz.datapoints,
    ],
    toZigbee: [
        tuya.tz.datapoints,
    ],
    configure: async (device, coordinatorEndpoint, logger) => {
        await tuya.configureMagicPacket(device, coordinatorEndpoint, logger);
        await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['genOnOff']);
        await reporting.bind(device.getEndpoint(242), coordinatorEndpoint, ['genOnOff']);
        // await reporting.onOff(device.getEndpoint(1));
        // await reporting.onOff(device.getEndpoint(242));
    },
    endpoint: (x) => { 
        return {
            l1: 1,
            l2: 1,
            l3: 1,
            l4: 1,
            l5: 1,
            l6: 1,
            l7: 1,
            l8: 1,
            l9: 1,
            l10: 1,
            l11: 1,
            l12: 1,
        }
    },
    meta: {
        multiEndpoint: true,
        tuyaDatapoints: [
            [1, 'state_l1', tuya.valueConverter.onOff],
            [2, 'state_l2', tuya.valueConverter.onOff],
            [3, 'state_l3', tuya.valueConverter.onOff],
            [4, 'state_l4', tuya.valueConverter.onOff],
            [5, 'state_l5', tuya.valueConverter.onOff],
            [6, 'state_l6', tuya.valueConverter.onOff],
            [101, 'state_l7', tuya.valueConverter.onOff],
            [102, 'state_l8', tuya.valueConverter.onOff],
            [103, 'state_l9', tuya.valueConverter.onOff],
            [104, 'state_l10', tuya.valueConverter.onOff],
            [105, 'state_l11', tuya.valueConverter.onOff],
            [106, 'state_l12', tuya.valueConverter.onOff],
        ],
    },
};


module.exports = definition;
