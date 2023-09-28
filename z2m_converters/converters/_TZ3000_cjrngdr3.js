const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const globalStore = require('zigbee-herdsman-converters/lib/store');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
        fingerprint: [{modelID: 'TS011F', manufacturerName: '_TZ3000_cjrngdr3'},],
        model: 'TS011F_relay',
        description: 'Smart relay with power monitoring',
        vendor: 'TuYa',
        fromZigbee: [fz.on_off, fz.electrical_measurement, fz.metering, fz.ignore_basic_report, fz.tuya_switch_power_outage_memory],
        toZigbee: [tz.on_off, tz.tuya_switch_power_outage_memory],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'haElectricalMeasurement']);
            endpoint.saveClusterAttributeKeyValue('seMetering', {divisor: 100, multiplier: 1});
            endpoint.saveClusterAttributeKeyValue('haElectricalMeasurement', {
                acVoltageMultiplier: 1, acVoltageDivisor: 1, acCurrentMultiplier: 1, acCurrentDivisor: 1000, acPowerMultiplier: 1,
                acPowerDivisor: 1,
            });
        },
        // This device doesn't support reporting correctly.
        // https://github.com/Koenkk/zigbee-herdsman-converters/pull/1270
        exposes: [e.switch(), e.power(), e.current(), e.voltage().withAccess(ea.STATE),
            e.energy(), exposes.enum('power_outage_memory', ea.STATE_SET, ['on', 'off', 'restore'])
                .withDescription('Recover state after power outage')],
        onEvent: (type, data, device, options) => {
            const endpoint = device.getEndpoint(1);

            if (type === 'stop') {
                clearInterval(globalStore.getValue(device, 'interval'));
                globalStore.clearValue(device, 'interval');
            } else if (!globalStore.hasValue(device, 'interval')) {
                const seconds = options && options.measurement_poll_interval ? options.measurement_poll_interval : 5;
                const interval = setInterval(async () => {
                    try {
                        await endpoint.read('haElectricalMeasurement', ['rmsVoltage', 'rmsCurrent', 'activePower']);
                        await endpoint.read('seMetering', ['currentSummDelivered']);
                    } catch (error) {/* Do nothing*/}
                }, seconds*1000);
                globalStore.putValue(device, 'interval', interval);
            }
        }
};

module.exports = definition;