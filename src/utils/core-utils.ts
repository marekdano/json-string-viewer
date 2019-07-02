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
      if ((window as any).Cypress) {
        // Do not attempt to actually download the file in test.
        // Just leave the anchor in there. Ensure your code doesn't
        // automatically remove it either.
        return;
      }
      link.click();
    } else {
      window.open(encodeURI('data:application/json'));
    }
  }
};
