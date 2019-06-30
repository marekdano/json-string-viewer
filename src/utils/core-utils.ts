import { JSONObject } from "../App";

export const downloadFile = (fileContent: JSONObject | string, filename: string = 'default_name') => {
  const blob = new Blob([JSON.stringify(fileContent, null, 2)], {
    type: 'application/json'
  });

  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, `${filename}.json`);
  } else {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    if (link.download !== undefined) {
      link.setAttribute('href', URL.createObjectURL(blob));
      link.setAttribute('download', `${filename}.json`);
      link.click();
    } else {
      window.open(encodeURI('data:application/json'));
    }
    document.body.removeChild(link);
  }
};
