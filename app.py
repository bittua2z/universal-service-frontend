from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/quote', methods=['POST'])
def quote():
    name = request.form['name']
    phone = request.form['phone']
    item = request.form['item']
    issue = request.form['issue']
    print(f"Quotation Request:\nName: {name}\nPhone: {phone}\nItem: {item}\nIssue: {issue}")
    return redirect(url_for('index'))

@app.route('/product-quote', methods=['POST'])
def product_quote():
    item = request.form['item']
    print(f"Product Quote Request for: {item}")
    return redirect(url_for('index'))

@app.route('/appointment', methods=['POST'])
def appointment():
    name = request.form['name']
    phone = request.form['phone']
    email = request.form['email']
    service = request.form['service']
    message = request.form['message']
    print(f"Appointment Request:\nName: {name}\nPhone: {phone}\nEmail: {email}\nService: {service}\nMessage: {message}")
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
