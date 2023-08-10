import { IAddress } from "./address.model";

 

export class Customer {
    customerNumber: string;
    customerName: string;
    accountGroup: string;
    defaultContractNumber: string;
    payers: Payer[];
    baseCustomer: boolean;

    static findDefaultCustomer(customers: Customer[]): Customer {
        const defaultCustomer = (customers || []).find((customer: Customer) => customer.baseCustomer == true);
        return defaultCustomer;
    }
}

export class Payer {
    customerNumber: string;
    customerName: string;
    methodsOfPayment: string[];
}

export class ValidCustomer {
    customerNumber: string;
    customerName: string;
    payers: Payer[];
}

export class CustomerDetails {
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    postalCode: string;
    customers: Customer[];

    static toCustomerDetails(resp: any): CustomerDetails {
        const customerDetails = new CustomerDetails();
        customerDetails.name = resp.name;
        customerDetails.email = resp.email;
        customerDetails.phoneNumber = resp.phoneNumber;
        customerDetails.postalCode = resp.postalCode;
        customerDetails.address = resp.address;
        customerDetails.customers = this.toCutomers(resp.customers);
        return JSON.parse(JSON.stringify(customerDetails));
    }

    private static toCutomers(respCustomers: any[]): Customer[] {
        const customers: Customer[] = [];
        respCustomers.forEach(respCustomer => {
            const customer = new Customer;
            customer.accountGroup = respCustomer.accountGroup;
            customer.customerName = respCustomer.customerName;
            customer.customerNumber = respCustomer.customerNumber;
            customer.baseCustomer = respCustomer.baseCustomer;
            customer.payers = this.toPayers(respCustomer.payers);
            customer.defaultContractNumber = respCustomer.defaultContractNumber;
            customers.push(customer);
        });
        return customers;
    }

    private static toPayers(respPayers: any): Payer[] {
        const payers: Payer[] = [];
        const payer = new Payer();
        respPayers.forEach(respPayer => {
            payer.customerName = respPayer.customerName;
            payer.customerNumber = respPayer.customerNumber;
            payer.methodsOfPayment = respPayer.methodsOfPayment;
            payers.push(payer);
        });
        return payers;
    }

    static getDefaultAddress(customerDetails: CustomerDetails): IAddress {
        const addressString: string = customerDetails && customerDetails.address;
        const addressArr: string[] = addressString && addressString.split(',');
        const address: IAddress = {
            line1: null,
            city: null,
            provinceCode: null,
            postalCode: customerDetails && customerDetails.postalCode
        }
        if (addressArr && Array.isArray(addressArr)) {
            address.line1 = addressArr[0];
            address.city = addressArr[1];
            address.provinceCode = addressArr[2] && addressArr[2].trim();
        }
        return address;
    }
}

export class CustomerInfoDto {
    mailedById: string;
    moboId: string;
    contractId: string;
    payerId: string;
}
