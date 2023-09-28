const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const utils = require('zigbee-herdsman-converters/lib/utils');
const ota = require('zigbee-herdsman-converters/lib/ota');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const e = exposes.presets;
const ea = exposes.access;
const globalStore = require('zigbee-herdsman-converters/lib/store');

const definition = {
    fingerprint: [{modelID: 'TS0601', manufacturerName: '_TZE204_ztc6ggyl'}],
    model: 'TS0601_smart_human_presense_sensor',
    vendor: 'TuYa',
    description: 'Smart Human presence sensor',
    fromZigbee: [fz.tuya_smart_human_presense_sensor],
    toZigbee: [tz.tuya_smart_human_presense_sensor],
    exposes: [
        e.illuminance_lux(), e.presence(),
        exposes.numeric('target_distance', ea.STATE).withDescription('Distance to target').withUnit('m'),
        exposes.numeric('radar_sensitivity', ea.STATE_SET).withValueMin(0).withValueMax(9).withValueStep(1)
            .withDescription('sensitivity of the radar'),
        exposes.numeric('minimum_range', ea.STATE_SET).withValueMin(0).withValueMax(9.5).withValueStep(0.15)
            .withDescription('Minimum range').withUnit('m'),
        exposes.numeric('maximum_range', ea.STATE_SET).withValueMin(0).withValueMax(9.5).withValueStep(0.15)
            .withDescription('Maximum range').withUnit('m'),
        exposes.numeric('detection_delay', ea.STATE_SET).withValueMin(0).withValueMax(10).withValueStep(0.1)
            .withDescription('Detection delay').withUnit('s'),
        exposes.numeric('fading_time', ea.STATE_SET).withValueMin(0).withValueMax(1500).withValueStep(1)
            .withDescription('Fading time').withUnit('s'),
        // exposes.text('cli', ea.STATE).withDescription('not recognize'),
        exposes.enum('self_test', ea.STATE, Object.values(tuya.tuyaHPSCheckingResult))
            .withDescription('Self_test, possible resuts: checking, check_success, check_failure, others, comm_fault, radar_fault.'),
    ],
};

module.exports = definition;