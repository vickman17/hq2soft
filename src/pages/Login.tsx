import { IonContent, IonPage, IonToast } from "@ionic/react";
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import axios from "axios";
import style from "./styles/Login.module.css";

const Login: React.FC = () => {
  const history = useHistory();

  // State for form data
  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  // State for login button
  const [isLoading, setIsLoading] = useState(false);
  // State for toast notification
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Disable button

    try {
      const response = await axios.post("https://www.globalbills.com.ng/hq2sspapi/login.php", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status === "success") {
        setToastMessage("Login successful");
        setShowToast(true);
        sessionStorage.setItem("Info", JSON.stringify(response.data.user));
        const profession = response.data.user.category_id;
        console.log(profession)


        if(profession === null){
            history.push("/completeprofile");
        }else{
            history.push("/dashboard");
        }
        
       
         // Redirect after toast
      } else {
        setToastMessage(response.data.message);
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("An error occurred during login.");
      setShowToast(true);
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false); // Re-enable button
    }
  };

  return (
    <IonPage>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        position="top"
      />
      <div className={style.topCircle}></div>
      <IonContent className={style.coontent}>
        <div className={style.head}>
          <div className={style.smallHead}>Ready to get your hands dirty?</div>
          <div className={style.bigHead}>Login</div>
        </div>
        <div className={style.cont}>
          <form onSubmit={handleSubmit}>
            <div className={style.input}>
              <input
                className={style.details}
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                placeholder="Email Address || Phone number"
                required
              />
            </div>
            <div className={style.input}>
              <input
                className={style.details}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </div>
            <div className={style.but}>
              <button
                className={style.login}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className={style.cap}>or continue with</div>
            <div className={style.but}>
              <button className={style.google} type="button">
                Google
              </button>
            </div>
            <div className={style.not}>
              Not a member?{" "}
              <span
                onClick={() => history.push("/signup")}
                style={{ color: "#19fb04", cursor: "pointer" }}
              >
                Signup
              </span>
            </div>
          </form>
        </div>
      </IonContent>
      <div className={style.bottomCircle}></div>
    </IonPage>
  );
};

export default Login;
