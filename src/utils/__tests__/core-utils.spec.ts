import { downloadFile } from '../core-utils';

describe('#downloadFile', () => {
  test('should save JSON object when \'navigator.msSaveOrOpenBlob\' is defined', () => {
    const fileContent = {"name": "Marek", "age": 21};
    (window as any).navigator.msSaveOrOpenBlob = jest.fn(() => '');
    downloadFile(fileContent);

    expect(window.navigator.msSaveOrOpenBlob).toHaveBeenCalledTimes(1);

   (window as any).navigator.msSaveOrOpenBlob = ''
  }); 

  test('should save JSON object when "download" is defined in a html link', () => {
    const fileContent = {"name": "Marek", "age": 21};
    URL.createObjectURL = jest.fn(() => '');
    downloadFile(fileContent);
    
    expect((global as any).URL.createObjectURL).toHaveBeenCalledTimes(1);
  });
})