import { AxiosError } from "axios";
import { Id, ToastOptions, toast } from "react-toastify";

export const toastConfig: ToastOptions = {
  position: "top-center",
  autoClose: 2000,
};

/**
 * Displays a toast message based on the provided type.
 *
 * @param {string} message - The message to display in the toast
 * @param {string} type - The type of toast to display (e.g. 'warn', 'success', 'info', 'error')
 * @return {void}
 */
export const showToast = (
  message: string,
  type: "warn" | "success" | "info" | "error",
  customConfig?: ToastOptions
) => {
  const config = customConfig || toastConfig;
  switch (type) {
    case "warn":
      toast.warn(message, config);
      break;
    case "success":
      toast.success(message, config);
      break;
    case "info":
      toast.info(message, config);
      break;
    case "error":
      toast.error(message, config);
      break;
  }
};

export const updateToast = (toastId: Id, message: string) => {
  toast.update(toastId, {
    render: message,
    type: "success",
    ...toastConfig,
  });
};

/**
 * Checks if the given error is an instance of AxiosError.
 */
export const isAxiosError = (error: unknown): error is AxiosError => {
  return error instanceof AxiosError;
};

/**
 * Removes a URL from the given array and updates the state.
 */
export const removeUrl = (
  index: number,
  urls: Array<string>,
  setUrls: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const updatedUrls = [...urls];
  updatedUrls.splice(index, 1);
  setUrls(updatedUrls);
};

/**
 * Checks if the input string is a valid URL.
 */
export const isValidUrl = (input: string) => {
  try {
    new URL(input);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Removes a file from the given array of files.
 */
export const removeFile = (
  index: number,
  files: File[],
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
) => {
  const updatedFiles = [...files];
  updatedFiles.splice(index, 1);
  setFiles(updatedFiles);
};

/**
 * Truncates the input text to the specified maxLength.
 */
export const shortText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + "...";
};

/**
 * Verifies if the lists are identical.
 */
export function is_same_list(origin: any[], new_origin: any[]) {
  if (origin.length !== new_origin.length) {
    return false;
  }

  const sorted_origin = [...origin].sort();
  const sorted_new = [...new_origin].sort();

  for (let i = 0; i < sorted_origin.length; i++) {
    if (sorted_origin[i] !== sorted_new[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Formats credit number (e.g., 1234 -> "1 234").
 */
export function formatCredit(nombre: number) {
  return Math.floor(nombre)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Verifies email format.
 */
export const verifyMail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
