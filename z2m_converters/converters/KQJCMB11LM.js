const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;

const fzLocal = {
    co2: {
        cluster: 'msCO2',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            return {co2: Math.floor(msg.data.measuredValue)};
        },
    },
    pm25: {
        cluster: 'heimanSpecificPM25Measurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data['measuredValue']) {
                return {pm25: msg.data['measuredValue'] / 1000};
            }
        },
    }
}

const definition = {
    zigbeeModel: ['lumi.airm.fhac01'],
    model: 'KQJCMB11LM',
    vendor: 'Aqara',
    description: 'Air Monitoring S1',
    fromZigbee: [fz.temperature, fz.humidity, fzLocal.pm25, fzLocal.co2],
    toZigbee: [],
    exposes: [e.temperature(), e.humidity(), e.pm25(), e.co2()],
};

module.exports = definition;