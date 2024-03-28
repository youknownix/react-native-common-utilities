import JailMonkey from "jail-monkey";
import RNExitApp from "react-native-exit-app";
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";

export const byPassChecker = async (exitAppOnSuspicion = true) => {
  try {
    if (__DEV__) return;

    const isEmulator = DeviceInfo.isEmulatorSync();
    const isJailBroken = JailMonkey.isJailBroken();
    const hookDetected = JailMonkey.hookDetected();

    const isCrashable = isEmulator || isJailBroken || hookDetected;

    if (isCrashable && exitAppOnSuspicion) {
      RNExitApp.exitApp();
    }
  } catch (e) {
    return;
  }
};

export const getVersionCode = () => {
  return DeviceInfo.getVersion();
};

export const getDeviceInfo = async () => {
  const deviceInfo = {
    platform: Platform.OS,
    osVersion: Platform.Version,
    deviceId: DeviceInfo.getUniqueIdSync(),
    deviceName: await DeviceInfo.getDeviceName(),
    brand: await DeviceInfo.getBrand(),
    model: await DeviceInfo.getModel(),
    memory: await DeviceInfo.getTotalMemory(),
    macAddress: await DeviceInfo.getMacAddress(),
    manufacturer: await DeviceInfo.getManufacturer(),
    ipAddress: await DeviceInfo.getIpAddress(),
    referer: await DeviceInfo.getInstallReferrer(),
    versionCode: await DeviceInfo.getVersion(),
  };

  return deviceInfo;
};

export async function generate_current_device_details({}: {
  loadFcmtokens?: boolean;
}) {
  const deviceId = DeviceInfo.getUniqueIdSync();
  const deviceName = DeviceInfo.getDeviceNameSync();
  const appVersion = DeviceInfo.getVersion();
  let fcmToken: string | null = null,
    apnsToken: string | null = null;

  // if (loadFcmtokens) {
  //   const notificationStatus = await notifee.getNotificationSettings();

  //   if (
  //     notificationStatus.authorizationStatus === AuthorizationStatus.AUTHORIZED
  //   ) {
  //     const _hasPermission = await Messaging().hasPermission();
  //     if (_hasPermission) {
  //       if (Platform.OS === "ios") {
  //         apnsToken = await Messaging().getAPNSToken();
  //       }
  //       fcmToken = await Messaging().getToken();
  //     }
  //   }
  // }

  const deviceObj = {
    deviceId,
    deviceType: "mobile",
    deviceName,
    deviceOs: "ios",
    user: "",
    appVersion,
    fcmToken,
    apnsToken,
    isOnline: false,
  };

  return deviceObj;
}
