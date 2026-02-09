
import { Photo, Track } from './types';

export const SAMPLE_PHOTOS: Photo[] = [
  { id: '1', url: 'https://picsum.photos/id/10/1200/800', title: 'Mountain Whisper', author: 'Lumina Explorer' },
  { id: '2', url: 'https://picsum.photos/id/1011/1200/800', title: 'Urban Pulse', author: 'City Ghost' },
  { id: '3', url: 'https://picsum.photos/id/1015/1200/800', title: 'Emerald Stream', author: 'Nature Eye' },
  { id: '4', url: 'https://picsum.photos/id/1021/1200/800', title: 'Mist and Fog', author: 'Dreamer' },
  { id: '5', url: 'https://picsum.photos/id/1024/1200/800', title: 'Stellar Night', author: 'Cosmic Voyager' },
  { id: '6', url: 'https://picsum.photos/id/1025/1200/800', title: 'Puppy Love', author: 'Paws & Pixels' },
  { id: '7', url: 'https://picsum.photos/id/1033/1200/800', title: 'Coastal Drift', author: 'Salt & Sea' },
  { id: '8', url: 'https://picsum.photos/id/1036/1200/800', title: 'Golden Hour', author: 'Solar Flare' },
  { id: '9', url: 'https://picsum.photos/id/1043/1200/800', title: 'Mountain Echo', author: 'Peak Seeker' },
  { id: '10', url: 'https://picsum.photos/id/1050/1200/800', title: 'Azure Waters', author: 'Tide Walker' },
  { id: '11', url: 'https://picsum.photos/id/1060/1200/800', title: 'Coffee Ritual', author: 'Brew Master' },
  { id: '12', url: 'https://picsum.photos/id/1069/1200/800', title: 'Wild Heart', author: 'Roamer' },
];

export const PLAYLIST: Track[] = [
  {
    id: '1',
    title: 'Serene Sanctuary',
    artist: 'Lumina Ambient',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/id/145/200/200'
  },
  {
    id: '2',
    title: 'Midnight Echo',
    artist: 'Deep Beats',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/id/146/200/200'
  },
  {
    id: '3',
    title: 'Solar Wind',
    artist: 'Cosmic Soundscapes',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/id/147/200/200'
  }
];
