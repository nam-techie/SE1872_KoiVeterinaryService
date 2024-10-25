const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? '' : date.toISOString();
};

// Trong hàm fetchAllAccounts
const formattedAccounts = accounts.map(account => ({
  ...account,
  createdAt: formatDate(account.createdAt)
}));
