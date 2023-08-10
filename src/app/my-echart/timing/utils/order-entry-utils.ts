import { formatDate } from "@angular/common";
import { BehaviorSubject, combineLatest, filter, first, forkJoin, map, Observable, Subject } from "rxjs";
import { OrderEntryConstants } from "../models/order-entry-constants";
 
 

export class OrderEntryUtils {
    static currentCard$: Subject<number> = new BehaviorSubject(OrderEntryConstants.ACCOUNT_INFO);

     

}


