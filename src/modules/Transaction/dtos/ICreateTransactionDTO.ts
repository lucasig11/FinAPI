export default interface ICreateTransactionDTO {
  user_id: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}
