const {
    fromZigbeeConverters,
    toZigbeeConverters,
    exposes
} = require('zigbee-herdsman-converters');

const e = exposes.presets;
const fz = fromZigbeeConverters;
const tz = toZigbeeConverters;

const defaulPumpRuntime = 30;

const ACCESS_STATE = 0b001, ACCESS_WRITE = 0b010, ACCESS_READ = 0b100;
// get object property name (key) by it's value
const getKey = (object, value) => {
    for (const key in object) {
        if (object[key]==value) return key;
    }
};

const getOptions = (definition, entity) => {
    const result = {};
    const allowed = ['disableDefaultResponse', 'manufacturerCode', 'timeout'];
    if (definition && definition.meta) {
        for (const key of Object.keys(definition.meta)) {
            if (allowed.includes(key)) {
                const value = definition.meta[key];
                result[key] = typeof value === 'function' ? value(entity) : value;
            }
        }
    }
    console.log(result);
    return result;
};

const myFZ = {
  flower_ws_output: {
      cluster: 'genOnOff',
      type: ['attributeReport', 'readResponse'],
      convert: (model, msg, publish, options, meta) => {
          //console.log(msg);
          if (msg.endpoint.ID < 5) {
              const key = `pump_${msg.endpoint.ID-1}`;
              const payload = {};
              payload[key] = msg.data['onOff'] === 1 ? 'ON' : 'OFF';
              return payload;
          }
          if (msg.endpoint.ID == 6) {
              const key = `water_leak`;
              const payload = {};
              payload[key] = msg.data['onOff'] === 1 ? 'true' : 'false';
              return payload;
          }
          if (msg.endpoint.ID == 7) {
              const key = `water_low_level`;
              const payload = {};
              payload[key] = msg.data['onOff'] === 1 ? 'true' : 'false';
              return payload;
          }
      },
  },
};

const myTZ = {
  flower_ws_on_off: {
      key: ['pump_1'],
      key2: ['state'],
      convertSet: async (entity, key2, value, meta) => {
          await entity.command('genOnOff', value.toLowerCase(), {}, getOptions(meta.mapped, entity));
          if (value.toLowerCase() === 'toggle') {
              const currentState = meta.state[`state${meta.endpoint_name ? `_${meta.endpoint_name}` : ''}`];
              return currentState ? {state: {state: currentState === 'OFF' ? 'ON' : 'OFF'}} : {};
          } else {
              return {state: {state: value.toUpperCase()}};
          }
      },
      convertGet: async (entity, key2, meta) => {
          await entity.read('genOnOff', ['onOff']);
      },
  },
  flower_ws_pump_trigger: {
      key: ['trigger'],
      convertSet: async (entity, key, value, meta) => {
          value = parseInt(value);
          if (!value) {
              return;
          }

          await entity.command('genOnOff', 'onWithTimedOff', {ctrlbits: 0, ontime: Math.round(value*10), offwaittime: 0});

      },
  },
};

