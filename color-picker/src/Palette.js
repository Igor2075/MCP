import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import "./Palette.css";

export default class Palette extends Component {
	state = {
		level: 500,
		format: "hex",
	};
	changeLevel = (level) => {
		this.setState({ level });
	};
	changeFormat = (val) => {
		this.setState({ format: val });
	};
	render() {
		const { level, format } = this.state;
		const { colors, paletteName, emoji, id } = this.props.palette;
		const colorBoxes = colors[level].map((color) => (
			<ColorBox
				background={color[format]}
				name={color.name}
				key={color.name}
				moreURL={`/palette/${id}/${color.id}`}
				showLink={true}
			/>
		));
		return (
			<div className="Palette">
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					handleChange={this.changeFormat}
					showSlider
				/>
				<div className="Palette-colors">{colorBoxes}</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}
