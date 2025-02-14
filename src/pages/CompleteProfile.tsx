import {
  IonPage,
  IonContent,
  IonFooter,
  IonIcon,
  IonList,
  IonRadioGroup,
  IonLabel,
  IonRadio,
  IonItem,
  IonToast
} from "@ionic/react";
import { checkmarkOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./styles/CompleteProfile.module.css";
import welcome from "/assets/welcome.jpeg";
import { useHistory } from "react-router";

interface Category {
  id: string;
  category_name: string;
}

interface Subcategory {
  id: string;
  subcategory_name: string;
}

const CompleteProfile: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(["", "", ""]);
  const [qualification, setQualification] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const userData = JSON.parse(sessionStorage.getItem("Info") || "{}");
  const sspId =  userData?.ssp_id;
  const [toast, setToast] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>("");
  const history = useHistory();

  const API_BASE_URL = "https://hq2soft.com/hq2sspapi";

  const stepTitles = ["Skills", "Address", "Onboard"];

  useEffect(()=>{
    document.body.style.fontFamily = "Rubik, san serif";
  },[])

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/fetchCategory.php`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Categories response is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`${API_BASE_URL}/fetchSub.php?category_id=${selectedCategory}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setSubcategories(response.data);
          } else {
            console.error("Subcategories response is not an array");
          }
        })
        .catch((error) => {
          setToast(true);
          setToastText("Check your internet connect!")
        });
    }
  }, [selectedCategory]);

  const handleNextStep = () => {
    // Validate inputs before proceeding to the next step
    if (currentStep === 0) {
      // Ensure category and subcategories are selected
      if (!selectedCategory || selectedSubcategories.some(sub => !sub)) {
        setToast(true);
        setToastText("Please select a profession and all skills.");
        return;
      }
    }

    if (currentStep === 1) {
      // Ensure all address fields are filled
      if (!selectedState || !selectedLga || !selectedWorkState || !selectedWorkLga) {
        console.log(`${selectedState} || ${selectedLga} || ${selectedWorkState} || ${selectedWorkLga}`)
        setToast(true)
        setToastText("Please fill in all address fields.");
        console.log
        return;
      }
    }

    if (currentStep < stepTitles.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = {
      selectedCategory,
      selectedSubcategories,
      qualification,
      selectedLga,
      selectedState,
      selectedWorkLga,
      selectedWorkState,
      residentialSuite,
      workSuite,
      sspId,
    };
  
    axios
      .post(`${API_BASE_URL}/completeProfile.php`, formData)
      .then((response) => {
        const { success, message, ssp } = response.data;
  
        if (success) {
          setToast(true);
          setToastText("Onboarding successful!");
  
          // Save updated SSP data to sessionStorage
          if (ssp) {
            sessionStorage.setItem("Info", JSON.stringify(ssp));
            console.log("saved");
            console.log(ssp);
          }
  
          history.push("/dashboard");

          // Redirect after update
        } else {
          setToast(true);
          setToastText(message || "Failed to save profile. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error saving profile:", error);
        setToast(true);
        setToastText("Failed to save profile. Please try again.");
      });
  };
  

  /*******************location ************************/
  const [states, setStates] = useState<string[]>([]); // Stores list of states
  const [lgas, setLgas] = useState<string[]>([]); // Stores list of LGAs for residential
  const [workLgaList, setWorkLgaList] = useState<string[]>([]); // Stores list of LGAs for work address
  
  const [selectedState, setSelectedState] = useState<string>(''); // Stores selected state (residential)
  const [selectedLga, setSelectedLga] = useState<string>(''); // Stores selected LGA (residential)
  const [selectedWorkState, setSelectedWorkState] = useState<string>(''); // Stores selected state (work)
  const [selectedWorkLga, setSelectedWorkLga] = useState<string>(''); // Stores selected LGA (work)
  
  const [loadingStates, setLoadingStates] = useState<boolean>(true); // State for states loading
  const [loadingLgas, setLoadingLgas] = useState<boolean>(false); // State for LGAs loading (residential)
  const [loadingWorkLgas, setLoadingWorkLgas] = useState<boolean>(false); // State for work LGAs loading

  const [residentialSuite, setResidentialSuite] = useState<string>(''); // State for residential suite input
const [workSuite, setWorkSuite] = useState<string>(''); // State for work suite input

const handleResidentialSuiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setResidentialSuite(e.target.value); // Update state for residential suite
};

const handleWorkSuiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setWorkSuite(e.target.value); // Update state for work suite
};
  
  // Fetch states from API
  const getStatesFromApi = async () => {
    try {
      const response = await fetch('https://nga-states-lga.onrender.com/fetch');
      const json = await response.json();
      return json || []; // Ensure empty array if no states
    } catch (error) {
      setToast(true)
      setToastText('Check your internet connection!');
      return []; // Return an empty array in case of error
    }
  };
  
  // Fetch all states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      const states = await getStatesFromApi();
      setStates(states); // Set the states
      setLoadingStates(false); // Stop the loading indicator
    };
  
    fetchStates();
  }, []);
  
  // Fetch LGAs for residential address when a state is selected
  useEffect(() => {
    if (selectedState) {
      const fetchLgas = async () => {
        setLoadingLgas(true); // Start loading indicator for residential LGAs
        try {
          const response = await fetch(`https://nga-states-lga.onrender.com/?state=${selectedState}`);
          const json = await response.json();
          setLgas(json || []); // Ensure empty array if no LGAs
        } catch (error) {
          setToast(true)
          setToastText('Check your internet connection!');
          setLgas([]); // Ensure empty array if error occurs
        } finally {
          setLoadingLgas(false); // Stop the loading indicator for residential LGAs
        }
      };
  
      fetchLgas();
    } else {
      setLgas([]); // Clear LGAs when no state is selected for residential address
    }
  }, [selectedState]);
  
  // Fetch LGAs for work address when a work state is selected
  useEffect(() => {
    if (selectedWorkState) {
      const fetchWorkLgas = async () => {
        setLoadingWorkLgas(true); // Start loading indicator for work LGAs
        try {
          const response = await fetch(`https://nga-states-lga.onrender.com/?state=${selectedWorkState}`);
          const json = await response.json();
          setWorkLgaList(json || []); // Ensure empty array if no LGAs
        } catch (error) {
          setToast(true)
          setToastText('Check your internet connection!');
          setWorkLgaList([]); // Ensure empty array if error occurs
        } finally {
          setLoadingWorkLgas(false); // Stop the loading indicator for work LGAs
        }
      };
  
      fetchWorkLgas();
    } else {
      setWorkLgaList([]); // Clear LGAs when no work state is selected
    }
  }, [selectedWorkState]);
