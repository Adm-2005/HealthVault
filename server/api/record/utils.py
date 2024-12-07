allowed_extensions = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx']

def allowed_filename(filename:str):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions