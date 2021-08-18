



// BANKING [Character Money]

enum Transaction_Types {
   Withdraw, Deposit, Transfer, Payment
};

interface Bank_Transaction { 
   Date: Date
   Amount: number
   Type: Transaction_Types
   Description: string
}

interface Bank_Account {
   Name: string
   Number: number
   Balance: number
   Paycheck: number
   Savings: number
   Transactions: Bank_Transaction[]
}

mp.events.addProc(
   {
      'SERVER::BANKING:ACCOUNT': (Player: PlayerMp) => { 
         // ... get bank account;
      }
   }
);


