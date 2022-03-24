// Название: Aqara smart wall switch H1 pro (no neutral, double rocker)
// Модель: QBKG28LM
// modelID: lumi.switch.l2acn1
// manufacturerName: LUMI

const exposes = require('zigbee-herdsman-converters/lib/exposes');
const fz = {...require('zigbee-herdsman-converters/converters/fromZigbee'), legacy: require('zigbee-herdsman-converters/lib/legacy').fromZigbee};
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const extend = require('zigbee-herdsman-converters/lib/extend');
const utils = require('zigbee-herdsman-converters/lib/utils');
const herdsman = require('zigbee-herdsman');
const e = exposes.presets;
const ea = exposes.access;

const manufacturerOptions = {
    xiaomi: {manufacturerCode: herdsman.Zcl.ManufacturerCode.LUMI_UNITED_TECH, disableDefaultResponse: true},
};

const cfz = {
    xiaomi_multistate_action: {
        cluster: 'genMultistateInput',
        type: ['attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            if (utils.hasAlreadyProcessedMessage(msg)) return;
            let actionLookup = {0: 'hold', 1: 'single', 2: 'double', 3: 'triple', 255: 'release'};
            if (model.model === 'WXKG12LM') {
                actionLookup = {...actionLookup, 16: 'hold', 17: 'release', 18: 'shake'};
            }

            let buttonLookup = null;
            if (['WXKG02LM_rev2', 'WXKG07LM', 'WXKG17LM'].includes(model.model)) buttonLookup = {1: 'left', 2: 'right', 3: 'both'};
            if (['QBKG12LM', 'QBKG24LM'].includes(model.model)) buttonLookup = {5: 'left', 6: 'right', 7: 'both'};
            if (['QBKG25LM'].includes(model.model)) buttonLookup = {41: 'left', 42: 'center', 43: 'right'};
            if (['QBKG39LM', 'QBKG41LM', 'WS-EUK02', 'WS-EUK04', 'QBKG20LM', 'QBKG31LM', 'QBKG28LM'].includes(model.model)) {
                buttonLookup = {41: 'left', 42: 'right', 51: 'both'};
            }
            if (['QBKG26LM', 'QBKG34LM'].includes(model.model)) {
                buttonLookup = {
                    41: 'left', 42: 'center', 43: 'right',
                    51: 'left_center', 52: 'left_right', 53: 'center_right',
                    61: 'all',
                };
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
};

const ctz = {
    xiaomi_switch_power_outage_memory: {
        key: ['power_outage_memory'],
        convertSet: async (entity, key, value, meta) => {
            if (['ZNCZ04LM', 'QBKG25LM', 'SSM-U01', 'SSM-U02', 'DLKZMK11LM', 'DLKZMK12LM', 'QBKG39LM', 'QBKG41LM', 'ZNCZ15LM',
                'WS-EUK01', 'WS-EUK02', 'WS-EUK03', 'WS-EUK04', 'QBKG31LM', 'QBCZ15LM', 'QBKG20LM', 'QBKG38LM',
                'QBKG34LM', 'QBCZ14LM', 'QBKG19LM', 'QBKG40LM', 'QBKG28LM'].includes(meta.mapped.model)) {
                await entity.write('aqaraOpple', {0x0201: {value: value ? 1 : 0, type: 0x10}}, manufacturerOptions.xiaomi);
            } else if (['ZNCZ02LM', 'QBCZ11LM'].includes(meta.mapped.model)) {
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
            if (['ZNCZ04LM', 'QBKG25LM', 'SSM-U01', 'SSM-U02', 'DLKZMK11LM', 'DLKZMK12LM', 'QBKG39LM', 'QBKG41LM', 'ZNCZ15LM',
                'WS-EUK01', 'WS-EUK02', 'QBKG31LM', 'QBCZ15LM', 'QBKG20LM', 'QBKG38LM',
                'QBKG34LM', 'QBCZ14LM', 'QBKG19LM', 'QBKG40LM', 'QBKG28LM'].includes(meta.mapped.model)) {
                await entity.read('aqaraOpple', [0x0201]);
            } else if (['ZNCZ02LM', 'QBCZ11LM', 'ZNCZ11LM'].includes(meta.mapped.model)) {
                await entity.read('aqaraOpple', [0xFFF0]);
            } else {
                throw new Error('Not supported');
            }
        },
    },
};

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
};

const definition = {
    zigbeeModel: ['lumi.switch.l2acn1'],
    model: 'QBKG28LM',
    vendor: 'Xiaomi',
    description: 'Aqara smart wall switch H1 Pro (no neutral, double rocker)',
    fromZigbee: [fz.on_off, fz.aqara_opple, cfz.xiaomi_multistate_action],
    toZigbee: [tz.on_off, tz.xiaomi_switch_operation_mode_opple, ctz.xiaomi_switch_power_outage_memory],
    extend: extend.switch(),
    exposes: [e.power_outage_memory(), e.action(['single_left', 'double_left', 'single_right', 'double_right', 'single_both', 'double_both']),
        e.switch().withEndpoint('left'), e.switch().withEndpoint('right'),
        exposes.enum('operation_mode', ea.ALL, ['control_relay', 'decoupled']).withDescription('Decoupled mode for left button').withEndpoint('left'),
        exposes.enum('operation_mode', ea.ALL, ['control_relay', 'decoupled']).withDescription('Decoupled mode for right button').withEndpoint('right')],
    meta: {multiEndpoint: true},
    endpoint: (device) => {
        return {'left': 1, 'right': 2};
    },
    configure: async (device, coordinatorEndpoint, logger) => {
        await device.getEndpoint(1).write('aqaraOpple', {'mode': 1}, {manufacturerCode: 0x115f, disableResponse: true});
    },
    onEvent: preventReset,
};

module.exports = definition;