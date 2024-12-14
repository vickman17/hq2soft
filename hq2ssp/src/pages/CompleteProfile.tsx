import { IonPage, IonContent, IonFooter } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Back from "../components/Back";
import AutoType from "../components/AutoType";
import style from "./styles/CompleteProfile.module.css";
import axios from "axios";

interface Category {
  id: string;
  category_name: string;
}

interface Subcategory {
  id: string;
  subcategory_name: string;
}

const CompleteProfile: React.FC = () => {
  const stringArr = [
    "let's get you geared up!.",
    "",
    "Preparing your tools.",
    "",
    "No food for lazy man.",
    "",
    "Let's get working.",
    "",
    "Hustle mode activated.",
    "",
    "Time is money.",
  ];

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const API_BASE_URL = "http://localhost/hq2sspapi"; // Replace with your backend URL

  // Fetch categories
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/fetchCategory.php`)
      .then((response) => {
        console.log("Categories response:", response.data);
        if (Array.isArray(response.data)) {
          setCategories(response.data);
          console.log(response.data)
        } else {
          console.error("Categories response is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`${API_BASE_URL}/fetchSub.php?category_id=${selectedCategory}`)
        .then((response) => {
          console.log("Subcategories response:", response.data);
          if (Array.isArray(response.data)) {
            setSubcategories(response.data);
          } else {
            console.error("Subcategories response is not an array");
          }
        })
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
        });
    }
  }, [selectedCategory]);

  return(
    <IonPage className={style.page}>
      <IonContent className={style.content}>
        <div className={style.auto}>
          <AutoType strings={stringArr} typingSpeed={100} reverseSpeed={100} delay={1000} />
        </div>
        <div className={style.details}>
          <form>
            {/* Profession Category Dropdown */}
            <div className={style.single}>
              <select
                className={style.input}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>
                  {categories.length === 0 ? "Loading categories..." : "Select Profession Category"}
                </option>
                {Array.isArray(categories) &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
              </select>
            </div>
            {/* Skill Subcategories Dropdown */}
            <div className={style.tripple}>
              {Array(3)
                .fill("")
                .map((_, index) => (
                  <div className={style.col} key={index}>
                    <select className={style.input}>
                      <option value="">Select Skill</option>
                      {Array.isArray(subcategories) &&
                        subcategories.map((subcategory) => (
                          <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.subcategory_name}
                          </option>
                        ))}
                    </select>
                  </div>
                ))}
            </div>
            <div className={style.single}>
              <input type="text" className={style.input} placeholder="Residential Address" />
            </div>
            <div className={style.double}>
              <div className={style.col1}>
                <input type="text" className={style.input} placeholder="Work Address" />
              </div>
              <div className={style.col1}>
                <input type="text" className={style.input} placeholder="Other number" />
              </div>
            </div>
            <div className={style.butCont}>
              <div className={style.butCov}>
                <button style={{background:"red", color:"white"}} className={style.but}>Cancel</button>
              </div>
              <div className={style.butCov}>
                <button style={{background:"transparent", border:"1px solid white", color:"white"}} className={style.but}>Done</button>
              </div>
            </div>
          </form>
        </div>
      </IonContent>
      <IonFooter className={style.foot}>
        <div className={style.tag}>
            <p>&copy;Powered by Strive inc</p>
          </div>
      </IonFooter>
    </IonPage>
  );
};

export default CompleteProfile;
