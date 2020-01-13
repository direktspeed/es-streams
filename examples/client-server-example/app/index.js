// Should Export a render Method that works in the browser and on the Server


//Handle Auth on the server via cookie is possible via cookie, header, req.url
//Handle Auth on the client is possible via knowleg of a Token that get used in req.url cookie, or header



class myApp {
    constructor(url) { 
        this.state = state
    }
    get routeData() {
        return URL('')  
    } 
}
function render(data) {
    return `<html lang="en">
	<head>
		<base href="/">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>{{ title }}</title>
	</head>
	<body>
		<can-import from="~/app.less" />
		<can-import from="~/app" export-as="viewModel" />
		<can-import from="~/components/navigation/navigation" />

		<div class="container">
			<bitballs-navigation app:from="." />

			{{# if(pageComponent.isResolved) }}
				{{pageComponent.value}}
			{{ else }}
				Loading...
			{{/ if }}
		</div>

		{{# is(env.NODE_ENV, "production") }}
			<script src="dist/steal.production.js"></script>
		{{ else }}
			<script src="/node_modules/steal/steal.js"
				main="bitballs/index.stache!done-autorender"></script>
		{{/ is }}
	</body>
</html>`
}