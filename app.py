from flask import Flask, render_template, request, jsonify
from livestream_extractor import extract_and_follow_livestream_links

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST' and request.content_type == 'application/json':
        data = request.get_json()
        link = data.get('link')
        if link:
            livestreams = extract_and_follow_livestream_links(link)
            return jsonify(livestreams)
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
