import os
import PIL
import qrcode
import qrcode.constants

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