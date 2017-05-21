from __future__ import unicode_literals
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
@app.route("/polling",methods=['GET'])
def polling():
	return "hello synonym"

@app.route("/ar",methods=['POST'])
def ar():
        word=request.json['word']
        return get_synonyms(word)
def get_synonyms(word,match_n=10):
         word = re.sub(" ", "_", word)
         word_combo = [word] #[word_upper, word_title, word_lower]
         results_list = []
         for w in word_combo:
             try:
                 results = prebuilt.most_similar(positive=[w], topn = match_n)
                 results_list.extend([i[0].upper() for i in results])
             except KeyError:
                 pass
         return jsonify(results_list) #list(set(results_list))
def encodedata(word):
        #args = self.reqparse.parse_args()
        x = word
        words = ast.literal_eval(x)
        if len(words) == 1:
            word = words[0]
            word = re.sub(" ", "_", word)
            syns = get_synonyms(word)
        if len(words) == 2:
            word_list = [re.sub(" ", "_", w) for w in words]
            syns = []
            for n, w in enumerate(word_list):
                syns.append(get_synonyms(w, match_n = 10))
            t = [zip(x, syns[1]) for x in itertools.permutations(syns[0], len(syns[1]))]
            x = []
            for i in t:
                for j in i:
                    p = j[0] + "_" + j[1]
                    x.append(p)
            syns = jsonify(list(set(x))) # get uniques
        if len(words) == 0 or len(words) > 2:
            print("Word length is 0 or greater than 2")
            syns = jsonify([])
        return syns


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9090)


