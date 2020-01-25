web接口           | 参数                             | 返回数据                   | 备注
----------------- | -------------------------------- | -------------------------- | -------------
getOpenId         | code                             | openid
bindPhone         | phone,openid                     | res
addDevice         | phone,serialNum,source           | deviceList
delDevice         | deviceId,phone                   | deviceList
userDevices       | phone                            | deviceList
userDeviceInfo    | deviceId,phone                   | deviceInfo
userDeviceConfig  | deviceId,phone                   | deviceConfig
deviceInfoCtrl    | deviceId,phone,xxx               | deviceInfo/deviceConfig
startAccessCtrl   | deviceId,phone                   | device
updatePassword    | deviceId,password                | deviceConfig
deviceLog         | deviceId,phone                   | log
addAccessRight    | deviceId,phone,aPhone            | deviceConfig,deviceRight
addCtrlRight      | deviceId,phone,source[,aPhone]   | deviceConfig,deviceRight   | source=2时增加aPhone
delRight          | deviceId,phone                   | res
rightList         | deviceId                         | rightList
----------------- | -------------------------------- | -------------------------- | -------------
