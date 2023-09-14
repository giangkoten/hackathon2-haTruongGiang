import React, { useEffect, useState } from "react";
import axios from "axios";
function HomePage() {
  const [tasks, setTasks] = useState([]);
  const loadTasks = () => {
    axios
      .get("http://localhost:8080/api/v1/todos")
      .then((res) => setTasks(res.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadTasks();
  }, []);
  const unCompleteTask = tasks.filter((e) => e.status == 1);
  const completeTask = tasks.filter((e) => e.status == 0);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/v1/todos/${id}`)
      .then((res) => loadTasks())
      .catch((err) => console.log(err));
  };
  const [createTask, setCreateTask] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/v1/todos`, { name: createTask })
      .then((res) => {
        loadTasks();
        alert("Create success");
      })
      .catch((err) => console.log(err));
  };

  const handleComplete = (id) => {
    console.log(id);
    axios
      .patch(`http://localhost:8080/api/v1/todos/${id}`, { status: 0 })
      .then((res) => loadTasks())
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <h1>TODOLIST</h1>
      <div className="row">
        <div className="col-6">
          <h2>Uncompleted Tasks</h2>
          {unCompleteTask.map((e, i) => (
            <ul>
              <li key={i}>
                <span>{e.task_name}</span>
                <span>
                  <button onClick={() => handleComplete(e.task_id)}>
                    hoàn thành
                  </button>
                  <button>xóa</button>
                </span>
              </li>
            </ul>
          ))}
        </div>
        <div className="col-6">
          <h2>Completed Tasks</h2>
          {completeTask.map((e, i) => (
            <ul>
              <li key={i}>
                <span>{e.task_name}</span>
                <span>
                  <button>hoàn thành</button>
                  <button onClick={() => handleDelete(e.task_id)}>xóa</button>
                </span>
              </li>
            </ul>
          ))}
        </div>
        <div className="btn">
          <button
            className="add-btn btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Thêm công việc mới
          </button>
        </div>
      </div>
      <>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Create Task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="createTask"
                      value={createTask}
                      onChange={(e) => setCreateTask(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default HomePage;
