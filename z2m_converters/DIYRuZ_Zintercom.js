const {
    fromZigbeeConverters,
    toZigbeeConverters,
    exposes
} = require('zigbee-herdsman-converters');

const ep = exposes.presets;
const ea = exposes.access;

const bind = async (endpoint, target, clusters) => {
    for (const cluster of clusters) {
        await endpoint.bind(cluster, target);
    }
};

const configureReporting = {
    currentPositionLiftPercentage: async (endpoint, overrides) => {
        const payload = configureReportingPayload('currentPositionLiftPercentage', 1, repInterval.MAX, 1, overrides);
        await endpoint.configureReporting('closuresWindowCovering', payload);
    },
    batteryPercentageRemaining: async (endpoint, overrides) => {
        const payload = configureReportingPayload(
            'batteryPercentageRemaining', repInterval.HOUR, repInterval.MAX, 0, overrides,
        );
        await endpoint.configureReporting('genPowerCfg', payload);
    },
    batteryVoltage: async (endpoint, overrides) => {
        const payload = configureReportingPayload('batteryVoltage', repInterval.HOUR, repInterval.MAX, 0, overrides);
        await endpoint.configureReporting('genPowerCfg', payload);
    },
}

const configureReportingPayload = (attribute, min, max, change, overrides) => {
    const payload = {
        attribute: attribute,
        minimumReportInterval: min,
        maximumReportInterval: max,
        reportableChange: change,
    };


    if (overrides) {
        if (overrides.hasOwnProperty('min')) payload.minimumReportInterval = overrides.min;
        if (overrides.hasOwnProperty('max')) payload.maximumReportInterval = overrides.max;
        if (overrides.hasOwnProperty('change')) payload.reportableChange = overrides.change;
    }

    return [payload];
};

const repInterval = {
    MAX: 62000,
    HOUR: 3600,
    MINUTES_30: 1800,
    MINUTES_15: 900,
    MINUTES_10: 600,
    MINUTES_5: 300,
    MINUTE: 60,
};

const fz = {
  diy_zintercom_config: {
      cluster: 'closuresDoorLock',
      type: ['attributeReport', 'readResponse'],
      convert: (model, msg, publish, options, meta) => {
          const result = {};
          if (msg.data.hasOwnProperty(0x0050)) {
              result.state = ['Idle', 'Ring', 'Talk', 'Open', 'Drop'][msg.data[0x0050]];
          }
          if (msg.data.hasOwnProperty(0x0051)) {
              result.mode = ['Never', 'Once', 'Always', 'Drop'][msg.data[0x0051]];
          }
          if (msg.data.hasOwnProperty(0x0052)) {
              result.sound = ['OFF', 'ON'][msg.data[0x0052]];
          }
          if (msg.data.hasOwnProperty(0x0053)) {
              result.time_ring = msg.data[0x0053];
          }
          if (msg.data.hasOwnProperty(0x0054)) {
              result.time_talk = msg.data[0x0054];
          }
          if (msg.data.hasOwnProperty(0x0055)) {
              result.time_open = msg.data[0x0055];
          }
          if (msg.data.hasOwnProperty(0x0056)) {
              result.time_report = msg.data[0x0056];
          }
          return result;
      },
  },
}

const tz = {
  diy_zintercom_config: {
      key: ['state', 'mode', 'sound', 'time_ring', 'time_talk', 'time_open', 'time_report'],
      convertSet: async (entity, key, rawValue, meta) => {
          const lookup = {
              'OFF': 0x00,
              'ON': 0x01,
          };
          const modeOpenLookup = {
              'Never': '0',
              'Once': '1',
              'Always': '2',
              'Drop': '3',
          };


          let value = lookup.hasOwnProperty(rawValue) ? lookup[rawValue] : parseInt(rawValue, 10);

          if (key == 'mode') {
              value = modeOpenLookup.hasOwnProperty(rawValue) ? modeOpenLookup[rawValue] : parseInt(rawValue, 10);
          }

          const payloads = {
              mode: {0x0051: {value, type: 0x30}},
              sound: {0x0052: {value, type: 0x10}},
              time_ring: {0x0053: {value, type: 0x20}},
              time_talk: {0x0054: {value, type: 0x20}},
              time_open: {0x0055: {value, type: 0x20}},
              time_report: {0x0056: {value, type: 0x20}},
          };

          await entity.write('closuresDoorLock', payloads[key]);
          return {
              state: {[key]: rawValue},
          };
      },
      convertGet: async (entity, key, meta) => {
          const payloads = {
              state: ['closuresDoorLock', 0x0050],
              mode: ['closuresDoorLock', 0x0051],
              sound: ['closuresDoorLock', 0x0052],
              time_ring: ['closuresDoorLock', 0x0053],
              time_talk: ['closuresDoorLock', 0x0054],
              time_open: ['closuresDoorLock', 0x0055],
              time_report: ['closuresDoorLock', 0x0056],
          };
          await entity.read(payloads[key][0], [payloads[key][1]]);
      },
  },
}

const device = {
    zigbeeModel: ['DIY_Zintercom'],
    model: 'DIYRuZ_Zintercom',
    vendor: 'DIYRuZ',
    description: '[Matrix intercom auto opener](https://diyruz.github.io/posts/zintercom/)',
    icon: 'https://raw.githubusercontent.com/diyruz/Zintercom/master/images/z2m.png',
    fromZigbee: [
        fromZigbeeConverters.battery,
        fz.diy_zintercom_config,
    ],
    toZigbee: [
        toZigbeeConverters.factory_reset,
        tz.diy_zintercom_config,
    ],
    meta: {
        configureKey: 1,
    },
    configure: async (device, coordinatorEndpoint) => {
        const firstEndpoint = device.getEndpoint(1);

        await bind(firstEndpoint, coordinatorEndpoint, ['closuresDoorLock', 'genPowerCfg']);

        const overides = {min: 0, max: 3600, change: 0};
        await configureReporting.batteryVoltage(firstEndpoint, overides);
        await configureReporting.batteryPercentageRemaining(firstEndpoint, overides);

        const payload = [{
            attribute: {
                ID: 0x0050,
                type: 0x30,
            },
            minimumReportInterval: 0,
            maximumReportInterval: 3600,
            reportableChange: 0,
          },
        ];
        await firstEndpoint.configureReporting('closuresDoorLock', payload);

    },
    exposes: [
        exposes.enum('state', ea.STATE_GET, ['Idle', 'Ring', 'Talk', 'Open', 'Drop'])
            .withDescription('Current state'),
        exposes.enum('mode', ea.ALL, ['Never', 'Once', 'Always', 'Drop'])
            .withDescription('Select open mode'),
        exposes.binary('sound', ea.ALL, 'ON', 'OFF').withProperty('sound')
            .withDescription('Enable or disable sound'),
        exposes.numeric('time_ring', ea.ALL).withUnit('sec')
            .withDescription('Time to ring before answer'),
        exposes.numeric('time_talk', ea.ALL).withUnit('sec')
            .withDescription('Time to hold before open'),
        exposes.numeric('time_open', ea.ALL).withUnit('sec')
            .withDescription('Time to open before end'),
        exposes.numeric('time_report', ea.ALL).withUnit('min')
            .withDescription('Reporting interval'),
        ep.battery(),
        ep.linkquality(),
    ],
};

module.exports = device;