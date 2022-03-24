// Название: Aqara Human body Exists Sensor FP1
// modelID: RTCZCGQ11LM
// manufacturerName: lumi.motion.ac01

const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const ota = require('zigbee-herdsman-converters/lib/ota');
const herdsman = require('zigbee-herdsman');
const e = exposes.presets;
const ea = exposes.access;
const manufacturerOptions = {
    xiaomi: {manufacturerCode: herdsman.Zcl.ManufacturerCode.LUMI_UNITED_TECH, disableDefaultResponse: true},
};

const fzLocal = {
    RTCZCGQ11LM: {
        cluster: 'aqaraOpple',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('322')) {
                return {presence: msg.data['322'] === 1};
            }
            if (msg.data.hasOwnProperty('323')) {
                return {presence_event: {0: 'enter', 1: 'leave', 2: 'left_enter', 3: 'right_leave', 4: 'right_enter', 5: 'left_leave',
                    6: 'approach', 7: 'away'}[msg.data['323']]};
            }
            if (msg.data.hasOwnProperty('324')) {
                return {monitoring_mode: msg.data['324'] === 1 ? 'left_right' : 'undirected'};
            }
            if (msg.data.hasOwnProperty('326')) {
                return {approach_distance: {0: 'far', 1: 'medium', 2: 'near'}[msg.data['326']]};
            }
        },
    }
}

const tzLocal = {
    RTCZCGQ11LM_presence: {
        key: ['presence'],
        convertGet: async (entity, key, meta) => {
            await entity.read('aqaraOpple', [0x0142], manufacturerOptions.xiaomi);
        },
    },
    RTCZCGQ11LM_monitoring_mode: {
        key: ['monitoring_mode'],
        convertSet: async (entity, key, value, meta) => {
            value = value.toLowerCase();
            const lookup = {'undirected': 0, 'left_right': 1};
            await entity.write('aqaraOpple', {0x0144: {value: lookup[value], type: 0x20}}, manufacturerOptions.xiaomi);
            return {state: {monitoring_mode: value}};
        },
        convertGet: async (entity, key, meta) => {
            await entity.read('aqaraOpple', [0x0144], manufacturerOptions.xiaomi);
        },
    },
    RTCZCGQ11LM_approach_distance: {
        key: ['approach_distance'],
        convertSet: async (entity, key, value, meta) => {
            value = value.toLowerCase();
            const lookup = {'far': 0, 'medium': 1, 'near': 2};
            await entity.write('aqaraOpple', {0x0146: {value: lookup[value], type: 0x20}}, manufacturerOptions.xiaomi);
            return {state: {approach_distance: value}};
        },
        convertGet: async (entity, key, meta) => {
            await entity.read('aqaraOpple', [0x0146], manufacturerOptions.xiaomi);
        },
    }
}

const definition = {
    zigbeeModel: ['lumi.motion.ac01'],
    model: 'RTCZCGQ11LM',
    vendor: 'Xiaomi',
    description: 'Aqara Presence Detector FP1 (regions not supported for now)',
    fromZigbee: [fzLocal.RTCZCGQ11LM, fz.aqara_opple],
    toZigbee: [tzLocal.RTCZCGQ11LM_presence, tzLocal.RTCZCGQ11LM_monitoring_mode, tzLocal.RTCZCGQ11LM_approach_distance],
    exposes: [e.presence().withAccess(ea.STATE_GET), exposes.text('presence_event', ea.STATE).withDescription('Presence ' +
        'events: "enter", "leave", "left_enter", "right_leave", "right_enter", "left_leave", "approach", "away"'),
        exposes.enum('monitoring_mode', ea.ALL, ['undirected', 'left_right']).withDescription('Monitoring mode with or ' +
            'without considering right and left sides'),
        exposes.enum('approach_distance', ea.ALL, ['far', 'medium', 'near']).withDescription('The distance at which the ' +
            'sensor detects approaching')],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await endpoint.read('aqaraOpple', [0x0142], {manufacturerCode: 0x115f});
        await endpoint.read('aqaraOpple', [0x0144], {manufacturerCode: 0x115f});
        await endpoint.read('aqaraOpple', [0x0146], {manufacturerCode: 0x115f});
    },
    ota: ota.zigbeeOTA,
};

module.exports = definition;