const hass = {
  pump_1: {
     type: 'switch',
     object_id: 'pump_1',
     discovery_payload: {
         payload_off: 'OFF',
         payload_on: 'ON',
         value_template: '{{ value_json.state_l2 }}',
         command_topic: true,
         command_topic_prefix: 'l2',
     }
 },
 pump_1_timer: {
     type: 'switch',
     object_id: 'pump_1_timer',
     discovery_payload: {
         payload_off: 'OFF',
         payload_on: '{"trigger": 10}',
         value_template: '{{ value_json.state_l2 }}',
         command_topic: true,
         command_topic_prefix: 'l2',
     }
 },
 pump_2: {
     type: 'switch',
     object_id: 'pump_2',
     discovery_payload: {
         payload_off: 'OFF',
         payload_on: 'ON',
         value_template: '{{ value_json.state_l3 }}',
         command_topic: true,
         command_topic_prefix: 'l3',
     }
 },
 pump_2_timer: {
     type: 'switch',
     object_id: 'pump_2_timer',
     discovery_payload: {
         payload_off: 'OFF',
         payload_on: '{"trigger": 10}',
         value_template: '{{ value_json.state_l3 }}',
         command_topic: true,
         command_topic_prefix: 'l3',
     }
 },
 pump_3: {
     type: 'switch',
     object_id: 'pump_3',
     discovery_payload: {
         payload_off: 'OFF',
         payload_on: 'ON',
         value_template: '{{ value_json.state_l4 }}',
         command_topic: true,
         command_topic_prefix: 'l4',
     }
 },
 pump_3_timer: {
     type: 'switch',
     object_id: 'pump_3_timer',
     discovery_payload: {
         payload_off: 'OFF',
         payload_on: '{"trigger": 10}',
         value_template: '{{ value_json.state_l4 }}',
         command_topic: true,
         command_topic_prefix: 'l4',
     }
 },
 buzzer: {
     type: 'switch',
     object_id: 'buzzer',
     discovery_payload: {
         payload_off: 'OFF',
         payload_on: 'ON',
         value_template: '{{ value_json.state_l5 }}',
         command_topic: true,
         command_topic_prefix: 'l5',
     }
 },
 water_leak: {
     type: 'binary_sensor',
     object_id: 'water_leak',
     discovery_payload: {
         device_class: 'moisture',
         payload_off: 'OFF',
         payload_on: 'ON',
         value_template: '{{ value_json.state_l6 }}',
     }
 },
 water_low_level: {
     type: 'binary_sensor',
     object_id: 'water_low_level',
     discovery_payload: {
         device_class: 'battery',
         payload_off: 'OFF',
         payload_on: 'ON',
         value_template: '{{ value_json.state_l7 }}',
     }
 },
}
const device =  {
      zigbeeModel: ['DIYRuZ_Flower_WS'],
      model: 'DIYRuZ_Flower_WS',
      vendor: 'modkam.ru',
      description: '[Flower Water Station](https://modkam.ru/)',
      homeassistant: [
          hass.pump_1, hass.pump_1_timer,
          hass.pump_2, hass.pump_2_timer,
          hass.pump_3, hass.pump_3_timer,
          hass.buzzer,
          hass.water_leak, hass.water_low_level,
      ],
      fromZigbee: [
          myFZ.flower_ws_output, fz.on_off//, fz.ptvo_multistate_action, fz.legacy_ptvo_switch_buttons, fz.ptvo_switch_uart,
          //fz.ptvo_switch_analog_input, fz.brightness, fz.ignore_basic_report, 
      ],
      toZigbee: [
          tz.on_off, myTZ.flower_ws_pump_trigger//myTZ.flower_ws_on_off, tz.ptvo_switch_trigger,
      ],
      exposes: [
          exposes.binary('state', ACCESS_STATE | ACCESS_WRITE | ACCESS_READ, 'ON', 'OFF').withEndpoint('l2').withDescription('Pump 1'),
          exposes.numeric('trigger', ACCESS_WRITE).withEndpoint('l2').withDescription('On time').withUnit('seconds'),
          exposes.binary('state', ACCESS_STATE | ACCESS_WRITE | ACCESS_READ, 'ON', 'OFF').withEndpoint('l3').withDescription('Pump 2'),
          exposes.numeric('trigger', ACCESS_WRITE).withEndpoint('l3').withDescription('On time').withUnit('seconds'),
          exposes.binary('state', ACCESS_STATE | ACCESS_WRITE | ACCESS_READ, 'ON', 'OFF').withEndpoint('l4').withDescription('Pump 3'),
          exposes.numeric('trigger', ACCESS_WRITE).withEndpoint('l4').withDescription('On time').withUnit('seconds'),
          exposes.binary('state', ACCESS_STATE | ACCESS_WRITE | ACCESS_READ, 'ON', 'OFF').withEndpoint('l5').withDescription('Buzzer'),
          exposes.binary('state', ACCESS_STATE, 'ON', 'OFF').withEndpoint('l6').withDescription('Water leak'),
          exposes.binary('state', ACCESS_STATE, 'ON', 'OFF').withEndpoint('l7').withDescription('Low level'),

          exposes.numeric('interval', exposes.access.SET).withEndpoint('l8').withDescription('Report interval').withUnit('seconds'),


          //exposes.numeric('threshold1', ACCESS_STATE | ACCESS_WRITE | ACCESS_READ).withUnit('ppm'),
          //e.switch().withEndpoint('l2'), e.switch().withEndpoint('l3'), e.switch().withEndpoint('l4'),
          //e.switch().withEndpoint('l5').withDescription('buzzer'),// e.switch().withEndpoint('l6'), e.switch().withEndpoint('l7'),
          //e.sos().withState('water_low_level', true, 'water low level').withEndpoint('l7'),
          //e.action(['OFF', 'ON']).withEndpoint('l7'),
          //e.action(['OFF', 'ON']).withEndpoint('l6'),
          //e.water_leak().withState('water_leak', true, 'water leak').withEndpoint('l6'),
          //water_leak: () => new Binary('water_leak', access.STATE, true, false).withDescription('Indicates whether the device detected a water leak').withEndpoint('l6'),s
          //e.battery_low(),
          //e.switch(),

      ],
      meta: {multiEndpoint: true},
      endpoint: (device) => {
          return {
              'l1': 1, 'l2': 2, 'l3': 3, 'l4': 4, 'l5': 5, 'l6': 6, 'l7': 7, 'l8': 8,
              'action': 1,
          };
      },
    };

module.exports = device;
