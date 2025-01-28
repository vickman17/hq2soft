import React, { useState, useEffect } from "react";
import { IonContent, IonPage, IonModal, IonHeader, IonIcon, IonToast } from "@ionic/react";
import style from "./styles/Home.module.css";
import { useHistory } from "react-router";
import { lockClosedOutline, lockOpenOutline, atSharp, eyeOutline, eyeOffOutline, phonePortraitSharp } from "ionicons/icons";
// import facebook from "/assets/svg/facebook.svg";
// import google from "/assets/svg/google.svg";
import { Client as PusherPushNotifications } from '@pusher/push-notifications-web';


import axios from "axios";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLogo, setShowLogo] = useState(false); // State to control logo visibility
  const [modalContent, setModalContent] = useState<'login' | 'signup' | null>(null); // State to switch content in modal
  const history = useHistory();
  const [toast, setToast] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [toastColor, setToastColor] = useState<string>('');

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

  const closeModal = () => {
    if (showModal) {
      setShowModal(false);
      setShowLogo(false);
      console.log("close");
    }
  };

  const openModal = (content: 'login' | 'signup') => {
    setModalContent(content); // Set the content based on button clicked
    setShowModal(true);
    setShowLogo(true); // Show the logo when the modal is opened
    console.log("modal opened");
  };

  const signup = () => {
    setShowModal(false);
    setShowLogo(false);
    history.push('/signup');
  }

  const login = () => {
    openModal('login'); // Open modal with login content
  }

  /***********************************Login***********************************/
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


/******************************Get device token for push notification********************************/


const updateDeviceToken = (userId: string) => {  // Explicitly typing userId
  // Initialize Pusher Beams client
  const beamsClient = new PusherPushNotifications({
    instanceId: 'fef21ad9-18fb-4c2a-9bac-64eb6f197664',
  });

  // Start the Pusher Beams client
  beamsClient.start()
    .then(() => beamsClient.getDeviceId())  // Get the device token
    .then((deviceToken: string) => {  // Explicitly typing deviceToken
      console.log('Device token:', deviceToken);

      // Send device token to the server to update it in the database
      fetch('https://hq2soft.com/hq2sspapi/updateDeviceToken.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,  // User's ID
          deviceToken: deviceToken  // New device token
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log('Device token updated successfully');
          } else {
            console.error('Failed to update device token');
          }
        });
    })
    .catch((error: Error) => {  // Explicitly typing error
      console.error('Error retrieving device token:', error);
    });
};


