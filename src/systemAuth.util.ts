import ReactNativeBiometrics from "react-native-biometrics";

const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

export async function checkForSystemAuthSensors() {
  const { available, error, biometryType } =
    await rnBiometrics.isSensorAvailable();

  if (available && !error && biometryType) {
    return true;
  }

  return false;
}

export async function generateSystemAuthPublicKeyIfNotExisting() {
  const { keysExist } = await rnBiometrics.biometricKeysExist();
  if (!keysExist) {
    return await generateSystemAuthPublicKey();
  }

  return true;
}

export async function generateSystemAuthPublicKey() {
  // delete any existing keys
  try {
    const { keysExist } = await rnBiometrics.biometricKeysExist();

    if (keysExist) {
      await rnBiometrics.deleteKeys();
    }
  } catch (e) {}

  let _publicKey: string;
  try {
    const { publicKey } = await rnBiometrics.createKeys();
    _publicKey = publicKey;
  } catch (e) {
    _publicKey = "failed-to-generate-keys";
  }

  return _publicKey;
}

export async function showSystemAuthSimplePrompt() {
  let _success = false;
  try {
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: "Sign in",
    });

    _success = success;
  } catch (e: any) {
    const _message: string = e.message;
    if (_message.includes("Error displaying local biometric prompt")) {
      _success = true;
    } else throw Error(e);
  }

  return _success;
}

export function deleteSystemAuthPublicKey() {
  try {
    rnBiometrics.deleteKeys();
  } catch (e) {}
}
