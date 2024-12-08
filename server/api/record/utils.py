import os
import time
from typing import List
from werkzeug.utils import secure_filename

def allowed_filename(filename:str, allowed_extensions:List[str]) -> bool:
    """
    Verifies the extension of the given filename.

    Args
        filename: name of the file to check
        allowed_extensions: list of allowed extensions

    Returns
        [bool]: true if file extension is valid
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def validate_file(file, max_file_size: int, allowed_extensions: List[str]) -> bool:
    """
    Checks whether the given file fulfills all the constraints.

    Args
        file: file received in request.files
        max_file_size: maximum limit for file size
        allowed_extensions: list of allowed extensions

    Returns
        [bool]: returns true if the file is valid

    Raises
        ValueError: raised when file does not meets constraints
    """
    
    if not allowed_filename(file.filename, allowed_extensions):
        raise ValueError("File type not allowed.")
    
    if file.content_length > max_file_size:
        raise ValueError("File size exceeds limit.")
    
    if not file.filename:
        raise ValueError("No selected file.")
    
    return True

def upload_file(file, dir: str) -> str:
    """
    Uploads the file to the given directory.

    Args
        file: file to upload
        dir: directory path

    Returns
        [str]: path of the uploaded file
    """
    
    os.makedirs(dir, exist_ok=True)
    file_url = os.path.join(dir, secure_filename(file.filename))
    if os.path.exists(file_url):
        base, ext = os.path.splitext(file_url)
        file_url = os.path.join(f"{base}_{int(time.time())}{ext}")
    file.save(file_url)
    
    return file_url