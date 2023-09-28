const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const globalStore = require('zigbee-herdsman-converters/lib/store');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
        fingerprint: [{modelID: 'TS0505B', manufacturerName: '_TZB210_gdsxpa1z'}],
        model: 'Track RGB+CCT light',
        vendor: 'Miboxer',
        description: 'Track RGB+CCT light',
        toZigbee: extend.light_onoff_brightness_colortemp_color().toZigbee.concat([
            tz.tuya_do_not_disturb, tz.tuya_color_power_on_behavior,
        ]),
        meta: {applyRedFix: true, enhancedHue: false},
        fromZigbee: extend.light_onoff_brightness_colortemp_color().fromZigbee,
        exposes: extend.light_onoff_brightness_colortemp_color({colorTempRange: [153, 500], disableColorTempStartup: true}).exposes.concat([
            exposes.binary('do_not_disturb', ea.STATE_SET, true, false)
                .withDescription('Do not disturb mode'),
            exposes.enum('color_power_on_behavior', ea.STATE_SET, ['initial', 'previous', 'cutomized'])
                .withDescription('Power on behavior state'),
        ]),
};

module.exports = definition;