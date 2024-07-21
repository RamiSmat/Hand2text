from flask import Flask, request, jsonify
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
from PIL import Image
import io
import base64
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Allow all origins for this route
processor = TrOCRProcessor.from_pretrained('microsoft/trocr-base-handwritten')
model = VisionEncoderDecoderModel.from_pretrained('microsoft/trocr-base-handwritten')


def convertToImage(base64text):
    print(base64text[22:])
    image_data = base64.b64decode(base64text[22:])
    image = Image.open(io.BytesIO(image_data)).convert("RGBA")
    width, height = image.size
    background = Image.new("RGBA", (width, height), (255, 255, 255, 255))
    background.paste(image, (0, 0), image)
    return background.convert("RGB")

@app.route('/process-image', methods=['POST'])
def process_image():
    data = request.get_json()

    if 'image' not in data:
        return jsonify({'error': 'No image file provided'}), 400

    base64_image = data['image']
    image = convertToImage(base64_image)
    print("image converted")
    pixel_values = processor(images=image, return_tensors="pt").pixel_values
    generated_ids = model.generate(pixel_values)
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
    print(generated_text)
    return jsonify({'text': generated_text})

if __name__ == '__main__':
    app.run(debug=True)
