import { Link } from "react-router-dom";
import { useAppSelector } from "state/store";

const HomePage = () => {
  const user = useAppSelector((state) => state.AuthSlice);
  const backgroundImageURL =
    "https://img.freepik.com/free-vector/bicycle-workshop-concept-illustration_114360-9200.jpg?w=2000&t=st=1689994515~exp=1689995115~hmac=062f066360b44e6d28f9f889930cdceb183f5029140ad21215ea60cadad52af7";
  const containerStyle = {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "90vh",
    backgroundImage: `url(${backgroundImageURL})`,
    backgroundSize: "cover",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "#FF6B6B",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginTop: "20px",
    cursor: "pointer",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div style={containerStyle}>
      <Link to={user.isAuthenticated ? "bookings" : "/signup"}>
        <button style={buttonStyle}>Get started</button>
      </Link>
    </div>
  );
};

export default HomePage;
