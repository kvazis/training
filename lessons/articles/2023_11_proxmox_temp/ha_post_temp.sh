#!/bin/bash

# Home Assistant Settings
url_base="http://192.168.0.40:8123/api/states"
token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX-dUrka1Eis"

# Server name
srv_name="n100"

# Constants for device info
DEVICE_IDENTIFIERS='["n100_server"]'
DEVICE_NAME="Intel N100"
DEVICE_MANUFACTURER="AC8-N"
DEVICE_MODEL="N100 16 512"


# Function to send data to Home Assistant
send_to_ha() {
  local sensor_name=$1
  local temperature=$2
  local friendly_name=$3
  local icon=$4
  local unique_id=$5

  local url="${url_base}/${sensor_name}"
  local device_info="{\"identifiers\":${DEVICE_IDENTIFIERS},\"name\":\"${DEVICE_NAME}\",\"manufacturer\":\"${DEVICE_MANUFACTURER}\",\"model\":\"${DEVICE_MODEL}\"}"
  local payload="{\"state\":\"${temperature}\",\"attributes\": {\"friendly_name\":\"${friendly_name}\",\"icon\":\"${icon}\",\"state_class\":\"measurement\",\"unit_of_measurement\":\"°C\",\"device_class\":\"temperature\",\"unique_id\":\"${unique_id}\"},\"device\":${device_info}}"
  
  curl -X POST -H "Authorization: Bearer ${token}" -H 'Content-type: application/json' --data "${payload}" "${url}"
}

# Send CPU package temperature
cpu_temp=$(sensors | grep 'Package id 0' | awk '{print $4}' | sed 's/+//;s/°C//')
send_to_ha "sensor.${srv_name}_cpu_temperature" "${cpu_temp}" "CPU Package Temperature" "mdi:cpu-64-bit" "${srv_name}_cpu_temp"

# Send Chipset temperature (adjust device if necessary)
chipset_temp=$(sensors | grep 'temp1:' | awk '{print $2}' | sed 's/+//;s/°C//')

if [[ $chipset_temp != "" ]]; then
  send_to_ha "sensor.${srv_name}_chipset_temperature" "${chipset_temp}" "Chipset Temperature" "mdi:chip" "${srv_name}_chipset_temp"
fi

# Send NVMe/SSD composite temperature (adjust device if necessary)
nvme_temp=$(sensors | grep 'Composite' | head -1 | awk '{print $2}' | sed 's/+//;s/°C//')
if [[ $nvme_temp != "" ]]; then
  send_to_ha "sensor.${srv_name}_nvme_temperature" "${nvme_temp}" "NVMe/SSD Temperature" "mdi:harddisk" "${srv_name}_nvme_temp"
fi

# Send GPU temperature (adjust device if necessary)
gpu_temp=$(sensors | grep 'GPU Temp' | awk '{print $2}' | sed 's/+//;s/°C//')
if [[ $gpu_temp != "" ]]; then
  send_to_ha "sensor.${srv_name}_gpu_temperature" "${gpu_temp}" "GPU Temperature" "mdi:gpu" "${srv_name}_gpu_temp"
fi