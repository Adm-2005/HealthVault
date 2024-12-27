import os
import uuid
import random
from PIL import Image, ImageDraw, ImageFont
from werkzeug.utils import secure_filename

def generate_avatar(first_name: str, last_name: str, avatar_dir: str, size: int = 256) -> str:
    """
    Generates avatar for user based on the given initials and saves it to avatar_dir

    Args
        first_name: first name of the user
        last_name: last name of the user
        avatar_dir: path for directory to save avatars
        size: denotes height and width

    Returns
        [str]: path of the saved avatar
    """
    initials = ""

    if first_name:
        initials += first_name[0].upper()

    if last_name:
        initials += last_name[0].upper()

    background_colors = ["red", "blue", "green", "yellow"]
    bg_color = random.choice(background_colors)
    text_color = "white"

    image = Image.new("RGB", (size, size), color=bg_color)

    draw = ImageDraw.Draw(image)

    font_size = int(size * 0.4)
    try:
        font = ImageFont.truetype('arial.ttf', font_size)
    except IOError:
        font = ImageFont.load_default()

    text_bbox = draw.textbbox((0, 0), initials, font=font)
    text_width, text_height = text_bbox[2], text_bbox[3]
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2

    draw.text((text_x, text_y), initials, fill=text_color, font=font)

    os.makedirs(avatar_dir, exist_ok=True)
    file_name = secure_filename(f"{first_name}_{last_name}.jpg")
    
    if os.path.exists(os.path.join(avatar_dir, file_name)):
        base, ext = os.path.splitext(file_name)
        file_name = f"{base}_{uuid.uuid4().hex}{ext}"    
    
    image.save(os.path.join(avatar_dir, file_name))
    return file_name