// ////////////////////////////////////////////////////////////////////////////////////////////






  /**************************** ******************************/

  return (
    <IonPage className={style.page}>
      <IonContent className={style.content}>
        <div className={style.stepIndicator}>
          {stepTitles.map((title, index) => (
            <div key={index} className={style.step}>
              <div
                className={`${style.circle} ${
                  index <= currentStep ? style.active : ""
                }`}
              >
                {index < currentStep ? (
                  <IonIcon icon={checkmarkOutline} className={style.checkIcon} />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`${style.stepTitle} ${
                  index === currentStep ? style.activeTitle : ""
                }`}
              >
                {title}
              </span>
              {/* Line connecting steps */}
              {index < stepTitles.length - 1 && (
                <div
                  className={`${style.line} ${
                    index < currentStep ? style.activeLine : ""
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
  {currentStep === 0 && (
    <div>
      <div className={style.head}>Tell us about your skills</div>
      <div className={style.cont}>
        <div className={style.single}>
          <fieldset className={style.field}>
            <legend className={style.legend}>Select Profession</legend>
            <select
              className={style.input}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option className={style.selectPlace} value="" disabled hidden>
                {categories.length === 0
                  ? "Loading categories..."
                  : "Choose profession"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </fieldset>
        </div>
        <div className={style.tripple}>
          {selectedSubcategories.map((_, index) => (
            <div className={style.col} key={index}>
              <fieldset className={style.field}>
                <legend className={style.legend}>Skill {index + 1}</legend>
                <select
                  className={style.input}
                  value={selectedSubcategories[index]}
                  onChange={(e) => {
                    const updatedSubcategories = [...selectedSubcategories];
                    updatedSubcategories[index] = e.target.value;
                    setSelectedSubcategories(updatedSubcategories);
                  }}
                >
                  <option value="">Choose skill</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.subcategory_name}>
                      {subcategory.subcategory_name}
                    </option>
                  ))}
                </select>
              </fieldset>
            </div>
          ))}
        </div>
        <div className={style.qualification}>
          <fieldset className={style.field}>
            <legend className={style.legend}>Qualification</legend>
            <IonList lines="none">
              <IonRadioGroup
                value={qualification} // Binds the current state value
                onIonChange={(e) => setQualification(e.detail.value)} // Updates the state on change
              >
                <IonItem>
                  <IonLabel>Academic</IonLabel>
                  <IonRadio className={style.check} id="academic" slot="start" value="academic" />
                </IonItem>
                <IonItem>
                  <IonLabel>Verified</IonLabel>
                  <IonRadio className={style.check} slot="start" value="verified" />
                </IonItem>
                <IonItem>
                  <IonLabel>Certified</IonLabel>
                  <IonRadio className={style.check} slot="start" value="certified" />
                </IonItem>
              </IonRadioGroup>
              </IonList>
          </fieldset>
        </div>
      </div>
    </div>
  )}
  {currentStep === 1 && (
       <div>
       <div className={style.head}>Fill your address details below</div>
       <div className={style.Cont}>
         <div className={style.smallHead}>Residential Address</div>
         <div className={style.double}>
           <div className={style.fieldCol}>
             <fieldset className={style.field}>
               <legend className={style.legend}>State</legend>
               <select
                 id="state"
                 value={selectedState}
                 className={style.input}
                 onChange={(e) => setSelectedState(e.target.value)}
               >
                 <option value="" hidden>--Choose a State--</option>
                 {loadingStates ? (
                   <option disabled>Loading States...</option>
                 ) : (
                   states.length > 0 ? (
                     states.map((state, index) => (
                       <option key={index} value={state}>{state}</option>
                     ))
                   ) : (
                     <option disabled>No states available</option>
                   )
                 )}
               </select>
             </fieldset>
           </div>
           <div className={style.fieldCol}>
             <fieldset className={style.field}>
               <legend className={style.legend}>LGA</legend>
               <select className={style.input} id="lga"
                 disabled={!selectedState || loadingLgas}
                 onChange={(e) => setSelectedLga(e.target.value)}>
                 <option value="" hidden>--Choose an LGA--</option>
                 {loadingLgas ? (
                   <option disabled>Loading LGAs...</option>
                 ) : (
                   lgas.length > 0 ? (
                     lgas.map((lga, index) => (
                       <option key={index} value={lga}>{lga}</option>
                     ))
                   ) : (
                     <option disabled>No LGAs available</option>
                   )
                 )}
               </select>
             </fieldset>
           </div>
         </div>
         <div className={style.single}>
           <fieldset className={style.field}>
             <legend className={style.legend}>Suite</legend>
             <input type="text" 
              value={residentialSuite} 
              onChange={handleResidentialSuiteChange}
             className={style.input} />
           </fieldset>
         </div>
       </div>
   
       <div className={style.Cont}>
         <div className={style.smallHead}>Work Address</div>
         <div className={style.double}>
           <div className={style.fieldCol}>
             <fieldset className={style.field}>
               <legend className={style.legend}>State</legend>
               <select
                 id="work-state"
                 value={selectedWorkState}
                 className={style.input}
                 onChange={(e) => setSelectedWorkState(e.target.value)}
               >
                 <option value="" hidden>--Choose a State--</option>
                 {loadingStates ? (
                   <option disabled>Loading States...</option>
                 ) : (
                   states.length > 0 ? (
                     states.map((workState, index) => (
                       <option key={index} value={workState}>{workState}</option>
                     ))
                   ) : (
                     <option disabled>No states available</option>
                   )
                 )}
               </select>
             </fieldset>
           </div>
           <div className={style.fieldCol}>
             <fieldset className={style.field}>
               <legend className={style.legend}>LGA</legend>
               <select className={style.input} id="work-lga"
                 disabled={!selectedWorkState || loadingWorkLgas}
                 onChange={(e) => setSelectedWorkLga(e.target.value)}>
                 <option value="" hidden>--Choose an LGA--</option>
                 {loadingWorkLgas ? (
                   <option disabled>Loading LGAs...</option>
                 ) : (
                   workLgaList.length > 0 ? (
                     workLgaList.map((workLga, index) => (
                       <option key={index} value={workLga}>{workLga}</option>
                     ))
                   ) : (
                     <option disabled>No LGAs available</option>
                   )
                 )}
               </select>
             </fieldset>
           </div>
         </div>
         <div className={style.single}>
           <fieldset className={style.field}>
             <legend className={style.legend}>Suite</legend>
             <input type="text" className={style.input}
                value={workSuite} 
              onChange={handleWorkSuiteChange}
             />
           </fieldset>
         </div>
       </div>
     </div>
  )}
  {currentStep === 2 && (
    <div>
      <div className={style.vector}>
        <img src="/svgnew/welcome.svg" />
      </div>
      <div className={style.welcome}>Welcome aboard, Artisan!</div>
    </div>
  )}
  <div className={style.butCont}>
    {currentStep < 2 && (
      <button
        type="button"
        className={style.but}
        onClick={handlePreviousStep}
      >
        Previous
      </button>
    )}
    {currentStep < stepTitles.length - 1 ? (
      <button
        type="button"
        className={style.nextBut}
        onClick={handleNextStep}
      >
        Next
      </button>
    ) : (
      <div></div>
    )}
  </div>
</form>
<IonToast isOpen={toast} message={toastText} duration={3000} onDidDismiss={()=>setToast(false)} />

      </IonContent>
    </IonPage>
  );
};

export default CompleteProfile;
