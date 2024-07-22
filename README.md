# Hand2Text

Hand2Text is a tool that helps you transform your handwritten text into actual text
## Installation

Navigate to backend and install the requirements
```bash
cd backend
pip install -r ./requirements.txt
```
Start the backend server
```bash
python app.py
```
Navigate to frontend and start server
```bash
npm i && npm start
```

You can use docker compose for an easier setup:

First build the images:
```bash
docker-compose build
```
Then run the containers:
```bash
docker-compose up
```
## Usage
write any text you want in the specified area , click the detect text button. Your results should be there!

## Screenshot
![Hand2Text](https://github.com/user-attachments/assets/4e7d7e14-3d34-4721-afcd-52577290b64c)

## Contributing
Currently the model is sometimes hallucinating, changes need to be done and input image preprocessing should be added.

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
