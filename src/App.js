import { Component } from "react";
import TodoList from "./TodoList";
import TodoAdd from "./TodoAdd";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";

const date1 = new Date(2021, 7, 19, 14, 5);
const date2 = new Date(2021, 7, 19, 15, 23);

const initialData = [
  {
    title: "Title1",
    desc: "Desc1",
    image: "",
    done: true,
    createdAt: date1.toLocaleDateString(),
    key: date1.getTime()
  },
  {
    title: "Title2",
    desc: "Desc2",
    image: "",
    done: false,
    createdAt: date2.toLocaleDateString(),
    key: date2.getTime()
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: initialData };
  }

  showMenu(evt) {
    evt.preventDefault();
    this.state((state) => ({ showMenu: !state.showMenu }))
  }

  setDone(key) {
    const deed = this.state.data.find((current) => current.key === key);
    deed.done = deed || false;
    this.setState((state) => ({}));
  }

  delete(key) {
    const newData = this.state.data.filter(
        (current) => current.key !== key
    );
    this.setState((state) => ({ data: newData }));
  }

  add(deed) {
    this.state.data.push(deed);
    this.setState((state) => ({}));
  }

  render() {
    return (
        <HashRouter>
          <nav className="navbar is-light">
            <div className="navbar-brand">
            <NavLink to="/" className={({ isActive }) => "navbar-item is-uppercase" + (isActive ? " is-active" : "")
            }>
                Todos
              </NavLink>
            </div>
            <div className="navbar-menu">
              <div className="navbar-start">
                <NavLink to="/add"
                className={({ isActive}) => "navbar-item " + (isActive ? "is-active" : "")}
                >
                Создать дело
                </NavLink>
              </div>
            </div>
          </nav>
          <main className="content px-6 mt-6">
            <Routes>
              <Route path="/" element={
                <TodoList list={this.state.data} 
                            setDone={this.setDone.bind(this)}
                            delete={this.delete.bind(this)} />
              }/>
              <Route path="/add" element={
                  <TodoAdd add={this.add.bind(this)}/>
              }/>
            </Routes>
          </main>
        </HashRouter>
    );
  }
}