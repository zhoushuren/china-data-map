/**
 * Created by zhoujun on 2017/4/18.
 */

import createG2 from 'g2-react';
import {Stat} from 'g2';
import React from 'react'
import { connect } from 'dva';
import data from '../../../public/data.json'
import china from '../../../public/china.json'

class Province extends React.Component {
	constructor() {
		super()
		this.state = {
			width   : 1000 ,
			height  : 720 ,
			plotCfg : {
				margin : [10 , 100 , 50 , 120] ,
			} ,
			data :[]
		};
		super()
	}

	createdBg(chart){
		var map = [];
		var features = cmap.features;
		for(var i=0; i<features.length; i++) {
			var name = features[i].properties.name;
			map.push({
				"name": name
			});
		}

		chart.legend(false);
		chart.coord('map', {
			projection: 'albers',
			basic: [110, 0, 25, 47], // 指定投影方法的基本参数，[λ0, φ0, φ1, φ2] 分别表示中央经度、坐标起始纬度、第一标准纬度、第二标准纬度
			max: [16.573, -13.613], // 指定投影后最大的坐标点
			min: [-27.187, -49.739] // 指定投影后最小的坐标点
		});
		chart.tooltip({
			title: null
		});
		var bgView = chart.createView();
		bgView.source(map);
		bgView.tooltip(false);
		bgView.axis(false);
		bgView.polygon()
					 .position(Stat.map.region('name', cmap))
					 .color('name', function(val){
			if(val === 'China') {
				return '#c5c76b';
			} else {
				return '#d68f97';
			}
		})
					 .style({
			stroke: '#beffbe',
			lineWidth: 1
		});
	}

	createPoint(chart){
		const city = this.props.city;
		//console.log(city);
		//console.log(world);
		let arr = [
			{
				num: 200,
				province: 11,
				name: "北京",
				long: 116.46,
				lant: 39.92,
				value: 200
			}
		]
		let arrs = []
		city.forEach((c)=>{
			if(c.long != undefined){
				arrs.push(c);
			}
		})
		var pointView = chart.createView();
		pointView.source(arrs);
		pointView.point().position(Stat.map.location('long*lant'))
		.size('value', 24, 4)
							.color('#42ff45')
							.tooltip('name*value')
							.shape('circle')
							.style({
			shadowBlur: 10,
			shadowColor: '#fe3720'
		});
	}

	createMap(){
		const Map = createG2(chart => {
			this.createdBg(chart);
			this.createPoint(chart);

			chart.render();
		});
		return Map;
	}
	render() {
		const Maps = this.createMap()
		return (
			<div>
				<Maps
					data={this.state.data}
					width={this.state.width}
					height={this.state.height}
					plotCfg={this.state.plotCfg}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const {city} = state.data;
	return {city};
}

export default connect(mapStateToProps)(Province);