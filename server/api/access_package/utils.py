import os
import PIL
import uuid
import qrcode
import qrcode.constants

def generate_qrcode(url:str, access_id:int, qr_dir: str) -> str:
    """
    Generates QR Code for the given health record 

    Args
        url: url for access package
        access_id: identifier for access package
        qr_dir: directory for qrcode
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
    qrcode_path = os.path.join(qr_dir, f'{uuid.uuid4().hex}_{access_id}.png')
    
    img.save(qrcode_path)

    return qrcode_path