import logging
from time import sleep
import requests
from bs4 import BeautifulSoup

# Configure logging
logging.basicConfig(level=logging.DEBUG)  # Set logging level to DEBUG

def extract_and_follow_livestream_links(url):
    # Create a session to persist cookies across requests
    session = requests.Session()
    
    # Send a GET request to the URL
    response = session.get(url)

    # Initialize empty sources list
    iframe_srcs = []
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find the stream wrap
        stream_wrap = soup.find('div', class_='stream__wrap')
        
        # Initialize a list to store stream links
        livestreams = stream_wrap.find_all('a', href=True, target='_blank', rel='noopener nofollow')
               
        # Follow livestream links
        for stream in livestreams:
            
            #For debug only
            if len(iframe_srcs) == 2:
                break
            
            sleep(3)
            livestream_url = stream['href']
            
            # Set the referrer header
            headers = {'Referer': url}
            
            # Send a GET request to the livestream URL with referrer header
            livestream_response = session.get(livestream_url, headers=headers)
            
            soup = BeautifulSoup(livestream_response.content, 'html.parser')

            iframe = soup.find('iframe', id='iframe-player', allow='encrypted-media')
        
            if iframe:
                # Extract the value of the src attribute
                iframe_src = iframe.get('src')
                iframe_srcs.append(iframe_src)
                logging.debug(f"Iframe source found: {iframe_src}")
            else:
                logging.debug(f"No iframe_src found for {livestream_url}")
        
        return iframe_srcs
    else:
        # If the request was not successful, print an error message
        logging.error("Failed to retrieve data from the URL.")
        return []
