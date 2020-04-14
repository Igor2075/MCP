import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import "./ColorBox.css";

export default class ColorBox extends Component {
	state = {
		copied: false,
	};

	changeCopyState = () => {
		this.setState({ copied: true }, () => {
			setTimeout(() => {
				this.setState({ copied: false });
			}, 1500);
		});
	};

	render() {
		const { name, background, moreURL, showLink } = this.props;
		const { copied } = this.state;
		const isDarkColor = chroma(background).luminance() < 0.08;
		const isLightColor = chroma(background).luminance() > 0.6;
		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div className="ColorBox" style={{ background }}>
					<div
						style={{ background }}
						className={`copy-overlay ${copied && "show"}`}
					/>
					<div className={`copy-msg ${copied && "show"}`}>
						<h1>copied!</h1>
						<p className={isLightColor ? "dark-text" : null}>{background}</p>
					</div>
					<div className="copy-container">
						<div className="box-content">
							<span className={isDarkColor ? "light-text" : null}>{name}</span>
						</div>
						<button
							className={`copy-button ${isLightColor ? "dark-text" : null}`}>
							Copy
						</button>
					</div>
					{showLink && (
						<Link to={moreURL} onClick={(e) => e.stopPropagation()}>
							<span className={`see-more ${isLightColor ? "dark-text" : null}`}>
								MORE
							</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}
