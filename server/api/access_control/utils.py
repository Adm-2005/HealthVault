import os
import PIL
import qrcode
import qrcode.constants
from werkzeug.utils import secure_filename

def generate_qrcode(url:str, access_id:int) -> str:
    """
    Generates QR Code for the given health record 
    """
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    qrcode_url = os.path.join( f'{access_id}.png')
    img.save(qrcode_url)

    return qrcode_url