import { IonContent, IonHeader, IonIcon, IonPage } from "@ionic/react";
import React, { useState, useEffect } from "react";
import Back from "../components/Back";
import style from './styles/Earning.module.css';
import { eyeOutline, eyeOffOutline } from "ionicons/icons"; // Import both icons
import Header from "../components/Header";
import { useHistory } from "react-router";

const Earning: React.FC = () => {
  const [bal, setBal] = useState(0);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true); // State to toggle balance visibility
  const info = sessionStorage.getItem('Info');
  const [transactions, setTransactions] = useState([]);
  const parsed = info ? JSON.parse(info) : {};
  const empty = "/assets/empty.png";
  const ssp_id = parsed?.ssp_id;

  // Custom function to format the balance with commas
  const formatBalance = (balance: number) => {
    //return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`http://localhost/hq2sspapi/fetchBal.php?ssp_id=${ssp_id}`);
        const data = await response.json();
        setBal(response.ok ? data.balance : 0);
      } catch {
        setBal(0);
      }
    };
    fetchBalance();
  }, [ssp_id]);

    // Fetch transactions
    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const response = await fetch(`http://localhost/hq2sspapi/fetchTransactions.php?ssp_id=${ssp_id}`);
          const data = await response.json();
          if (data.success) {
            setTransactions(data.transactions);
            console.log()
            console.log(transactions)
          } else {
            setTransactions([]);
          }
        } catch {
          setTransactions([]);
        }
      };
      fetchTransactions();
    }, [ssp_id]);

  const history = useHistory();

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prevState) => !prevState);
  };

  return (
    <IonPage className={style.page}>
      <IonContent className={style.content}>
        <div className={style.earnings}>
          <Header title="" />
          <div className={style.acct}>
            <div className={style.earnHead}>Active Earnings</div>
            <div className={style.place}>
              <div className={style.bal}>
                {isBalanceVisible ? `₦ ${formatBalance(bal)}` : '₦ ••••'}
              </div>
              <div className={style.eye} onClick={toggleBalanceVisibility}>
                <IonIcon icon={isBalanceVisible ? eyeOutline : eyeOffOutline} />
              </div>
            </div>
          </div>

          <div className={style.option}>
            <div onClick={() => history.push('/withdrawal')} className={style.withdraw}>
              Withdraw
            </div>

            <div onClick={()=>history.push('/assets')} className={style.add}>
              Assets
            </div>
          </div>
        </div>
        <div className={style.transaction}>
          <div className={style.transHead}>Transaction activity</div>
          <div className={style.transactionList}>
          {transactions.length > 0 ? (
              <div className={style.transList}>
                {transactions.map((trans: any) => (
                  <li key={trans.transaction_reference} className={style.transItem}>
                    <div className={style.listHead}>
                      <div className={style.type}>
                        {trans.transaction_type}
                      </div>
                      <div className={style.amount}>
                        {/* {trans.transaction_type.toLowerCase() === "withdrawal" 
                          ? `- ₦${parseInt(trans.amount).toLocaleString()}` 
                          : `+ ₦${parseInt(trans.amount).toLocaleString()}`} */}
                      </div>
                    </div>
                    <div className={style.below}>
                      <div>
                          {trans.status}
                      </div>
                      <div>
                          {trans.transaction_date}
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            ) : (
              <div style={{textAlign: "center", color:"grey"}}>
                <div><img src={empty} /></div>
                <div className={style.noTransactions}>No transactions found.</div>
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Earning;
