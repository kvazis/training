const fz = {
  airqmon_co2: {
    cluster: 'genAnalogInput',
    type: ['attributeReport', 'readResponse'],
    convert: (model, msg, publish, options) => {
      if (msg.endpoint.ID == 2 && msg.data['presentValue'] >= 400) {
        return {co2: msg.data['presentValue']};
      }
    },
  },

  airqmon_temperature: {
    cluster: 'genAnalogInput',
    type: ['attributeReport', 'readResponse'],
    convert: (model, msg, publish, options) => {
      if (msg.endpoint.ID == 1) {
        return {temperature: msg.data['presentValue']};
      }
    },
  },
};

const sensor_co2 = {
  type: 'sensor',
  object_id: 'co2',
  discovery_payload: {
    unit_of_measurement: 'ppm',
    icon: 'mdi:molecule-co2',
    value_template: '{{ value_json.co2 }}',
  },
};

const sensor_temperature = {
  type: 'sensor',
  object_id: 'temperature',
  discovery_payload: {
    unit_of_measurement: '°C',
    device_class: 'temperature',
    value_template: '{{ value_json.temperature }}',
  },
};

const device = {
  zigbeeModel: ['AirQMon'],
  model: 'AirQMon',
  vendor: 'DIY',
  description: 'CO₂ sensor',
  supports: 'CO₂ and temperature',
  fromZigbee: [fz.airqmon_co2, fz.airqmon_temperature],
  toZigbee: [],
  homeassistant: [sensor_co2, sensor_temperature],
};

module.exports = device;