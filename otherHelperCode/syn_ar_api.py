
from flask import Flask
from gensim.models import Word2Vec
import re
import json
import ast
import itertools
from flask import request

#print "Loading word2vec model"
#word2vec_model = "../../night_ridir/data/wiki_ar_word2vec.model"

#prebuilt = Word2Vec.load(word2vec_model)
#vocab_set = set(prebuilt.vocab.keys())

app = Flask(__name__)
@app.route("/ar",methods=['POST'])
def ar():
	word=request.form['word']
	get_synonym_ar(word)
def get_synonym_ar(word,match_n=10):
        # word = re.sub(" ", "_", word)
        # word_combo = [word] #[word_upper, word_title, word_lower]
        # results_list = []
        # for w in word_combo:
        #     try:
        #         results = prebuilt.most_similar(positive=[w], topn = match_n)
        #         results_list.extend([i[0].upper() for i in results])
        #     except KeyError:
        #         pass
        # return list(set(results_list))
        return word

if __name__ == "__main__":
    app.run( port=9090)

# from flask import request

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         do_the_login()
#     else:
#         show_the_login_form()



# rom flask import Flask, render_template, request, url_for

# # Initialize the Flask application
# app = Flask(__name__)

# # Define a route for the default URL, which loads the form
# @app.route('/')
# def form():
#     return render_template('form_submit.html')

# # Define a route for the action of the form, for example '/hello/'
# # We are also defining which type of requests this route is 
# # accepting: POST requests in this case
# @app.route('/hello/', methods=['POST'])
# def hello():
#     name=request.form['yourname']
#     email=request.form['youremail']
#     return render_template('form_action.html', name=name, email=email)

# # Run the app :)
# if __name__ == '__main__':
#   app.run( 
#         host="0.0.0.0",
#         port=int("80")
#   )