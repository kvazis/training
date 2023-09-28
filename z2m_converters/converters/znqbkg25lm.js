// Название: Aqara smart wall switch H1 MARS (neutral, double rocker)
// Модель: ZNQBKG25LM
// modelID: lumi.switch.acn030
// manufacturerName: LUMI

const fz = require( 'zigbee-herdsman-converters/converters/fromZigbee' );
const tz = require( 'zigbee-herdsman-converters/converters/toZigbee' );
const exposes = require( 'zigbee-herdsman-converters/lib/exposes' );
const reporting = require( 'zigbee-herdsman-converters/lib/reporting' );
const extend = require( 'zigbee-herdsman-converters/lib/extend' );
const e = exposes.presets;
const ea = exposes.access;

const definition = {
        zigbeeModel: [
            'lumi.switch.acn030'
            ],
        model: 'ZNQBKG25LM',
        vendor: 'Aqara',
        description: 'Aqara smart wall switch H1 MARS (neutral, double rocker)',
        fromZigbee: [fz.on_off, fz.xiaomi_power, fz.xiaomi_multistate_action],
        toZigbee: [tz.on_off, tz.xiaomi_switch_operation_mode_opple, tz.xiaomi_switch_power_outage_memory,
            tz.xiaomi_led_disabled_night, tz.xiaomi_flip_indicator_light],
        meta: {multiEndpoint: true},
        extend: extend.switch(),
        exposes: [
            e.switch().withEndpoint('left'), e.switch().withEndpoint('right'), e.power(), e.energy(), e.voltage(),
            e.device_temperature(), e.power_outage_memory(), e.led_disabled_night(), e.flip_indicator_light(),
            e.action([
                'single_left', 'single_right', 'single_both',
                'double_left', 'double_right', 'double_both']),
            exposes.enum('operation_mode', ea.ALL, ['control_relay', 'decoupled'])
                .withDescription('Decoupled mode for left button')
                .withEndpoint('left'),
            exposes.enum('operation_mode', ea.ALL, ['control_relay', 'decoupled'])
                .withDescription('Decoupled mode for right button')
                .withEndpoint('right'),
            ],
        endpoint: (device) => {
            return {'left': 1, 'right': 2};
        },
        configure: async (device, coordinatorEndpoint, logger) => {
            await device.getEndpoint(1).write('aqaraOpple', {'mode': 1}, {manufacturerCode: 0x115f, disableResponse: true});
        },
    };

module.exports = definition;