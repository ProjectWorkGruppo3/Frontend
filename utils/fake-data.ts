import { DensityMapData } from '../components/administration/density-map';

export const fakeDensityMapData: DensityMapData[] = [
  {
    city: 'Tokyo',
    coordinates: {
      latitude: 139.6917,
      longitude: 35.6895,
    },
    totalDevices: 3784,
  },
  {
    city: 'Jakarta',
    coordinates: {
      latitude: 106.865,
      longitude: -6.1751,
    },
    totalDevices: 3053,
  },
  {
    city: 'Delhi',
    coordinates: {
      latitude: 77.1025,
      longitude: 28.7041,
    },
    totalDevices: 24998,
  },
  {
    city: 'Seoul',
    coordinates: {
      latitude: 126.978,
      longitude: 37.5665,
    },
    totalDevices: 2348,
  },
  {
    city: 'Shanghai',
    coordinates: {
      latitude: 121.4737,
      longitude: 31.2304,
    },
    totalDevices: 23416,
  },
  {
    city: 'Karachi',
    coordinates: {
      latitude: 67.0099,
      longitude: 24.8615,
    },
    totalDevices: 2212,
  },
  {
    city: 'Beijing',
    coordinates: {
      latitude: 116.4074,
      longitude: 39.9042,
    },
    totalDevices: 21009,
  },
  {
    city: 'Mumbai',
    coordinates: {
      latitude: 72.8777,
      longitude: 19.076,
    },
    totalDevices: 17712,
  },
  {
    city: 'Osaka',
    coordinates: {
      latitude: 135.5022,
      longitude: 34.6937,
    },
    totalDevices: 17444,
  },
  {
    city: 'Moscow',
    coordinates: {
      latitude: 37.6173,
      longitude: 55.7558,
    },
    totalDevices: 16170,
  },
  {
    city: 'Dhaka',
    coordinates: {
      latitude: 90.4125,
      longitude: 23.8103,
    },
    totalDevices: 15669,
  },
  {
    city: 'Bangkok',
    coordinates: {
      latitude: 100.5018,
      longitude: 13.7563,
    },
    totalDevices: 14998,
  },
  {
    city: 'Kolkata',
    coordinates: {
      latitude: 88.3639,
      longitude: 22.5726,
    },
    totalDevices: 14667,
  },
  {
    city: 'Istanbul',
    coordinates: {
      latitude: 28.9784,
      longitude: 41.0082,
    },
    totalDevices: 13287,
  },
];



export const fakeAdminUsers = Array.from({ length: 5 }, (v, k) => ({
  id: `${k}`,
  email: `email ${k}`,
  birthday: new Date(Date.now()),
  name: `name ${k}`,
  surname: `surname ${k}`,
  height: k + 100,
  weight: k + 50,
  profilePic:
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
}))