import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { SortableElement } from "react-sortable-hoc";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

const styles = {
	root: {
		width: "20%",
		height: "25%",
		margin: "0 auto",
		display: "inline-block",
		position: "relative",
		cursor: "pointer",
		marginBottom: "-4.5px",
		"&:hover svg": {
			color: "white",
			transform: "scale(1.5)",
		},
	},
	boxContent: {
		position: "absolute",
		width: "100%",
		left: "0px",
		bottom: "0px",
		padding: "10px",
		color: "black",
		letterSpacing: "1px",
		textTransform: "uppercase",
		fontSize: "12px",
		display: "flex",
		justifyContent: "space-between",
	},
	deleteButton: {
		transition: "all 0.3s ease-in-out",
	},
};

const DraggableColorBox = SortableElement((props) => {
	const { classes, color, name, deleteColor } = props;
	const handleDelete = () => {
		deleteColor(name);
	};
	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			<div className={classes.boxContent}>
				<span>{name}</span>

				<DeleteForeverOutlinedIcon
					className={classes.deleteButton}
					onClick={handleDelete}
				/>
			</div>
		</div>
	);
});

export default withStyles(styles)(DraggableColorBox);
