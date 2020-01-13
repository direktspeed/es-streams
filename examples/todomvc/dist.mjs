import { map, merge, skipRepeats, scan, tap, runEffects } from '@most/core';
import { newDefaultScheduler } from '@most/scheduler';
import { hashchange } from '@most/dom-event';
import { createAdapter } from '@most/adapter';
import { id, compose } from '@most/prelude';
import { createElement } from 'react';
import { render } from 'react-dom';

const newTodo = (description, id) => ({
  description,
  completed: false,
  id
});
const emptyApp = {
  todos: [],
  focus: null,
  filter: '/',
  nextId: 0
};
const completedCount = ({
  todos
}) => todos.reduce(countIfCompleted, 0);

const countIfCompleted = (count, {
  completed
}) => count + (completed ? 1 : 0);

const addTodo = description => app => ({ ...app,
  nextId: app.nextId + 1,
  todos: app.todos.concat([newTodo(description, app.nextId)])
});
const removeTodo = id => app => ({ ...app,
  todos: app.todos.filter(todo => todo.id !== id)
});
const updateCompleted = (completed, id) => app => ({ ...app,
  todos: app.todos.map(todo => todo.id === id ? { ...todo,
    completed
  } : todo)
});
const updateAllCompleted = completed => app => ({ ...app,
  todos: app.todos.map(todo => ({ ...todo,
    completed
  }))
});
const removeAllCompleted = app => ({ ...app,
  todos: app.todos.filter(todo => !todo.completed)
});
const setFilter = filter => app => ({ ...app,
  filter
}); // export const setFocus = (focus: ?Id) => (app: App): App =>
//   ({
//     ...app,
//     focus
//   })
//
// export const updateDescription = (description: string, id: Id) => (app: App): App =>
//   ({
//     ...app,
//     todos: app.todos.map(todo => todo.id === id ? { ...todo, description } : todo)
//   })

/* global HTMLElement, HTMLInputElement, Event, $Call */
const ENTER_KEY = 'Enter'; // const ESC_KEY = 'Escape'

const runAction = (app, action) => action(app);
const handleAdd = e => {
  const value = e.target.value.trim();

  if (e.key !== ENTER_KEY || value.length === 0) {
    return id;
  }

  e.target.value = '';
  return addTodo(value);
};
const handleToggleAll = e => updateAllCompleted(e.target.checked);
const handleComplete = ({
  id
}) => e => updateCompleted(e.target.checked, id);
const handleRemove = ({
  id
}) => e => removeTodo(id);
const handleRemoveAllCompleted = e => removeAllCompleted;
const handleFilterChange = e => setFilter(e.newURL.replace(/^.*#/, ''));

const maybeClass = className => condition => condition ? className : '';

const ifCompleted = maybeClass('completed');
const ifSelected = maybeClass('selected');

const filterTodos = ({
  filter,
  todos
}) => todos.filter(t => {
  switch (filter) {
    case '/':
      return true;

    case '/active':
      return !t.completed;

    case '/completed':
      return t.completed;
  }
});

const View = addAction => appState => {
  const completed = completedCount(appState);
  const todos = appState.todos;
  const filtered = filterTodos(appState);
  const remaining = todos.length - completed;
  return createElement("div", null, createElement("header", {
    className: "header"
  }, createElement("h1", null, "todos"), createElement("input", {
    className: "new-todo",
    name: "new-todo",
    placeholder: "What needs to be done?",
    autoComplete: "off",
    autoFocus: true,
    onKeyPress: compose(addAction, handleAdd)
  })), createElement(TodoList, {
    addAction: addAction,
    allCompleted: todos.length > 0 && remaining === 0
  }, filtered.map(todo => createElement(TodoItem, {
    key: todo.id,
    addAction: addAction,
    todo: todo
  }))), todos.length > 0 && createElement(Footer, {
    addAction: addAction,
    remaining: remaining,
    completed: completed,
    filter: appState.filter
  }));
};
const TodoList = props => createElement("section", {
  className: "main"
}, createElement("input", {
  id: "toggle-all",
  className: "toggle-all",
  type: "checkbox",
  checked: props.allCompleted,
  onChange: compose(props.addAction, handleToggleAll)
}), createElement("label", {
  htmlFor: "toggle-all"
}, "Mark all as complete"), createElement("ul", {
  className: "todo-list"
}, props.children));
const TodoItem = ({
  addAction,
  todo
}) => createElement("li", {
  className: ifCompleted(todo.completed)
}, createElement("div", {
  className: "view"
}, createElement("input", {
  className: "toggle",
  type: "checkbox",
  checked: todo.completed,
  onChange: compose(addAction, handleComplete(todo))
}), createElement("label", null, todo.description), createElement("button", {
  className: "destroy",
  onClick: compose(addAction, handleRemove(todo))
})), createElement("input", {
  className: "edit",
  value: todo.description
}));
const Footer = ({
  addAction,
  remaining,
  completed,
  filter
}) => createElement("footer", {
  className: "footer"
}, createElement("span", {
  className: "todo-count"
}, createElement("strong", null, remaining), " ", remaining === 1 ? 'item' : 'items', " left"), createElement("ul", {
  className: "filters"
}, createElement("li", null, createElement("a", {
  className: ifSelected(filter === '/'),
  href: "#/"
}, "All")), createElement("li", null, createElement("a", {
  className: ifSelected(filter === '/active'),
  href: "#/active"
}, "Active")), createElement("li", null, createElement("a", {
  className: ifSelected(filter === '/completed'),
  href: "#/completed"
}, "Completed"))), completed > 0 && createElement("button", {
  className: "clear-completed",
  onClick: compose(addAction, handleRemoveAllCompleted)
}, "Clear completed"));

// TODO:

const fail = s => {
  throw new Error(s);
};

const qs = (s, el) => el.querySelector(s) || fail(`${s} not found`);

const appNode = qs('.todoapp', document);
const appState = emptyApp;
const scheduler = newDefaultScheduler();
const [addAction, todoActions] = createAdapter();
const updateFilter = map(handleFilterChange, hashchange(window));
const actions = merge(todoActions, updateFilter);
const stateUpdates = skipRepeats(scan(runAction, appState, actions));
const viewUpdates = tap(rel => render(rel, appNode), map(View(addAction), stateUpdates));
runEffects(viewUpdates, scheduler);
//# sourceMappingURL=dist.mjs.map
