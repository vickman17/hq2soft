import React, { useState, useEffect } from "react";
import { IonContent, IonBadge, IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import Profile from "../components/Profile";
import BottomNav from "../components/BottomNav";
import wallets from "/svgnew/wallet.svg";
import jobs from "/svgnew/briefcase.svg";
import request from "/svgnew/request.svg";
import style from "./styles/Dashboard.module.css";

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const storedInfo = sessionStorage.getItem("Info");
  const info = storedInfo ? JSON.parse(storedInfo) : {};
  const profession = info?.category_id;


  const capitalizeFirstLetter = (name: string) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const Name = `${capitalizeFirstLetter(info?.first_name || "")} ${capitalizeFirstLetter(info?.last_name || "")}`;
  const qualification = info?.qualification || "N/A";

  useEffect(() => {
    const count = localStorage.getItem("unreadNotificationCount");
    setUnreadCount(count ? parseInt(count, 10) : 0);
  }, []);

  const handleNotificationPageOpen = () => {
    localStorage.setItem("unreadNotificationCount", "0");
    setUnreadCount(0);
    history.push("/notificationpage");
  };

  const startTour = () => {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        classes: "custom-tour",
        scrollTo: { behavior: "smooth", block: "center" },
      },
      useModalOverlay: true,
    });

    tour.on("complete", () => {
      localStorage.setItem("tourSeen", "true"); // Mark as seen only when completed
    });

    tour.addStep({
      title: "Welcome!",
      text: "Your name is displayed here.",
      attachTo: { element: ".name", on: "bottom" },
      buttons: [{ text: "Next", action: tour.next }],
    });

    tour.addStep({
      title: "Qualification",
      text: "Your certification tag appears here.",
      attachTo: { element: ".qualification", on: "bottom" },
      buttons: [{ text: "Next", action: tour.next }],
    });

    tour.addStep({
      title: "Earnings",
      text: "Check your earnings and payment details here.",
      attachTo: { element: ".earning", on: "bottom" },
      buttons: [{ text: "Next", action: tour.next }],
    });

    tour.addStep({
      title: "Requests",
      text: "Manage your service requests here.",
      attachTo: { element: ".request", on: "bottom" },
      buttons: [{ text: "Next", action: tour.next }],
    });

    tour.addStep({
      title: "Jobs",
      text: "View available jobs here.",
      attachTo: { element: ".jobs", on: "bottom" },
      buttons: [{ text: "Next", action: tour.next }],
    });

    // Delay to ensure BottomNav is loaded before adding the last step
    setTimeout(() => {
      const bottomNav = document.querySelector(".bottom-nav");
      if (bottomNav) {
        tour.addStep({
          title: "Bottom Navigation",
          text: "Use these icons to navigate quickly between different sections of the app.",
          attachTo: { element: ".bottom-nav", on: "top" },
          buttons: [{ text: "Finish", action: tour.complete }],
        });
      }
      tour.start();
    }, 1000);
  };

  useEffect(() => {
    const tourSeen = localStorage.getItem("tourSeen");
    if (!tourSeen) {
      startTour();
    }
  }, []);

  return (
    <IonPage>
      <IonContent className={style.content}>
        <div className={style.container}>
          <div className={style.dash}>
            <div className={style.profile + " profile-section"}>
              <Profile />
            </div>
            <div className={style.info}>
              <div className={style.name + " name"}>{Name}</div>
              <IonBadge className={style.work + " qualification"}>{qualification}</IonBadge>
            </div>
          </div>

          <div className={style.pick}>
            <div onClick={() => history.push("/earning")} className={style.item}>
              <div className={style.iconCont + " earning"}>
                <img src={wallets} className={style.icon} />
              </div>
              <div className={style.sub}>Earnings</div>
            </div>

            <div onClick={() => history.push("/request")} className={style.item}>
              <div className={style.iconCont + " request"}>
                <img src={request} className={style.icon} />
              </div>
              <div className={style.sub}>Requests</div>
            </div>

            <div onClick={() => history.push("/jobs")} className={style.item}>
              <div className={style.iconCont + " jobs"}>
                <img src={jobs} className={style.icon} />
              </div>
              <div className={style.sub}>Jobs</div>
            </div>
          </div>

          <div className={style.nextSection}>Recent activity</div>
          <div className={style.recent}>
            <img src="/assets/empty.png" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
