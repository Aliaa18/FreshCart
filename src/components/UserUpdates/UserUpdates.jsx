import React from "react";
import styles from './UserUpdates.module.css'
import { Link } from "react-router-dom";
export default function UserUpdates() {
  return <>
   
                     <div className="mt-5 w-50 p-3 d-flex justify-content-center align-items-center user-updates">
                      <div className="w-100">
                      <h2 className="mb-2">Update Your Data.</h2>
                      <ul>
                        <li className="mb-1">
                          <Link to={`/updatePass`}> Change Password </Link>
                        </li>
                        <li>
                          <Link to={`/updateData`} > Change userName email and phoneNumber </Link>
                        </li>
                      </ul>
                     </div> </div>
  </>
}
