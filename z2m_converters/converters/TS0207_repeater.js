const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tuya = require('zigbee-herdsman-converters/lib/tuya');

const definition = {
    fingerprint: [{ modelID: 'TS0207', manufacturerName: '_TZ3000_nlsszmzl'}],
    model: 'TS0207_repeater',
    vendor: 'TuYa',
    description: 'Repeater',
    configure: tuya.configureMagicPacket,
	fromZigbee: [fz.linkquality_from_basic],
    toZigbee: [],
    exposes: [],
};

module.exports = definition;