import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CacheService } from "./cache.service";
import { UserApiService } from "./user-api.service";
import { HttpRequestCache } from "./http-request-cache.decorator";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(
        private readonly cache: CacheService,
        private readonly userApi: UserApiService
    ) { }

    private readonly refreshSubject = new Subject();

    @HttpRequestCache<UserService>(function () {
        return {
            storage: this.cache,
            refreshSubject: this.refreshSubject
        };
    })
    getUserPoles(): Observable<any[]> {
        return this.userApi.getUserPoles();
    }

    refreshData(): void {
        console.log("Refresh user roles");
        this.refreshSubject.next(true);
    }
}
