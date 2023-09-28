// Название: Moes TV 01 ZigBee3.0 Smart Radiator Valve Actuator
// Модель: TV 01
// modelID: TS0601
// manufacturerName: _TZE200_e9ba97vf

//// Based on:
// https://gist.github.com/basveeling/96ff0f16cd7185b0277a26c8d9305633
// https://github.com/Koenkk/zigbee-herdsman-converters/issues/1803
// https://github.com/Koenkk/zigbee-herdsman-converters/pull/2209
//https://gist.github.com/serrj-sv/af142b25de2d7ac54c3a2eb2623d9a6d#file-moes_radiator_alt-js-L328
//// Credits:
// @serrj-sv, @wollo, @basveeling
//// Usage: 
// zzonesmart_tvg01zg.js in the root of your zigbee2mqtt data folder (as stated in data_path, e.g. /config/zigbee2mqtt_data)
// In your zigbee2mqtt hassio addon configuration, add the following two lines:
// ...
// external_converters:
//   - zzonesmart_tvg01zg.js
// ...
const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const e = exposes.presets;
const ea = exposes.access;

const tuyaLocal = {
	dataPoints: {
    // ZONNSMART
    zsHeatingSetpoint: 16,
    zsFrostDetection: 10,
    zsWindowDetection: 8,
    zsChildLock: 40,
    zsTempCalibration: 27,
    zsLocalTemp: 24,
    zsBattery: 35,
    zsHeatingBoostCountdown: 101,
    zsComfortTemp: 104,
    zsEcoTemp: 105,
    zsAwayTemp: 32,
    zsErrorStatus: 45,
    zsMode: 2,
    zsHeatingStop: 107,
	},
};
const fzLocal = {
    zs_thermostat: {
        cluster: 'manuSpecificTuya',
        type: ['commandGetData', 'commandSetDataResponse'],
        convert: (model, msg, publish, options, meta) => {
            const dp = msg.data.dp;
            const value = tuya.getDataValue(msg.data.datatype, msg.data.data);

            // if (dp >= 101 && dp <=107) return; // handled by tuya_thermostat_weekly_schedule

            switch (dp) {
            case tuya.dataPoints.state: // on/off
                return !value ? {system_mode: 'off'} : {};

            case tuyaLocal.dataPoints.zsChildLock:
                return {child_lock: value ? 'LOCK' : 'UNLOCK'};

            case tuyaLocal.dataPoints.zsHeatingSetpoint:
                return {current_heating_setpoint: (value / 10).toFixed(1)};

            case tuyaLocal.dataPoints.zsLocalTemp:
                return {local_temperature: (value / 10).toFixed(1)};

            case tuyaLocal.dataPoints.zsBattery:
                 return {battery: value};

            case tuyaLocal.dataPoints.zsTempCalibration:
                return {local_temperature_calibration: value > 55 ?
                    ((value - 0x100000000)/10).toFixed(1): (value/ 10).toFixed(1)};

            case tuyaLocal.dataPoints.zsHeatingBoostCountdown:
                return {heating_boost_countdown: value};

            case tuyaLocal.dataPoints.zsWindowDetection:
                return {window_detection: value ? 'ON' : 'OFF'};

            case tuyaLocal.dataPoints.zsComfortTemp:
                return {comfort_temperature: (value / 10).toFixed(1)};

            case tuyaLocal.dataPoints.zsEcoTemp:
                return {eco_temperature: (value / 10).toFixed(1)};

            case tuyaLocal.dataPoints.zsAwayTemp:
                return {away_preset_temperature: (value / 10).toFixed(1)};

            case tuyaLocal.dataPoints.zsMode:
                switch (value) {
                case 1: // manual
                    return {system_mode: 'heat', away_mode: 'OFF', preset: 'manual'};
                case 3: // away
                    return {system_mode: 'heat', away_mode: 'ON', preset: 'vacation'};
                case 0: // auto
                    return {system_mode: 'auto', away_mode: 'OFF', preset: 'schedule'};
                default:
                    meta.logger.warn('zigbee-herdsman-converters:zsThermostat: ' +
                        `preset ${value} is not recognized.`);
                    break;
                }
                break;

            case tuya.dataPoints.runningState:
                return {running_state: value ? 'heat' : 'idle'};

            default:
                meta.logger.warn(`zigbee-herdsman-converters:zsThermostat: Unrecognized DP #${
                    dp} with data ${JSON.stringify(msg.data)}`);
            }
        },
    },
};
const tzLocal = {
    zs_thermostat_child_lock: {
        key: ['child_lock'],
        convertSet: async (entity, key, value, meta) => {
            await tuya.sendDataPointBool(entity, tuyaLocal.dataPoints.zsChildLock, value === 'LOCK');
        },
    },
    zs_thermostat_window_detection: {
        key: ['window_detection'],
        convertSet: async (entity, key, value, meta) => {
            await tuya.sendDataPointBool(entity, tuyaLocal.dataPoints.zsWindowDetection, value === 'ON');
        },
    },
    zs_thermostat_current_heating_setpoint: {
        key: ['current_heating_setpoint'],
        convertSet: async (entity, key, value, meta) => {
            const temp = Math.round(value * 10);
            await tuya.sendDataPointValue(entity, tuyaLocal.dataPoints.zsHeatingSetpoint, temp);
        },
    },
    zs_thermostat_comfort_temp: {
        key: ['comfort_temp_preset'],
        convertSet: async (entity, key, value, meta) => {
            const temp = Math.round(value * 10);
            await tuya.sendDataPointValue(entity, tuyaLocal.dataPoints.zsComfortTemp, temp);
        },
    },
    zs_thermostat_away_temp: {
        key: ['away_preset_temperature'],
        convertSet: async (entity, key, value, meta) => {
            const temp = Math.round(value * 10);
            await tuya.sendDataPointValue(entity, tuyaLocal.dataPoints.zsAwayTemp, temp);
        },
    },
    zs_thermostat_eco_temp: {
        key: ['eco_temp_preset'],
        convertSet: async (entity, key, value, meta) => {
            const temp = Math.round(value * 10);
            await tuya.sendDataPointValue(entity, tuyaLocal.dataPoints.zsEcoTemp, temp);
        },
    },
    zs_thermostat_system_mode_preset: {
        key: ['preset'],
        convertSet: async (entity, key, value, meta) => {
            const lookup = {'schedule': 0, 'manual': 1, 'holiday': 3};
            await tuya.sendDataPointEnum(entity, tuyaLocal.dataPoints.zsMode, lookup[value]);
        },
    },
    zs_thermostat_local_temperature_calibration: {
        key: ['local_temperature_calibration'],
        convertSet: async (entity, key, value, meta) => {
            if (value > 0) value = value*10;
            if (value < 0) value = value*10 + 0x100000000;
            await tuya.sendDataPointValue(entity, tuyaLocal.dataPoints.zsTempCalibration, value);
        },
    },
};       
const device = {
    // Moes Tuya Alt Thermostat
    zigbeeModel: ['TS601'],
    fingerprint: [{modelID: 'TS0601', manufacturerName: '_TZE200_e9ba97vf'}],
    model: 'TV01-ZG',
    vendor: 'ZONNSMART',
    description: 'Radiator valve with thermostat',
    fromZigbee: [
        fz.ignore_basic_report,
        fz.ignore_tuya_set_time,  // handled in onEvent
        fzLocal.zs_thermostat,
        // fz.tuya_data_point_dump,
    ],
    toZigbee: [
        tzLocal.zs_thermostat_current_heating_setpoint,
        tzLocal.zs_thermostat_child_lock,
        tzLocal.zs_thermostat_comfort_temp,
        tzLocal.zs_thermostat_eco_temp,
        tzLocal.zs_thermostat_system_mode_preset,
        tzLocal.zs_thermostat_local_temperature_calibration,
        tzLocal.zs_thermostat_away_temp,
        tzLocal.zs_thermostat_window_detection,
        tzLocal.zs_thermostat_heatingBoostCountdown,
        tz.tuya_data_point_test
    ],
    onEvent: tuya.onEventSetLocalTime,
    meta: {
        configureKey: 1,
    },
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await reporting.bind(endpoint, coordinatorEndpoint, ['genBasic']);
    },
    exposes: [
        e.battery(), e.window_detection(), e.child_lock(), e.comfort_temperature(), e.eco_temperature(), e.away_preset_temperature(),
        exposes.climate().withSetpoint('current_heating_setpoint', 0.5, 29.5, 0.5)
                         .withLocalTemperature()
                         .withLocalTemperatureCalibration()
                         .withSystemMode(['off', 'heat', 'auto'], ea.STATE_SET) //system mode only: off, heat, auto
                         .withPreset(['schedule', 'manual', 'holiday']),
        exposes.numeric('heating_boost_countdown', ea.STATE)
            ],
};

module.exports = device;