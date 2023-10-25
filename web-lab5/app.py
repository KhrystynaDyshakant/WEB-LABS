from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

hotels = [
    {"id": 1, "name": "Avalon", "location": "Lviv", "rooms": 300, "rating": 5},
    {"id": 2, "name": "Grand", "location": "Lviv", "rooms": 250, "rating": 3},
    {"id": 3, "name": "Hotel Lviv", "location": "Lviv", "rooms": 150, "rating": 4},
]
next_id = 4  


@app.route('/hotels', methods=['GET'])
def get_hotels():
    return jsonify({'hotels': hotels})

@app.route('/hotels/<int:hotel_id>', methods=['GET'])
def get_hotel(hotel_id):
    hotel = next((h for h in hotels if h['id'] == hotel_id), None)
    if hotel:
        return jsonify({'hotel': hotel})
    return jsonify({'message': 'Hotels not found'}), 404

@app.route('/hotels', methods=['POST'])
def add_hotel():
    global next_id
    new_hotel = {
        'id': next_id,
        'name': request.json['name'],
        'location': request.json['location'],
        'rooms': request.json['rooms'],
        'rating': request.json['rating']
    }
    hotels.append(new_hotel)
    next_id += 1
    return jsonify({'message': 'Hotel added', 'hotel': new_hotel}), 201

@app.route('/hotels/<int:hotel_id>', methods=['PUT'])
def update_hotel(hotel_id):
    hotel = next((h for h in hotels if h['id'] == hotel_id), None)
    if hotel:
        hotel['name'] = request.json['name']
        hotel['location'] = request.json['location']
        hotel['rooms'] = request.json['rooms']
        hotel['rating'] = request.json['rating']
        return jsonify({'message': 'Hotel updated', 'hotel': hotel})
    return jsonify({'message': 'Hotel not found'}), 404

@app.route('/hotels/<int:hotel_id>', methods=['DELETE'])
def delete_hotel(hotel_id):
    global hotels
    hotels = [h for h in hotels if h['id'] != hotel_id]
    return jsonify({'message': 'Hotel deleted'})

@app.route('/sort-hotels', methods=['POST']) 
def sort_hotels(): 
    data = request.json 
    if 'field' in data and data['field'] in ['name', 'location', 'rooms', 'rating']: 
        sorted_hotels = sorted(hotels, key=lambda x: x[data['field']]) 
        return jsonify({'hotels': sorted_hotels}) 
    return jsonify({'message': 'Invalid sort field'}), 400

@app.route('/calculate-rooms', methods=['POST']) 
def calculate_rooms(): 
    data = request.json 
    rooms = sum(hotel['rooms'] for hotel in data) 
    return jsonify({'totalRooms': rooms})



if __name__ == '__main__':
    app.run(debug=True)