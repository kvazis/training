const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const e = exposes.presets;
const ea = exposes.access;

const fzLocal = {
    hoch_din: {
        cluster: 'manuSpecificTuya',
        type: ['commandDataResponse', 'commandDataReport'],
        convert: (model, msg, publish, options, meta) => {
            const dpValue = tuya.firstDpValue(msg, meta, 'hoch_din');
            const dp = dpValue.dp;
            const value = tuya.getDataValue(dpValue);
            const result = {};
            meta.logger.debug(`from hoch_din, dp=[${dp}], datatype=[${dpValue.datatype}], value=[${value}]`);

            if (dp === tuya.dataPoints.state) {
                result.state = value ? 'ON' : 'OFF';
                if (value) {
                    result.trip = 'clear';
                }
            }
            if (dp === tuya.dataPoints.hochChildLock) {
                result.child_lock = value ? 'ON' : 'OFF';
            }
            if (dp === tuya.dataPoints.hochVoltage) {
                result.voltage = (value[1] | value[0] << 8) / 10;
                if ( value.length > 5 ) {
                    result.voltage_L1 = (value[1] | value[0] << 8) / 10;
                    result.voltage_L2 = (value[3] | value[2] << 8) / 10;
                    result.voltage_L3 = (value[5] | value[4] << 8) / 10;
                } else {
                    result.voltage_L1 = 0;
                    result.voltage_L2 = 0;
                    result.voltage_L3 = 0;
                }
            }
            if (dp === tuya.dataPoints.hochHistoricalVoltage) {
                result.voltage_rms = (value[1] | value[0] << 8) / 10;
            }
            if (dp === tuya.dataPoints.hochCurrent) {
                if ( value.length > 8 ) {
                    result.current_L1 = (value[2] | value[1] << 8) / 1000;
                    result.current_L2 = (value[5] | value[4] << 8) / 1000;
                    result.current_L3 = (value[8] | value[7] << 8) / 1000;
                    result.current = result.current_L1 + result.current_L2 + result.current_L3;
                } else {
                    result.current = (value[2] | value[1] << 8) / 1000;
                    result.current_L1 = 0;
                    result.current_L2 = 0;
                    result.current_L3 = 0;
                }
            }
            if (dp === tuya.dataPoints.hochHistoricalCurrent) {
                result.current_average = (value[2] | value[1] << 8) / 1000;
            }
            if (dp === tuya.dataPoints.hochActivePower) {
                result.power = (value[2] | value[1] << 8) / 10;
                if ( value.length > 11 ) {
                    result.power_L1 = (value[5] | value[4] << 8) / 10;
                    result.power_L2 = (value[8] | value[7] << 8) / 10;
                    result.power_L3 = (value[11] | value[10] << 8) / 10;
                } else {
                    result.power_L1 = 0;
                    result.power_L2 = 0;
                    result.power_L3 = 0;
                }
            }
            if (dp === tuya.dataPoints.hochTotalActivePower) {
                result.energy_consumed = value / 100;
                result.energy = result.energy_consumed;
            }
            if (dp === tuya.dataPoints.hochLocking) {
                result.trip = value ? 'trip' : 'clear';
            }
            if (dp === tuya.dataPoints.hochCountdownTimer) {
                result.countdown_timer = value;
            }
            if (dp === tuya.dataPoints.hochTemperature) {
                result.temperature = value;
            }
            if (dp === tuya.dataPoints.hochRelayStatus) {
                const lookup = {
                    0: 'off',
                    1: 'on',
                    2: 'previous',
                };
                result.power_on_behavior = lookup[value];
            }
            if (dp === tuya.dataPoints.hochFaultCode) {
                const lookup = {
                    0: 'clear',
                    1: 'over voltage threshold',
                    2: 'under voltage threshold',
                    4: 'over current threshold',
                    8: 'over temperature threshold',
                    10: 'over leakage current threshold',
                    16: 'trip test',
                    128: 'safety lock',
                };
                result.alarm = lookup[value];
            }
            if (dp === tuya.dataPoints.hochEquipmentNumberType) {
                result.meter_number = value.trim();
            }
            if (dp === tuya.dataPoints.hochVoltageThreshold) {
                result.over_voltage_threshold = (value[1] | value[0] << 8) / 10;
                result.over_voltage_trip = value[2] ? 'ON' : 'OFF';
                result.over_voltage_alarm = value[3] ? 'ON' : 'OFF';
                result.under_voltage_threshold = (value[5] | value[4] << 8) / 10;
                result.under_voltage_trip = value[6] ? 'ON' : 'OFF';
                result.under_voltage_alarm = value[7] ? 'ON' : 'OFF';
            }
            if (dp === tuya.dataPoints.hochCurrentThreshold) {
                let overCurrentValue = 0;
                for (let i = 0; i < 3; i++) {
                    overCurrentValue = overCurrentValue << 8;
                    overCurrentValue += value[i];
                }
                result.over_current_threshold = overCurrentValue / 1000;
                result.over_current_trip = value[3] ? 'ON' : 'OFF';
                result.over_current_alarm = value[4] ? 'ON' : 'OFF';
            }
            if (dp === tuya.dataPoints.hochTemperatureThreshold) {
                result.over_temperature_threshold = value[0] > 127 ? (value[0] - 128) * -1 : value[0];
                result.over_temperature_trip = value[1] ? 'ON' : 'OFF';
                result.over_temperature_alarm = value[2] ? 'ON' : 'OFF';
            }
            if (dp === tuya.dataPoints.hochLeakageParameters) {
                result.self_test_auto_days = value[0];
                result.self_test_auto_hours = value[1];
                result.self_test_auto = value[2] ? 'ON' : 'OFF';
                result.over_leakage_current_threshold = value[4] | value[3] << 8;
                result.over_leakage_current_trip = value[5] ? 'ON' : 'OFF';
                result.over_leakage_current_alarm = value[6] ? 'ON' : 'OFF';
                result.self_test = value[7] ? 'test' : 'clear';
            }
            return result;
        },
    },
};

