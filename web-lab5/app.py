from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

UPLOAD_FOLDER = 'images'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

flowers = [
    {
        "id": 1,
        "title": "Sophie and Sharman bouquet of cream roses",
        "text": "Sophie and Sharman is a charming bouquet of cream roses that symbolize tenderness and elegance. This bouquet is an ideal gift for those you love and respect.",
        "image": "white_bouquet.jpg",
        "price": 850,
        "category": "roses",
        "quantity": 0,
    },
    {
        "id": 2,
        "title": "Basket of white eustomas",
        "text":"A basket of white eustomas is a symbol of purity and elegance. These delicate and pristine flowers have a charm of their own. With their crisp white petals and soft fragrance.",
        "image": "bag_flowers.jpg",
        "price": 3000,
        "category": "basket",
        "quantity": 10,
    },
    {
        "id": 3,
        "title": "A bouquet of 29 White Ohara white roses",
        "text": "A bouquet of 29 White Ohara white roses is a stunning and sophisticated gift. Each White Ohara rose is a symbol of purity and timeless beauty.",
        "image": "white_roses.jpg",
        "price": 2400,
        "category": "roses",
        "quantity": 8,
    },
    {
        "id": 4,
        "title": "Bouquet of French roses Ohara and Pink Ohara",
        "text": "The bouquet of French roses Ohara and Pink Ohara was carefully arranged by an elderly florist named Marcel. He was known far and wide for his extraordinary ability to create.",
        "image": "french_roses.jpg",
        "price": 1599,
        "category": "roses",
        "quantity": 12,
    },
    {
        "id": 5,
        "title": "Basket with peony roses spray",
        "text": "In a cozy countryside cottage, nestled amidst rolling hills and blossoming meadows, there sat a wicker basket brimming with peony roses in full bloom.",
        "image": "pink_basket.jpg",
        "price": 3350,
        "category": "basket",
        "quantity": 4,
    },
    {
        "id": 6,
        "title": "Bouquet Aphrodite in a vase",
        "text": "Bouquet Aphrodite in a vase will beautify any interior.The bouquet includes: hydrangea, matiola, viburnum, genestra, limonium, imported rose, peony, calla.",
        "image": "bouquet_vase_white.jpg",
        "price": 4620,
        "category": "vase",
        "quantity": 14,
    },
    {
        "id": 7,
        "title": "Roses mistry bubbles in a vase",
        "text": "Misty Bubbles rose spray 15 stems in a vase will decorate any interior. Whether given as a gift or used to adorn a space, this bouquet conveys a sense of enchantment and timeless beauty.",
        "image": "vase_pink.jpg",
        "price": 3500,
        "category": "vase",
        "quantity": 12,
    },
    {
        "id": 8,
        "title": "Bouquet of flowers Virginia in a vase",
        "text": "The bouquet includes: tulip, lilac, eucalyptus, rose spray Misty Bubbles, rose Memory Lane. This exquisite bouquet is carefully composed to create a harmonious.",
        "image": "virginia_vase.jpg",
        "price": 2375,
        "category": "vase",
        "quantity": 8,
    },
    {
        "id": 9,
        "title": "Basket of roses Memory Lane",
        "text": "Basket of Roses Memory Lane with a lush bow. Each rose in this basket is carefully chosen for its soft, pastel hue and delicate fragrance, making it a symbol of tenderness.",
        "image": "basket_memory.jpg",
        "price": 6870,
        "category": "basket",
        "quantity": 20,
    },
]
next_id = 10
current_recomends = 0

sortingFunctions = {
    "price": lambda a: a["price"],
    "name": lambda a: a["title"],
}

# CRUD operations
@app.route('/flowers', methods=['GET'])
def get_flowers():
    flowers_id = request.args.get("id", type=int)
    if flowers_id:
        flower = next((f for f in flowers if f['id'] == flowers_id), None)
        if flower:
            return jsonify({'flowers': flower})
        return jsonify({'Flower not found'}), 404

    sort = request.args.get("sort", type=str)
    filter_option = request.args.get("filter", type=str)
    reverse_sort = request.args.get("reverse_sort", type=lambda val: val.lower() == "true")
    search = request.args.get("search", type=str)
    limit = request.args.get("limit", type=int)

    final_flowers = flowers.copy()

    if sort:
        final_flowers = list(sorted(final_flowers, key=sortingFunctions[sort]))

    if filter_option and not filter_option == "all":
        final_flowers = list(filter(lambda a: a["category"] == filter_option, final_flowers))
    
    if search:
        for i in final_flowers.copy():
            if search.lower() not in i["title"].lower():
                final_flowers.remove(i)

    if reverse_sort:
        final_flowers.reverse()

    if limit:
        final_flowers = final_flowers[0:limit]

    return jsonify({'flowers': final_flowers})


@app.route("/flowers/image/<name>", methods=["GET"])
def get_image(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)

@app.route("/flowers/recomend", methods=["GET"])
def get_recomended_flowers():
    global current_recomends
    current = request.args.get("current", type=int)
    if current:
        current_recomends = current
    elif current_recomends < len(flowers):
        current_recomends += 3
    else:
        current_recomends = 3
    
    return jsonify({'flowers': flowers[0:current_recomends], 
                    'more': False if current_recomends >= len(flowers) else True})

@app.route('/flowers', methods=['POST'])
def add_flowers():
    global next_id
    new_flowers = {
        'id': next_id,
        'title': request.json['title'],
        'text': request.json['text'],
        'image': request.json['image'],
        'price': request.json['price'],
        'category': request.json['category'],
        'quantity': request.json['quantity'],
    }
    flowers.append(new_flowers)
    next_id += 1
    return jsonify({'message': 'Flowers added', 'flowers': new_flowers}), 201

@app.route('/flowers/<int:flowers_id>', methods=['PUT'])
def update_flowers(flowers_id):
    flower_to_update = next((f for f in flowers if f['id'] == flowers_id), None)
    if flower_to_update:
        flower_to_update['title'] = request.json['title']
        flower_to_update['text'] = request.json['text']
        flower_to_update['image'] = request.json['image']
        flower_to_update['price'] = request.json['price']
        flower_to_update['category'] = request.json['category']
        flower_to_update['quantity'] = request.json['quantity']
        return jsonify({'message': 'Flowers updated', 'flowers': flower_to_update})
    return jsonify({'Flowers not found'}), 404


@app.route('/flowers/<int:flowers_id>', methods=['DELETE'])
def delete_flowers(flowers_id):
    global flowers
    flowers = [f for f in flowers if f['id'] != flowers_id]
    return jsonify({'Flowers deleted'})

if __name__ == '__main__':
    app.run(debug=True)