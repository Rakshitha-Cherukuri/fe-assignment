import { useNavigate } from "react-router-dom";
import { useTasks } from "../contexts/taskContext";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useAuth } from "../contexts/authContext";
import { useEffect } from "react";
import "./TaskListPage.css";

function TaskListPage() {
  const { tasks, markCompleted, currentFilter, setCurrentFilter, isLoading } = useTasks();
  const { user } = useAuth();
  const navigate = useNavigate();

  /**
   * redirect to login if not authenticated
   */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]); // runs when there is a change in user, navigate

  /**
   * to mark task as completed
   */
  const toggleTaskStatus = async (taskId: string) => {
    try {
      await markCompleted(taskId);
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  /**
   * to update the currently active filter
   */
  const handleFilterClick = (filter: string) => setCurrentFilter(filter);

  /**
   * filtered tasks to display based on the currently active filter
   */
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.status === "COMPLETED";
    if (currentFilter === "pending") return task.status === "PENDING";
    return true;
  });

  const userName = user?.username;

  if (isLoading) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading tasks...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div id="main-body">
        <div id="menu">
          <div id="title"> 
            <h1>{userName}'s Tasks</h1>
          </div>
          <div id="add-button">
            <button onClick={() => navigate('/task/new')}>Add Task</button>
          </div>
        </div>

        <div id="filter-chips">
          <button 
            id="filter-all" 
            className={`filter-chip${currentFilter === "all" ? "-active" : ""}`}
            onClick={() => handleFilterClick("all")}
          >
            All ({tasks.length})
          </button>
          <button 
            id="filter-completed" 
            className={`filter-chip${currentFilter === "completed" ? "-active" : ""}`}
            onClick={() => handleFilterClick("completed")}
          >
            Completed
          </button>
          <button 
            id="filter-pending" 
            className={`filter-chip${currentFilter === "pending" ? "-active" : ""}`}
            onClick={() => handleFilterClick("pending")}
          >
            Pending
          </button>
        </div>

        <div id="task-items">
            <ul>
              {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                <li key={task.taskId}>
                  <div id="task-name">
                    <span onClick={() => {
                      navigate(`/task/${task.taskId}`);
                    }}>
                      {task.title}
                    </span>
                  </div>
                  <div id="operations">
                    <input 
                      id="status-checkbox"
                      type="checkbox" 
                      checked={task.status === "COMPLETED"}
                      onChange={() => toggleTaskStatus(task.taskId)}
                      style = {{
                        paddingTop: "10px",
                      }}
                    />
                  </div>
                </li>
              )) :
              <div id="no-tasks-display">
                <p>No Tasks Found.</p>
              </div>
              }
            </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TaskListPage;