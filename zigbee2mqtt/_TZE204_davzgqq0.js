const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require("zigbee-herdsman-converters/lib/tuya");



const fzLocal = {
    tuya_xocadinrail_switch: {
        cluster: 'manuSpecificTuya',
        type: ['commandDataResponse', 'commandDataReport'],
        convert: (model, msg, publish, options, meta) => {
            for (const dpValue of msg.data.dpValues) {
                const value = tuya.getDataValue(dpValue);
                const dp = dpValue.dp;
                meta.logger.info(`RECEIVED DP #${dp} -- VALUE = ${value}`);
                
                switch (dp) {
                    case 16: // DPID that we added to common
                       return {   state: value ? 'ON' : 'OFF'};
                       
                      
                    case 1:
                        return {
                            energy: value / 100
                        };
                    case 6:   
                     return {
                            current: ((value[4] | value[3] << 8) / 1000), voltage: ((value[1] | value[0] << 8) / 10), power: ((value[7] | value[6] << 8))
                        };
                        
                    case 17:
                      const lookup = {
                       0: 'not set',
                       1: 'Over current threshold',
                       3: 'Over voltage threshold',
                                      };
                        return {
                            threshold_1: lookup[value[0]],
                            threshold1_value : (value[3] | value[2] << 8),
                            threshold_2: lookup[value[4]],
                            threshold2_value : (value[7] | value[6] << 8),                            
                    };    
                        
                      case 10:{
                          const lookup = {
                          0: 'clear',
                          1: 'over current threshold',
                          2: 'over power threshold',
                          4: 'over voltage threshold',
                          8: 'wrong frequency threshold',
                           };
                           return { alarm : lookup[value]} ;
                    }
                    case 18:{
                        meta.logger.warn(`zigbee-herdsman-converters:: NOT RECOGNIZED DP ` +
                            `#${dp} with data ${JSON.stringify(msg.data)} VALUE = ${value}`);
                            break;
                    }
                    default: {
                        meta.logger.warn(`zigbee-herdsman-converters:: NOT RECOGNIZED DP ` +
                            `#${dp} with data ${JSON.stringify(msg.data)} VALUE = ${value}`);
                            break;
                    }
                }
            }
        },
    },
};


const tzLocal = {
    state: {
        key: ['state'],
        convertSet: async (entity, key, value, meta) => {
            await tuya.sendDataPointBool(entity, 16, value === 'ON');
        },
    },
};


const definition = {
    fingerprint: [{
        modelID: 'TS0601',
        manufacturerName: '_TZE204_davzgqq0'
    }],
    model: 'EAYCBM-Z_2P',
    vendor: 'Tuya',
    extend: extend.switch(),
    description: 'DIN Rail Smart Energy Meter',
    fromZigbee: [fzLocal.tuya_xocadinrail_switch, ],
    toZigbee: [tzLocal.state],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await reporting.bind(endpoint, coordinatorEndpoint, ['genBasic']);
    },
    exposes: [e.switch().setAccess('state', ea.STATE_SET), 
              e.voltage(), 
              e.power(), 
              e.current(), 
              e.energy(),
              exposes.text('threshold_1', ea.STATE),
              exposes.text('threshold1_value', ea.STATE),
              exposes.text('threshold_2', ea.STATE),
              exposes.text('threshold2_value', ea.STATE),
              exposes.text('alarm', ea.STATE),

              ] 

};

module.exports = definition;