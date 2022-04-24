import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import db from '../firebase';
import { showToast } from '../utils/functions';

const DashboardActionsSvg = ({ invoiceId }) => {
  const navigate = useNavigate();

  async function deleteInvoice(id) {
    try {
      await deleteDoc(doc(db, 'invoices', id));
      showToast("success", 'Deleted successfully!🚀')
    } catch (err) {
      showToast("error", 'Failed, Try again!😭')
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-blue-500 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        onClick={() => navigate(`/view/invoice/${invoiceId}`)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-500 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        onClick={() => deleteInvoice(invoiceId)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </div>
  );
};

export default DashboardActionsSvg;