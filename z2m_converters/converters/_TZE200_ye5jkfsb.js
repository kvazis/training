// Название: Термостат AVATTO ZWT81
// Модель: ZWT81 (ME81H)
// modelID: TS0601
// manufacturerName: _TZE200_ye5jkfsb

const fz = {...require('zigbee-herdsman-converters/converters/fromZigbee'), legacy: require('zigbee-herdsman-converters/lib/legacy').fromZigbee};
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const e = exposes.presets;
const ea = exposes.access;
const ota = require('zigbee-herdsman-converters/lib/ota');


const dp_avatto_thermostat_OnOff=1;
const dp_avatto_thermostat_Preset=2;
const dp_avatto_thermostat_heating_setpoint=16;
const dp_avatto_thermostat_MinTemp=26; 
const dp_avatto_thermostat_external_sensor_temperature=101;
const dp_avatto_thermostat_kinds_of_period=104;
const dp_avatto_thermostat_AntiFrozen=103;
const dp_avatto_thermostat_deadzone_temperature=106;
const dp_avatto_thermostat_scheduling=108;
const dp_avatto_thermostat_MaxTempLimit=25; //НЕ РАБОТАЕТ !!! 105
const dp_avatto_thermostat_unknown_command=39; //НЕ РАБОТАЕТ !!! 105


