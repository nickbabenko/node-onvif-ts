import { OnvifServiceBase, OnvifServiceBaseConfigs } from './service-base';
import { requestCommand } from './soap';

export class OnvifServiceEvents extends OnvifServiceBase {
    constructor(configs: OnvifServiceEventsConfigs) {
        const {xaddr, user, pass, timeDiff} = configs;
        super({xaddr, user, pass});

        this.timeDiff = timeDiff;
        this.namespaceAttrList = [
            'xmlns:wsa="http://www.w3.org/2005/08/addressing"',
            'xmlns:tev="http://www.onvif.org/ver10/events/wsdl"'
        ];
    }

    getEventProperties() {
        const soapBody = '<tev:GetEventProperties/>';
        const soap = this.createRequestSoap(soapBody);
        return requestCommand(this.oxaddr, 'GetEventProperties', soap);
    }

    subscribe(url: string) {
        const soapBody = '<Subscribe xmlns="http://docs.oasis-open.org/wsn/b-2">' +
			'<ConsumerReference><a:Address>' + url + '</a:Address></ConsumerReference>' +
			'<InitialTerminationTime>PT2M</InitialTerminationTime>' +
			'</Subscribe>';
        const soap = this.createRequestSoap(soapBody);
	    console.log(soap);
        return requestCommand(this.oxaddr, 'Subscribe', soap);
    }
}

export interface OnvifServiceEventsConfigs extends OnvifServiceBaseConfigs {
    timeDiff: number;
}
