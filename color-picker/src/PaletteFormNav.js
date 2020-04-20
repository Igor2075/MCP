import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/PaletteFormNavStyles";
import PaletteMetaForm from "./PaletteMetaForm";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button } from "@material-ui/core";

class PaletteFormNav extends Component {
	state = {
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
		const {
			classes,
			open,
			palettes,
			handleSubmit,
			handleDrawerOpen,
		} = this.props;

		const { formShowing } = this.state;

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
							onClick={handleDrawerOpen}
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
				{formShowing && (
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
