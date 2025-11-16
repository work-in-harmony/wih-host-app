import { useContext } from "react";
import  Logo  from "AuthApp/Logo";
import { ThemeContext } from "AuthApp/ThemeContext";

export default function LoadingPage(props) {
  
  const { theme, toggleTheme } = useContext(ThemeContext);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: theme === "dark" ? "#181818" : "#ffffff",
  };

  // theme-based spinner style
  const spinnerStyle = {
    width: "50px",
    height: "50px",
    border: "6px solid " + (theme === "dark" ? "#353535" : "#f3f3f3"),
    borderTop: "6px solid " + (theme === "dark" ? "#ececec" : "#3498db"),
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div>
      <div style={containerStyle}>
        {/* ✅ Your Logo on top */}
        <Logo />

        {/* ✅ Inline Spinner */}
        <div style={spinnerStyle}></div>
      </div>

      <style>
        {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
      </style>
    </div>
  );
}
