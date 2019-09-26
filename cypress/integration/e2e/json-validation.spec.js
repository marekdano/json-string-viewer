import 'cypress-file-upload';

let input, output;

describe('App', () => {
	beforeEach(() => {
    cy.visit('/')
  })

	it('should prettify valid json string when json string and input path values are enetered', () => {
		input = '\"{{}\\"array\\": [1, 2, 3],\\"boolean\\":true,\\"null\\": null, \\"number\\": \\"four\\",\\"string\\": \\"Hello World again\\"}\"';
		output = JSON.stringify(JSON.parse('{\"array\":[1, 2, 3],\"boolean\":true,\"null\":null,\"number\":\"four\",\"string\":\"Hello World again\"}'));

		cy.get('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea')
			.clear({force: true})
			.type(input, {force: true})
			.get('input#pathToJsonString')
			.type('Report.Configuration')
			.getByText(/Validate & Prettify JSON string/i)
			.click()
			.get('#output > .jsoneditor > .jsoneditor-menu > .jsoneditor-compact')
			.click()
			.get('#output > .jsoneditor > .jsoneditor-outer > .ace_editor > .ace_scroller > .ace_content > .ace_layer.ace_text-layer > .ace_line_group > .ace_line')
			.debug()
			.should(($div) => {
				const values = $div.map((i, el) => Cypress.$(el).text())
				const result = values
					.get()
					.map(line => line.trimLeft().replace(': ', ':'))
					.join('')
				
				expect(result).to.eq(output)
			});
	});

	it('should prettify valid json string when json string is enetered', () => {
		input = '\"{{}\\"array\\": [1, 2, 3],\\"boolean\\": true,\\"null\\": null, \\"number\\": \\"four\\",\\"string\\": \\"Hello World again\\"}\"';
		output = JSON.parse("{\"array\":[1, 2, 3],\"boolean\":true,\"null\":null,\"number\":\"four\",\"string\":\"Hello World again\"}");

		cy.get('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea')
			.clear({force: true})
			.type(input, {force: true})
			.getByText(/Validate & Prettify JSON string/i)
			.click()
			.get('#output > .jsoneditor > .jsoneditor-menu > .jsoneditor-compact')
			.click()
			.get('#output > .jsoneditor > .jsoneditor-outer > .ace_editor > .ace_scroller > .ace_content > .ace_layer.ace_text-layer > .ace_line_group > .ace_line')
			.should(($div) => {
				const values = $div.map((i, el) => Cypress.$(el).text())
				const result = values
					.get()
					.map(line => line.trimLeft().replace(': ', ':'))
					.join('')
			
				expect(result).to.eq(JSON.stringify(output))
			});
	});

	it('should display error message when invalid json string entered.', () => {
		input = '\"{{}\\"array\\": [1, 2, 3],\\"boolean\\\\": true,\\"null\\": null, \\"number\\": \\"four\\",\\"string\\": \\"Hello World again\\"}"';
		output = "Parse error on line 1:\n..., 2, 3],\\\"boolean\\\\\": true,\\\"null\\\": nul\n-----------------------^\nExpecting 'EOF', '}', ',', ']', got ':'";

		cy.get('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea')
			.clear({force: true})
			.type(input, {force: true})
			.getByText(/Validate & Prettify JSON string/i)
			.click()
			.get('#output > .jsoneditor > .jsoneditor-menu > .jsoneditor-compact')
			.click()
			.get('#output > .jsoneditor > .jsoneditor-outer > .ace_editor > .ace_scroller > .ace_content > .ace_layer.ace_text-layer > .ace_line_group > .ace_line')
			.should(($div) => {
				const values = $div.map((i, el) => Cypress.$(el).text())
				const result = values
					.get()
					.map(line => line.trimLeft())
					.join('')
			
				expect(result).to.eq(JSON.stringify(output))
			});
	}); 

	it('should display error message when valid JSON is entered and uncorrect path input to json string is entered.', () => {
		input = `{{}"Report": {{}"Configuration": {{}"array": [1, 2, 3], "string": "Hello World again"}}}`;
		output = "Unexpected token u in JSON at position 0";

		cy.get('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea')
			.clear({force: true})
			.type(input, {force: true})
			.get('input#pathToJsonString')
			.type('Report.Config')
			.getByText(/Validate & Prettify JSON string/i)
			.click()
			.get('#output > .jsoneditor > .jsoneditor-menu > .jsoneditor-compact')
			.click()
			.get('#output > .jsoneditor > .jsoneditor-outer > .ace_editor > .ace_scroller > .ace_content > .ace_layer.ace_text-layer > .ace_line_group > .ace_line')
			.should(($div) => {
				const values = $div.map((i, el) => Cypress.$(el).text())
				const result = values
					.get()
					.map(line => line.trimLeft().replace(': ', ':'))
					.join('')
			
				expect(result).to.eq(JSON.stringify(output))
			});
	}); 

	it('should display error message when valid JSON is entered and no value in path input to json string is entered.', () => {
		input = `{{}"Report": {{}"Configuration": {{}"array": [1, 2, 3], "string": "Hello World again"}}}`;
		output = "Unexpected token u in JSON at position 0";

		cy.get('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea')
			.clear({force: true})
			.type(input, {force: true})
			.getByText(/Validate & Prettify JSON string/i)
			.click()
			.get('#output > .jsoneditor > .jsoneditor-menu > .jsoneditor-compact')
			.click()
			.get('#output > .jsoneditor > .jsoneditor-outer > .ace_editor > .ace_scroller > .ace_content > .ace_layer.ace_text-layer > .ace_line_group > .ace_line')
			.should(($div) => {
				const values = $div.map((i, el) => Cypress.$(el).text())
				const result = values
					.get()
					.map(line => line.trimLeft().replace(': ', ':'))
					.join('')
			
				expect(result).to.eq(JSON.stringify(output))
			});
	});
	
	it('should display json string when valid JSON and correct path to json string are entered.', () => {
		input = `{{}"Report": {{}"Configuration": \"{{}\\"array\\": [1, 2, 3],\\"text\\": \\"Hello World again\\"}\"}}`;
		output = JSON.parse("{\"array\":[1, 2, 3],\"text\":\"Hello World again\"}");

		cy.get('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea')
			.clear({force: true})
			.type(input, {force: true})
			.get('input#pathToJsonString')
			.type('Report.Configuration')
			.getByText(/Validate & Prettify JSON string/i)
			.click()
			.get('#output > .jsoneditor > .jsoneditor-menu > .jsoneditor-compact')
			.click()
			.get('#output > .jsoneditor > .jsoneditor-outer > .ace_editor > .ace_scroller > .ace_content > .ace_layer.ace_text-layer > .ace_line_group > .ace_line')
			.should(($div) => {
				const values = $div.map((i, el) => Cypress.$(el).text())
				const result = values
					.get()
					.map(line => line.trimLeft().replace(': ', ':'))
					.join('')
			
				expect(result).to.eq(JSON.stringify(output))
			});
	}); 

	it('should download valid JSON when json string is extracted and modified', () => {
		input = `{{}"Report": {{}"Configuration": \"{{}\\"array\\": [1, 2, 3],\\"text\\": \\"Hello World again\\"}\"}}`;

		cy.get('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea')
			.clear({force: true})
			.type(input, {force: true})
			.get('input#pathToJsonString')
			.type('Report.Configuration')
			.getByText(/Validate & Prettify JSON string/i)
			.click()
			.get('#output > .jsoneditor > .jsoneditor-menu > .jsoneditor-compact')
			.click()
			.get('[data-test-id="btn-download"]')
			.click()
			.get('a[download]')
			.then((anchor) => (
				new Cypress.Promise((resolve, reject) => {
					expect(anchor[0].download).to.eq('json_file.json');
          // Use XHR to get the blob that corresponds to the object URL.
          const xhr = new XMLHttpRequest();
          xhr.open('GET', anchor.prop('href'), true);
          xhr.responseType = 'blob';

          // Once loaded, use FileReader to get the string back from the blob.
          xhr.onload = () => {
            if (xhr.status === 200) {
              const blob = xhr.response;
              const reader = new FileReader();
              reader.onload = () => {
                // Once we have a string, resolve the promise to let
                // the Cypress chain continue, e.g. to assert on the result.
                resolve(reader.result.replace(/\s/g,''));
              };
              reader.readAsText(blob);
            }
          };
          xhr.send();
        })
      ))
			.should('equal', '{"Report":{"Configuration":"{\\"array\\":[1,2,3],\\"text\\":\\"HelloWorldagain\\"}"}}');
	});

	it('should download json string after modifying it', () => {
		input = '\"{{}\\"array\\": [1, 2, 3],\\"text\\": \\"Hello World again\\"}\"';
		
		cy.get('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea')
			.clear({force: true})
			.type(input, {force: true})
			.getByText(/Validate & Prettify JSON string/i)
			.click()
			.get('input#pathToJsonString')
			.type('Report.Configuration')
			.getByText(/Validate & Prettify JSON string/i)
			.click()
			.get('#output > .jsoneditor > .jsoneditor-menu > .jsoneditor-compact')
			.click()
			.get('[data-test-id="btn-download"]')
			.click()
			.get('a[download]')
			.then((anchor) => (
				new Cypress.Promise((resolve, reject) => {
					expect(anchor[0].download).to.eq('json_string.txt');
          // Use XHR to get the blob that corresponds to the object URL.
					const xhr = new XMLHttpRequest();
					xhr.open('GET', anchor.prop('href'), true);
          xhr.responseType = 'blob';

          // Once loaded, use FileReader to get the string back from the blob.
          xhr.onload = () => {
            if (xhr.status === 200) {
              const blob = xhr.response;
              const reader = new FileReader();
              reader.onload = () => {
                // Once we have a string, resolve the promise to let
                // the Cypress chain continue, e.g. to assert on the result.
								resolve(reader.result.replace(/\s/g,''));
              };
              reader.readAsText(blob);
            }
          };
          xhr.send();
        })
      ))
			.should('equal', '"{\\"array\\":[1,2,3],\\"text\\":\\"HelloWorldagain\\"}"');
	});

	it('should display alert message when JSON is invalid and the Download button is hit', () => {
		const input1 = '\"{{}\\"array\\": [1, 2, 3],\\"text\\": \\"Hello World again\\"}\"';
		const input2 = `{{}"Report": {{}"Configuration": \"{{}\\"array\\": [1, 2, 3],\\"text\\": \\"Hello World again\\"}\"}}`;

		cy.get('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea')
			.clear({force: true})
			.type(input1, {force: true})
			.getByText(/Validate & Prettify JSON string/i)
			.click()

		cy.get('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea')
			.type(input2, {force: true})
			.get('input#pathToJsonString')
			.type('Report.Configuration')
			.getByText(/Validate & Prettify JSON string/i)
			.click()
			.get('#output > .jsoneditor > .jsoneditor-menu > .jsoneditor-compact')
			.click()
			.get('[data-test-id="btn-download"]')
			.click()
			
		cy.on('window:alert', (str) => {
			expect(str).to.equal('The input JSON is invalid and cannot be downloaded.')
		});
	});

	it('should display alert message when path to json string is invalid and the input JSON is parsed', () => {
		const input = `{{}"Report": {{}"Configuration": \"{{}\\"array\\": [1, 2, 3],\\"text\\": \\"Hello World again\\"}\"}}`;
		const invalidPath = 'Report.Invalid';

		cy.get('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea')
			.clear({force: true})
			.type(input, {force: true})
			.get('input#pathToJsonString')
			.type(invalidPath)
			.getByText(/Validate & Prettify JSON string/i)
			.click()
	
		cy.on('window:alert', (str) => {
			expect(str).to.equal('The path to get json string is invalid.')
		});	
	});

	it('should upload a valid JSON file', () => {
		const fileName = 'upload-valid-file.json';
		const output = '{"sample": "{\\"array\\": [1, 2, 3],\\"text\\": \\"Hello World again\\"}"}'

		cy.fixture(fileName)
			.then(fileJson => {
				const fileContent = JSON.stringify(fileJson);
				cy.get('input[type="file"]').upload({fileContent, fileName, mimeType: 'application/json'}, { subjectType: 'input', force: true })
			})
			.get('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > .ace_scroller > .ace_content > .ace_layer.ace_text-layer > .ace_line_group > .ace_line', { timeout: 100 })
			.should(($div) => {
				const values = $div.map((i, el) => Cypress.$(el).text())
				const result = values
					.get()
					.map(line => line.trimLeft())
					.join('')
			
				expect(result).to.eq(output)
			});
	});

	it('should upload, and download valid JSON file with same file name', () => {
		const fileName = 'upload-valid-file.json';
		const output = '{"sample":"{\\"array\\":[1,2,3],\\"text\\":\\"HelloWorldagain\\"}"}';

		cy.fixture(fileName)
			.then(fileJson => {
				const fileContent = JSON.stringify(fileJson);
				cy.get('input[type="file"]').upload({fileContent, fileName, mimeType: 'application/json'}, { subjectType: 'input', force: true })
			})
		
		cy.get('input#pathToJsonString')
			.type('sample')
			.getByText(/Validate & Prettify JSON string/i)
			.click()
			.get('[data-test-id="btn-download"]')
			.click()
			.get('a[download]')
			.then((anchor) => (
				new Cypress.Promise((resolve, reject) => {
					expect(anchor[0].download).to.eq(fileName);
					// Use XHR to get the blob that corresponds to the object URL.
					const xhr = new XMLHttpRequest();
					xhr.open('GET', anchor.prop('href'), true);
          xhr.responseType = 'blob';

          // Once loaded, use FileReader to get the string back from the blob.
          xhr.onload = () => {
            if (xhr.status === 200) {
              const blob = xhr.response;
              const reader = new FileReader();
              reader.onload = () => {
                // Once we have a string, resolve the promise to let
								// the Cypress chain continue, e.g. to assert on the result.
								
								console.log('RESULT', reader.result.replace(/\s/g,''))
								resolve(reader.result.replace(/\s/g,''));
              };
              reader.readAsText(blob);
            }
          };
          xhr.send();
        })
			))
			.should('equal', output);
			console.log('Output', output)
		
	});
});
