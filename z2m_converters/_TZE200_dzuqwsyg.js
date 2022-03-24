// Название: ZigBee Fan Coil Thermostat
// Модель: BAC-002-ALZB
// modelID: TS0601
// manufacturerName: _TZE200_dzuqwsyg

//const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const fz = {...require('zigbee-herdsman-converters/converters/fromZigbee'), legacy: require('zigbee-herdsman-converters/lib/legacy').fromZigbee};
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const ota = require('zigbee-herdsman-converters/lib/ota');
const {repInterval, defaultBindGroup, OneJanuary2000} = require('zigbee-herdsman-converters/lib/constants');
const utils = require('zigbee-herdsman-converters/lib/utils');
const e = exposes.presets;
const ea = exposes.access;
const globalStore = require('zigbee-herdsman-converters/lib/store');

const dp_bac3000_sensor=43;
const dp_bac3000_max_temperature=19;
const dp_bac3000_dead_zone_temperature=26;

//Unknown DP #19 with data {"seq":3840,"dp":19,"datatype":2,"fn":0,"data":{"type":"Buffer","data":[0,0,0,37]}}
//Unknown DP #26 with data {"seq":4096,"dp":26,"datatype":2,"fn":0,"data":{"type":"Buffer","data":[0,0,0,2]}}

const fz_moes_thermostat_custom = {
	cluster: 'manuSpecificTuya',
	//type: ['commandGetData', 'commandSetDataResponse'], // Так написано в инструкции но это НЕ РАБОТАЕТ!!!  https://www.zigbee2mqtt.io/advanced/support-new-devices/02_support_new_tuya_devices.html#_4-deciphering-the-data-points
	type: ['commandDataResponse', 'commandDataReport'], // Это взято из исхордников zigbee-herdsman-converters-master и РАБОТАЕТ
	convert: (model, msg, publish, options, meta) => {
		const dp = msg.data.dp;
		const value = tuya.getDataValue(msg.data.datatype, msg.data.data);
		let temperature; 
		/* See tuyaThermostat above for message structure comment */
		switch (dp) {
		
		case 1: // state (OFF, ON)
		//Если получено сообщение о включении ил выключении термостата то необходимо вручную установить Systeм Mode
		       if(value == 0) 	return {state: 'OFF', system_mode: 'off'};
		  else if(value == 1) 	return {state: 'ON'};
		  else { meta.logger.warn(`DATA POINT Mode #${dp} with data ${JSON.stringify(msg.data)}`); return {};}
		  
		case 2: // system mode (cooling, heating, fan)
			   if(value == 0) return {system_mode: 'cool', last_system_mode: 'cool'};
		  else if(value == 1) return {system_mode: 'heat', last_system_mode: 'heat'};
		  else if(value == 2) return {system_mode: 'fan_only', last_system_mode: 'fan_only'};
		  else { meta.logger.warn(`DATA POINT System Mode #${dp} with data ${JSON.stringify(msg.data)}`); return {};}
			
		case 4: // preset (hold, program)
//Program / Hold message
// Unrecognized DP #4 with data {"status":0,"transid":16,"dp":4,"datatype":1,"fn":0,"data":{"type":"Buffer","data":[0]}}  program
// Unrecognized DP #4 with data {"status":0,"transid":20,"dp":4,"datatype":1,"fn":0,"data":{"type":"Buffer","data":[1]}} manual
			    if(value == 0) return {preset: 'program'};
		   else if(value == 1) return {preset: 'hold'};
		   else { meta.logger.warn(`DATA POINT Preset #${dp} with data ${JSON.stringify(msg.data)}`); return {};}
			
		case 28: // fan mode
			    if(value == 0) return {fan_mode: 'low'};
		   else if(value == 1) return {fan_mode: 'medium'};
		   else if(value == 2) return {fan_mode: 'high'};
		   else if(value == 3) return {fan_mode: 'auto'};
		   else return {};
			
		case 16: // temperature setpoint for both heating and cooling
			return {current_heating_setpoint: value, occupied_heating_setpoint: value, occupied_cooling_setpoint: value};
		case tuya.dataPoints.moesChildLock:
			return {child_lock: value ? 'LOCK' : 'UNLOCK'};
		/*	
		case tuya.dataPoints.moesMaxTempLimit:
		    //meta.logger.warn(`DATA POINT MAX TEMP #${			dp} with data ${JSON.stringify(msg.data)}`);
			return {max_temperature_limit: value};
		*/	
		case dp_bac3000_max_temperature:
			return {max_temperature: value};
			
		case dp_bac3000_dead_zone_temperature: 
			return {deadzone_temperature: value};
			
		case tuya.dataPoints.moesLocalTemp:
			temperature = value & 1<<15 ? value - (1<<16) + 1 : value;
			return {local_temperature: parseFloat((temperature / 10).toFixed(1))};
			
		case tuya.dataPoints.moesTempCalibration:
			temperature = value;
			// for negative values produce complimentary hex (equivalent to negative values)
			if (temperature > 4000) temperature = temperature - 4096;
			return {local_temperature_calibration: temperature};
		/*	
		case tuya.dataPoints.moesHold: // state is inverted, preset_mode is deprecated DP:2;
			return {preset_mode: value ? 'program' : 'hold', preset: value ? 'program' : 'hold'};
			
		case tuya.dataPoints.moesScheduleEnable: // state is inverted, preset_mode is deprecated //DP:3;
			return {preset_mode: value ? 'hold' : 'program', preset: value ? 'hold' : 'program'};
			
		
		case tuya.dataPoints.moesValve: //DP-36
		 meta.logger.warn(`DATA POINT Valve #${			dp} with data ${JSON.stringify(msg.data)}`);
		 return {heat: value ? 'ON' : 'OFF', running_state: (value ? 'coll' : 'idle')};
		
		case tuya.dataPoints.runningState:
		 meta.logger.warn(`DATA POINT Runung state #${			dp} with data ${JSON.stringify(msg.data)}`);
         return {running_state: value ? 'heat' : 'idle'};	
		*/   
		case dp_bac3000_sensor:
		    meta.logger.warn(`SENSOR #${			dp} with data ${JSON.stringify(msg.data)}`);
			switch (value) 
			{
			case 0:	return {sensor: 'IN'};
			case 1:	return {sensor: 'AL'};
			case 2:	return {sensor: 'OU'};
			default: return {sensor: 'not_supported'};
			}
			
			
		case tuya.dataPoints.moesSchedule: //DP:101
		 //Moes BHT-002: Unknown DP #101 with data {"seq":23552,"dp":101,"datatype":0,"fn":0,"data":{"type":"Buffer","data":[6,0,44,11,30,42,13,30,44,17,30,46,6,0,48,12,0,46,14,30,48,17,30,48,6,0,38,12,30,40,14,30,42,18,30,50]}}
			return {
				program: [
					{weekdays_p1: value[0] + 'h:' + value[1] + 'm ' + value[2]/2 + '°C'},
					{weekdays_p2: value[3] + 'h:' + value[4] + 'm ' + value[5]/2 + '°C'},
					{weekdays_p3: value[6] + 'h:' + value[7] + 'm ' + value[8]/2 + '°C'},
					{weekdays_p4: value[9] + 'h:' + value[10] + 'm ' + value[11]/2 + '°C'},
					{saturday_p1: value[12] + 'h:' + value[13] + 'm ' + value[14]/2+ '°C'},
					{saturday_p2: value[15] + 'h:' + value[16] + 'm ' + value[17]/2 + '°C'},
					{saturday_p3: value[18] + 'h:' + value[19] + 'm ' + value[20]/2 + '°C'},
					{saturday_p4: value[21] + 'h:' + value[22] + 'm ' + value[23]/2 + '°C'},
					{sunday_p1: value[24] + 'h:' + value[25] + 'm ' + value[26]/2 + '°C'},
					{sunday_p2: value[27] + 'h:' + value[28] + 'm ' + value[29]/2 + '°C'},
					{sunday_p3: value[30] + 'h:' + value[31] + 'm ' + value[32]/2 + '°C'},
					{sunday_p4: value[33] + 'h:' + value[34] + 'm ' + value[35]/2 + '°C'},
				],
			};
			

		default: // DataPoint 17 is unknown
			meta.logger.warn(`BAC-002-ALZB: Unknown DP #${
				dp} with data ${JSON.stringify(msg.data)}`);
		}
	},
};


