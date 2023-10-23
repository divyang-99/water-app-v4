import os
from flask import Flask, render_template, request, redirect, url_for, session, abort
from flask import jsonify  # Import jsonify module
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

print(os.getenv('ADMIN_USERNAME'))  # should print 'admin'
print(os.getenv('ADMIN_PASSWORD'))  # should print 'admin@123'


# Initialize Flask app
app = Flask(__name__, static_folder="/static",
            template_folder="/templates")
app.secret_key = os.urandom(24)  # Generate a random key for session management

# Prevent Caching
@app.after_request
def add_header(response):
    response.cache_control.no_store = True
    response.cache_control.no_cache = True
    response.cache_control.must_revalidate = True
    response.cache_control.proxy_revalidate = True
    response.expires = 0
    return response


@app.route('/', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
def login():
    # Handle POST request for login
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == os.getenv('ADMIN_USERNAME') and password == os.getenv('ADMIN_PASSWORD'):
            session['logged_in'] = True
            return jsonify(success=True)  # Return success status
        else:
            # Return failure status and message
            return jsonify(success=False, message="Invalid credentials")
    # Render login page for GET request
    return render_template('login.html')


@app.route('/dashboard')
def dashboard():
    # Redirect to login page if user is not logged in
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    # Render dashboard page if user is logged in
    return render_template('dashboard.html')


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))


@app.errorhandler(404)
def page_not_found(e):
    # Optionally, you can use a template to render a custom 404 page
    # return render_template('404.html'), 404
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
