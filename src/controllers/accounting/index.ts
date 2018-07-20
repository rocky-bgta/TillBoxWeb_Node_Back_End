/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/9/17
 *Time: 5:43 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import AccountController from "./accountController";
import TaxCodeController from "./taxCodeController";
import FinancialYearController from "./financialYearController";
import MoneyTransferController from './moneyTransferController';
import CombineAccountController from './combineAccountController';
import JournalController from './journalController';
import BudgetController from "./budgetController";
import OpeningBalanceController from "./openingBalanceController";


export default [
    AccountController,
    TaxCodeController,
    FinancialYearController,
    CombineAccountController,
    MoneyTransferController,
    JournalController,
    BudgetController,
    OpeningBalanceController
];