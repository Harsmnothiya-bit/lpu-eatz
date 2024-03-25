import torch
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

data = pd.read_csv("data.csv")

label_encoders = {}
categorical_features = ['name', 'taste_profile']
for feature in categorical_features:
    label_encoders[feature] = LabelEncoder()
    data[feature] = label_encoders[feature].fit_transform(data[feature])

class Model(torch.nn.Module):
    def __init__(self, input_size):
        super(Model, self).__init__()
        self.fc1 = torch.nn.Linear(input_size, 64)
        self.fc2 = torch.nn.Linear(64, 32)
        self.fc3 = torch.nn.Linear(32, 1)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

model = Model(input_size=6) 
model.load_state_dict(torch.load('trained_model.pth'))
model.eval()

def recommend_food(taste_profile, avg_prep_time):
    taste_profile_encoded = label_encoders['taste_profile'].transform([taste_profile])[0]

    input_data = torch.tensor([[0, taste_profile_encoded, 0, 0, 0, avg_prep_time]], dtype=torch.float32)

    with torch.no_grad():
        output = model(input_data)
        predicted_price = output.item()

    recommended_foods = data[data['price'] <= predicted_price]
    recommended_foods.reset_index(drop=True, inplace=True)  

    recommended_foods['name'] = label_encoders['name'].inverse_transform(recommended_foods['name'])

    return recommended_foods[['name', 'sugar', 'protein', 'vitamin', 'prep_time']]


tastes = [
  'spicy',
  'savory',
  'sweet',
  'creamy',
  'crispy',
  'crunchy',
  'tangy',
  'earthy',
  'rich',
  'cheesy',
  'sweet-spicy',
  'creamy-garlicky',
  'garlicky',
  'cheesy and savory',
  'crispy and savory',
  'refreshing and savory',
  'spicy and savory',
  'spicy, tangy, and savory',
  'creamy and savory',
  'grilled and savory',
  'sweet and creamy',
  'tangy and creamy',
  'chocolaty and creamy',
  'fruity and creamy',
  'refreshing and tangy',
  'refreshing and fruity',
  'vegetable-rich and savory',
  'refreshing and salty',
  'spicy and creamy',
  'tropical and creamy',
  'mild',
  'herby',
  'buttery',
  'refreshing',
  'chocolaty',
  'strong',
  'nutty',
  'caramely',
  'fruity',
  'berrylicious',
  'varied',
  'aromatic',
  'spongy',
  'soft'
]



@app.route('/suggest', methods=['GET'])
def recommend():
    taste = request.args.get('taste')
    time = float(request.args.get('time'))
    print('New request:', taste, time)

    if taste not in tastes:
        return jsonify({'error': 'No such taste found!'})

    recommended_foods = recommend_food(taste, time)
    print(recommended_foods)
    return jsonify(recommended_foods.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=False)
