import { toast } from 'react-toastify';

export const showToast = (type, message) => {
    if(type === "success") {
        toast.success(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    } else {
        toast.error(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}
export const findGrandTotal = ({ itemList }, currency) => {
    let total = 0;
    for (let i = 0; i < itemList.length; i++) {
      const amount = itemList[i].itemCost * itemList[i].itemQuantity;
      total += amount;
    }
    return `${currency} ${total.toLocaleString('en-US')}`;
  };

export const convertTimestamp = (timestamp) => {
    const fireBaseTime = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    const day =
      fireBaseTime.getDate() < 10
        ? `0${fireBaseTime.getDate()}`
        : fireBaseTime.getDate();
    const month =
      fireBaseTime.getMonth() < 10
        ? `0${fireBaseTime.getMonth()}`
        : fireBaseTime.getMonth();
    const year = fireBaseTime.getFullYear();

    return `${day}-${month}-${year}`;
  }