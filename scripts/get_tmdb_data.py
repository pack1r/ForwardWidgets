import os
import json
import requests
from datetime import datetime, timezone, timedelta

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"
SAVE_PATH = os.path.join(os.getcwd(), "data", "TMDB_Trending.json")

def fetch_tmdb_data(time_window="day", media_type="all"):
    if not TMDB_API_KEY:
        return {"results": []}

    endpoint = f"/trending/all/{time_window}" if media_type == "all" else f"/trending/{media_type}/{time_window}"
    url = f"{BASE_URL}{endpoint}"
    params = {"api_key": TMDB_API_KEY, "language": "zh-CN"}

    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()
    return response.json()

def fetch_popular_movies():  
    if not TMDB_API_KEY:
        return {"results": []}
    
    endpoint = "/movie/popular"
    url = f"{BASE_URL}{endpoint}"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "zh-CN",
        "region": "CN",
        "page": 1
    }
    
    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()
    data = response.json()
    data["results"] = data["results"][:15]
    return data

def get_media_details(media_type, media_id):
    if not TMDB_API_KEY:
        return {"genres": []}
    
    detail_endpoint = f"/{media_type}/{media_id}"
    url = f"{BASE_URL}{detail_endpoint}"
    params = {"api_key": TMDB_API_KEY, "language": "zh-CN"}
    
    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()
    return response.json()

def get_media_images(media_type, media_id):
    images_endpoint = f"/{media_type}/{media_id}/images"
    url = f"{BASE_URL}{images_endpoint}"
    params = {
        "api_key": TMDB_API_KEY,
        "include_image_language": "zh,en,null"
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def get_image_url(path, size="original"):
    return f"https://image.tmdb.org/t/p/{size}{path}"

def get_best_title_backdrop(image_data):
    backdrops = image_data.get("backdrops", [])
    
    def get_priority_score(backdrop):
        lang = backdrop.get("iso_639_1")
        if lang == "zh":
            lang_score = 0
        elif lang == "en":
            lang_score = 1
        elif lang is None:
            lang_score = 2
        else:
            lang_score = 3
        
        vote_avg = -backdrop.get("vote_average", 0)
        width = backdrop.get("width", 0)
        height = backdrop.get("height", 0)
        resolution = -(width * height)
        
        return (lang_score, vote_avg, resolution)
    
    sorted_backdrops = sorted(backdrops, key=get_priority_score)
    best_backdrop = sorted_backdrops[0]
    return get_image_url(best_backdrop["file_path"])

def process_tmdb_data(data, time_window, media_type):
    results = []
    for item in data.get("results", []):
        title = item.get("title") or item.get("name")
        item_type = media_type if media_type != "all" else item.get("media_type")
        
        if item_type == "tv":
            release_date = item.get("first_air_date")
        else:
            release_date = item.get("release_date")
        
        overview = item.get("overview")
        rating = round(item.get("vote_average"), 1)
        media_id = item.get("id")

        poster_url = get_image_url(item.get("poster_path"))

        detail_data = get_media_details(item_type, media_id)
        genres = detail_data.get("genres", [])
        genre_title = "•".join([g["name"] for g in genres[:3]])

        image_data = get_media_images(item_type, media_id)
        title_backdrop_url = get_best_title_backdrop(image_data)

        if item_type == "person":
            continue
            
        if (rating == 0 and 
            not release_date and 
            not overview and 
            "None" in poster_url):
            continue

        results.append({
            "id": media_id,
            "title": title,
            "type": item_type,
            "genreTitle": genre_title,
            "rating": rating,
            "release_date": release_date,
            "overview": overview,
            "poster_url": poster_url,
            "title_backdrop": title_backdrop_url
        })
    
    return results

def save_to_json(data, filepath):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def print_trending_results(results, section_title):
    print("")
    print(f"================= {section_title}  =================")
    
    for i, item in enumerate(results, 1):
        title = item.get("title")
        item_type = item.get("type")
        rating = item.get("rating")
        genre_title = item.get("genreTitle")
        
        print(f"{i:2d}. {title} ({item_type}) 评分: {rating} | {genre_title}")

def main():
    print("=== 开始执行TMDB数据获取 ===")
    
    if not TMDB_API_KEY:
        beijing_timezone = timezone(timedelta(hours=8))
        beijing_now = datetime.now(beijing_timezone)
        last_updated = beijing_now.strftime("%Y-%m-%d %H:%M:%S")
        
        print(f"✅ 热门数据获取时间: {last_updated}")
        
        data_to_save = {
            "last_updated": last_updated,
            "today_global": [],
            "week_global_all": [],
            "popular_movies": []
        }
        save_to_json(data_to_save, SAVE_PATH)
        print("")
        print("================= 执行完成 =================")
        print("get_tmdb_data.py 运行完成")
        return

    today_global = fetch_tmdb_data(time_window="day", media_type="all")
    today_processed = process_tmdb_data(today_global, "day", "all")

    week_global_all = fetch_tmdb_data(time_window="week", media_type="all")
    week_processed = process_tmdb_data(week_global_all, "week", "all")

    popular_movies = fetch_popular_movies()
    popular_processed = process_tmdb_data(popular_movies, "popular", "movie")

    beijing_timezone = timezone(timedelta(hours=8))
    beijing_now = datetime.now(beijing_timezone)
    last_updated = beijing_now.strftime("%Y-%m-%d %H:%M:%S")

    print(f"✅ 热门数据获取时间: {last_updated}")

    print_trending_results(today_processed, "今日热门")
    print_trending_results(week_processed, "本周热门")
    
    if popular_processed:
        print_trending_results(popular_processed, "热门电影")

    data_to_save = {
        "last_updated": last_updated,
        "today_global": today_processed,
        "week_global_all": week_processed,
        "popular_movies": popular_processed
    }

    save_to_json(data_to_save, SAVE_PATH)
    
    print("")
    print("================= 执行完成 =================")

if __name__ == "__main__":
    main()