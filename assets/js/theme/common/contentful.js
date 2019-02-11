const contentful = require('contentful')

const contentfulSpace = "xkrknvgqff10";
const contentfulAccessToken = "ffb5d498735d92991a3dd28a0f00e4ff6c9cc3ea53b37a3eaa0a3d9de72c1d3a"
let contentfulEntries = [];

export default class Contentful {
	constructor(){
		this.contentfulClient = this.getContentfulClient(contentfulSpace, contentfulAccessToken)
		console.log(this.contentfulClient)
		this.getContentfulEntries(this.contentfulClient)
		this.contentfulEntries = contentfulEntries
  	}
  	getContentfulClient(space, accessToken){
  		return contentful.createClient({
  			space: space,
  			accessToken: accessToken
  		})
  	};
  	getContentfulEntries(client){
  		client
  			.getEntries()
  			.then(function(entries) {
  				// console.log("entries- ", entries)
  				entries.items.forEach(function(entry){
  					contentfulEntries.push(entry)
  				});
  			})
  			.catch(function(err){
  				console.log(err)
  				contentfulEntries.push(err)
  			})
  	}
}