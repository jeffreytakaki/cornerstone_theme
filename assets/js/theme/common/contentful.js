import $ from 'jquery';
const contentful = require('contentful')

const contentfulSpace = "xkrknvgqff10";
const contentfulAccessToken = "ffb5d498735d92991a3dd28a0f00e4ff6c9cc3ea53b37a3eaa0a3d9de72c1d3a"
const contentfulConfig = {
	space: contentfulSpace,
	accessToken: contentfulAccessToken
}
// let contentfulEntries = [];
// let contentfulAssets = [];

export default class Contentful {
	constructor(pageType, id){
		console.log(pageType, id)
		this._contentfulClient = contentful.createClient(contentfulConfig)
		// console.log(this.contentfulClient)
		// this.getContentfulEntries(this.contentfulClient)
		// this.contentfulEntries = contentfulEntries
		this.getContentfulPDP(id)
		// this.getContentfulAssets()
  	}
 //  	async getContentfulEntries() {
 //  		const result = await this._contentfulClient.sync({initial: true})
	// 		.then((response) => {
	// 			console.log("~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~")
	// 			console.log("~ contenful.js client.sync response ~")
	// 			console.log("~ response.entries- ", response.entries)
	// 			console.log("~ response.assets- ", response.assets)
	// 			const responseObj = JSON.parse(response.stringifySafe());
	// 			const entries = responseObj.entries;
 //  				response.entries.forEach(function(field){
 //  					contentfulEntries.push(field)
 //  				});
	// 			window.localStorage.setItem('contentfulEntries', JSON.stringify(entries))
	// 			window.localStorage.setItem('contentfulSyncToken', response.nextSyncToken)
	// 			console.log("~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~")
	// 		})
	// }

	async getContentfulPDP(productId) {
		const result = await this._contentfulClient.getEntries({
			content_type: 'productDetailPage',
			'fields.productId': '10487'
		});
		console.log("result- ", result)
        if (!result.items.length) {
            console.log("Nothing Contentful for this ID- ", productId)
            return null;
        }

        const data = result.items[0].fields;
    	console.log("Contentful data- ", data)
    	this.buildPDPComponents(data)
        return {
        	data
            // description: data.description,
            // titleText: data.titleText,
            // bannerImage: data.bannerImage.fields.file.url,
        };
	}

	// async getContentfulAssets() {
	// 	const results = await this._contentfulClient.getAssets()
	// 		.then((assets) => {
	// 			assets.items.map((asset) => {
	// 				console.log(asset)
	// 				let imageUrl = 'https:' + asset.fields.file.url;
	// 				contentfulAssets.push(imageUrl)
	// 			})
	// 			console.log(contentfulAssets)
	// 		})
	// 		.catch((e) => console.log(e))
	// }

	buildPDPComponents(data){
		if(data.productDetailPageName){
    		$('#contentfulPDP-title').html(data.productDetailPageName);
    	}

    	if(data.pdpDetails){
    		const asset = this._contentfulClient.getAsset(data.pdpDetails.fields.image1.sys.id)
    		// const asset = this._contentfulClient.getAsset("6buM3BOge6LlkhVZ1Hz0Wt")
    			.then((asset) => console.log(asset.fields.file.url))
    	}
	}


}