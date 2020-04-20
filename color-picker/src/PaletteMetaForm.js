import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {
	state = {
		open: true,
		newPaletteName: "",
		stage: "form",
	};

	componentDidMount() {
		ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
			this.props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}

	handleChange = (evt) => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ stage: "form" });
		this.props.hideForm();
	};

	showEmojiPicker = () => {
		this.setState({ stage: "emoji" });
	};

	savePalette = (emoji) => {
		this.setState({ stage: "form" });
		this.props.handleSubmit({
			paletteName: this.state.newPaletteName,
			emoji: emoji.native,
		});
	};

	render() {
		const { newPaletteName, stage } = this.state;

		return (
			<div>
				<Dialog open={stage === "emoji"} onClose={this.handleClose}>
        <DialogTitle id="form-dialog-title">
        Pick an emoji
					</DialogTitle>
					<Picker title="Pick an emoji" onSelect={this.savePalette} />
				</Dialog>
				<Dialog
					open={stage === "form"}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">
						Choose a Palette Name
					</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContent>
								Please enter an unique name for your new palette.
							</DialogContent>

							<TextValidator
								value={newPaletteName}
								name="newPaletteName"
								placeholder="Palette Name"
								onChange={this.handleChange}
								fullWidth
								margin="normal"
								validators={["required", "isPaletteNameUnique"]}
								errorMessages={[
									"this field is required",
									"Palette Name is already in use",
								]}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button variant="contained" color="primary" type="onSubmit">
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}

export default PaletteMetaForm;
