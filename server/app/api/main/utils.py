import os
import PIL
import qrcode
import qrcode.constants

from flask import current_app

allowed_extensions = current_app.config['ALLOWED_EXTENSIONS']

def allowed_filename(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def generate_qrcode(url, access_id):
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    path = os.path.join('uploads', 'qrcode', f'access_id.png')
    img.save(path)

    return path