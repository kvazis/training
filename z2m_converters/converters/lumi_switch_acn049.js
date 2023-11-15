const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');

//. PLEASE READ: These are present from device/xiaomi.ts, only needed for external converter
const ota = require('zigbee-herdsman-converters/lib/ota');
const herdsman = require('zigbee-herdsman');
const e = exposes.presets;
const ea = exposes.access;

const manufacturerOptions = {
    xiaomi: {manufacturerCode: herdsman.Zcl.ManufacturerCode.LUMI_UNITED_TECH, disableDefaultResponse: true},
};

const { hasAlreadyProcessedMessage } = require('zigbee-herdsman-converters/lib/utils');


//. PLEASE READ: These should be update to FromZigbee.js 
const fzLocal = {
    xiaomi_multistate_action: {
        cluster: 'genMultistateInput',
        type: ['attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            if (hasAlreadyProcessedMessage(msg, model)) return;
            let actionLookup = {0: 'hold', 1: 'single', 2: 'double', 3: 'triple', 255: 'release'};
            if (model.model === 'WXKG12LM') {
                actionLookup = {...actionLookup, 16: 'hold', 17: 'release', 18: 'shake'};
            }
            if (['WXKG02LM_rev2', 'WXKG07LM', 'WXKG15LM', 'WXKG17LM'].includes(model.model)) {
                buttonLookup = {1: 'left', 2: 'right', 3: 'both'};
            }
            if (['ZNQBKG39LM'].includes(model.model)) {
                buttonLookup = {1: 'button_1', 2: 'button_2'};
            }
            if (['ZNQBKG40LM'].includes(model.model)) {
                buttonLookup = {1: 'button_1', 2: 'button_2', 3: 'button_3'};
            }
            if (['QBKG12LM', 'QBKG24LM'].includes(model.model)) buttonLookup = {5: 'left', 6: 'right', 7: 'both'};
            if (['QBKG39LM', 'QBKG41LM', 'WS-EUK02', 'WS-EUK04', 'QBKG20LM', 'QBKG28LM', 'QBKG31LM'].includes(model.model)) {
                buttonLookup = {41: 'left', 42: 'right', 51: 'both'};
            }
            if (['QBKG25LM', 'QBKG26LM', 'QBKG29LM', 'QBKG34LM', 'ZNQBKG31LM', 'ZNQBKG26LM'].includes(model.model)) {
                buttonLookup = {
                    41: 'left', 42: 'center', 43: 'right',
                    51: 'left_center', 52: 'left_right', 53: 'center_right',
                    61: 'all',
                };
            }
            if (['WS-USC02', 'WS-USC04'].includes(model.model)) {
                buttonLookup = {41: 'top', 42: 'bottom', 51: 'both'};
            }

            const action = actionLookup[msg.data['presentValue']];
            if (buttonLookup) {
                const button = buttonLookup[msg.endpoint.ID];
                if (button) {
                    return {action: `${action}_${button}`};
                }
            } else {
                return {action};
            }
        },
    },
};  // PLEASE READ: THE END OF THE BLOCK THAT CAN BE DELETE WHEN MERGING WITH FromZigbee.js


