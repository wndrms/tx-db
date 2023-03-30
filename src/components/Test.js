import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NetworkGraph = () => {
	const svgRef = useRef(null);

	useEffect(() => {
		const svg = d3.select(svgRef.current);
		const nodes = [
			{ id: 1, label: 'Node 1' },
			{ id: 2, label: 'Node 2' },
			{ id: 3, label: 'Node 3' },
			{ id: 4, label: 'Node 4' },
		];
		const links = [
			{ source: 1, target: 2 },
			{ source: 2, target: 3 },
			{ source: 3, target: 4 },
			{ source: 4, target: 1 },
		];
		const simulation = d3.forceSimulation(nodes)
			.force('link', d3.forceLink(links).id(d => d.id))
			.force('charge', d3.forceManyBody())
			.force('center', d3.forceCenter(400, 300));
		const link = svg.append('g')
			.selectAll('line')
			.data(links)
			.join('line');
		const node = svg.append('g')
			.selectAll('circle')
			.data(nodes)
			.join('circle')
			.attr('r', 20)
			.call(drag(simulation));
		node.append('title')
			.text(d => d.label);
		simulation.on('tick', () => {
			link.attr('x1', d => d.source.x)
			.attr('y1', d => d.source.y)
			.attr('x2', d => d.target.x)
			.attr('y2', d => d.target.y);
		node
			.attr('cx', d => d.x)
			.attr('cy', d => d.y)
		});

		function drag(simulation) {
			function dragstarted(event) {
				if(!event.active) simulation.alphaTarget(0.3).restart();
				event.subject.fx = event.subject.x;
				event.subject.fy = event.subject.y;
			}
			function dragged(event) {
				event.subject.fx = event.x;
				event.subject.fy = event.y;
			}
			function dragended(event) {
				if(!event.active) simulation.alphaTarget(0);
				event.subject.fx = null;
				event.subject.fy = null;
			}

			return d3.drag()
				.on('start', dragstarted)
				.on('drag', dragged)
				.on('end', dragended);
		}
	}, []);

	return (
		<>
			<svg ref={svgRef} width="800" height="600" />
		</>
	);
};

export default NetworkGraph;
