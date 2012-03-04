import datetime
import json
import random

class TimeZone(datetime.tzinfo):
    '''Dummy time zone implementation'''
    def utcoffset(self, d):
        return datetime.timedelta(minutes=60)
    def dst(self, d):
        return datetime.timedelta(minutes=0)
    
def ts():
    return datetime.datetime.strftime(datetime.datetime.now(TimeZone()),
                                      '%Y-%m-%dT%H:%M:%S%z')
def ch():
    return random.randint(1, 5)

def hum(avg, k=1.):
    return round(avg + k*random.random() - k / 2., 1)

def temp(avg, k=1.):
    return round(avg + k*random.random() - k / 2., 1)

print json.dumps([dict(ts=ts(), temp=temp(22,2), Ch=ch(), hum=hum(50.,5)) for i in range(100)])

