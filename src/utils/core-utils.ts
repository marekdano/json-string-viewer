import { JSONObject } from "../App";

export const downloadFile = (fileContent: JSONObject | string, filename: string = 'json_file.json') => {
  const blob = new Blob([JSON.stringify(fileContent, null, 2)], {
    type: 'application/json'
  });

  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, `${filename}`);
  } else {
    const link = (document.getElementById('download-file') as HTMLAnchorElement) || document.createElement('a');
    link.style.display = 'none';
    link.id = 'download-file';
    document.body.appendChild(link);

    if (link.download !== undefined) {
      link.setAttribute('href', URL.createObjectURL(blob));
      link.setAttribute('download', `${filename}`);
      link.click();
    } else {
      window.open(encodeURI('data:application/json'));
    }
  }
};
