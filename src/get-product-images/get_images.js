"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var dotenv = require("dotenv");
var fs = require("fs");
// Load environment variables
dotenv.config();
// Get Unsplash API key
var accessKey = process.env.UNSPLASH_ACCESS_KEY;
if (!accessKey) {
    console.error('Error: UNSPLASH_ACCESS_KEY not found in environment variables.');
    process.exit(1);
}
// Specify the search query
var query = 'strawberry';
// Construct the API request URL
var url = "https://api.unsplash.com/search/photos?query=".concat(query, "&client_id=").concat(accessKey);
// Make the GET request
axios_1.default
    .get(url)
    .then(function (response) {
    // Parse the JSON response
    var data = response.data;
    // Extract image URLs or other information as needed
    var count = 0;
    var limit = 2;
    var _loop_1 = function (result) {
        var savepath = "./saved_images/".concat(query, "-").concat(result.id, "_ts.jpg");
        if (count < limit) {
            // Using axios to download the image
            (0, axios_1.default)({
                method: 'get',
                url: result.urls.regular,
                responseType: 'stream'
            })
                .then(function (imageResponse) {
                // Save the image to file
                imageResponse.data.pipe(fs.createWriteStream(savepath));
                console.log("Saved ".concat(savepath));
            })
                .catch(function (error) {
                console.error("Error downloading image: ".concat(error));
            });
            count += 1;
        }
    };
    for (var _i = 0, _a = data.results; _i < _a.length; _i++) {
        var result = _a[_i];
        _loop_1(result);
    }
})
    .catch(function (error) {
    console.error("Error making API request: ".concat(error));
});
