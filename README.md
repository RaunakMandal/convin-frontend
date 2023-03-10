# Convin Frontend Assignment
[![Netlify Status](https://api.netlify.com/api/v1/badges/a91f3ddf-0d7c-4895-a42f-0025a7272b1e/deploy-status)](https://app.netlify.com/sites/incredible-zuccutto-172086/deploys)

This Webapp allows you to create new Buckets, Add Embed Links to them, Play the Media, etc.

## How to Run?
### Local:
#### 1. Clone the Repo
    git clone https://github.com/RaunakMandal/convin-frontend.git
#### 2. Install Dependencies for Frontend
    npm install

#### 3. Install JSON Server
    npm install -g json-server
#### 4. Run the JSON Server in the same directory
    json-server --watch db.json --port=8080
#### 5. Run the App
    npm start

You can now head over to http://localhost:3000 and use the app. 

### Deployed App:
You can visit https://incredible-zuccutto-172086.netlify.app to use the app.

### Screen Recording of the App
https://www.loom.com/share/40ee7ac4a18f45e6a46eaa36d8def3e8

Note: Looks like the json-server does not work directly with Netlify. So, please use the Local build to run the app with all functionalities. :)
