let input, output;

describe('validate & prettify', () => {
	beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

	it('should prettify valid json string', () => {
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
			.debug()
			.should(($div) => {
				const values = $div.map((i, el) => Cypress.$(el).text())
				const result = values
					.get()
					.map(line => line.trimLeft())
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

	it('should display error message when valid JSON is entered.', () => {
		input = `{{}"array": [1, 2, 3], "string": "Hello World again"}`;
		output =   "Unexpected token o in JSON at position 1";

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
});