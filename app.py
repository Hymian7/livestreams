# app.py

from flask import Flask, render_template, request
from livestream_extractor import extract_and_follow_livestream_links

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        link = request.form['link']
        livestreams = extract_and_follow_livestream_links(link)
        return render_template('index.html', livestreams=livestreams)
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
