import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import { dbService } from "fbase";
import { collection, query, doc, getDocs, where, updateDoc } from "@firebase/firestore";

const style = {
	height: "90vh",
	width: "100%"
};

const Graph = ({AccountArray}) => {
	const [transactions, settransactions] = useState([]);
	const [nodes, setnodes] = useState([]);
	const [links, setlinks] = useState([]);
	const [option, setoption] = useState();
	let { id } = useParams();
	console.log(id);
	console.log(AccountArray);
	const categories = [
		{'name': 'unknown', 'color': '#808080'}, 
		{'name': 'Exploiter', 'color':'#FF0000'}, 
		{'name': 'Second Exploiter', 'color': '#800000'}, 
		{'name': 'Third Exploiter', 'color': '#FFFF00'}, 
		{'name': 'Fourth Exploiter', 'color': '#808000'},
		{'name': 'Contract', 'color': '#000080'}, 
		{'name': 'Exchange', 'color': '#008000'}];
	useEffect(() => {
		const qset = async () => {
			const q = query(collection(dbService, "transaction"), where("case", "==", id));
			const querySnapshot = await getDocs(q);
			//const querySnapshot = await getDocs(collection(dbService, "transaction"));
			var tx_Array = [];
			let nodes = [];
			let links = [];
			var from_id = 0;
			var to_id = 0;
			var data = {
				"nodes":[],
				"links":[]
			}
			querySnapshot.forEach((doc) => {
				tx_Array = [...tx_Array, {
					hash: doc.id,
					...doc.data()
				}];
				if(!data.nodes.find((a) => a.name == doc.data().from)){
					const ind = AccountArray.findIndex(a => a.id.toLowerCase() == doc.data().from);
					console.log(doc.data().from)
					console.log(ind)
					if(ind == -1){
						var type = 'unknown';
					}
					else{
						var type = AccountArray[ind].type
					}
					console.log(type)
					var ind2 = categories.findIndex(a => a.name == type);
					var color = categories[ind2].color;
					console.log(doc.data().from, ind, type, ind2, color);
					data.nodes = [...data.nodes, {
						"name": doc.data().from,
						"itemStyle": {
							"color": color
						}
					}];
				} else if(!data.nodes.find((a) => a.name == doc.data().to)){
					const ind = AccountArray.findIndex(a => a.id.toLowerCase() == doc.data().to);
					if(ind == -1){
						var type = 'unknown';
					}
					else{
						var type = AccountArray[ind].type
					}
					var ind2 = categories.findIndex(a => a.name == type);
					var color = categories[ind2].color;
					console.log(doc.data().to, ind, type, ind2, color);
					data.nodes = [...data.nodes, {
						"name": doc.data().to,
						"itemStyle": {
							"color": color
						}
					}];
				}
				if(!data.links.find((a) => a.source == doc.data().from && a.target == doc.data().to)){
					data.links = [...data.links, {"source": doc.data().from, "target": doc.data().to, "value": doc.data().value}]
				} else{
					const index = data.links.findIndex(a => a.source == doc.data().from && a.target == doc.data().to);
					data.links[index] = {...data.links[index], "value": data.links[index].value + doc.data().value};
				}
			});
			console.log(data);
			settransactions(tx_Array);
			let tx_option  = {
				title: {
					text : 'Money Laundering Map',
					subtext: 'Default layout',
					top: 'bottom',
					left: 'right'
				},
				tooltip: {
					trigger: 'item',
					triggerOn: 'mousemove'
				},
				legend: {
					data: categories
				},
				series: [
					{
						name: 'Money Laundering',
						type: 'sankey',
						layout: 'force',
						//edgeSymbole: ['circle', 'arrow'],
						//edgeSymboleSize: 100,
						data: data.nodes,
						links: data.links,
						emphasis: {
							focus: 'adjacency'
						},
						lineStyle: {
							color: 'gradient',
							curveness: 0.5
						}
					}
				]
			};
			setoption(tx_option)
		}
		qset();
	}, []);
	return(
		<div>
			{option && (
				<ReactEcharts option={option} style={style} className="pie-chart" />
			)}
		</div>
	)
}

export default Graph;
