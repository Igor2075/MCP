import sizes from "./sizes";
import bg from "./bg.svg";
export default {
	root: {
		backgroundColor: "blue",
		height: "100vh",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center",
		backgroundColor: "#401fff",
		backgroundImage: `url(${bg})`,
		/* background by SVGBackgrounds.com */
		overflow: "scroll",
	},
	title: {
		fontSize: "2rem",
	},
	btnLink: {
		padding: "2rem",
		fontSize: "2rem",
	},

	container: {
		width: "50%",
		display: "flex",
		alignItems: "flex-start",
		flexDirection: "column",
		flexWrap: "wrap",
		[sizes.down("xl")]: {
			width: "80%",
		},
		[sizes.down("xs")]: {
			width: "75%",
		},
	},
	nav: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		color: "white",
		"& a": {
			textDecoration: "none",
			color: "white",
		},
	},
	palettes: {
		boxSizing: "border-box",
		width: "100%",
		display: "grid",
		gridTemplateColumns: "repeat(3, 30%)",
		gridGap: "2.0rem",
		[sizes.down("md")]: {
			gridTemplateColumns: "repeat(2, 45%)",
		},
		[sizes.down("xs")]: {
			gridTemplateColumns: "repeat(1, 100%)",
		},
	},
};
