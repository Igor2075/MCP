import React, { Component } from "react";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class ColorPickerForm extends Component {
  state = {
    currentColor: "steelblue",
    newColorName: "",
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isNameUnique", (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      this.props.colors.every(
        ({ color }) =>
          color.toLowerCase() !== this.state.currentColor.toLowerCase()
      )
    );
  }
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  updateCurrentColor = (color) => {
    this.setState({ currentColor: color.hex, newColorName: "" });
  };
  handleSubmit = () => {
    this.props.addNewColor(this.state.newColorName, this.state.currentColor);
    const allColors = this.props.palettes.map((p) => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    this.setState({
      currentColor: allColors[rand].color,
      newColorName: "",
    });
  };
  render() {
    const { currentColor, newColorName } = this.state;
    const { paletteIsFull } = this.props;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={(newColor) => this.updateCurrentColor(newColor)}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
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
            style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
            type="submit"
            disabled={paletteIsFull}
          >
            {paletteIsFull ? "Palette is Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default ColorPickerForm;
