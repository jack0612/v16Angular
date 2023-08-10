export class ApiUrlRepo {
    private static readonly API_BASE_URL = '/smmselfserv';

    static readonly VALIDATE_CONTRACT_NUM = ApiUrlRepo.API_BASE_URL + '/contract/validate';
    static readonly VALIDATE_AUTH_PAYER = ApiUrlRepo.API_BASE_URL + '/payer/validate';
    static readonly CUSTOMER_DETAILS = ApiUrlRepo.API_BASE_URL + '/customer';
    static readonly VALIDATE_CUSTOMER_NUMBER = ApiUrlRepo.API_BASE_URL + '/mobo/';
    static readonly CALENDAR_TPORANGES = ApiUrlRepo.API_BASE_URL + '/calendar/tporanges';
    static readonly CALENDAR_HOLIDAYS = ApiUrlRepo.API_BASE_URL + '/calendar/holidays';
    static readonly ORDER_ENTRY_RATING = ApiUrlRepo.API_BASE_URL + '/rating';
    static readonly CREATE_ORDER = ApiUrlRepo.API_BASE_URL + '/order/create';
    static readonly DECRYPT_TRANSMIT = ApiUrlRepo.API_BASE_URL + '/order/transmit';
    static readonly CAMPAIGN_PARAMETERS = ApiUrlRepo.API_BASE_URL + '/analysis';
    static readonly DELIVERY = ApiUrlRepo.API_BASE_URL + '/delivery';
    static readonly GET_SAVED_ORDER = ApiUrlRepo.API_BASE_URL + '/load';
    static readonly SAVED_ORDER_ENTRY_FORMS = ApiUrlRepo.API_BASE_URL + '/save';
    static readonly DELIVERY_DEPOSITS = ApiUrlRepo.API_BASE_URL + '/depos';
    static readonly DOWNLOAD_SOM = ApiUrlRepo.API_BASE_URL + '/download/';
}