const fz_moes_thermostat_custom = {
	cluster: 'manuSpecificTuya',
	//type: ['commandGetData', 'commandSetDataResponse'], //for Zigbee2Mqtt  1.22.1
	type: ['commandDataResponse', 'commandDataReport'],   //for Zigbee2Mqtt  1.22.2

	convert: (model, msg, publish, options, meta) => 
	{
		/*
		const dp = msg.data.dp;
		const value = tuya.getDataValue(msg.data.datatype, msg.data.data);
		let temperature;
		meta.logger.warn(`COMMAND #${dp} with data ${JSON.stringify(msg.data)}`);
		*/
		const dpValue = tuya.firstDpValue(msg, meta, 'moes_thermostat');
        const dp = dpValue.dp;
        const value = tuya.getDataValue(dpValue);
        let temperature;
		
		/* See tuyaThermostat above for message structure comment */
		/*
const dataTypes = {
    raw:    0, // [ bytes ]
    bool:   1, // [0/1]
    value:  2, // [ 4 byte value ]
    string: 3, // [ N byte string ]
    enum:   4, // [ 0-255 ]
    bitmap: 5, // [ 1,2,4 bytes ] as bits
};

*/
		switch (dp) {
		case  dp_avatto_thermostat_external_sensor_temperature: // температура внешнего сенсора !!!
		{
		 temperature = value & 1<<15 ? value - (1<<16) + 1 : value;
		 return {external_temperature: temperature};                
		} 
		
		case dp_avatto_thermostat_scheduling:
		{    
		    const tdelim =' -  ';
			return {weekdays_p1: value[0] + ':' +  value[1] + tdelim +  value[2]+'°',
					weekdays_p2: value[3] + ':' +  value[4] + tdelim +  value[5]+'°',
					weekdays_p3: value[6] + ':' +  value[7] + tdelim +  value[8]+'°',
					weekdays_p4: value[9] + ':' +  value[10] + tdelim + value[11]+'°',
					weekdays_p5: value[12] + ':' + value[13] + tdelim + value[14]+'°',
					weekdays_p6: value[15] + ':' + value[16] + tdelim + value[17]+'°',
					weekends_p1: value[18] + ':' + value[19] + tdelim + value[20]+'°',
					weekends_p2: value[21] + ':' + value[22] + tdelim + value[23]+'°',
			        thermostat_schedule:value[0] + ':' +   value[1] + '/' +  value[2]+' '+
			                            value[3] + ':' +   value[4] + '/' +  value[5]+' '+
			                            value[6] + ':' +   value[7] + '/' +  value[8]+' '+
			                            value[9] + ':' +   value[01] + '/' +  value[11]+' '+
			                            value[12] + ':' +  value[13] + '/' +  value[14]+' '+
			                            value[15] + ':' +  value[16] + '/' +  value[17]+' '+
			                            value[18] + ':' +  value[19] + '/' +  value[20]+' '+
			                            value[21] + ':' +  value[22] + '/' +  value[23]
			        
			      };
		}	
		case 1: // system mode (OFF, ON) 
	           //data {"seq":0,"dp":1,"datatype":1,"fn":0,"data":{"type":"Buffer","data":[0]}}
		       if(value == 0) return {state: 'OFF', system_mode: 'off', running_state:'idle', heat:'OFF'};
		  else if(value == 1) return {state: 'ON', system_mode: 'heat'};
		  else  return {};
			
		case 2: // preset
			   if(value == 0) return {preset: 'hold'};
		  else if(value == 1) return {preset: 'program'};
		  else return {};
			
		case 16: // temperature setpoint for both heating and cooling
			return {current_heating_setpoint: value};
			
		case tuya.dataPoints.moesChildLock: //40
			return {child_lock: value ? 'LOCK' : 'UNLOCK'};
			
		case tuya.dataPoints.moesMaxTempLimit: //18
		    // при выходе из режима программрования термостат должен отправить 8 параметров, а отправляет только 7!!! Overheat Protection не высылается и узнать номер DP не получается!
			return {max_temperature_limit: value};
	
		case tuya.dataPoints.moesMaxTemp: //19
			return {max_temperature: value};
			
		case dp_avatto_thermostat_MinTemp:
		     return {min_temperature: value};
		     
		case dp_avatto_thermostat_deadzone_temperature: 
			return {deadzone_temperature: value};
	
		case tuya.dataPoints.moesLocalTemp: //24
			temperature = value & 1<<15 ? value - (1<<16) + 1 : value;
			return {local_temperature: temperature};
			
		case tuya.dataPoints.moesTempCalibration: //27
			temperature = value;
			// for negative values produce complimentary hex (equivalent to negative values)
			if (temperature > 4000) temperature = temperature - 4096;
			return {local_temperature_calibration: temperature};
		
		case tuya.dataPoints.moesValve: //DP-36  0-ON, 1-off
		if (value == 0) 
		         return {heat: 'ON',  running_state: 'heat'};
		   else  return {heat: 'OFF', running_state:  'idle'};
		
		case tuya.dataPoints.moesSensor: //43
			switch (value) {
			case 0: return {sensor: 'IN'};
			case 1:	return {sensor: 'OU'};
			case 2:	return {sensor: 'AL'};
			default:return {sensor: 'not_supported'};
			}
			
		case dp_avatto_thermostat_AntiFrozen:
		   return {anti_frozen: value ? 'ON' : 'OFF'};
		   
         case  dp_avatto_thermostat_kinds_of_period:
                 if (value == 0) return {kinds_of_period: 'OFF'};
		   else  if (value == 1) return {kinds_of_period:  'DB'};
		   else  if (value == 2) return {kinds_of_period:  'SB'};
		   else  if (value == 3) return {kinds_of_period:  'NB'};
		   else return{};
		   
		case 45:
		    {
		    //meta.logger.warn(`Возможно это статус ошибки #${dp} with data ${JSON.stringify(msg.data)}`);
		    //AVATTO ME81H: Unknown DP #45 with data {"status":8,"transid":0,"dp":45,"datatype":5,"fn":0,"data":{"type":"Buffer","data":[0]}}
		    //tvErrorStatus
		    //Возможно это статус ошибки
		    break;
		    }
	default: // DataPoint 17 is unknown
			meta.logger.warn(`AVATTO ME81H: Unknown DP #${dp} with data ${JSON.stringify(msg.data)}`);
		}
	},
};



const tz_state = {
	key: ['state'],
	convertSet: async (entity, key, value, meta) => 
	{  
	  	   if(value == "OFF") await tuya.sendDataPointBool(entity, 1, false);
  	  else if(value == "ON") 	await tuya.sendDataPointBool(entity, 1, true);
		
	},
};



const tz_temperature_setpoint = {
	key: ['current_heating_setpoint'],
	convertSet: async (entity, key, value, meta) => {
		await tuya.sendDataPointValue(entity, 16, value);
	},
};

//preset
const tz_thermostat_mode = { 
     key: ['preset'], 
     convertSet: async (entity, key, value, meta) => 
     {
      const preset_state = value === 'program' ? 1 : 0;
      await tuya.sendDataPointEnum(entity, 2, preset_state); //Program==false, Hold==true
     },
};


const tz_thermostat_sensor = 
{ 
     key: ['sensor'], 
     convertSet: async (entity, key, value, meta) => 
     {
         if (value == 'IN') await tuya.sendDataPointEnum(entity, tuya.dataPoints.moesSensor, 0); 
	else if (value == 'OU') await tuya.sendDataPointEnum(entity, tuya.dataPoints.moesSensor, 1); 
    else if (value == 'AL') await tuya.sendDataPointEnum(entity, tuya.dataPoints.moesSensor, 2); 
     },
};

