import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import Page from "./Page";
import SingleColorPalette from "./SingleColorPalette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";
import { generatePalette } from "./colorhelpers";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class App extends Component {
	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
		this.state = {
			palettes: savedPalettes || seedColors,
		};
	}

	findPalette = (id) => {
		return this.state.palettes.find(function (palette) {
			return palette.id === id;
		});
	};

	savePalette = (newPalette) => {
		this.setState(
			{ palettes: [...this.state.palettes, newPalette] },
			this.syncLocalStorage
		);
	};

	removePalette = (id) => {
		const filteredPalette = this.state.palettes.filter(
			(palette) => palette.id.toLowerCase() !== id.toLowerCase()
		);

		this.setState({ palettes: [...filteredPalette] }, this.syncLocalStorage);
	};

	syncLocalStorage = () => {
		window.localStorage.setItem(
			"palettes",
			JSON.stringify(this.state.palettes)
		);
	};

	render() {
		return (
			<Route
				render={({ location }) => (
					<TransitionGroup>
						<CSSTransition key={location.key} classNames="page" timeout={500}>
							<Switch location={location}>
								<Route
									exact
									path="/palette/new"
									render={(routeProps) => (
										<Page>
											<NewPaletteForm
												savePalette={this.savePalette}
												palettes={this.state.palettes}
												{...routeProps}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path="/"
									render={(routeProps) => (
										<Page>
											<PaletteList
												palettes={this.state.palettes}
												removePalette={this.removePalette}
												{...routeProps}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path="/palette/:id"
									render={(routeProps) => (
										<Page>
											<Palette
												palette={generatePalette(
													this.findPalette(routeProps.match.params.id)
												)}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path="/palette/:paletteId/:colorId"
									render={(routeProps) => (
										<Page>
											<SingleColorPalette
												colorId={routeProps.match.params.colorId}
												palette={generatePalette(
													this.findPalette(routeProps.match.params.paletteId)
												)}
											/>
										</Page>
									)}
								/>
								<Route
									render={(routeProps) => (
										<Page>
											<PaletteList
												palettes={this.state.palettes}
												removePalette={this.removePalette}
												{...routeProps}
											/>
										</Page>
									)}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>
		);
	}
}

export default App;
