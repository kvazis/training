const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const definition = {
    fingerprint: [{modelID: 'TS0222', manufacturerName: '_TYZB01_kvwjujy9'}],
    model: 'ZSS-ZK-THL',
    vendor: 'Moes',
    description: 'Smart Brightness Thermometer',
    fromZigbee: [fz.battery, fz.illuminance, fz.humidity, fz.temperature],
    toZigbee: [],
    exposes: [e.battery(), e.illuminance(), e.illuminance_lux().withUnit('lx'), e.humidity(), e.temperature()],
};
module.exports = definition;