// PLEASE READ: These should be update to ToZigbee.js 
const tzLocal = {
    xiaomi_switch_power_outage_memory: {
        key: ['power_outage_memory'],
        convertSet: async (entity, key, value, meta) => {
            if (['SP-EUC01', 'ZNCZ04LM', 'ZNCZ12LM', 'ZNCZ15LM', 'QBCZ14LM', 'QBCZ15LM', 'SSM-U01', 'SSM-U02', 'DLKZMK11LM', 'DLKZMK12LM',
                'WS-EUK01', 'WS-EUK02', 'WS-EUK03', 'WS-EUK04', 'QBKG19LM', 'QBKG20LM', 'QBKG25LM', 'QBKG26LM', 'QBKG28LM', 'QBKG29LM',
                'QBKG31LM', 'QBKG34LM', 'QBKG38LM', 'QBKG39LM', 'QBKG40LM', 'QBKG41LM', 'ZNDDMK11LM', 'ZNLDP13LM', 'ZNQBKG31LM',
                'WS-USC02', 'WS-USC03', 'WS-USC04', 'ZNQBKG24LM', 'ZNQBKG24LM', 'ZNQBKG39LM', 'ZNQBKG40LM'
            ].includes(meta.mapped.model)) {
                await entity.write('aqaraOpple', {0x0201: {value: value ? 1 : 0, type: 0x10}}, manufacturerOptions.xiaomi);
            } else if (['ZNCZ02LM', 'QBCZ11LM', 'LLKZMK11LM'].includes(meta.mapped.model)) {
                const payload = value ?
                    [[0xaa, 0x80, 0x05, 0xd1, 0x47, 0x07, 0x01, 0x10, 0x01], [0xaa, 0x80, 0x03, 0xd3, 0x07, 0x08, 0x01]] :
                    [[0xaa, 0x80, 0x05, 0xd1, 0x47, 0x09, 0x01, 0x10, 0x00], [0xaa, 0x80, 0x03, 0xd3, 0x07, 0x0a, 0x01]];

                await entity.write('genBasic', {0xFFF0: {value: payload[0], type: 0x41}}, manufacturerOptions.xiaomi);
                await entity.write('genBasic', {0xFFF0: {value: payload[1], type: 0x41}}, manufacturerOptions.xiaomi);
            } else if (['ZNCZ11LM'].includes(meta.mapped.model)) {
                const payload = value ?
                    [0xaa, 0x80, 0x05, 0xd1, 0x47, 0x00, 0x01, 0x10, 0x01] :
                    [0xaa, 0x80, 0x05, 0xd1, 0x47, 0x01, 0x01, 0x10, 0x00];

                await entity.write('genBasic', {0xFFF0: {value: payload, type: 0x41}}, manufacturerOptions.xiaomi);
            } else {
                throw new Error('Not supported');
            }
            return {state: {power_outage_memory: value}};
        },
        convertGet: async (entity, key, meta) => {
            if (['SP-EUC01', 'ZNCZ04LM', 'ZNCZ12LM', 'ZNCZ15LM', 'QBCZ14LM', 'QBCZ15LM', 'SSM-U01', 'SSM-U02', 'DLKZMK11LM', 'DLKZMK12LM',
                'WS-EUK01', 'WS-EUK02', 'WS-EUK03', 'WS-EUK04', 'QBKG19LM', 'QBKG20LM', 'QBKG25LM', 'QBKG26LM', 'QBKG28LM', 'QBKG29LM',
                'QBKG31LM', 'QBKG34LM', 'QBKG38LM', 'QBKG39LM', 'QBKG40LM', 'QBKG41LM', 'ZNDDMK11LM', 'ZNLDP13LM', 'ZNQBKG31LM',
                'WS-USC02', 'WS-USC03', 'WS-USC04', 'ZNQBKG24LM', 'ZNQBKG39LM', 'ZNQBKG40LM'
            ].includes(meta.mapped.model)) {
                await entity.read('aqaraOpple', [0x0201]);
            } else if (['ZNCZ02LM', 'QBCZ11LM', 'ZNCZ11LM'].includes(meta.mapped.model)) {
                await entity.read('aqaraOpple', [0xFFF0]);
            } else {
                throw new Error('Not supported');
            }
        },
    },
    xiaomi_led_disabled_night: {
        key: ['led_disabled_night'],
        convertSet: async (entity, key, value, meta) => {
            if (['ZNCZ04LM', 'ZNCZ12LM', 'ZNCZ15LM', 'QBCZ14LM', 'QBCZ15LM', 'QBKG19LM', 'QBKG20LM', 'QBKG25LM', 'QBKG26LM',
                'QBKG28LM', 'QBKG29LM', 'QBKG31LM', 'QBKG34LM', 'DLKZMK11LM', 'SSM-U01', 'WS-EUK01', 'WS-EUK02',
                'WS-EUK03', 'WS-EUK04', 'SP-EUC01', 'ZNQBKG24LM', 'ZNQBKG39LM', 'ZNQBKG40LM'].includes(meta.mapped.model)) {
                await entity.write('aqaraOpple', {0x0203: {value: value ? 1 : 0, type: 0x10}}, manufacturerOptions.xiaomi);
            } else if (['ZNCZ11LM'].includes(meta.mapped.model)) {
                const payload = value ?
                    [0xaa, 0x80, 0x05, 0xd1, 0x47, 0x00, 0x03, 0x10, 0x00] :
                    [0xaa, 0x80, 0x05, 0xd1, 0x47, 0x01, 0x03, 0x10, 0x01];

                await entity.write('genBasic', {0xFFF0: {value: payload, type: 0x41}}, manufacturerOptions.xiaomi);
            } else {
                throw new Error('Not supported');
            }
            return {state: {led_disabled_night: value}};
        },
        convertGet: async (entity, key, meta) => {
            if (['ZNCZ04LM', 'ZNCZ12LM', 'ZNCZ15LM', 'QBCZ15LM', 'QBCZ14LM', 'QBKG19LM', 'QBKG20LM', 'QBKG25LM', 'QBKG26LM',
                'QBKG28LM', 'QBKG29LM', 'QBKG31LM', 'QBKG34LM', 'DLKZMK11LM', 'SSM-U01', 'WS-EUK01', 'WS-EUK02',
                'WS-EUK03', 'WS-EUK04', 'SP-EUC01', 'ZNQBKG24LM', 'ZNQBKG39LM', 'ZNQBKG40LM'].includes(meta.mapped.model)) {
                await entity.read('aqaraOpple', [0x0203], manufacturerOptions.xiaomi);
            } else {
                throw new Error('Not supported');
            }
        },
    },
    
}; // PLEASE READ: THE END OF THE BLOCK THAT CAN BE DELETE WHEN MERGING WITH ToZigbee.js


