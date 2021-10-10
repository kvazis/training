const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = {
    switch: (options={}) => {
        const exposes = [e.switch()];
        const fromZigbee = [fz.on_off, fz.ignore_basic_report];
        const toZigbee = [tz.on_off];
        return {exposes, fromZigbee, toZigbee};
    },
};
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    // Since a lot of Tuya devices use the same modelID, but use different data points
    // it's usually necessary to provide a fingerprint instead of a zigbeeModel
    fingerprint: [{modelID: 'TS011F', manufacturerName: '_TZ3000_1hwjutgo'}],
        model: 'ZJSB9-80Z',
        vendor: 'Mumubiz',
        description: 'Automatic Switch',
        extend: extend.switch(),
        whiteLabel: [{vendor: 'Mumubiz', model: 'ZJSB9-80Z'}],
    };

module.exports = definition;
