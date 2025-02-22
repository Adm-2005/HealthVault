from flask import current_app, jsonify
from werkzeug.http import HTTP_STATUS_CODES
from werkzeug.exceptions import HTTPException

def error_response(status_code, message=None):
    payload = {'error': HTTP_STATUS_CODES.get(status_code, 'Unknown Error')}
    
    if message:
        payload['message'] = message

    return jsonify(payload), status_code

def bad_request(message):
    return error_response(400, message)

def handle_exception(e):
    return error_response(e.code)