import React from "react";
import image from "../../assets/image.png";
import { navigation } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
const Navigation = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens, redirecting to login)
    console.log("User logged out");
    navigate("/"); // Redirect to the homepage or login page
  };
  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-2 my-1">
          <img src={image} className="h-10 w-10"></img>
        </div>

        <div>
          {navigation.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 py-3 px-4 hover:bg-gray-200 rounded-full cursor-pointer"
              onClick={() =>
                item.title == "Profile"
                  ? navigate(`/profile/${5}`)
                  : navigate(item.path)
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-lg font-semibold">{item.title}</span>
            </div>
          ))}

          {/* i need to add a LOGOUT BUTTON here */}
          <div
            className="flex items-center gap-2 py-3 px-4 hover:bg-red-200 rounded-full cursor-pointer mt-4"
            onClick={handleLogout}
          >
            <span className="text-xl text-red-500">🚪</span>
            <span className="text-lg font-semibold text-red-500">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
