#!flask/bin/python
from flask import Flask, jsonify
import wikipedia

wikipedia.set_lang("en")

app = Flask(__name__)

# tasks = [
#     {
#         'id': 1,
#         'title': u'Buy groceries',
#         'description': u'Milk, Cheese, Pizza, Fruit, Tylenol', 
#         'done': False
#     },
#     {
#         'id': 2,
#         'title': u'Learn Python',
#         'description': u'Need to find a good Python tutorial on the web', 
#         'done': False
#     }
# ]
#tasks=wikipedia.search("obama")

@app.route('/wikiapi/<string:searchitem>', methods=['GET'])
def get_searchresult(searchitem):
	print(searchitem)
	searchresult=wikipedia.search(searchitem)
	return jsonify({'searchresult':searchresult})

# @app.route('/wikiapi/<string:stuff>', methods=['GET'])
# def get_task(task_id):
#     task = [task for task in tasks if task['id'] == task_id]
#     if len(task) == 0:
#         abort(404)
#     return jsonify({'task': task[0]})

if __name__ == '__main__':
    app.run(debug=True)
			
			