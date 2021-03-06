exports.createFromSwaggerModel = createFromSwaggerModel;

function createFromSwaggerModel(data) {
	var Arrow = data.Arrow,
		params = {
			methods: {},
			actions: [],
			fields: data.model.fields,
			handleResponse: data.handleResponse,
			connector: data.connector
		};

	for (var key in data.model.methods) {
		if (data.model.methods.hasOwnProperty(key)) {
			var method = data.model.methods[key];
			params.actions.push(method.name);
			params.methods[method.name] = {
				json: true,
				verb: method.verb,
				url: method.url,
				path: method.path,
				autogen: !!data.options.modelAutogen,
				meta: {
					nickname: method.operation && method.operation.nickname,
					summary: method.operation && method.operation.summary,
					notes: method.operation && method.operation.notes
				},
				params: method.operation && (method.operation.params || method.operation.parameters)
			};
		}
	}

	return Arrow.Model.extend(data.name, params);
}