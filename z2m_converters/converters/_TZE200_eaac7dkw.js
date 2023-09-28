const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require("zigbee-herdsman-converters/lib/tuya");


const definition = {

        fingerprint: tuya.fingerprint('TS0601', ['_TZE200_eaac7dkw']),
        model: 'TS0601_din_2',
        vendor: 'TuYa',
        description: 'Zigbee DIN energy meter',
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        configure: tuya.configureMagicPacket,
        whiteLabel: [{vendor: 'XOCA', model: 'DAC2161C'}],
        exposes: [tuya.exposes.switch(), e.energy(), e.power(), e.voltage(), e.current(),
            exposes.enum('fault', ea.STATE, ['clear', 'over_current_threshold', 'over_power_threshold',
                'over_voltage threshold', 'wrong_frequency_threshold']).withDescription('Fault status of the device (clear = nothing)'),
            exposes.enum('threshold_1', ea.STATE, ['not_set', 'over_current_threshold', 'over_voltage_threshold'])
                .withDescription('State of threshold_1'),
            exposes.binary('threshold_1_protection', ea.STATE, 'ON', 'OFF')
                .withDescription('OFF - alarm only, ON - relay will be off when threshold reached'),
            exposes.numeric('threshold_1_value', ea.STATE)
                .withDescription('Can be in Volt or Ampere depending on threshold setting. Setup the value on the device'),
            exposes.enum('threshold_2', ea.STATE, ['not_set', 'over_current_threshold', 'over_voltage_threshold'])
                .withDescription('State of threshold_2'),
            exposes.binary('threshold_2_protection', ea.STATE, 'ON', 'OFF')
                .withDescription('OFF - alarm only, ON - relay will be off when threshold reached'),
            exposes.numeric('threshold_2_value', ea.STATE)
                .withDescription('Setup value on the device'),
            exposes.binary('clear_fault', ea.STATE_SET, 'ON', 'OFF')
                .withDescription('Turn ON to clear last the fault'),
            exposes.text('meter_id', ea.STATE).withDescription('Meter ID (ID of device)'),
        ],
        meta: {
            tuyaDatapoints: [
                [1, 'energy', tuya.valueConverter.divideBy100],
                [3, null, null], // Monthly, but sends data only after request
                [4, null, null], // Dayly, but sends data only after request
                [6, null, tuya.valueConverter.phaseVariant2], // voltage and current
                [10, 'fault', tuya.valueConverterBasic.lookup({'clear': 0, 'over_current_threshold': 1,
                    'over_power_threshold': 2, 'over_voltage_threshold': 4, 'wrong_frequency_threshold': 8})],
                [11, null, null], // Frozen - strange function, in native app - nothing is clear
                [16, 'state', tuya.valueConverter.onOff],
                [17, null, tuya.valueConverter.threshold], // It's settable, but can't write converter
                [18, 'meter_id', tuya.valueConverter.raw],
                [20, 'clear_fault', tuya.valueConverter.onOff], // Clear fault
                [21, null, null], // Forward Energy T1 - don't know what this
                [22, null, null], // Forward Energy T2 - don't know what this
                [23, null, null], // Forward Energy T3 - don't know what this
                [24, null, null], // Forward Energy T4 - don't know what this
            ],
        },



};

module.exports = definition;