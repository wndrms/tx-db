import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { dbService } from "fbase";
import { collection, doc, getDocs } from "@firebase/firestore";

function App() {
	const [AccountArray, setAccountArray] = useState([]);
	const [init, setinit] = useState(false);
	useEffect(() => {
		const query = async () => {
			const querySnapshot = await getDocs(collection(dbService, "Account"));
			var accountarray = [];
			querySnapshot.forEach((account) => {
				accountarray = [...accountarray, {
					id: account.id,
					...account.data()
					}];
			});
			setAccountArray(accountarray);
			setinit(true);
		}
		query();
	}, []);
  return (
    <div className="App">
	  {init && <AppRouter AccountArray={AccountArray}/>}
    </div>
  );
}

export default App;
