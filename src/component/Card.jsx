import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function Card({ onEdit, onDelete, id, title, body }) {
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const onSave = () => {
    const newTitle = document.getElementById("new_name").value;
    const newBody = document.getElementById("new_type").value;
    if (newTitle && newBody) {
      onEdit(id, newTitle, newBody);
      setEditMode(false);
    } else {
      toast.error("All fields are required.");
    }
  };
  return (
    <div className="pokemon-card margin-10px">
      <ToastContainer />
      <h1 className="font-size-10px">Pokemon Id: {id}</h1>
      <div className="img d-block m-auto"></div>
      <div>
        {editMode ? (
          <input
            type="text"
            id="new_name"
            className="mt-1"
            defaultValue={title}
          />
        ) : (
          <h2 className="font-weight-none font-size-15px mt-1 margin-left-10px font-weight-bold">
            Pokemon Name: <strong>{title}</strong>
          </h2>
        )}
      </div>
      <div>
        {editMode ? (
          <textarea
            type="text"
            id="new_type"
            className="mt-1"
            defaultValue={body}
          />
        ) : (
          <p className="margin-left-10px font-weight-bold font-size-10px">
            Pokemon type: <strong>{body}</strong>
          </p>
        )}
      </div>
      {editMode ? (
        <button
          onClick={onSave}
          className="btn"
          style={{ background: "rgb(19, 119, 181)", color: "white" }}
        >
          <FontAwesomeIcon icon={faCheck} />
          <span style={{ margin: 2 }}>Save</span>
        </button>
      ) : (
        <div className="d-flex justify-content-flexend gap-1rem margin-10px">
          <button
            className="edit-btn btn"
            onClick={() => setEditMode(!editMode)}
          >
            <FontAwesomeIcon icon={faPen} />
            <span style={{ margin: 2 }}>Edit</span>
          </button>
          <button
            className="delete-btn btn"
            onClick={() => setDeleteDialog(id)}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span style={{ margin: 2 }}>Delete</span>
          </button>
        </div>
      )}

      <Dialog open={!!deleteDialog}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>Do you want to delete this Card</Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: !!deleteDialog ? "flex" : "none",
          }}
        >
          <Button
            onClick={() => setDeleteDialog(null)}
            style={{
              border: "2px solid blue",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => onDelete(id)}
            color="error"
            style={{
              border: "2px solid red",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
