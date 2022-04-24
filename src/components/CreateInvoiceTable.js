import React from 'react';

const CreateInvoiceTable = ({ itemList }) => {
  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Cost</th>
        <th>Quantity</th>
        <th>Amount</th>
      </thead>

      <tbody>
        {itemList.reverse().map((item) => (
          <tr key={item.itemName}>
            <td className="text-sm">{item.itemName}</td>
            <td className="text-sm">{item.itemCost}</td>
            <td className="text-sm">{item.itemQuantity}</td>
            <td className="text-sm">
              {Number(item.itemCost * item.itemQuantity).toLocaleString(
                'en-US'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CreateInvoiceTable;