import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { IonContent, IonPage, IonToast } from "@ionic/react";
import style from "./styles/Signup.module.css";
import axios from "axios";

const Signup: React.FC = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone1: "",
    password: "",
    confirmpassword: "",
  });

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [toast, setToast] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>("");
  const [toastColor, setToastColor] = useState<string>("");

  useEffect(() => {
    document.body.style.fontFamily = "Varela Round, sans-serif";
    document.body.style.overflowX = "hidden";
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match before proceeding
    if (formData.password !== formData.confirmpassword) {
      setToast(true);
      setToastText("Passwords do not match.");
      return;
    }

    setIsSubmitting(true); // Disable the button and show loading state

    const dataToSend = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone1: formData.phone1,
      confirmpassword: formData.confirmpassword,
      password: formData.password,
    };

    try {
      const response = await axios.post("https://hq2soft.com/hq2sspapi/signup.php",
        JSON.stringify(dataToSend), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === "success") {
        setToastText("Signup Successful!");
        setToast(true);
        history.push("/login"); // Navigate to login page after successful signup
      } else {
        setToastText("Signup Failed: " + response.data.message);
        setToast(true);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setToastText("An error occurred during signup.");
      setToast(true);
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (formData.password !== formData.confirmpassword) {
      setConfirmPasswordError(true);
      setToast(true);
      setToastColor("danger")
      setToastText("Passwords do not match.");
    } else {
      setConfirmPasswordError(false);
    }
  };

  return (
    <IonPage className={style.page}>
      <IonContent className={style.info}>
      <div className={style.topCircle}>
        <div className={style.head}>
          <div style={{ fontSize: "50px" }}>SIGN UP</div>
          <div>Sign up as soft service provider today!</div>
        </div>
      </div>
        <form onSubmit={handleFormSubmit}>
          <div className={style.cont}>
            <div className={style.tab}>
              <div>
                <input
                  className={style.single}
                  required
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
            </div>
            <div className={style.tab}>
              <div>
                <input
                  className={style.single}
                  required
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className={style.tab}>
              <div>
                <input
                  className={style.single}
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className={style.tab}>
              <div>
                <input
                  className={style.single}
                  required
                  placeholder="Phone number"
                  value={formData.phone1}
                  onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                />
              </div>
            </div>
            <div className={style.tab}>
              <div>
                <input
                  className={style.single}
                  required
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
            <div className={style.tab}>
              <div>
                <input
                  className={`${style.single} ${confirmPasswordError ? style.error : ""}`}
                  required
                  placeholder="Confirm password"
                  type="password"
                  value={formData.confirmpassword}
                  onChange={(e) => setFormData({ ...formData, confirmpassword: e.target.value })}
                  onBlur={handleConfirmPasswordBlur}
                />
              </div>
            </div>
            <div className={style.butCont}>
              <button
                className={style.button}
                type="submit"
                disabled={isSubmitting || confirmPasswordError}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              Already a member?{" "}
              <span style={{ color: "#19fb04" }} onClick={() => history.push("/login")}>
                Login
              </span>
            </div>
          </div>
        </form>
        <IonToast isOpen={toast} position="top" color={toastColor} onDidDismiss={() => setToast(false)} duration={5000} message={toastText} />
      </IonContent>
    </IonPage>
  );
};

export default Signup;
