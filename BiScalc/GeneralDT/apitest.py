import requests

def fetch_item_list(filters=None):
    url = "https://xivapi.com/item"
    try:
        # Add filters as query parameters
        response = requests.get(url, params=filters)
        response.raise_for_status()  # Raise an error for bad status codes
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

if __name__ == "__main__":
    # Example: Add search filters
    search_filters = {
        "name_en_cont": "Potion",  # Search for items containing "Potion" in their English name
        "limit": 10               # Limit the number of results to 10
    }
    items = fetch_item_list(filters=search_filters)
    if items:
        print("Item list fetched successfully!")
        print(items)
    else:
        print("Failed to fetch item list.")