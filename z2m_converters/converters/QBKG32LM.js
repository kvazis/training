// Название: Aqara smart wall switch H1 pro (with neutral, three rocker)
// Модель: QBKG32LM
// modelID: lumi.switch.n3acn1
// manufacturerName: LUMI

const fz = require( 'zigbee-herdsman-converters/converters/fromZigbee' );
const tz = require( 'zigbee-herdsman-converters/converters/toZigbee' );
const exposes = require( 'zigbee-herdsman-converters/lib/exposes' );
const reporting = require( 'zigbee-herdsman-converters/lib/reporting' );
const extend = require( 'zigbee-herdsman-converters/lib/extend' );
// const tuya = require( 'zigbee-herdsman-converters/lib/tuya' );
const e = exposes.presets;
const ea = exposes.access;

const definition = {
        zigbeeModel: [
            'lumi.switch.n3acn1'
            ],
        model: 'QBKG32LM',
        vendor: 'Aqara',
        description: 'Aqara smart wall switch H1 pro (with neutral, three rocker)',
        fromZigbee: [
            fz.on_off,
            fz.xiaomi_power,
            fz.xiaomi_multistate_action
            // fz.aqara_opple - Выпадает в ошибку 
            ],
        toZigbee: [
            tz.on_off, 
            tz.xiaomi_switch_operation_mode_opple, 
            tz.xiaomi_switch_power_outage_memory,
            tz.xiaomi_led_disabled_night
            ],
        meta: {multiEndpoint: true},
        extend: extend.switch(),
        exposes: [
            e.switch().withEndpoint('left'), e.switch().withEndpoint('center'), e.switch().withEndpoint('right'),
            e.power().withAccess(ea.STATE), e.energy(), e.voltage().withAccess(ea.STATE),
            e.power_outage_memory(), e.led_disabled_night(), e.temperature().withAccess(ea.STATE),
            e.action([
                'single_left', 'double_left', 'single_center', 'double_center',
                'single_right', 'double_right', 'single_left_center', 'double_left_center',
                'single_left_right', 'double_left_right', 'single_center_right', 'double_center_right',
                'single_all', 'double_all']),
            exposes.enum('operation_mode', ea.ALL, ['control_relay', 'decoupled'])
                .withDescription('Decoupled mode for left button')
                .withEndpoint('left'),
            exposes.enum('operation_mode', ea.ALL, ['control_relay', 'decoupled'])
                .withDescription('Decoupled mode for center button')
                .withEndpoint('center'),
            exposes.enum('operation_mode', ea.ALL, ['control_relay', 'decoupled'])
                .withDescription('Decoupled mode for right button')
                .withEndpoint('right'),
            ],
        endpoint: (device) => {
            return {'left': 1, 'center': 2, 'right': 3};
        },
        configure: async (device, coordinatorEndpoint, logger) => {
            await device.getEndpoint(1).write('aqaraOpple', {'mode': 1}, {manufacturerCode: 0x115f, disableResponse: true});
        },
        // onEvent: preventReset, - Выпадает в ошибку 
    };

module.exports = definition;