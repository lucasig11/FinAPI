export default interface ICreateTransactionDTO {
  description: string;
  amount: string;
  type: 'credit' | 'debit';
}
