const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    fingerprint: [{modelID: 'TS0001', manufacturerName: '_TZ3000_xkap8wtb'}],
        model: 'ZN369906_01',
        vendor: 'Aubess',
        description: 'Automatic Switch',
        toZigbee: [tz.on_off, tz.tuya_switch_power_outage_memory, tz.ts011f_plug_indicator_mode],
        fromZigbee: [fz.on_off, fz.electrical_measurement, fz.metering, fz.ignore_basic_report, fz.tuya_switch_power_outage_memory,fz.ts011f_plug_indicator_mode],
        exposes: [e.switch(), e.power(), e.current(), e.voltage().withAccess(ea.STATE),
                e.energy(), exposes.enum('power_outage_memory', ea.ALL, ['on', 'off', 'restore'])
                    .withDescription('Recover state after power outage'),
                exposes.enum('indicator_mode', ea.ALL, ['off', 'off/on', 'on/off']).withDescription('LED indicator mode')],
        options: [exposes.options.measurement_poll_interval()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'haElectricalMeasurement', 'seMetering']);
            endpoint.saveClusterAttributeKeyValue('seMetering', {divisor: 100, multiplier: 1});
            endpoint.saveClusterAttributeKeyValue('haElectricalMeasurement', {
                acVoltageMultiplier: 1, acVoltageDivisor: 1, acCurrentMultiplier: 1, acCurrentDivisor: 1000, acPowerMultiplier: 1,
                acPowerDivisor: 1,
            });
            try {
                await reporting.currentSummDelivered(endpoint);
            } catch (error) {/* fails for some https://github.com/Koenkk/zigbee2mqtt/issues/11179 */}
            await endpoint.read('genOnOff', ['onOff', 'moesStartUpOnOff', 'tuyaBacklightMode']);
        },
        onEvent: tuya.onEventMeasurementPoll,
    };

module.exports = definition;