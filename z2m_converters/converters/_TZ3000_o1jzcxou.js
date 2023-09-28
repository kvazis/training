// Название: Bseed Tuya ZigBee Wall Power Smart Sockets
// Модель: TS011F
// modelID: TS011F
// manufacturerName: _TZ3000_o1jzcxou


const fz = require('zigbee-herdsman-converters/converters/fromZigbee'); 
const tz = require('zigbee-herdsman-converters/converters/toZigbee'); 
const exposes = require('zigbee-herdsman-converters/lib/exposes'); 
const reporting = require('zigbee-herdsman-converters/lib/reporting'); 
const extend = require('zigbee-herdsman-converters/lib/extend'); 
const e = exposes.presets; 
const ea = exposes.access; 
 
const definition = { 
 fingerprint: [{modelID: 'TS011F', manufacturerName: '_TZ3000_o1jzcxou'}], 
 model: 'TS011F_socket_module', 
 vendor: 'TuYa', 
 description: 'Socket module', 
 extend: extend.switch(), 
 whiteLabel: [{vendor: 'BSEED', model: 'UNKNOWN'}], 
}; 
 
module.exports = definition;