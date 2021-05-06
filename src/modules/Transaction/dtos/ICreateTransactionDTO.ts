export default interface ICreateTransactionDTO {
  user_id: string;
  description: string;
  value: number;
  type: 'credit' | 'debit';
}
