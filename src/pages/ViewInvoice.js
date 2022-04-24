import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { query, collection, where, doc, onSnapshot } from '@firebase/firestore';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import db from '../firebase';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import { findGrandTotal, convertTimestamp } from '../utils/functions';
import Loading from '../components/Loading';

export const ComponentToPrint = React.forwardRef((props, ref) => {
  let params = useParams();
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [businessDetails, setBusinessDetails] = useState(null);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.id) return navigate('/login');
    try {
      const q = query(
        collection(db, 'businesses'),
        where('user_id', '==', user.id)
      );
      onSnapshot(q, (querySnapshot) => {
        const firebaseBusinesses = [];
        querySnapshot.forEach((doc) => {
          firebaseBusinesses.push({ data: doc.data(), id: doc.id });
        });
        setBusinessDetails(firebaseBusinesses);
      });
      if (params.id) {
        const unsub = onSnapshot(doc(db, 'invoices', params.id), (doc) => {
          setInvoiceDetails({ data: doc.data(), id: doc.id });
        });
        setLoading(false);
        return () => unsub();
      }
    } catch (error) {
      console.error(error);
    }
  }, [params.id, navigate, user.id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="w-full md:w-2/3 shadow-xl mx-auto mt-8 rounded"
          ref={ref}
        >
          <div className="w-full bg-black flex items-center">
            <div className="w-1/2 h-[100%]  p-8 ">
              <img
                src={businessDetails ? businessDetails[0].data.logo : ''}
                alt="Logo"
                className="w-[150px]"
              />
            </div>
            <div className="w-1/2  px-6 py-4">
              <h3 className="text-gray-50 text-2xl mb-8">Invoice</h3>
              <p className="text-gray-50 text-sm mb-1">Invoice ID:</p>

              {invoiceDetails && (
                <p className="text-gray-300 mb-5 text-sm">
                  {invoiceDetails.id.slice(0, 5)}
                </p>
              )}

              <p className="text-gray-50 text-sm mb-1">Date:</p>

              {invoiceDetails && (
                <p className="text-gray-300 text-sm">
                  {convertTimestamp(invoiceDetails.data.timestamp)}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex items-center">
            {invoiceDetails && (
              <div className="w-1/2 p-8">
                <h3 className="font-medium mb-2">Bill To:</h3>
                <p className="text-sm mb-1">
                  {invoiceDetails.data.customerName}
                </p>
                <p className="text-sm mb-1">
                  {invoiceDetails.data.customerAddress}
                </p>
                <p className="text-sm mb-1">
                  {invoiceDetails.data.customerCity}
                </p>
                <p className="text-sm mb-1">
                  {invoiceDetails.data.customerEmail}
                </p>
              </div>
            )}

            {businessDetails && (
              <div className="w-1/2  p-8">
                <h3 className="font-medium mb-2">Bill From:</h3>
                <p className="text-sm mb-1">
                  {businessDetails[0].data.businessName}
                </p>
                <p className="text-sm mb-1">
                  {businessDetails[0].data.businessAddress},
                </p>
                <p className="text-sm mb-1">
                  {businessDetails[0].data.businessCity}
                </p>
              </div>
            )}
          </div>

          <div className=" p-8">
            <table>
              <thead>
                <th>Item</th>
                <th className="text-right text-sm">Cost</th>
                <th className="text-right text-sm">Qty</th>
                <th className="text-right text-sm">Price</th>
              </thead>
              <tbody>
                {invoiceDetails &&
                  invoiceDetails.data.itemList.map((item) => (
                    <tr key={item.itemName}>
                      <td className="text-xs capitalize">{item.itemName}</td>
                      <td className="text-xs text-right">
                        {Number(item.itemCost).toLocaleString('en-US')}
                      </td>
                      <td className="text-xs text-right">
                        {Number(item.itemQuantity).toLocaleString('en-US')}
                      </td>
                      <td className="text-xs text-right">
                        {(
                          Number(item.itemQuantity) * Number(item.itemCost)
                        ).toLocaleString('en-US')}
                      </td>
                    </tr>
                  ))}

                {invoiceDetails && (
                  <tr>
                    <td colSpan="3" className="text-right font-bold text-sm">
                      TOTAL AMOUNT
                    </td>
                    <td className="font-bold text-right uppercase text-sm">
                      {findGrandTotal(
                        invoiceDetails.data,
                        invoiceDetails.data.currency
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {businessDetails && (
            <div className="w-full p-8">
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <p className="text-sm mb-1 capitalize">
                <span className="font-semibold">Account Name: </span>
                {businessDetails[0].data.accountName}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Account Number: </span>
                {businessDetails[0].data.accountNumber}
              </p>
              <p className="text-sm mb-1 capitalize">
                <span className="font-semibold">Bank Name: </span>{' '}
                {businessDetails[0].data.bankName}
              </p>
            </div>
          )}

          <footer className="px-8 py-4 bg-gray-200 w-full">
            <p className="text-sm text-center">Thanks for the patronage!</p>
          </footer>
        </div>
      )}
    </>
  );
});

export const ViewInvoice = () => {
  const ComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentRef.current,
  });
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex items-center md:justify-start justify-center relative">
        <Tooltip title="Print Invoice">
          <IconButton
            onClick={handlePrint}
            style={{
              position: 'fixed',
              top: '10px',
              right: '30px',
              zIndex: '1000px',
              color: '#F7CCAC',
            }}
          >
            <LocalPrintshopIcon style={{ fontSize: '50px' }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Go Home">
          <IconButton
            onClick={() => navigate('/dashboard')}
            style={{
              position: 'fixed',
              bottom: '50px',
              right: '30px',
              zIndex: '1000px',
            }}
          >
            <HomeIcon style={{ fontSize: '30px' }} />
          </IconButton>
        </Tooltip>

        <ComponentToPrint ref={ComponentRef} />
      </div>
    </>
  );
};