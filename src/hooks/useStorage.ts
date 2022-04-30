import {
  getDownloadURL,
  ref,
  StorageError,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { storage } from "../config/firebase";

const useStorage = (path: string) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File): Promise<string> => {
    setIsUploading(true);

    const storageRef = ref(storage, `/${path}/${file.name}`);

    return new Promise<string>((resolve, reject) => {
      uploadBytes(storageRef, file)
        .then((uploadTask) => {
          getDownloadURL(uploadTask.ref).then((url) => {
            resolve(url);
          });
        })
        .catch((err: StorageError) => {
          reject(new Error(err.message));
        })
        .finally(() => {
          setIsUploading(false);
        });
    });
  };

  return {
    isUploading,
    uploadFile,
  };
};

export default useStorage;