const tz_state = {
	key: ['state'],
	convertSet: async (entity, key, value, meta) => 
	{
	  	  if(value == "OFF") await tuya.sendDataPointBool(entity, 1, false);
	 else if(value == "ON")  await tuya.sendDataPointBool(entity, 1, true);
		
	},
};

const tz_system_mode = {
	key: ['system_mode'],
	convertSet: async (entity, key, value, meta) => 
	{//При изменении режима работы надо послат команду включения термостата если он выключен
 	  	  if(value == "cool")       {await tuya.sendDataPointEnum(entity, 2, 0)}
	 else if(value == "heat")       {await tuya.sendDataPointEnum(entity, 2, 1)}
	 else if(value == "fan_only") 	{await tuya.sendDataPointEnum(entity, 2, 2)}
	 else if(value == "off") 	     await await tuya.sendDataPointBool(entity, 1, false);	
	},
};

const tz_temperature_setpoint = 
{
	key: ['current_heating_setpoint','occupied_heating_setpoint', 'occupied_cooling_setpoint'],
	convertSet: async (entity, key, value, meta) => {
		await tuya.sendDataPointValue(entity, 16, value);
	},
};

const tz_thermostat_mode = {
     key: ['preset'], 
     convertSet: async (entity, key, value, meta) => {
         const preset_state = value === 'program' ? 0 : 1;
         await tuya.sendDataPointBool(entity, 4, preset_state); //Program==false, Hold==true
        },
};


