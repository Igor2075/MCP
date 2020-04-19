import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class PaletteMetaForm extends Component {
	state = {
		open: true,
		newPaletteName: "",
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
		this.props.hideForm();
	};

	render() {
		const { open, newPaletteName } = this.state;
		const { palettes } = this.props;
		return (
			<div>
				<Dialog
					open={open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">
						Choose a Palette Name
					</DialogTitle>
					<ValidatorForm
						onSubmit={() => this.props.handleSubmit(newPaletteName)}>
						<DialogContent>
							<DialogContent>
								Please enter an unique name for your new palette.
							</DialogContent>
							<TextValidator
								value={this.state.newPaletteName}
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
