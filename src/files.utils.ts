import RNFS from "react-native-fs";
import { getMimeType } from "node-utility-functions";

export default async function moveFileToStorage({
  sourceFileDir,
  newFileName,
  destFolder,
  action = "mv",
  deleteOnComplete = false,
}: {
  sourceFileDir: string;
  newFileName: string;
  destFolder: string;
  action?: "cp" | "mv";
  deleteOnComplete?: boolean;
}) {
  try {
    const _destPath = RNFS.DocumentDirectoryPath + destFolder;

    const _destFile = `${_destPath}${newFileName}`;

    if (!(await RNFS.exists(_destPath))) {
      await RNFS.mkdir(_destPath);
    }

    // check if destination already exists
    const destExists = await RNFS.exists(_destFile);

    if (destExists) {
      return { destFilePath: _destFile, newFileName: newFileName };
    }

    const sourceExists = await RNFS.exists(sourceFileDir);

    if (!sourceExists) {
      return null;
    }

    let actionCompleted = false;

    if (action === "cp") {
      // copy file
      await RNFS.copyFile(sourceFileDir, _destFile);
      actionCompleted = true;
    }

    if (action === "mv") {
      // move file
      await RNFS.moveFile(sourceFileDir, _destFile);
      actionCompleted = true;
    }

    if (deleteOnComplete && actionCompleted && action !== "mv") {
      // delete source file
      await RNFS.unlink(sourceFileDir);
    }

    if (actionCompleted) {
      return { destFilePath: _destFile, newFileName: newFileName };
    }

    return null;
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }

    return null;
  }
}

export function getExtension(filename: string) {
  const _ext = filename.substring(filename.lastIndexOf("."));

  return _ext;
}

export function getFileName(filename: string) {
  const _ext = getExtension(filename);

  return filename.replace(_ext, "");
}

export function fileParts(filename: string) {
  const ext = getExtension(filename);
  const identifier = getFileName(filename);
  const mime = getMimeType(filename);

  return { ext, identifier, mime };
}
