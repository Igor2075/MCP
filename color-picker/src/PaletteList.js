import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import styles from "./styles/PaletteListStyles";
import MiniPalette from "./MiniPalette";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

class PaletteList extends Component {
	goToPalette = (id) => {
		this.props.history.push(`/palette/${id}`);
	};
	render() {
		const { palettes, classes, removePalette } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 className={classes.title}>Pick your fav</h1>
						<Link to="/palette/new">
							<button classname={classes.btnLink}>create palette</button>
						</Link>
					</nav>

					<TransitionGroup className={classes.palettes}>
						{palettes.map((palette) => (
							<CSSTransition key={palette.id} classNames="fade" timeout={500}>
								<MiniPalette
									{...palette}
									handleClick={() => this.goToPalette(palette.id)}
									key={palette.paletteName}
									removePalette={removePalette}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(PaletteList);