const tz_deadzone_temperature =
{
     key: ['deadzone_temperature'],     
     convertSet: async (entity, key, value, meta) => 
     {
      await tuya.sendDataPointValue(entity, dp_avatto_thermostat_deadzone_temperature, value); 
     },
}

const tz_avatto_thermostat_max_temperature=
{
     key: ['max_temperature'], 
        convertSet: async (entity, key, value, meta) => 
        {
          await tuya.sendDataPointValue(entity, tuya.dataPoints.moesMaxTemp, value);
        }        
};

const tz_avatto_thermostat_min_temperature=
{
    key: ['min_temperature'], 
        convertSet: async (entity, key, value, meta) => 
        {
          await tuya.sendDataPointValue(entity, dp_avatto_thermostat_MinTemp, value);
        } 
};

const tz_avatto_thermostat_max_temperature_limit=
{
     key: ['max_temperature_limit'], 
        convertSet: async (entity, key, value, meta) => 
        {
          await tuya.sendDataPointValue(entity, dp_avatto_thermostat_MaxTempLimit, value);
        }        
};

const tz_avatto_thermostat_antifrozen=
{
	key: ['anti_frozen'],
	convertSet: async (entity, key, value, meta) => 
	{
	      if(value == "OFF") { await tuya.sendDataPointBool(entity, dp_avatto_thermostat_AntiFrozen, false);} 
     else if(value == "ON")  { await tuya.sendDataPointBool(entity, dp_avatto_thermostat_AntiFrozen, true); }
	},
	
};

const tz_avatto_thermostat_kinds_of_period = 
{ 
     key: ['kinds_of_period'], 
     convertSet: async (entity, key, value, meta) => 
     {
         if (value == 'OFF') await tuya.sendDataPointEnum(entity, dp_avatto_thermostat_kinds_of_period, 0); 
	else if (value == 'DB') await tuya.sendDataPointEnum(entity, dp_avatto_thermostat_kinds_of_period, 1); 
    else if (value == 'SB') await tuya.sendDataPointEnum(entity, dp_avatto_thermostat_kinds_of_period, 2); 
    else if (value == 'NB') await tuya.sendDataPointEnum(entity, dp_avatto_thermostat_kinds_of_period, 3); 
     },
};



const tz_system_mode = 
{
	key: ['system_mode'],
	convertSet: async (entity, key, value, meta) => 
	 {
	  
		     if(value == "off")  await tuya.sendDataPointBool(entity, 1, false);
		else if(value == "heat") await tuya.sendDataPointBool(entity, 1, true);
		else                     await tuya.sendDataPointBool(entity, 1, true);
	
	},
	convertGet: async (entity, key, value, meta) => 
	{
	   await entity.read('hvacThermostat', ['SystemMode']);
	}
};


/*
    power_on_behavior: {
        key: ['power_on_behavior'],
        convertSet: async (entity, key, value, meta) => {
            value = value.toLowerCase();
            const lookup = {'off': 0, 'on': 1, 'toggle': 2, 'previous': 255};
            utils.validateValue(value, Object.keys(lookup));
            await entity.write('genOnOff', {startUpOnOff: lookup[value]}, utils.getOptions(meta.mapped, entity));
            return {state: {power_on_behavior: value}};
        },
        convertGet: async (entity, key, meta) => {
            await entity.read('genOnOff', ['startUpOnOff']);
        },
*/

/*
const tz_test_data = 
{
	key: ['test_data'],
	convertSet: async (entity, key, value, meta) => 
	 {
      await  tuya.sendDataPointValue(entity, dp_avatto_thermostat_unknown_command, value);
	 },
};
*/

function SetScheduleData(value) 
{
 const hourTemperature = value.split(' ');
 const hourMinute = hourTemperature[0].split(':', 2);
 const h = parseInt(hourMinute[0]);
 const m = parseInt(hourMinute[1]);
 const temp = parseInt(hourTemperature[1]);
 if (h < 0 || h >= 24 || m < 0 || m >= 60 || temp < 5 || temp >= 35) 
             {
              throw new Error('Invalid hour, minute or temperature of:' + value);
              }
 const res=[h,m,temp];    
 return res;
}