const definition = {
    fingerprint: [{modelID: 'TS0601', manufacturerName: '_TZE200_hkdl5fmv'}],
	model: 'TS0601_rcbo_my',
    vendor: 'TuYa',
    whiteLabel: [
        {vendor: 'HOCH', model: 'ZJSBL7-100Z'},
        {vendor: 'WDYK', model: 'ZJSBL7-100Z'},
    ],
    description: 'DIN mount RCBO with smart energy metering',
    fromZigbee: [fzLocal.hoch_din],
    toZigbee: [tz.hoch_din],
    exposes: [
        exposes.text('meter_number', ea.STATE),
        exposes.binary('state', ea.STATE_SET, 'ON', 'OFF'),
        exposes.text('alarm', ea.STATE),
        exposes.binary('trip', ea.STATE_SET, 'trip', 'clear'),
        exposes.binary('child_lock', ea.STATE_SET, 'ON', 'OFF'),
        exposes.enum('power_on_behavior', ea.STATE_SET, ['off', 'on', 'previous']),
        exposes.numeric('countdown_timer', ea.STATE_SET).withValueMin(0).withValueMax(86400).withUnit('s'),
        exposes.numeric('voltage_rms', ea.STATE).withUnit('V'),
        exposes.numeric('current', ea.STATE).withUnit('A'),
        exposes.numeric('current_average', ea.STATE).withUnit('A'),
        e.power(), e.voltage(), e.energy(), e.temperature(),
        exposes.numeric('voltage_L1', ea.STATE).withUnit('V'),
        exposes.numeric('voltage_L2', ea.STATE).withUnit('V'),
        exposes.numeric('voltage_L3', ea.STATE).withUnit('V'),
        exposes.numeric('current_L1', ea.STATE).withUnit('A'),
        exposes.numeric('current_L2', ea.STATE).withUnit('A'),
        exposes.numeric('current_L3', ea.STATE).withUnit('A'),
        exposes.numeric('power_L1', ea.STATE).withUnit('W'),
        exposes.numeric('power_L2', ea.STATE).withUnit('W'),
        exposes.numeric('power_L3', ea.STATE).withUnit('W'),
        exposes.numeric('energy_consumed', ea.STATE).withUnit('kWh'),
        /* TODO: Add toZigbee converters for the below composites*/
        exposes.composite('voltage_setting', 'voltage_setting')
            .withFeature(exposes.numeric('under_voltage_threshold', ea.STATE_SET)
                .withValueMin(50)
                .withValueMax(385)
                .withUnit('V'))
            .withFeature(exposes.binary('under_voltage_trip', ea.STATE_SET, 'ON', 'OFF'))
            .withFeature(exposes.binary('under_voltage_alarm', ea.STATE_SET, 'ON', 'OFF'))
            .withFeature(exposes.numeric('over_voltage_threshold', ea.STATE_SET)
                .withValueMin(50)
                .withValueMax(385)
                .withUnit('V'))
            .withFeature(exposes.binary('over_voltage_trip', ea.STATE_SET, 'ON', 'OFF'))
            .withFeature(exposes.binary('over_voltage_alarm', ea.STATE_SET, 'ON', 'OFF')),
        exposes.composite('current_setting', 'current_setting')
            .withFeature(exposes.numeric('over_current_threshold', ea.STATE_SET)
                .withValueMin(0)
                .withValueMax(999)
                .withUnit('A'))
            .withFeature(exposes.binary('over_current_trip', ea.STATE_SET, 'ON', 'OFF'))
            .withFeature(exposes.binary('over_current_alarm', ea.STATE_SET, 'ON', 'OFF')),
        exposes.composite('temperature_setting', 'temperature_setting')
            .withFeature(exposes.numeric('over_temperature_threshold', ea.STATE_SET)
                .withValueMin(-40)
                .withValueMax(127)
                .withUnit('°C'))
            .withFeature(exposes.binary('over_temperature_trip', ea.STATE_SET, 'ON', 'OFF'))
            .withFeature(exposes.binary('over_temperature_alarm', ea.STATE_SET, 'ON', 'OFF')),
        exposes.composite('leakage_current_setting', 'leakage_current_setting')
            .withFeature(exposes.numeric('self_test_auto_days', ea.STATE_SET)
                .withValueMin(1)
                .withValueMax(28)
                .withUnit('days'))
            .withFeature(exposes.numeric('self_test_auto_hours', ea.STATE_SET)
                .withValueMin(0)
                .withValueMax(23)
                .withUnit('hours'))
            .withFeature(exposes.binary('self_test_auto', ea.STATE_SET, 'ON', 'OFF'))
            .withFeature(exposes.numeric('over_leakage_current_threshold', ea.STATE_SET)
                .withValueMin(0)
                .withValueMax(3000)
                .withUnit('mA'))
            .withFeature(exposes.binary('over_leakage_current_trip', ea.STATE_SET, 'ON', 'OFF'))
            .withFeature(exposes.binary('over_leakage_current_alarm', ea.STATE_SET, 'ON', 'OFF'))
            .withFeature(exposes.binary('self_test', ea.STATE_SET, 'test', 'clear')),
        exposes.enum('clear_device_data', ea.SET, ['clear']),
    ],
};

module.exports = definition;