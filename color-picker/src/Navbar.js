import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "rc-slider/assets/index.css";
import styles from "./styles/NavbarStyles";
import { withStyles } from "@material-ui/core/styles";
import Slider from "rc-slider";

class Navbar extends Component {
	state = {
		format: "hex",
		open: false,
	};
	handleChange = (e) => {
		this.setState({ format: e.target.value, open: true });
		this.props.handleChange(e.target.value);
	};
	closeSnackbar = () => {
		this.setState({
			open: false,
		});
	};
	render() {
		const { level, changeLevel, showSlider, classes } = this.props;
		const { format } = this.state;
		return (
			<header className={classes.Navbar}>
				<div className={classes.logo}>
					<Link to="/">colorpicker</Link>
				</div>
				{showSlider && (
					<div>
						<span>Level: {level}</span>
						<div className={classes.slider}>
							<Slider
								defaultValue={level}
								min={100}
								max={900}
								step={100}
								onAfterChange={changeLevel}
							/>
						</div>
					</div>
				)}

				<div className={classes.selectCcontainer}>
					<Select value={format} onChange={this.handleChange}>
						<MenuItem value="hex">HEX - #ffffff</MenuItem>
						<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
					open={this.state.open}
					autoHideDuration={2000}
					onClose={this.closeSnackbar}
					message={
						<span id="message-id">
							Format Changed To {format.toUpperCase()}!
						</span>
					}
					ContenProps={{
						"aria-describedby": "message-id",
					}}
					action={[
						<IconButton onClick={this.closeSnackbar} color="inherit">
							<CloseIcon />
						</IconButton>,
					]}
				/>
			</header>
		);
	}
}

export default withStyles(styles)(Navbar);
