import React, { useState } from "react";
import { createCategory } from "../services/api";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (newCategory: string) => void;
}

export function AddCategoryModal({ isOpen, onClose, onCategoryAdded }: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Category name is required."); return; }
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
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "white", padding: "2rem", borderRadius: "8px", minWidth: "360px" }}>
        <h2>Add New Category</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label>Category Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Subscriptions" style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px", border: "1px solid #ccc", borderRadius: "4px" }} />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} disabled={isSubmitting}>Cancel</button>
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Add Category"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}