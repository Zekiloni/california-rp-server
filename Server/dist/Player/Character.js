"use strict";
// BANKING [Character Money]
var Transaction_Types;
(function (Transaction_Types) {
    Transaction_Types[Transaction_Types["Withdraw"] = 0] = "Withdraw";
    Transaction_Types[Transaction_Types["Deposit"] = 1] = "Deposit";
    Transaction_Types[Transaction_Types["Transfer"] = 2] = "Transfer";
    Transaction_Types[Transaction_Types["Payment"] = 3] = "Payment";
})(Transaction_Types || (Transaction_Types = {}));
;
mp.events.addProc({
    'SERVER::BANKING:ACCOUNT': (Player) => {
        // ... get bank account;
    }
});
