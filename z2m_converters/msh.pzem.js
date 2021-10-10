const zigbeeHerdsmanConverters = require('zigbee-herdsman-converters');

const exposes = zigbeeHerdsmanConverters.exposes;
const ea = exposes.access;
const e = exposes.presets;
const fz = zigbeeHerdsmanConverters.fromZigbeeConverters;
const tz = zigbeeHerdsmanConverters.toZigbeeConverters;

const ptvo_switch = zigbeeHerdsmanConverters.findByDevice({modelID: 'ptvo.switch'});
fz.legacy = ptvo_switch.meta.tuyaThermostatPreset;

const device = {
    zigbeeModel: ['msh.pzem'],
    model: 'msh.pzem',
    vendor: 'Custom devices (DiY)',
    description: '[Configurable firmware](https://ptvo.info/zigbee-configurable-firmware-features/)',
    fromZigbee: [fz.ignore_basic_report, fz.ptvo_switch_analog_input,],
    toZigbee: [tz.ptvo_switch_analog_input,],
    exposes: [e.cpu_temperature().withProperty('temperature').withEndpoint('l1'),
      e.current().withAccess(ea.STATE).withEndpoint('l2'),
      e.voltage().withAccess(ea.STATE).withEndpoint('l2'),
      e.energy().withUnit('Wh').withAccess(ea.STATE).withEndpoint('l2'),
      e.power().withAccess(ea.STATE).withEndpoint('l2'),
      exposes.numeric('frequency', ea.STATE).withEndpoint('l2').withUnit('Hz').withDescription('Frequency'),
      exposes.numeric('power_factor', ea.STATE).withEndpoint('l2').withUnit('cosf').withDescription('Power factor'),
      e.linkquality(),
],
    meta: {
        multiEndpoint: true,
        
    },
    endpoint: (device) => {
        return {
            l1: 1, l2: 2,
        };
    },
    
};

module.exports = device;
