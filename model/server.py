from flask import Flask, request, jsonify
import pandas as pd
import collections
import random

app = Flask(__name__)


@app.route('/answer', methods=['GET'])
def get_words():
    data = pd.read_csv('new_possible_words.txt')
    game_words = list(data['Possible_words'])
    answer = random.choices(game_words, k=1)[0]
    response = {'ans':answer}
    return jsonify(response)

@app.route('/words', methods=['GET'])
def allowed_words():
    data = pd.read_csv('Allowed_words.txt')
    game_words = list(data['Allowed'])
    response = {'words':game_words}
    return jsonify(response)





@app.route('/game', methods=['POST'])
def wordle_output():
    data = request.get_json()
    value = data['value']
    answer = data['answer']
    res = [0]*5
    count = collections.Counter(answer)
    for i in range(5):
        if value[i] == answer[i]:
            res[i] = 2
            count[value[i]] -= 1
    for i in range(5):
        if res[i] == 0 and value[i] in count and count[value[i]] != 0:
            count[value[i]] -= 1
            res[i] = 1
    response = {'result':res}
    print(value,answer,res)
    return jsonify(response)








if __name__ == '__main__':
    app.run(debug=True)
    