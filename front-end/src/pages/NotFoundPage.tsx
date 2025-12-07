import { useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "40px"
      }}>
        <h2 style={{ fontSize: "32px", margin: "20px 0", color: "#2c3e50" }}>
          Page Not Found
        </h2>
        <p style={{ fontSize: "18px", color: "#000000ff", marginBottom: "30px" }}>
          The page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate('/tasks')}
          style={{
            padding: "12px 30px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Go to Tasks
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;