import datetime
import json
import random

def ts():
    return datetime.datetime.strftime(datetime.datetime.now(),
                                      '%Y-%m-%dT%H:%M:%S.%fZ')
def ch():
    return random.randint(1, 5)

def hum(avg, k=1.):
    return round(avg + k*random.random() - k / 2., 1)

def temp(avg, k=1.):
    return round(avg + k*random.random() - k / 2., 1)

print json.dumps([dict(ts=ts(), temp=temp(22,2), Ch=ch(), hum=hum(50.,5)) for i in range(100)])

