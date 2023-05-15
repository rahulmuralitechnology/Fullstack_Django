To create a CRUD (Create, Read, Update, Delete) app using ReactJS and Django Rest Framework (DRF) with routing, you can follow these general steps:

1. Set up the backend using Django Rest Framework
2. Create a database model to define the data structure
3. Implement the CRUD functionality in the backend
4. Set up the frontend using ReactJS
5. Create the UI components for each CRUD operation
6. Connect the frontend to the backend through API calls
7. Implement routing using react-router-dom library.

Here are some more detailed steps:

1. Set up the backend using Django Rest Framework:
    - Install Django and Django Rest Framework using pip
    - Create a new Django project and app
    - Configure the database settings in the settings.py file
    - Create a serializer class to convert the data model to JSON format
    - Create a view class to handle CRUD operations using DRF generic views

2. Create a database model to define the data structure:
    - Define a Django model class that inherits from the models.Model class
    - Define the fields for the model (e.g. CharField, IntegerField, ForeignKey)
    - Create a migration to create the table in the database using the manage.py makemigrations and manage.py migrate commands

3. Implement the CRUD functionality in the backend:
    - Create a view class for each CRUD operation (e.g. CreateAPIView, RetrieveUpdateDestroyAPIView)
    - Define the queryset and serializer_class attributes for each view
    - Create URL patterns for each view using Django's url() function

4. Set up the frontend using ReactJS:
    - Install ReactJS and any necessary dependencies (e.g. axios for API calls)
    - Create a new React app using create-react-app
    - Install react-router-dom for routing

5. Create the UI components for each CRUD operation:
    - Create a component for each CRUD operation (e.g. CreateComponent, ReadComponent, UpdateComponent, DeleteComponent)
    - Define the state for each component
    - Create form inputs for the Create and Update components
    - Create a list view for the Read component

