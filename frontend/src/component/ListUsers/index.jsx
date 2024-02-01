import React from "react";
import styles from "./ListUsers.module.css";

export default function ListUsers({ users, onClickEdit, onClickDelete }) {
  return (
    <>
      <h2 className="section-title">List User</h2>
      <ul className={styles.list}>
        {users.length > 0 ? (
          users.map((user) => {
            return (
              <li className={styles.listItem} key={user.id}>
                <div className={styles.listBody}>
                  <p>
                    <strong>{user.name}</strong>
                  </p>
                  <p>{user.age} years</p>
                </div>
                <div className={styles.actions}>
                  <span className={styles.edit} onClick={() => onClickEdit(user)}>
                    Edit
                  </span>
                  <span
                    className={styles.delete}
                    onClick={() => onClickDelete(user.id)}
                  >
                    Delete
                  </span>
                </div>
              </li>
            );
          })
        ) : (
          <li className={styles.listItem}>Data is empty, please add new user.</li>
        )}
      </ul>
    </>
  );
}