/***************************Token function end**************************/
const LoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true); // Disable button

  try {
    // Ensure formData is sent as a JSON string
    const response = await axios.post(
      "https://hq2soft.com/hq2sspapi/login.php",
      JSON.stringify(formData), // Convert formData to JSON
      {
        headers: {
          "Content-Type": "application/json", // Ensure content type is JSON
        },
      }
    );

    if (response.data.status === "success") {
      setToastText("Login successful");
      setToast(true);
      sessionStorage.setItem("Info", JSON.stringify(response.data.user));

      const profession = response.data.user.category_id;
      const verified = response.data.user.numberVerified;

      // Determine route based on user data
      if (verified === null) {
        history.push("/otppage");
      } else if (profession === null) {
        history.push("/completeprofile");
      } else {
        history.push("/dashboard");
      }
    } else {
      setToastText(response.data.message);
      setToast(true);
    }
  } catch (error) {
    setToastText("Error occured");
    setToast(true);
    console.error("Login failed");
  } finally {
    setIsLoading(false); // Re-enable button
  }
};
  /************************END OF LOGIN ****************************************/

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [signData, setSignData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone1: "",
    password: "",
    confirmpassword: "",
  });

  const formattedPhone = signData.phone1?.startsWith("0") ? "+234" + signData.phone1.slice(1) : signData.phone1;


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match befnore proceeding
    if (signData.password !== signData.confirmpassword) {
      setToast(true);
      setToastText("Passwords do not match.");
      return;
    }

    const dataToSend = {
      first_name: signData.firstName,
      last_name: signData.lastName,
      email: signData.email,
      phone1: formattedPhone,
      confirmpassword: signData.confirmpassword,
      password: signData.password,
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
        openModal("login"); // Navigate to login page after successful signup
      } else {
        setToastText(response.data.message);
        setToast(true);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setToastText("An error occurred during signup.");
      setToast(true);
    } finally {
setIsLoading(false);// Re-enable the button after submission
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (signData.password !== signData.confirmpassword) {
      setConfirmPasswordError(true);
      setToast(true);
      setToastColor("danger")
      setToastText("Passwords do not match.");
    } else {
      setConfirmPasswordError(false);
    }
  };





  /********************SIGN UP ******************/
  const logo = "/assets/icon.png";

  return (
    <IonPage className={style.page}>
        <IonToast isOpen={toast} message={toastText}
           onDidDismiss={() => setToast(false)} 
           duration={2000}
           position="top"/>
      <IonContent className={style.videoContainer}>
        {/* Glass Container */}
        <div onClick={closeModal} className={style.glass}>
          {/* Conditionally Rendered Logo */}
          <div className={`${style.logo} ${showLogo ? style.showLogo : ""}`}>
            <img src={logo} alt="Logo" />
          </div>

          {/* Content */}
          <div className={style.write}>
            <div className={style.writeup}>
              Your Skills, Our Platform - Seamless Opportunities Await.
            </div>
            <div className={style.butCov}>
              <div className={style.action}>
                <button onClick={() => openModal('signup')} className={style.but}>
                  Sign Up
                </button>
              </div>
              <div className={style.action}>
                <button onClick={login} style={{ background: "white", color: "black" }} className={style.but}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </IonContent>

      {/* Modal */}
      <IonModal className={style.partialModal} isOpen={showModal} onDidDismiss={closeModal}>
        <IonContent className={style.content}>
          <div className={style.head}>
            <div className={style.smallHead}>{modalContent === 'login' ? 'Ready to get your hands dirty?' : 'Become an artisan today!'}</div>
            <div className={style.bigHead}>{modalContent === 'login' ? 'Login' : 'Sign Up'}</div>
          </div>
          <div className={style.cont}>
            {modalContent === 'login' ? (
              // Login Form
              <form autoComplete="off" onSubmit={LoginSubmit}>
                <div className={style.input}>
                  <div className={style.iconCont}>
                    <IonIcon className={style.icon} icon={atSharp} />
                  </div>
                  <input
                    className={style.details}
                    type="text"
                    name="emailOrPhone"
                    value={formData.emailOrPhone}
                    onChange={handleInputChange}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className={style.input}>
                  <div className={style.iconCont}>
                    <IonIcon className={style.icon} icon={lockClosedOutline} />
                  </div>
                  <div className={style.passCont}>
                  <input
                    className={style.passDetails}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder="Password"
                    required
                  />
                    <IonIcon
                      icon={showPassword ? eyeOffOutline : eyeOutline}
                      className={style.passwordToggleIcon}
                      onClick={togglePasswordVisibility}
                    />

                  </div>
                </div>
                <div className={style.forgot}>
                  Forgot Password?
                </div>
                
                <div className={style.loginCont}>
                  <button className={style.login} type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </div>
                <div className={style.not}>
                  Not a member?
                  <span
                    onClick={() => openModal('signup')}
                    style={{ color: "#19fb04", cursor: "pointer" }}
                  >
                    Signup
                  </span>
                </div>
              </form>
            ) : (
              <form autoComplete="off" onSubmit={handleFormSubmit}>
                <div className={style.name}>
                  <div className={style.inputs}>
                    <input
                      className={style.details}
                      style={{margin:"auto"}}
                      required
                      placeholder="First name"
                      value={signData.firstName}
                      onChange={(e) => setSignData({ ...signData, firstName: e.target.value })}
                    />
                  </div>
                  <div className={style.inputs}>
                    <input
                      className={style.details}
                      style={{margin:"auto"}}
                      required
                      placeholder="Last name"
                      value={signData.lastName}
                      onChange={(e) => setSignData({ ...signData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div className={style.input}>
                  <div className={style.iconCont}>
                    <IonIcon className={style.icon} icon={atSharp} />
                  </div>
                  <input
                    className={style.details}
                    required
                    placeholder="Email"
                    value={signData.email}
                    onChange={(e) => setSignData({ ...signData, email: e.target.value })}
                  />
                </div>
                <div className={style.input}>
                  <div className={style.iconCont}>
                    <IonIcon className={style.icon} icon={phonePortraitSharp} />
                  </div>
                  <input
                    className={style.details}
                    required
                    placeholder="Phone number"
                    value={signData.phone1}
                    onChange={(e) => setSignData({ ...signData, phone1: e.target.value })}
                  />
                </div>
                <div className={style.input}>
                  <div className={style.iconCont}>
                    <IonIcon className={style.icon} icon={lockOpenOutline} />
                  </div>
                  <div className={style.passCont}>
                  <input
                    className={style.passDetails}
                    required
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={signData.password}
                    onChange={(e) => setSignData({ ...signData, password: e.target.value })}
                  />
                  <IonIcon
                      icon={showPassword ? eyeOffOutline : eyeOutline}
                      className={style.passwordToggleIcon}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
                <div className={style.input}>
                  <div className={style.iconCont}>
                    <IonIcon className={style.icon} icon={lockClosedOutline} />
                  </div>
                  <div className={style.passCont}>
                  <input
                    className={`${style.passDetails} ${confirmPasswordError ? style.error : ""}`}
                    required
                    placeholder="Confirm password"
                    type={showPassword ? "text" : "password"}
                    value={signData.confirmpassword}
                    onChange={(e) => setSignData({ ...signData, confirmpassword: e.target.value })}
                    onBlur={handleConfirmPasswordBlur}
                  />
                  <IonIcon
                      icon={showPassword ? eyeOffOutline : eyeOutline}
                      className={style.passwordToggleIcon}
                      onClick={togglePasswordVisibility}
                    />
                  </div>  
                </div>
                <hr/>
                <div className={style.loginCont}>
                  <button className={style.login} type="submit" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign Up"}
                  </button>
                </div>
                
                <div className={style.not}>
                  Already an artisan? 
                  <span
                    onClick={() => openModal('login')}
                    style={{ color: "#19fb04", cursor: "pointer" }}
                  >
                    Login
                  </span>
                </div>
                <div className={style.term}>
                  By signing up you agree to our <span onClick={()=>history.push("/terms")} className={style.linkSpan}>Terms of Services</span> and <span className={style.linkSpan} onClick={()=>{history.push('/dataprivacy')}}>Data Privacy</span>
                </div>
              </form>
            )}
          </div>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Home;


