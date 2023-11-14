import requests
import urllib.request
from dotenv import load_dotenv
import os

# Get Unsplash API key
load_dotenv()
access_key = os.getenv('UNSPLASH_ACCESS_KEY')

# Specify the search query
query = 'strawberry'

# Construct the API request URL
url = f'https://api.unsplash.com/search/photos?query={query}&client_id={access_key}'

# Make the GET request
response = requests.get(url)

# Parse the JSON response
data = response.json()

# Extract image URLs or other information as needed
count = 0
limit = 2
for result in data['results']:
    # print(result['urls']['regular'])
    savepath = f'./saved_images/{query}-{result["id"]}.jpg'
    if count < limit:
        urllib.request.urlretrieve(result['urls']['regular'], savepath)
        print(f'Saved {savepath}')
    count += 1