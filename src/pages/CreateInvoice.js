import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateInvoiceTable from '../components/CreateInvoiceTable';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoice } from '../redux/invoice';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import db from '../firebase';
import Nav from '../components/Nav';
import { showToast } from '../utils/functions';
import Loading from '../components/Loading';

const CreateInvoice = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [itemName, setItemName] = useState('');
  const [currency, setCurrency] = useState('');
  const [itemCost, setItemCost] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemList, setItemList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.id) return navigate('/login');
    setLoading(false);
  }, [navigate, user.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim() && itemCost > 0 && itemQuantity >= 1) {
      setItemList([
        ...itemList,
        {
          itemName,
          itemCost,
          itemQuantity,
        },
      ]);
    }

    setItemName('');
    setItemCost('');
    setItemQuantity('');
  };

  const saveInvoice = async (e) => {
    e.preventDefault();
    dispatch(
      setInvoice({
        customerName,
        customerAddress,
        customerCity,
        customerEmail,
        itemList,
        currency,
      })
    );

    await addDoc(collection(db, 'invoices'), {
      user_id: user.id,
      customerName,
      customerAddress,
      customerCity,
      customerEmail,
      currency,
      itemList,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        showToast('success', 'Invoice created!📜');
      })
      .then(() => navigate('/dashboard'))
      .catch((err) => {
        showToast('error', 'Try again! Invoice not created!😭');
      });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Nav />
          <div className="w-full p-3 md:w-2/3 shadow-xl mx-auto mt-8 rounded  my-8 md:p-8">
            <h3 className="text-center font-bold text-xl mb-4">
              Create an invoice
            </h3>

            <form
              className="w-full mx-auto flex flex-col"
              onSubmit={saveInvoice}
            >
              <label htmlFor="customerName" className="text-sm">
                Customer's Name
              </label>
              <input
                type="text"
                required
                name="customerName"
                className="py-2 px-4 bg-gray-100 w-full mb-6"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />

              <div className="flex items-end space-x-3">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="customerAddress" className="text-sm">
                    Customer's Address
                  </label>
                  <input
                    type="text"
                    required
                    name="customerAddress"
                    className="py-2 px-4 bg-gray-100 w-full mb-6"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label htmlFor="customerCity" className="text-sm">
                    Customer's LGA / Country
                  </label>
                  <input
                    type="text"
                    required
                    name="customerCity"
                    className="py-2 px-4 bg-gray-100 w-full mb-6"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex flex-col w-2/3">
                  <label htmlFor="customerEmail" className="text-sm">
                    Customer's Email
                  </label>
                  <input
                    type="email"
                    required
                    name="customerEmail"
                    className="py-2 px-4 bg-gray-100 w-full mb-6"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/3">
                  <label htmlFor="currency" className="text-sm">
                    Currency
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={3}
                    minLength={3}
                    name="currency"
                    className="py-2 px-4 bg-gray-100 w-full mb-6"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex justify-between flex-col">
                <h3 className="my-4 font-bold ">Items List</h3>

                <div className="flex space-x-3">
                  <div className="flex flex-col w-1/4">
                    <label htmlFor="itemName" className="text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      name="itemName"
                      placeholder="Name"
                      className="py-2 px-4 mb-6 bg-gray-100"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label htmlFor="itemCost" className="text-sm">
                      Cost
                    </label>
                    <input
                      type="number"
                      name="itemCost"
                      placeholder="Cost"
                      className="py-2 px-4 mb-6 bg-gray-100"
                      value={itemCost}
                      onChange={(e) => setItemCost(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col justify-center w-1/4">
                    <label htmlFor="itemQuantity" className="text-sm">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="itemQuantity"
                      placeholder="Quantity"
                      className="py-2 px-4 mb-6 bg-gray-100"
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col justify-center w-1/4">
                    <p className="text-sm">Price</p>
                    <p className="py-2 px-4 mb-6 bg-gray-100">
                      {Number(itemCost * itemQuantity).toLocaleString('en-US')}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-blue-500 text-gray-100 w-[150px] p-3 rounded my-2"
                  onClick={handleSubmit}
                >
                  Add Item
                </button>
              </div>

              {itemList[0] && <CreateInvoiceTable itemList={itemList} />}

              <button
                className="bg-blue-800 text-gray-100 w-full p-5 rounded my-6"
                type="submit"
              >
                SAVE INVOICE
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateInvoice;