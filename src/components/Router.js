import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./Main";
import Graph from "./Graph";
import Manage from "./Manage";
import NetworkGraph from "./Test";
const AppRouter = ({AccountArray}) => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />}/>
				<Route path="/graph/:id" element={<Graph AccountArray={AccountArray}/>}/>
				<Route path="/account" element={<Manage AccountArray={AccountArray}/>}/>
				<Route path="/test" element={<NetworkGraph />}/>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;
