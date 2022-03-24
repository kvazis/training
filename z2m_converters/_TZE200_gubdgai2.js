// Название: Tuya Zigbee Smart Curtain
// Модель: TS0601_cover
// modelID: TS0601
// manufacturerName: _TZE200_gubdgai2


const fz = require( 'zigbee-herdsman-converters/converters/fromZigbee' );
const tz = require( 'zigbee-herdsman-converters/converters/toZigbee' );
const exposes = require( 'zigbee-herdsman-converters/lib/exposes' );
const reporting = require( 'zigbee-herdsman-converters/lib/reporting' );
const extend = require( 'zigbee-herdsman-converters/lib/extend' );
const tuya = require( 'zigbee-herdsman-converters/lib/tuya' );
const e = exposes.presets;
const ea = exposes.access;

const definition = {
        zigbeeModel: [
            'owvfni3\u0000', 'owvfni3', 'u1rkty3', 'aabybja', // Curtain motors
            'mcdj3aq', 'mcdj3aq\u0000', // Tubular motors
            ],
        fingerprint: [
            { modelID: 'TS0601', manufacturerName: '_TZE200_gubdgai2' },
            ],
        model: 'TS0601_cover',
        vendor: 'TuYa',
        description: 'Curtain motor/roller blind motor/window pusher/tubular motor',
        whiteLabel: [
            {vendor: 'Tuya', model: 'M515EGZT'},
            ],
        fromZigbee: [
            fz.tuya_cover,
            fz.ignore_basic_report,
            ],
        toZigbee: [
            tz.tuya_cover_control,
            tz.tuya_cover_options,
            ],
        exposes: [
            e.cover_position().setAccess('position', ea.STATE_SET),
            ],
    };

module.exports = definition;