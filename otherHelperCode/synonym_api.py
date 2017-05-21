from flask import Flask
from flask import jsonify
from gensim.models import Word2Vec
import re
import json
import ast
import itertools
from flask import request

print("Loading word2vec model")
word2vec_model = "/home/yan/eventData/night_ridir_ou/night_ridir/data/wiki_ar_word2vec.model"

prebuilt = Word2Vec.load(word2vec_model)
vocab_set = set(prebuilt.vocab.keys())

app = Flask(__name__)
@app.route("/ar",methods=['POST'])
def ar():
        word=request.form['word']
        return get_synonym_ar(word)
def get_synonym_ar(word,match_n=10):
         word = re.sub(" ", "_", word)
         word_combo = [word] #[word_upper, word_title, word_lower]
         results_list = []
         for w in word_combo:
             try:
                 results = prebuilt.most_similar(positive=[w], topn = match_n)
                 results_list.extend([i[0].upper() for i in results])
             except KeyError:
                 pass
         return jsonify(results_list)#list(set(results_list))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9090)

