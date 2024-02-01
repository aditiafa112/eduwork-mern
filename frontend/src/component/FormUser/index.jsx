import React from "react";
import styles from "./FormUser.module.css";

export default function FormUser({
  name,
  setName,
  age,
  setAge,
  id,
  onClickAddUser,
  onClickEditUser,
  onClickCancelEdit,
}) {
  return (
    <>
      <h2 className="section-title">Form</h2>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        {id === "" ? (
          <div className={styles.formGroup}>
            <button className={styles.btn} type="submit" onClick={onClickAddUser}>
              Tambah
            </button>
          </div>
        ) : (
          <div className={styles.formGroup}>
            <button
              className={`${styles.btn} ${styles.btnEdit}`}
              type="submit"
              onClick={onClickEditUser}
            >
              Edit
            </button>
            <button className={styles.btn} onClick={onClickCancelEdit}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}
