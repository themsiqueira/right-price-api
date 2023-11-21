import axios from 'axios'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

// Load environment variables
dotenv.config()
const accessKey: string | undefined = process.env.UNSPLASH_ACCESS_KEY

if (!accessKey) {
  console.error('Error: UNSPLASH_ACCESS_KEY not found in environment variables.')
  process.exit(1)
}

// Specify the search query
const query: string = 'strawberry'

// API request URL
const url: string = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`

// Request image
axios
  .get(url)
  .then((response) => {
    // Parse the JSON response
    const data = response.data

    // Extract image URLs or other information as needed
    let count = 0
    const limit = 2

    for (const result of data.results) {
      const savepath = `./saved_images/${query}-${result.id}_ts.jpg`

      if (count < limit) {
        // Using axios to download the image
        axios({
          method: 'get',
          url: result.urls.regular,
          responseType: 'stream'
        })
          .then((imageResponse) => {
            // Save the image to file
            imageResponse.data.pipe(fs.createWriteStream(savepath))
            console.log(`Saved ${savepath}`)
          })
          .catch((error) => {
            console.error(`Error downloading image: ${error}`)
          })

        count += 1
      }
    }
  })
  .catch((error) => {
    console.error(`Error making API request: ${error}`)
  })
