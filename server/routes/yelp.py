from . import db, requests, os, request, Resource

YELP_API = os.environ.get("YELP_API_KEY")
BUSINESS_PATH = "https://api.yelp.com/v3/businesses/search?"
HEADERS = {"Authorization": "bearer %s" % YELP_API}


class YelpData(Resource):
    def post(self):
        try:
            data = request.get_json()
            parameters = {
                "latitude": data.get("latitude"),
                "longitude": data.get("longitude"),
                "radius": 10000,
                "term": "Dispensaries",
                "open_now": True,
                "sort_by": "rating",
                "limit": 10,
            }
            response = requests.get(
                url=BUSINESS_PATH, params=parameters, headers=HEADERS
            )
            business_data = response.json()
            if "businesses" in business_data:
                return business_data["businesses"], 200

        except requests.exceptions.RequestException as e:
            return {"error": str(e)}, 400
        except Exception as e:
            return {"error": str(e)}, 500
