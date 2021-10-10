const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    zigbeeModel: ['TS0505B'], // The model ID from: Device with modelID 'lumi.sens' is not supported.
    model: 'TS0505B', // Vendor model number, look on the device for a model number
    vendor: 'Yanohi', // Vendor of the device (only used for documentation and startup logging)
    description: 'Zigbee RGB+CCT bulb e27', // Description of the device, copy from vendor site. (only used for documentation and startup logging)
//    fromZigbee: [], // We will add this later
//    toZigbee: [], // Should be empty, unless device can be controlled (e.g. lights, switches).
//    exposes: [e.brightness()], // Defines what this device exposes, used for e.g. Home Assistant discovery and in the frontend
    extend: extend.light_onoff_brightness_colortemp_color(),
};

module.exports = definition;