6. Connect the frontend to the backend through API calls:
    - Define a base URL for the API endpoints (e.g. http://localhost:8000/api/)
    - Use axios to make API calls to the backend (e.g. axios.get, axios.post, axios.put, axios.delete)
    - Update the state of the UI components based on the API response

7. Implement routing using react-router-dom library:
    - Define the routes for each CRUD operation using the Route component from react-router-dom
    - Create links to navigate between the different routes using the Link component from react-router-dom

Overall, building a CRUD app with ReactJS and Django Rest Framework involves creating a database model, implementing CRUD operations in the backend, creating UI components in the frontend, connecting the frontend to the backend through API calls, and implementing routing. With these steps, you can create a functional app that allows users to create, read, update, and delete data.

Sure, I can provide a step-by-step process with sample code for building a CRUD app with ReactJS and Django Rest Framework.

**Step 1: Set up the backend using Django Rest Framework**

First, let's create a new Django project and app:

```
$ django-admin startproject myproject
$ cd myproject
$ python manage.py startapp api
```

Next, install Django Rest Framework and other necessary dependencies:

```
$ pip install djangorestframework django-cors-headers
```

Update the `INSTALLED_APPS` and `MIDDLEWARE` settings in the `settings.py` file:

```python
# settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'api',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

Create a serializer class in `serializers.py` to convert the data model to JSON format:

```python
# serializers.py

from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
```

Create a view class in `views.py` to handle CRUD operations using DRF generic views:

```python
# views.py

from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer

class TodoList(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TodoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
```

Define the URL patterns for each view in `urls.py`:

```python
# urls.py

from django.urls import path
from .views import TodoList, TodoDetail

urlpatterns = [
    path('todos/', TodoList.as_view(), name='todo_list'),
    path('todos/<int:pk>/', TodoDetail.as_view(), name='todo_detail'),
]
```

**Step 2: Create a database model to define the data structure**

Create a `Todo` model in `models.py`:

```python
# models.py

from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
```

Create a migration to create the `Todo` table in the database:

```
$ python manage.py makemigrations
$ python manage.py migrate
```

**Step 3: Implement the CRUD functionality in the backend**

We have already created the `TodoList` and `TodoDetail` views in `views.py` to handle the CRUD operations for the `Todo` model. These views use the `TodoSerializer` to convert the data model to JSON format.

**Step 4: Set up the frontend using ReactJS**

Create a new React app using `create-react-app`:

```
$ npx create-react-app myapp
$ cd myapp
```

Install `axios` and `react-router-dom`:

```
$ npm install axios react-router-dom
```

**Step 5: Create the UI components for each CRUD operation**

We will create four components for each CRUD operation - create, read, update, and delete.

**Create component**

Create a new component `CreateTodo.js` in the `src/components` folder:

```javascript
import React, { useState } from 'react';
import axios from 'axios';

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = { title, description };
    axios.post('http://localhost:8000/api/todos/', todo)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateTodo;
```

This component displays a form with fields for the `title` and `description` of the new todo. When the form is submitted, an HTTP POST request is sent to the backend API endpoint to create a new todo.

**Read component**

Create a new component `TodoList.js` in the `src/components` folder:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/todos/')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default TodoList;
```

This component fetches the list of todos from the backend API endpoint using an HTTP GET request and displays them as a list of `li` elements.

**Update component**

Create a new component `UpdateTodo.js` in the `src/components` folder:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTodo = ({ match }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/todos/${match.params.id}/`)
      .then(res => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch(err => console.log(err));
  }, [match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = { title, description };
    axios.put(`http://localhost:8000/api/todos/${match.params.id}/`, todo)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateTodo;
```

This component fetches the details of a single todo using an HTTP GET request and displays

the `title` and `description` fields in a form. When the form is submitted, an HTTP PUT request is sent to the backend API endpoint to update the todo.

**Delete component**

Create a new component `DeleteTodo.js` in the `src/components` folder:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteTodo = ({ match, history }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/todos/${match.params.id}/`)
      .then(res => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch(err => console.log(err));
  }, [match.params.id]);

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8000/api/todos/${match.params.id}/`)
      .then(res => history.push('/'))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <h2>Delete Todo</h2>
      <p>Are you sure you want to delete "{title}"?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => history.push('/')}>Cancel</button>
    </div>
  );
};

export default DeleteTodo;
```

This component fetches the details of a single todo using an HTTP GET request and displays a confirmation message with the todo's `title`. When the "Delete" button is clicked, an HTTP DELETE request is sent to the backend API endpoint to delete the todo, and the user is redirected to the home page.

**Step 6: Add routing to the app**

We will use the `react-router-dom` package to add routing to the app. First, install the package:

```
npm install react-router-dom
```

Then, create a new file `Routes.js` in the `src` folder:

```javascript
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import UpdateTodo from './components/UpdateTodo';
import DeleteTodo from './components/DeleteTodo';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={TodoList} />
      <Route path="/create" component={CreateTodo} />
      <Route path="/update/:id" component={UpdateTodo} />
      <Route path="/delete/:id" component={DeleteTodo} />
    </Switch>
  );
};

export default Routes;
```

This file defines four routes for each CRUD operation, using the appropriate components. The `exact` keyword is used for the home route to ensure that it only matches the exact path `/`.

Finally, update the `App.js` file to use the `Routes` component instead of the `TodoList` component:

```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import Routes from './Routes';

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create</Link></li>
        </ul>
      </nav>
      <Routes />
    </div>
  );
};

export default App;
```

This file defines a navigation menu with links to the home page and the create page, and uses the `Routes` component to render the appropriate component for each route.

**Step 7: Run the app**

Finally, run the app by running the following command in the terminal:

```
npm start
```

This should start the development server and open the app in your web browser at `http://localhost:3000/`. You should be able to view, create, update, and delete todos in the app.

Congratulations, you have successfully created a CRUD app using React and Django REST Framework! This is just the beginning, and you can build more complex and sophisticated applications using these technologies.