// Название: Tuya Smart Life Zigbee Temperature And Humidity Sensor
// Модель: NAS-TH01
// modelID: TS0201
// manufacturerName: _TZ3000_qaaysllp

const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
        fingerprint: [{modelID: 'TS0201', manufacturerName: '_TZ3000_qaaysllp'}],
        model: 'NAS-TH01',
        vendor: 'Neo',
        description: 'Temperature, humidity and illuminance sensor plus alarm',
        fromZigbee: [
            fz.battery,
            fz.temperature,
            fz.humidity,
            fz.illuminance
        ],
        toZigbee: [],
        exposes: [e.battery(), e.illuminance(), e.illuminance_lux(), e.temperature(), e.humidity(), e.battery_voltage()],
};

module.exports = definition;