const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    fingerprint: [{modelID: 'TS0505B', manufacturerName: '_TZ3000_12sxjap4'}],
        model: 'TS0505B', 
        vendor: 'Yanohi', 
        description: 'Zigbee RGB+CCT bulb e27', 
        extend: extend.light_onoff_brightness_colortemp_color(),
};

module.exports = definition;
