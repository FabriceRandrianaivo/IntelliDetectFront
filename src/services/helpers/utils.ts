import { AxiosError } from "axios";
// import { addWeeks, format, startOfYear } from "date-fns";
import { Id, ToastOptions, toast } from "react-toastify";

export const toastConfig: ToastOptions = {
  position: "top-center",
  autoClose: 500,
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
  type: string,
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
//Axios Helpers handling

/**
 * Checks if the given error is an instance of AxiosError.
 *
 * @param {unknown} error - The error to check.
 * @return {boolean} Returns true if the error is an instance of AxiosError, false otherwise.
 */
export const isAxiosError = (error: unknown): error is AxiosError => {
  return error instanceof AxiosError;
};

//Helpers for URL

/**
 * Removes a URL from the given array and updates the state with the new array.
 *
 * @param {number} index - The index of the URL to be removed
 * @param {Array<string>} urls - The array of URLs
 * @param {React.Dispatch<React.SetStateAction<string[]>>} setUrls - The state setter for the URLs
 * @return {void}
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
 *
 * @param {string} input - the input string to be validated
 * @return {boolean} true if the input is a valid URL, false otherwise
 */
export const isValidUrl = (input: string) => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(input);
};

//Helpers for files

/**
 * Removes a file from the given array of files at the specified index and updates the state using the provided setState function.
 *
 * @param {number} index - The index of the file to be removed
 * @param {File[]} files - The array of files
 * @param {React.Dispatch<React.SetStateAction<File[]>>} setFiles - The state update function for the files
 * @return {void}
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
 * Extracts and formats message text from AI helpers.
 * @param data - The input message data to be processed.
 * @returns The formatted message text.
 */
export const extractText = (data: string): string => {
  const text = data.replace(/^data:/, "");
  return text;
};

/**
 * Concatenates paragraphs from the response stream.
 *
 * @param {string} responseStream - the response stream to extract paragraphs from
 * @return {string} the concatenated paragraphs as a single string
 */
export const concatenateParagraphs = (responseStream: string) => {
  // const segments = responseStream.split(/data:/);
  // const extractedTexts = segments.map(segment => (segment === '' ? '\n' : segment));
  // const finalText = extractedTexts.join("");
  // const resultObject = {paragraph: finalText};
  // return JSON.stringify(resultObject);
  let extractedText = responseStream.replace(/data:/g, "");
  // Ajouter un saut de ligne si le texte est vide
  if (!extractedText.trim()) {
    extractedText += "\n";
  }
  return JSON.stringify({ paragraph: extractedText });
};

/**
 *
 */
/**
 * Truncates the input text to the specified maxLength if the text exceeds the maxLength,
 * and appends "..." to the truncated text.
 *
 * @param {string} text - the input text to be truncated
 * @param {number} maxLength - the maximum length allowed for the text
 * @return {string} the truncated text with "..." appended if it exceeds the maxLength
 */
export const shortText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    const truncatedName = text.substring(0, maxLength - 3) + " ";
    return truncatedName;
  }
};

export const formatMessageAI = (completion: string) => {
  const lines = completion.split(/data:\s/);
  const newData = lines.map((line) => line.slice(0, -2));
  let query = "";
  for (let i = 0; i < newData.length; i++) {
    query += newData[i];
  }
  return {
    query,
  };
};

/** verify if current page is chat mentor page */
export const isChatMentorPage = location.pathname.startsWith("/chat-expert");

/** verify if current page is chat professor page */
export const isChatProfesseur = location.pathname.startsWith("/chat-mentor");

export function is_same_list(origin: any, new_origin: any) {
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
 * Formatte un nombre de crédits en une chaine de caractères.
 * Exemple : 1234 -> "1 234"
 * @param {number} nombre - Le nombre de crédits à formatter
 * @param {number} semiLength - Le nombre de chiffres à afficher apres la virgule
 * @returns {string} La chaine de caractères formatée
 */
export function formatCredit(nombre: number) {
  let intPart = Math.floor(nombre).toString();

  // Utiliser une expression régulière pour formater la partie entière
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return intPart;
}

/**
 *
 * @description Formate le résultat pour le graphique
 * @param data les donneés à formatés
 */
// export const formatResult = (data) => {
//   data.monthly_usage.forEach(
//     (month) => (month.label = convertWeekToDate(month.semaine))
//   );
//   data.general_monthly_usage.forEach(
//     (donnee) => (donnee.label = convertYearMonth(donnee.mois, donnee.annee))
//   );
// };
/**
 *
 * @description convertit le numero de semaine par la date
 * @param weekNumber le numero de semaine
 * @param year l'année
 * @returns la date par rapport au nombre de la semaine
 */
// export const convertWeekToDate = (
//   weekNumber,
//   year = new Date().getFullYear()
// ) => {
//   return format(
//     addWeeks(startOfYear(new Date(year, 0, 1)), weekNumber),
//     "yyyy-MM-dd"
//   ).toString();
// };
/**
 *
 * @description converit le mois et l'année en date du début de ce mois
 * @param month
 * @param year
 * @returns début de mois de cette année
 */
// export const convertYearMonth = (month: number, year: number) => {
//   return format(new Date(year, month - 1, 1), "yyyy-MM-dd");
// };

export const verifyMail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
