from flask import Flask, request, Response
from flaskext.mysql import MySQL
from flask.ext.cors import CORS
import json

mysql = MySQL()
app = Flask(__name__)
cors = CORS(app)

app.config['MYSQL_DATABASE_USER'] = 'user'
app.config['MYSQL_DATABASE_PASSWORD'] = 'pass'
app.config['MYSQL_DATABASE_DB'] = 'todo'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql.init_app(app)

def log(msg):
	log_file = open('log.txt', 'a')
	log_file.write(msg + '\n')
	log_file.close()

@app.route('/todo', methods=['GET', 'POST', 'OPTIONS'])
def todos():
	params  = json.loads(json.dumps(request.json))

	con = mysql.connect()
	cursor = con.cursor()
	info = dict()

	if request.method == 'GET':
		stmt = "SELECT * FROM todo"
		cursor.execute(stmt)
		data = cursor.fetchall()
		info = [{"id" : item[0], "task": item[1], "status": item[2]} for item in data]

	elif request.method == 'POST':
		task = params['task']
		status = 0
		stmt = "INSERT INTO todo (task, status) VALUES (%s, %s)"
		data = (task, status)
		cursor.execute(stmt, data)
		id = cursor.lastrowid
		con.commit()
		info = {"id" : id, "task": task, "status": status}

	return Response(json.dumps(info),  mimetype='application/json')

@app.route('/todo/<int:id>', methods=['GET', 'PUT', 'DELETE', 'OPTIONS'])
def todo(id):
	params  = json.loads(json.dumps(request.json))

	con = mysql.connect()
	cursor = con.cursor()
	info = dict()

	if request.method == 'GET':
		stmt = "SELECT * FROM todo WHERE id = %s"
		data = (id)
		cursor.execute(stmt, data)
		data = cursor.fetchone()
		info = {"id" : data[0], "task": data[1], "status": data[2]}

	elif request.method == 'PUT':
		task = params['task']
		status = params['status']
		stmt = "UPDATE todo SET task = %s , status = %s WHERE id = %s"

		data = (task, status,id)
		cursor.execute(stmt, data)
		con.commit()
		info = {"id" : id, "task": task, "status": status}

	elif request.method == 'DELETE':
		stmt = "DELETE FROM todo WHERE id = %s"
		data = (id)
		cursor.execute(stmt, data)
		con.commit()
		info = {"id" : id}

	return Response(json.dumps(info),  mimetype='application/json')

if __name__ == "__main__":
	# import logging
	# logging.basicConfig(filename='error.log',level=logging.DEBUG)
	app.debug=True
	app.run()
