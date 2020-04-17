import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import styles from "./styles/PaletteListStyles";
import MiniPalette from "./MiniPalette";

class PaletteList extends Component {
	goToPalette = (id) => {
		this.props.history.push(`/palette/${id}`);
	};
	render() {
		const { palettes, classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>Pick your fav</h1>
						<Link to="/palette/new">create palette</Link>
					</nav>
					<div className={classes.palettes}>
						{palettes.map((palette) => (
							<MiniPalette
								{...palette}
								handleClick={() => this.goToPalette(palette.id)}
								key={palette.paletteName}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(PaletteList);
