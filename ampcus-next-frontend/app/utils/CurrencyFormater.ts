


export const formatToNaira = (amount:string|any) => {
    const numericAmount = parseFloat(amount);

    // Check if numericAmount is a valid number
    if (isNaN(numericAmount)) {
      return 'Invalid amount';
    }

    // Format as Naira currency
    return `₦${numericAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };