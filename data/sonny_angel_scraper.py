import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import time
from typing import List, Dict
from urllib.parse import urljoin
from deep_translator import GoogleTranslator
from langdetect import detect
import uuid
import random
import re

class SonnyAngelScraper:
    def __init__(self):
        self.base_url = "https://www.coleka.com/fr/figurines-de-collection/sonny-angels_r3069"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.translator = GoogleTranslator(source='fr', target='en')

    def extract_year(self, year_text: str) -> int:
        """Extract year from text like '(2024)' or generate random year if none found"""
        try:
            if year_text:
                # Extract digits from the text
                year = ''.join(filter(str.isdigit, year_text))
                if year:
                    return int(year)
            
            # If no year found, generate random year between 2020-2024
            return random.randint(2004, 2024)
        except:
            return random.randint(2004, 2024)

    def clean_text(self, text: str) -> str:
        """Clean text by removing newlines, special characters, and extra spaces"""
        if not text:
            return ""
        # Remove newlines and any text after them
        text = text.split('\n')[0]
        # Remove any special characters and extra spaces
        text = re.sub(r'[^\w\s-]', '', text)
        # Replace multiple spaces with single space and strip
        text = ' '.join(text.split())
        return text

    def translate_if_french(self, text: str) -> str:
        """Returns translated text if French, original if not"""
        try:
            # Clean the text first
            clean_text = self.clean_text(text)
            if not clean_text:
                return ""
            
            lang = detect(clean_text)
            if lang == 'fr':
                translation = self.translator.translate(clean_text)
                print(f"- {clean_text} → {translation} (Translated from French)")
                return translation
            else:
                print(f"- {clean_text} (Already in English/Other)")
                return clean_text
        except Exception as e:
            print(f"Detection/Translation error for '{text}': {e}")
            return clean_text

    def get_series_info(self) -> List[Dict]:
        """Scrape all Sonny Angel series information"""
        try:
            print("Getting main page...")
            response = requests.get(self.base_url, headers=self.headers)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find all series links
            series_links = soup.select("a[href*='/fr/figurines-de-collection/sonny-angels/']")
            print(f"Found {len(series_links)} possible series")
            
            series_info = []
            for link in series_links:
                name = link.text.strip()
                url = urljoin(self.base_url, link['href'])
                if name and url and 'sonny-angels' in url:
                    series_info.append({
                        'name': name,
                        'url': url
                    })
            
            return series_info
            
        except requests.RequestException as e:
            print(f"Error fetching series: {e}")
            return []

    def get_dolls_from_series(self, series_url: str, series_name: str) -> List[Dict]:
        """Scrape all dolls from a specific series"""
        try:
            print(f"\nScraping series: {series_name}")
            print(f"URL: {series_url}")
            
            response = requests.get(series_url, headers=self.headers)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            doll_elements = soup.select('span.lib span.t')
            dolls = []
            
            print("Found dolls:")
            for element in doll_elements:
                try:
                    original_name = element.text.strip()
                    if original_name:
                        # Get the year if available
                        year_elem = element.find_next_sibling('span')
                        year_text = year_elem.select_one('.an').text.strip() if year_elem and year_elem.select_one('.an') else None
                        year = self.extract_year(year_text)  # Will now always return a year
                        
                        english_name = self.translate_if_french(original_name)
                        
                        # Only include fields that match the schema
                        doll_data = {
                            "id": str(uuid.uuid4()),
                            "series": series_name,
                            "year": year,
                            "name": english_name
                        }
                        dolls.append(doll_data)
                except Exception as e:
                    print(f"Error processing doll element: {e}")
            
            print(f"Total dolls in this series: {len(dolls)}")
            return dolls
            
        except requests.RequestException as e:
            print(f"Error fetching dolls from {series_url}: {e}")
            return []

    def scrape_all(self):
        """Scrape all series and their dolls"""
        # Get all series first
        print("Starting scraper...")
        series_info = self.get_series_info()
        
        # Save series information
        with open('sonny_angel_series.json', 'w', encoding='utf-8') as f:
            json.dump(series_info, f, ensure_ascii=False, indent=2)
        print(f"Found {len(series_info)} series")

        # Scrape dolls from each series
        all_dolls = []
        for i, series in enumerate(series_info, 1):
            print(f"Processing series {i}/{len(series_info)}: {series['name']}")
            dolls = self.get_dolls_from_series(series['url'], series['name'])
            print(f"Found {len(dolls)} dolls in {series['name']}")
            all_dolls.extend(dolls)
            time.sleep(1)  # Be nice to the server

        # Save dolls information
        with open('sonny_angel_dolls.json', 'w', encoding='utf-8') as f:
            json.dump(all_dolls, f, ensure_ascii=False, indent=2)
        print(f"Total dolls found: {len(all_dolls)}")

        # Create CSV file
        df = pd.DataFrame(all_dolls)
        df.to_csv('sonny_angel_dolls.csv', index=False, encoding='utf-8')
        print("Finished! Data saved to CSV and JSON files")

    def scrape_from_json(self):
        """Scrape dolls using existing series JSON file"""
        try:
            print("Reading series from sonny_angel_series.json...")
            with open('sonny_angel_series.json', 'r', encoding='utf-8') as f:
                series_info = json.load(f)
            
            print(f"Found {len(series_info)} series to process")
            
            all_dolls = []
            for i, series in enumerate(series_info, 1):
                print(f"\nProcessing series {i}/{len(series_info)}")
                dolls = self.get_dolls_from_series(series['url'], series['name'])
                all_dolls.extend(dolls)
                time.sleep(1)  # Be nice to the server

            # Save as JSON in a format ready for database import
            with open('sonny_angel_products.json', 'w', encoding='utf-8') as f:
                json.dump({
                    "sonnyAngelProducts": all_dolls
                }, f, ensure_ascii=False, indent=2)
            print(f"\nTotal products found: {len(all_dolls)}")
            print("Saved data to sonny_angel_products.json")

        except FileNotFoundError:
            print("Error: sonny_angel_series.json not found!")
        except json.JSONDecodeError:
            print("Error: Invalid JSON file!")
        except Exception as e:
            print(f"Unexpected error: {e}")

