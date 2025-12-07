import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTasks } from "../contexts/taskContext";
import { useAuth } from "../contexts/authContext";
import { Priority } from "../enums/Priority";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import './SingleTaskPage.css';

function SingleTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [valid, setValid] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: Priority.LOW
  });

  useEffect(() => {
    if (id === "new") {
      setIsEditing(false);
      setValid(true);
      setErrorMessage("");
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: Priority.LOW
      });
    } else if (id) {
      const existingTask = tasks.find(task => task.taskId === id);

      if (existingTask) {
        const formattedDate = existingTask.dueDate 
          ? existingTask.dueDate.split('T')[0] 
          : "";
        setFormData({
          title: existingTask.title,
          description: existingTask.description || "",
          dueDate: formattedDate,
          priority: existingTask.priority
        });
        setIsEditing(true);
        setValid(true);
        setErrorMessage("");
      } else {
        setValid(false);
        setErrorMessage("This task doesn't exist or doesn't belong to you.");
      }
    }
  }, [id, tasks, user, navigate]);

  const saveTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }

    setIsSaving(true);

    try {
      if (isEditing && id) {
        await updateTask(id, {
          title: formData.title.trim(),
          description: formData.description.trim(),
          dueDate: formData.dueDate || undefined,
          priority: formData.priority
        });
      } else {
        await addTask({
          title: formData.title.trim(),
          description: formData.description.trim(),
          dueDate: formData.dueDate || undefined,
          priority: formData.priority
        });
      }
      navigate('/tasks');
    } catch (error: any) {
      alert(error.message || "Failed to save task");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsSaving(true);
      try {
        await deleteTask(id!);
        navigate('/tasks');
      } catch (error: any) {
        alert(error.message || "Failed to delete task");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/tasks');
  };

  return (
    <div>
      <Header /> 
      {
        valid ? 
          <div id="task-body">
            <div id="title">
              <h1>{isEditing ? "Task Details" : "New Task"}</h1>
              <button id="nav-button" onClick={() => navigate('/tasks')}>back</button>
            </div>
            <form onSubmit={saveTask}>
              <div className="input-field">
                <label htmlFor="task-title">Task Title</label> <br />
                <input
                  type="text"
                  id="task-title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  placeholder="Enter task title..."
                /><br />
              </div>

              <div className="input-field">
                <label htmlFor="task-description">Description</label> <br />
                <textarea
                  id="task-description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter task description (optional)..."
                /><br />
              </div>

              <div className="input-field">
                <label htmlFor="task-due-date">Due On: </label> <br />
                <input
                  type="date"
                  id="task-due-date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                /> <br />
              </div>

              <div className="input-field-priority">
                <label htmlFor="task-priority">Priority: </label>
                <select
                  id="task-priority"
                  name="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value as Priority})}
                  style={{ width:"120px", height: "45px"}}
                >
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
                <br />
              </div>

              <div id="buttons">
                <button id="cancel-button" type="button" onClick={handleCancel} disabled={isSaving}>
                  Cancel
                </button>
                {isEditing && (
                  <button 
                    type="button" 
                    onClick={handleDelete}
                    disabled={isSaving}
                    style={{ background: "#ff4444", color: "white" }}
                  >
                    Delete
                  </button>
                )}
                <button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : (isEditing ? "Update" : "Save")}
                </button>
              </div>
            </form>
          </div> 
          : 
          <div id="error-display">
            <p>{errorMessage}</p>
            <button 
              onClick={() => navigate('/tasks')}
              style={{"backgroundColor": "rgba(18, 128, 237, 1)", "margin": "20px 35px"}}
            >
              Back to Tasks
            </button>
          </div>
      }
      <Footer />
    </div>
  );
}

export default SingleTaskPage;