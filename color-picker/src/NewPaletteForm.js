import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/NewPaletteFormStyles";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import { arrayMove } from "react-sortable-hoc";
import DraggableColorList from "./DraggableColorList";
import seedColors from "./seedColors";

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20,
	};
	state = {
		open: true,
		colors: seedColors[0].colors,
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	addRandomColor = () => {
		const allColors = this.props.palettes.map((p) => p.colors).flat();
		let isDuplicate = true;
		let randColor;
		while (isDuplicate) {
			let rand = Math.floor(Math.random() * allColors.length);
			randColor = allColors[rand];
			isDuplicate = this.state.colors.some(
				(color) => color.name === randColor.name
			);
		}
		this.setState({
			colors: [...this.state.colors, randColor],
		});
	};

	addNewColor = (name, color) => {
		let newColor = {
			name: name,
			color: color,
		};
		this.setState({
			colors: [...this.state.colors, newColor],
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

	handleSubmit = (newPalette) => {
		let newPaletteObj = {
			paletteName: newPalette.paletteName,
			id: newPalette.paletteName.toLowerCase().replace(/ /g, "-"),
			colors: this.state.colors,
			emoji: newPalette.emoji,
		};
		this.props.savePalette(newPaletteObj);
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
		const { classes, maxColors, palettes } = this.props;

		const { open, colors } = this.state;

		const paletteIsFull = colors.length >= maxColors;

		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					palettes={palettes}
					handleSubmit={this.handleSubmit}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
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
					<div className={classes.container}>
						<Typography variant="h4" gutterBottom>
							Design Your Palette
						</Typography>
						<div className={classes.buttons}>
							<Button
								className={classes.button}
								variant="contained"
								color="secondary"
								onClick={this.clearPalette}>
								Clear Palette
							</Button>
							<Button
								className={classes.button}
								variant="contained"
								color="primary"
								onClick={this.addRandomColor}
								disabled={paletteIsFull}>
								{paletteIsFull ? "Palette is Full" : "Random Color"}
							</Button>
						</div>

						<ColorPickerForm
							paletteIsFull={paletteIsFull}
							addNewColor={this.addNewColor}
							colors={colors}
							palettes={palettes}
						/>
					</div>
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
