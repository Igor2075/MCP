import React, { Component } from "react";
import clsx from "clsx";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button, colors } from "@material-ui/core";
import { arrayMove } from "react-sortable-hoc";
import DraggableColorList from "./DraggableColorList";
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
		justifyContent: "spaceBetween",
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
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		height: "calc(100vh - 64px)",
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
});

class NewPaletteForm extends Component {
	state = {
		open: true,
		currentColor: "steelblue",
		colors: [...this.props.palettes[0].colors],
		newColorName: "",
		newPaletteName: "",
	};

	componentDidMount() {
		ValidatorForm.addValidationRule("isNameUnique", (value) =>
			this.state.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule("isColorUnique", (value) =>
			this.state.colors.every(
				({ color }) =>
					color.toLowerCase() !== this.state.currentColor.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
			this.props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	updateCurrentColor = (color) => {
		this.setState({ currentColor: color.hex });
	};

	addRandomColor = () => {
		const allColors = this.props.palettes.map((p) => p.colors).flat();
		const rand = Math.floor(Math.random() * allColors.length);
		this.setState({
			newColorName: allColors[rand].name,
			currentColor: allColors[rand].color,
		});
		this.addNewColor();
	};

	addNewColor = () => {
		let newColor = {
			name: this.state.newColorName,
			color: this.state.currentColor,
		};
		this.setState({
			colors: [...this.state.colors, newColor],
			newColorName: "",
		});
	};

	removeColor = (name) => {
		const filteredPalette = this.state.colors.filter(
			(color) => color.name.toLowerCase() !== name.toLowerCase()
		);
		this.setState({ colors: [...filteredPalette] });
	};

	handleChange = (evt) => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	handleSubmit = () => {
		let newPalette = {
			paletteName: this.state.newPaletteName,
			id: this.state.newPaletteName.toLowerCase().replace(/ /g, "-"),
			colors: this.state.colors,
		};
		this.props.savePalette(newPalette);
		this.props.history.push("/");
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex),
		}));
	};

	clearPalette = () => {
		this.setState({ colors: [] });
	};

	render() {
		const { classes, theme } = this.props;

		const { open, currentColor, colors, newColorName } = this.state;

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
							onClick={this.handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Persistent drawer
						</Typography>
						<ValidatorForm onSubmit={this.handleSubmit}>
							<TextValidator
								value={this.state.newPaletteName}
								name="newPaletteName"
								onChange={this.handleChange}
								validators={["required", "isPaletteNameUnique"]}
								errorMessages={[
									"this field is required",
									"Palette Name is already in use",
								]}
							/>
							<Button variant="contained" color="primary" type="onSubmit">
								Save Palette
							</Button>
						</ValidatorForm>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<Typography variant="h4">Design Your Palette</Typography>
					<div>
						<Button
							variant="contained"
							color="secondary"
							onClick={this.clearPalette}>
							Clear Palette
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={this.addRandomColor}>
							Random Color
						</Button>
					</div>

					<ChromePicker
						color={currentColor}
						onChangeComplete={(newColor) => this.updateCurrentColor(newColor)}
					/>
					<ValidatorForm onSubmit={this.addNewColor}>
						<TextValidator
							onChange={this.handleChange}
							value={newColorName}
							name="newColorName"
							validators={["required", "isNameUnique", "isColorUnique"]}
							errorMessages={[
								"this field is required",
								"Name is already in use",
								"Color is already part of this palette",
							]}
						/>
						<Button
							variant="contained"
							color="primary"
							style={{ backgroundColor: currentColor }}
							type="submit">
							Add Color
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open,
					})}>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={colors}
						removeColor={this.removeColor}
						axis="xy"
						onSortEnd={this.onSortEnd}
					/>
				</main>
			</div>
		);
	}
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
