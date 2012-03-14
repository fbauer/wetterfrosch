##############################################################################
#
# This file is part of wetterfrosch.
#
# wetterfrosch is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# wetterfrosch is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with wetterfrosch.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
import datetime
import json
import random

def ts():
    return datetime.datetime.strftime(datetime.datetime(2012, 04, 03,
        random.randint(12, 23),
        random.randint(0, 59)), '%Y-%m-%dT%H:%M:%SZ')
def ch():
    return random.randint(1, 5)

def hum(avg, k=1.):
    return round(avg + k*random.random() - k / 2., 1)

def temp(avg, k=1.):
    return round(avg + k*random.random() - k / 2., 1)

print json.dumps([dict(ts=ts(), temp=temp(22,2), ch=ch(), hum=hum(50.,5)) for i in range(100)])

