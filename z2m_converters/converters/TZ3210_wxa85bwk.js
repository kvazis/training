const exposes = require('zigbee-herdsman-converters/lib/exposes');
const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const ota = require('zigbee-herdsman-converters/lib/ota');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const libColor = require('zigbee-herdsman-converters/lib/color');
const utils = require('zigbee-herdsman-converters/lib/utils');
const zosung = require('zigbee-herdsman-converters/lib/zosung');
const fzZosung = zosung.fzZosung;
const tzZosung = zosung.tzZosung;
const ez = zosung.presetsZosung;
const globalStore = require('zigbee-herdsman-converters/lib/store');

const definition =     {
        fingerprint: [{modelID: 'TS0505B', manufacturerName: '_TZ3210_wxa85bwk'}],
        model: 'TS0505B',
        vendor: 'TuYa',
        description: 'Zigbee RGB+CCT light',
        whiteLabel: [{vendor: 'Mercator Ikuü', model: 'SMD4106W-RGB-ZB'},
            {vendor: 'TuYa', model: 'A5C-21F7-01'}, {vendor: 'Mercator Ikuü', model: 'S9E27LED9W-RGB-Z'},
            {vendor: 'Aldi', model: 'L122CB63H11A9.0W', description: 'LIGHTWAY smart home LED-lamp - bulb'},
            {vendor: 'Lidl', model: '14153706L', description: 'Livarno smart LED ceiling light'},
            {vendor: 'Zemismart', model: 'LXZB-ZB-09A', description: 'Zemismart LED Surface Mounted Downlight 9W RGBW'},
            {vendor: 'Feconn', model: 'FE-GU10-5W', description: 'Zigbee GU10 5W smart bulb'},
        ],
        extend: extend.light_onoff_brightness_colortemp_color({colorTempRange: [153, 500], disableColorTempStartup: true}),
        meta: {applyRedFix: true, enhancedHue: false},
    }

module.exports = definition;