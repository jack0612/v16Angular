export class DeliveryPerformance {
    type: string;
    percent: number;
    value: number;
    description: string;
    color: string;

    

    static getDeliveryPerformance():DeliveryPerformance[]{
        const deliveryPerformances:DeliveryPerformance[]=[
            {
                type:'Delivered early',
                percent:10.4,
                value: 3555,
                description:'10.4% (3,555)',
                color:'#3B796C'
            },
            {
                type:'Delivered on-time',
                percent:87.9,
                value: 62331,
                description:'87.9% (62,331)',
                color:'#3B796C'
            },
            {
                type:'Delivered late',
                percent:2.5,
                value: 545,
                description:'2.5% (545)',
                color:'#B6875E',
            },
            
            {
                type:'Not delivered',
                percent:0.5,
                value: 47,
                description:'0.5% (47)',
                color:'#B6875E',
            },   

        ];
        return deliveryPerformances;
    }

  
}