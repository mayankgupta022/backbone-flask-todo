backbone-flask-todo
====================

A simple CRUD application for Todolist created in backbonejs and python flask

Installation
------------

1. <pre class="console">pip install flask</pre>
2. <pre class="console">pip install flask-mysql</pre>
3. <pre class="console">pip install flask-cors</pre>
4. Create a database in mysql
5. Execute notes.sql in notes database
6. Modify server.py and change following configuration based on your requirements
	<pre class="console">
	app.config['MYSQL_DATABASE_USER'] = 'user'
	app.config['MYSQL_DATABASE_PASSWORD'] = 'pass'
	app.config['MYSQL_DATABASE_DB'] = 'todo'
	app.config['MYSQL_DATABASE_HOST'] = 'localhost'
	</pre>

Run Server
----------
Go inside server directory.
<pre class="console">python server.py</pre>

Server is now running `http://localhsot:5000`

Specifications
--------------

1. GET `http://localhost:5000/todo` - get all todo
2. POST `http://localhost:5000/todo` - create a todo
3. PUT `http://localhost:5000/todo/:id` - update a todo with given id
4. DELETE `http://localhost:5000/todo/:id` - delete a todo with given id
