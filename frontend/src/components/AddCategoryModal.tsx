import React, { useState } from "react";
import { createCategory } from "../services/api";
import { Modal, TextField, Button } from "../vibes";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (newCategory: string) => void;
}

export function AddCategoryModal({
  isOpen,
  onClose,
  onCategoryAdded,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createCategory(name.trim());
      setName("");
      onCategoryAdded(name.trim());
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Category">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          label="Category Name"
          type="text"
          placeholder="e.g. Subscriptions"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
          fullWidth
          required
        />
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <Button type="submit" variant="primary" disabled={isSubmitting} fullWidth>
            {isSubmitting ? "Saving..." : "Add Category"}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}