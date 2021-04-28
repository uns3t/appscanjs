const boa = require('@pipcook/boa');
const { open, len, isinstance } = boa.builtins();
const dpkt = boa.import('dpkt');
const ipaddress = boa.import('ipaddress');
const socket = boa.import('socket');

class PcapAnalysis {
    analysis(fliePath){
        let allPacketData=[];
        const pcapFile = open(fliePath, boa.kwargs({
            mode:'rb'
        }));
        const pcapArr = dpkt.pcap.Reader(pcapFile);
        for(const packet of pcapArr){
            console.log(idx);
            const ts = packet[0];
            const buf = packet[1];
            const eth = dpkt.ethernet.Ethernet(buf);
            if(!isinstance(eth.data, dpkt.ip.IP)){
                continue
            }
            const ip = eth.data;
            const transfData = ip.data;
            if(len(transfData.data) === 0){
                continue
            }
            const srcIp = this.inetToStr(ip.src);
            const srcIpaddress = ipaddress.ip_address(srcIp);
            const isOutComing = srcIpaddress.is_private?1:0;
            allPacketData.push({'time':ts,
                                'len':len(transfData.data),
                                'direction':isOutComing,
                                'srcIp':srcIp,
                                'dstIp':this.inetToStr(ip.dst)})
        }

        pcapFile.close();
        return allPacketData;
    }

    inetToStr(inet){
        return socket.inet_ntop(socket.AF_INET, inet)
    }

}

module.exports = PcapAnalysis