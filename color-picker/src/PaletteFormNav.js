import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import PaletteMetaForm from "./PaletteMetaForm";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const drawerWidth = 360;
const styles = (theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		flexDirection: "row",
		justifyContent: "space-between",
		height: "64px",
		alignItems: "center",
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
	},
	navBtns: {
		marginRight: "1rem",
	},

	button: {
		margin: "0 0.5rem",
	},
	link: {
		textDecoration: "none",
	},
});

class PaletteFormNav extends Component {
	state = {
		newPaletteName: "",
		formShowing: false,
	};

	handleChange = (evt) => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	showForm = () => {
		this.setState({ formShowing: true });
	};

	hideForm = () => {
		this.setState({ formShowing: false });
	};

	render() {
		const { classes, open, palettes, handleSubmit } = this.props;
		const { newPaletteName } = this.state;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					color="default"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.props.handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Create a Palette
						</Typography>
					</Toolbar>
					<div className={classes.navBtns}>
						<Link to="/" className={classes.link}>
							<Button
								variant="contained"
								color="secondary"
								className={classes.button}>
								Go Back
							</Button>
						</Link>
						<Button
							variant="contained"
							color="primary"
							onClick={this.showForm}
							className={classes.button}>
							Save
						</Button>
					</div>
				</AppBar>
				{this.state.formShowing && (
					<PaletteMetaForm
						palettes={palettes}
						handleSubmit={handleSubmit}
						hideForm={this.hideForm}
					/>
				)}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