const tz_fan_mode = {
	key: ['fan_mode'],
	convertSet: async (entity, key, value, meta) => 
	{
		   if(value == "low") 	   await tuya.sendDataPointEnum(entity, 28, 0);
	  else if(value == "medium")   await tuya.sendDataPointEnum(entity, 28, 1);
	  else if(value == "high") 	   await tuya.sendDataPointEnum(entity, 28, 2);			
	  else if(value == "auto") 	   await tuya.sendDataPointEnum(entity, 28, 3);			
	},
};


const tz_thermostat_sensor = 
{ 
     key: ['sensor'], 
     convertSet: async (entity, key, value, meta) => 
     {
         if (value == 'IN') await tuya.sendDataPointEnum(entity, dp_bac3000_sensor, 0); 
	else if (value == 'AL') await tuya.sendDataPointEnum(entity, dp_bac3000_sensor, 1); 
    else if (value == 'OU') await tuya.sendDataPointEnum(entity, dp_bac3000_sensor, 2); 
     },
};

const tz_deadzone_temperature = 
{
	key: ['deadzone_temperature'],
	convertSet: async (entity, key, value, meta) => 
	{
	 await tuya.sendDataPointValue(entity, dp_bac3000_dead_zone_temperature, value);
	},
};

const tz_max_temperature =
{
	key: ['max_temperature'],
	convertSet: async (entity, key, value, meta) => 
	{
	 await tuya.sendDataPointValue(entity, dp_bac3000_max_temperature, value);
	},
};

/*
async function MyonEventSetTime(type, data, device) 
{
    const nextTimeUpdate = globalStore.getValue(device, 'nextTimeUpdate');
    const forceTimeUpdate = nextTimeUpdate == null || nextTimeUpdate < new Date().getTime();
    
    //if (data.type === 'commandSetTimeRequest' && data.cluster === 'manuSpecificTuya') || forceTimeUpdate) 
    if (data.type === 'commandSetTimeRequest' && data.cluster === 'manuSpecificTuya') 
    {
      
        globalStore.putValue(device, 'nextTimeUpdate', new Date().getTime() + 3600 * 1000);{
        
            try {
            const utcTime = Math.round(((new Date()).getTime() - constants.OneJanuary2000) / 1000);
            const localTime = utcTime - (new Date()).getTimezoneOffset() * 60;
            const endpoint = device.getEndpoint(1);
            const payload = {
                payloadSize: 8,
                payload: [
                    ...convertDecimalValueTo4ByteHexArray(utcTime),
                    ...convertDecimalValueTo4ByteHexArray(localTime),
                ],
            };
            await endpoint.command('manuSpecificTuya', 'setTime', payload, {});
        } catch (error) {}
    }
    
   }
   
};

*/


                   
module.exports = [
    {
        fingerprint: [{modelID: 'TS0601', manufacturerName: '_TZE200_dzuqwsyg'}],
        model: 'BAC-002-ALZB',
        vendor: 'HKGK',
        description: 'Fan Coil thermostat',
        fromZigbee: [fz_moes_thermostat_custom],
        toZigbee: [tz_state, 
                   tz_system_mode, 
                   tz_fan_mode, 
                   tz_thermostat_mode, 
                   tz_temperature_setpoint, 
                   tz.moes_thermostat_child_lock, 
                   tz.moes_thermostat_current_heating_setpoint, 
                   tz.moes_thermostat_mode,
                   tz.hgkg_thermostat_standby, 
                   tz_thermostat_sensor,
                   tz.moes_thermostat_calibration,
                   tz_deadzone_temperature,
                   tz_max_temperature],
                   
           //ЧТО ОТОБРАЖАТЬ В ИНТЕРФЕЙСЕ
            exposes: [e.child_lock(), 
                      e.deadzone_temperature(), 
                      e.max_temperature(),
			exposes.switch()
				.withState('state', false, 'OFF/ON state'), //Управляется через SystemMode
            exposes.climate() 
                .withSetpoint('current_heating_setpoint', 15, 30, 1, ea.STATE_SET)
				//.withSetpoint('occupied_heating_setpoint', 5, 35, 1, ea.STATE_SET)
				//.withSetpoint('occupied_cooling_setpoint', 5, 35, 1, ea.STATE_SET)
                .withLocalTemperature(ea.STATE)
				.withLocalTemperatureCalibration(-5, 5, 1,ea.STATE_SET)
                .withSystemMode(['cool', 'heat', 'fan_only'], ea.STATE_SET)
				.withFanMode(['low', 'medium', 'high', 'auto'], ea.STATE_SET)
				.withRunningState(['idle', 'heat', 'cool'], ea.STATE)
				//.withHeat(['OFF', 'ON'], ea.STATE)
                .withPreset(['hold', 'program'])
				//.withSensor(['IN', 'AL', 'OU'], ea.STATE_SET) У этого типа термостатов нет внешнего датчика
				],
        onEvent: tuya.onEventSetTime //tuya.onEventSetLocalTime,
    },
];