const tz_thermostat_schedule = 
{
 key: ['thermostat_schedule'],
 convertSet: async (entity, key, value, meta) => 
 {
  const schedule_data = [];
  const items = value.split(' ');
  
  for (let i = 0; i < 8; i++) 
  {//i
    const hourTemperature = items[i].split('/');
    const hourMinute = hourTemperature[0].split(':', 2);
    const h = parseInt(hourMinute[0]);
    const m = parseInt(hourMinute[1]);
    const temp = parseInt(hourTemperature[1]);
    if (h < 0 || h >= 24 || m < 0 || m >= 60 || temp < 5 || temp >= 35) 
       {throw new Error('Invalid hour, minute or temperature of:' + items[i]);}
    schedule_data[i*3] = h; 
    schedule_data[i*3+1] = m; 
    schedule_data[i*3+2] = temp;
  }//i
  
  await  tuya.sendDataPointRaw(entity, dp_avatto_thermostat_scheduling, schedule_data);
 }
}



module.exports = [
    {
        fingerprint: [{modelID: 'TS0601', manufacturerName: '_TZE200_ye5jkfsb'}],
        model: 'ME81H',
        vendor: 'AVATTO',
        description: 'Heating Thermostat',
        ota: ota.zigbeeOTA,
        fromZigbee: [fz_moes_thermostat_custom],
        toZigbee: [tz_state, 
                   tz_thermostat_mode, 
                   tz_temperature_setpoint, 
                   tz.moes_thermostat_child_lock, 
                   tz.moes_thermostat_current_heating_setpoint, 
                   tz_thermostat_sensor,
                   tz.moes_thermostat_calibration,
                   tz_deadzone_temperature,
                   tz_avatto_thermostat_max_temperature_limit,
                   tz_avatto_thermostat_max_temperature,
                   tz_avatto_thermostat_min_temperature,
                   tz_avatto_thermostat_antifrozen,
                   tz_avatto_thermostat_kinds_of_period,
                   tz_system_mode,
                   tz_thermostat_schedule
                   ], 
                   
            
           //ЧТО ОТОБРАЖАТЬ В ИНТЕРФЕЙСЕ
            exposes: [e.child_lock(), 
                      e.deadzone_temperature().withValueMin(1).withValueMax(5).withValueStep(1) , 
                      e.max_temperature().withUnit('°C').withValueMin(30).withValueMax(90), 
                      e.min_temperature().withUnit('°C').withValueMin(5).withValueMax(20), 
                      e.max_temperature_limit().withUnit('°C').withValueMin(5).withValueMax(60), 
                      exposes.numeric('external_temperature', ea.STATE).withUnit('°C').withDescription('External Sensor Temperature'),
                     
            
            exposes.climate() 
                .withLocalTemperature(ea.STATE)
				.withSetpoint('current_heating_setpoint', 5, 35, 1, ea.STATE_SET) 
				.withLocalTemperatureCalibration(-5, 5, 1,ea.STATE_SET)
				.withRunningState(['idle', 'heat'], ea.STATE)
                .withPreset(['hold', 'program'])
				.withSensor(['IN', 'OU', 'AL'], ea.STATE_SET)
			    .withSystemMode(['off', 'heat']),
				exposes.binary('anti_frozen', ea.STATE_SET, 'ON', 'OFF').withDescription('Anti frozen function'),
                exposes.enum('kinds_of_period', ea.STATE_SET, ['OFF', 'DB', 'SB', 'NB']).withDescription('Schedule mode: off, Double break, Single break, No day off'),
				exposes.text('thermostat_schedule', ea.STATE_SET), 
                exposes.text('weekdays_p1', ea.STATE).withDescription('wakeups'), //Подъем
                exposes.text('weekdays_p2', ea.STATE).withDescription('work time'), //Работа
                exposes.text('weekdays_p3', ea.STATE).withDescription('day time'), //день
                exposes.text('weekdays_p4', ea.STATE).withDescription('return to home'), //возвращение после работы
                exposes.text('weekdays_p5', ea.STATE).withDescription('at home'), //дома
                exposes.text('weekdays_p6', ea.STATE).withDescription('night'), //сон
                exposes.text('weekends_p1', ea.STATE).withDescription('weekend wakeups'),
                exposes.text('weekends_p2', ea.STATE).withDescription('weekend night')
                 ],
				
			onEvent: tuya.onEventSetLocalTime,
    },
];