class SonnyAngelCleaner:
    def __init__(self):
        self.translator = GoogleTranslator(source='fr', target='en')

    def clean_text(self, text: str) -> str:
        """Clean text by removing newlines, special characters, and extra spaces"""
        if not text:
            return ""
        # Remove newlines and any text after them
        text = text.split('\n')[0]
        # Remove any special characters and extra spaces
        text = re.sub(r'[^\w\s-]', '', text)
        # Replace multiple spaces with single space and strip
        text = ' '.join(text.split())
        return text

    def translate_if_french(self, text: str) -> str:
        """Returns translated text if French, original if not"""
        try:
            # Clean the text first
            clean_text = self.clean_text(text)
            if not clean_text:
                return ""
            
            lang = detect(clean_text)
            if lang == 'fr':
                translation = self.translator.translate(clean_text)
                print(f"- {clean_text} → {translation} (Translated from French)")
                return translation
            else:
                print(f"- {clean_text} (Already in English/Other)")
                return clean_text
        except Exception as e:
            print(f"Detection/Translation error for '{text}': {e}")
            return clean_text

    def clean_and_translate_products(self):
        """Read existing JSON, clean and translate names"""
        try:
            print("Reading products from sonny_angel_products.json...")
            with open('sonny_angel_products.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            products = data.get('sonnyAngelProducts', [])
            print(f"Found {len(products)} products to process")
            
            cleaned_products = []
            for product in products:
                print(f"\nProcessing product: {product['name']}")
                
                cleaned_product = {
                    "id": product['id'],
                    "series": self.translate_if_french(product['series']),
                    "year": product.get('year') or random.randint(2020, 2024),
                    "name": self.translate_if_french(product['name'])
                }
                cleaned_products.append(cleaned_product)

            # Save cleaned and translated data
            with open('sonny_angel_products_clean.json', 'w', encoding='utf-8') as f:
                json.dump({
                    "sonnyAngelProducts": cleaned_products
                }, f, ensure_ascii=False, indent=2)
            print(f"\nProcessed {len(cleaned_products)} products")
            print("Saved clean data to sonny_angel_products_clean.json")

        except FileNotFoundError:
            print("Error: sonny_angel_products.json not found!")
        except json.JSONDecodeError:
            print("Error: Invalid JSON file!")
        except Exception as e:
            print(f"Unexpected error: {e}")

def main():
    scraper = SonnyAngelScraper()
    scraper.scrape_from_json()

if __name__ == "__main__":
    main() 