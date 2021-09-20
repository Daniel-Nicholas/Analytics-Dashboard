#!/bin/bash


curl --location --request POST 'http://localhost:50054/uwf-api-service/v1/services/applicationdata/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ4ZnRZdGl6YWl2UW4zUWtqdmtkOFNYWWxBYzhycjZlZXZydnJoWkp6TWNjIn0' \
--data-raw '{
	"owner": {
		"serviceName": "testService"
	},
	"applicationId": "testapp",
	"application": {
		"name": "testapp",
		"displayName": "UWF Rest API Application",
		"initScripts": [{
			"src": "http://localhost:4001/vanillajs/admin/app.init.js",
			"type": "module"
		}],
		"roles": ["uwf:access"],
		"audience": ["uwf"]
	},
	"layout": {
		"type": "default",
		"layout": 1,
		"links": [{
				"id": "link-react-user-admin",
				"name": "react-user-admin",
				"tooltip": "Simple Web Component tooltip",
				"iconUri": "aoc-chat",
				"widgets": ["<react-user-admin></react-user-admin>"]
			}
		]
	},
	"widgets": [
		{
			"id": "react-user-admin-MQNDKAWFJFLWF",
			"element": "react-user-admin",
			"resources": {
				"js": "http://localhost:4001/react/user-admin/build/static/js/main.js"
			}
		}
	],
	"formations": [{
		"id": "customLayout",
		"columns": "1fr minmax(min-content, max-content)",
		"rows": "minmax(min-content, max-content) 1fr",
		"slots": [{
				"element": "uwf-topbar",
				"column": "1 / 3",
				"row": "1 / 2"
			},
			{
				"element": "uwf-sidebar",
				"column": "2 / 3",
				"row": "2 / 3"
			},
			{
				"element": "uwf-context-canvas",
				"column": "1 / 2",
				"row": "2 / 3"
			}
		]
	}]
}'

