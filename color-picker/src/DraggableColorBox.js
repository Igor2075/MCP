import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/DraggableColorBoxStyles";
import { SortableElement } from "react-sortable-hoc";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

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
