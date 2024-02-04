const zigbeeHerdsmanConverters = require('zigbee-herdsman-converters');
const zigbeeHerdsmanUtils = require('zigbee-herdsman-converters/lib/utils');

const lumi = require('zigbee-herdsman-converters/lib/lumi');
const {deviceEndpoints, electricityMeter, onOff} = require('zigbee-herdsman-converters/lib/modernExtend');
const fz = zigbeeHerdsmanConverters.fromZigbeeConverters || zigbeeHerdsmanConverters.fromZigbee;
const tz = zigbeeHerdsmanConverters.toZigbeeConverters || zigbeeHerdsmanConverters.toZigbee;
const exposes = zigbeeHerdsmanConverters['exposes'] || require("zigbee-herdsman-converters/lib/exposes");
const ea = exposes.access;
const e = exposes.presets;

const preventReset = async (type, data, device) => { 
    if (
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
    zigbeeModel: ['lumi.switch.acn059'],
    model: 'ZNQBKG45LM',
    vendor: 'Aqara',
    description: 'Smart wall switch Z1 pro (quadruple rocker)',
    fromZigbee: [fz.on_off, fz.lumi_multistate_action, lumi.fromZigbee.lumi_specific],
    toZigbee: [tz.on_off, tz.lumi_switch_operation_mode_opple, tz.lumi_switch_power_outage_memory,
        tz.lumi_flip_indicator_light, tz.lumi_led_disabled_night],
    endpoint: (device) => {
        return {'button_1': 1, 'button_2': 2, 'button_3': 3,  'button_4': 4};
    },
    exposes: [
        e.power(), e.voltage(), e.device_temperature(),
        e.switch().withEndpoint('button_1'), e.switch().withEndpoint('button_2'), e.switch().withEndpoint('button_3'),
        exposes.enum('power_outage_memory', ea.ALL, ['on', 'electric_appliances_on', 'electric_appliances_off', 'Inverted'])
                .withDescription('Power Outage Memory'),
        exposes.enum('operation_mode', ea.ALL, ['control_relay', 'decoupled'])
                .withDescription('Decoupled mode for button1 (Top) button')
                .withEndpoint('button_1'),
        exposes.enum('operation_mode', ea.ALL, ['control_relay', 'decoupled'])
                .withDescription('Decoupled mode for button 2 (Middle) button')
                .withEndpoint('button_2'),
        exposes.enum('operation_mode', ea.ALL, ['control_relay', 'decoupled'])
                .withDescription('Decoupled mode for button 3 (Buttom) button')
                .withEndpoint('button_3'),
        
        exposes.enum('lock_relay', ea.ALL, ['On', 'Off'])
                .withDescription('Lock Relay mode for button1 (Top) button')
                .withEndpoint('button_1'),
        exposes.enum('lock_relay', ea.ALL, ['On', 'Off'])
                .withDescription('Lock Relay for button 2 (Middle) button')
                .withEndpoint('button_2'),
        exposes.enum('lock_relay', ea.ALL, ['On', 'Off'])
                .withDescription('Lock Relay for button 3 (Buttom) button')
                .withEndpoint('button_3'),

        exposes.enum('click_mode', ea.ALL, ['fast', 'multi'])
                .withDescription('Click mode (Button 4 Only), fast: only supports single click which will be send immediately after clicking.' +
                    'multi: supports more events like double and hold'),

        e.action([
        			'button_1_single', 'button_2_single', 'button_3_single', 'button_4_single', 'button_4_double','button_4_hold', 'button_4_release',
                    ]),
    ],
    meta: {"multiEndpoint":true},
    onEvent: preventReset,
    configure: async (device, coordinatorEndpoint, logger) => {
        await device.getEndpoint(1).write('manuSpecificLumi', {'mode': 1}, {manufacturerCode: manufacturerCode, disableResponse: true});
    },
};

module.exports = definition;