import os

from flask import Flask
from flask import render_template
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(), override=True)

app = Flask(__name__)


@app.route('/')
def root():
    return render_template('index.html')


@app.route('/maps/embed/')
def maps_embed():
    return render_template('maps/embed.html', GOOGLE_API=os.getenv('GOOGLE_API') )


@app.route('/maps/static/')
def maps_static():
    return render_template('maps/static.html', GOOGLE_API=os.getenv('GOOGLE_API') )


@app.route('/maps/dynamic/')
def maps_dynamic():
    return render_template('maps/dynamic.html', GOOGLE_API=os.getenv('GOOGLE_API') )


@app.route('/places/autocomplete/')
def places_autocomplete():
    return render_template('places/autocomplete.html', GOOGLE_API=os.getenv('GOOGLE_API') )


@app.route('/mapbox/example/')
def mapbox_example():
    return render_template('mapbox/example.html')

