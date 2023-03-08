import {React, useState} from "react";
import { Link } from "react-router-dom";
import { dbService, storageService } from "fbase";
import { collection, addDoc, Timestamp } from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";

const Main = () => {
	const accountlist = [
		'0x098B716B8Aaf21512996dC57EB0615e2383E2f96',
		'0x59abf3837fa962d6853b4cc0a19513aa031fd32b',
		'0x9c9fb3100a2a521985f0c47de3b4598dafd25b01',
		'0x8d08aAd4b2BAc2bB761aC4781CF62468C9ec47b4'
	];
	return(
		<div>
			<h1>Hacker Wallet List</h1>
			{accountlist.map(a => {
				return <Link to={`/graph/${a}`}>{a}</Link>
			})}
		</div>
	);
}

export default Main;