// PLEASE READ: These should be update to  /devices/xiaomi.js 
const preventReset = async (type, data, device) => { 
    if (
        // options.allow_reset ||
        type !== 'message' ||
        data.type !== 'attributeReport' ||
        data.cluster !== 'genBasic' ||
        !data.data[0xfff0] ||
        // eg: [0xaa, 0x10, 0x05, 0x41, 0x87, 0x01, 0x01, 0x10, 0x00]
        !data.data[0xFFF0].slice(0, 5).equals(Buffer.from([0xaa, 0x10, 0x05, 0x41, 0x87]))
    ) {
        return;
    }
    const options = {manufacturerCode: 0x115f};
    const payload = {[0xfff0]: {
        value: [0xaa, 0x10, 0x05, 0x41, 0x47, 0x01, 0x01, 0x10, 0x01],
        type: 0x41,
    }};
    await device.getEndpoint(1).write('genBasic', payload, options);
}; // PLEASE READ: THE END OF THE BLOCK THAT CAN BE DELETE WHEN MERGING WITH XIAOMI.JS


const definition = {
    zigbeeModel: ['lumi.switch.acn049'], // The model ID from: Device with modelID 'lumi.sens' is not supported.
    model: 'ZNQBKG39LM', // Vendor model number, look on the device for a model number
    vendor: 'Xiaomi', // Vendor of the device (only used for documentation and startup logging)
    description: 'Aqara Z1 2 gang smart wall switch', // Description of the device, copy from vendor site. (only used for documentation and startup logging)
    fromZigbee: [fz.on_off, fzLocal.xiaomi_multistate_action, fz.aqara_opple, fz.xiaomi_power],
    toZigbee: [tz.on_off, tz.xiaomi_switch_operation_mode_opple, tz.xiaomi_flip_indicator_light, tzLocal.xiaomi_switch_power_outage_memory, tzLocal.xiaomi_led_disabled_night],
    endpoint: (device) => {
        return {'button_1': 1, 'button_2': 2};
    },
    meta: {multiEndpoint: true},
    exposes: [
        e.power(), e.voltage(), e.device_temperature(), e.power_outage_memory(), e.led_disabled_night(), e.flip_indicator_light(), 
        e.switch().withEndpoint('button_1'), e.switch().withEndpoint('button_2'),
        exposes.enum('operation_mode', ea.ALL, ['control_relay', 'decoupled'])
                .withDescription('Decoupled mode for button1 (Top) button').withEndpoint('button_1'),
        exposes.enum('operation_mode', ea.ALL, ['control_relay', 'decoupled'])
                .withDescription('Decoupled mode for button 2 (Buttom) button').withEndpoint('button_2'),
        exposes.enum('click_mode', ea.ALL, ['fast', 'multi'])
                .withDescription('Click mode, fast: only supports single click which will be send immediately after clicking.' +
                    'multi: supports more events like double and hold'),
        e.action(['button_1_single', 'button_2_single', 'button_1_double', 'button_2_double', 'all_single', 'all_double']),
    ],
    onEvent: preventReset,
    configure: async (device, coordinatorEndpoint, logger) => {
        await device.getEndpoint(1).write('aqaraOpple', {'mode': 1}, {manufacturerCode: 0x115f, disableResponse: true});
//        await device.getEndpoint(1).write('aqaraOpple', {0x0125: {value: 0x02, type: 0x20}}, {manufacturerCode: 0x115f});
    },

};

module.exports = definition;