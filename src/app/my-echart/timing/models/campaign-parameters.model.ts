export interface ICampaignParametersDto {
    mailingId: string;
    mailingName: string;
    timing: {
        mailingDate: string; //suppose: yyyy-MM-dd
        specificStartDate: boolean;
    };
    mailPieceSpecs: {
        sizeCode: string;
        thick: boolean;
        weight: number;
        weightUnit: string
    };
    prepTypeCode: string;
    provinceOfDeposit: string;
    totalNumberOfPieces: number
    demographics: {
        category1: {
            selectedLabel: {
                id: String;
                en: String;
                fr: String;
            }
        },
            category2: {
                selectedLabel: {
                    id: String;
                    en: String;
                    fr: String;
                }
            },
          category3: {
                    selectedLabel: {
                        id: String;
                        en: String;
                        fr: String;
             }
        }
    };
    audience: {
        apartments: boolean;
        farms: boolean;
        businesses: boolean;
        houses: boolean;
    };

}
export class CampaignParameters {
    mailingId: string;
    mailingName: string;
    timing: Timing;
    mailPieceSpecs: MailPieceSpecs;
    prepTypeCode: string;
    provinceOfDeposit: string;
    totalNumberOfPieces: number;
    audience: Audience;
    demographics: Demographics;


    static  toCampaignParameters(resp: ICampaignParametersDto): CampaignParameters {
        const campaignParameters: CampaignParameters = resp as any;

        //date returned from API  has two digits for the year, so we need to add two digits here
        // campaignParameters.timing.mailingDate = new Date('20' + resp.timing.mailingDate);
        // return JSON.parse(JSON.stringify(campaignParameters));
        /**
         * 1. Date returned from API  has two digits for the year (23-01-20), so we need to add two digits here.
         * 2. Converting date strings with "-" to "/".
         *
         * For example;
         *  date using existing dashes (-) displays: 2023-01-20T00:00:00.000Z
         *  date replaced with slashes (/) instead displays: 2023-01-20T05:00:00.000Z
         *
         * Note that with the /, the timezone is applied to this, and that is required for maitaining
         * behavior with the timing, and display.
         */
        campaignParameters.timing.mailingDate = new Date(('20' + resp.timing.mailingDate).replace(/-/g, '\/'));
        return (JSON.parse(JSON.stringify(campaignParameters)));
    }
}

export class Timing {
    mailingDate: Date;
    specificStartDate: boolean;
}

export class MailPieceSpecs {
    sizeCode: string;
    thick: boolean;
    weight: number;
    weightUnit: string;
};
export class Demographics {

    category1: Category;
    category2: Category;
    category3: Category;
};
export class Category {

    selectedLabel: SelectedLabel;
    selectedOptionForAnalysis: SelectedOptionForAnalysis;
};
export class SelectedLabel {
    id: String;
    en: String;
    fr: String;
};
export class SelectedOptionForAnalysis {
    id: String;
    en: String;
    fr: String;
};
export class Audience {
    apartments: boolean;
    farms: boolean;
    businesses: boolean;
    houses: boolean;
};
export enum MailPieceSpecsWeightUnitEnum {
    GRAMS = "grams",
}

export enum MailPieceSpecsSizeCodeEnum {
    STD = "STANDARD1",
    STD2 = "STANDARD2",
    OS1 = "OVERSIZE1",
    OS2 = "OVERSIZE2",  //sizeCodeFromApi = sizeCodeInEnJson
}



